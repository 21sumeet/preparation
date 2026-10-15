export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type BudgetConfig = {
  /** Hard ceiling on the total characters sent to the model. */
  maxInputChars: number;
  /** How many user/assistant pairs of history to keep. */
  maxHistoryTurns: number;
  /** Refuse instead of truncating a message below this many characters. */
  minTruncatedChars: number;
};

export type BudgetReport = {
  originalChars: number;
  finalChars: number;
  maxInputChars: number;
  droppedHistoryMessages: number;
  collapsedMessages: number;
  truncatedMessages: number;
};

export type BudgetResult = {
  messages: ChatMessage[];
  report: BudgetReport;
};

const DEFAULT_MAX_INPUT_CHARS = 20000;
const DEFAULT_MAX_HISTORY_TURNS = 12;
const DEFAULT_MIN_TRUNCATED_CHARS = 600;

/** Fraction of the kept characters that come from the start of a truncated message. */
const HEAD_RATIO = 0.45;

const MIN_COLLAPSIBLE_LINE_LENGTH = 24;
const MIN_REPEATS_TO_COLLAPSE = 2;

/**
 * Per-character token costs, calibrated against `gpt-tokenizer` (o200k_base) on
 * prose, code, logs, minified JSON, URLs, identifiers, Devanagari and CJK.
 * Spaces are free because BPE folds a leading space into the following token.
 * Measured drift is 22% worst case / 12% mean, which is acceptable for a
 * display-only figure: the budget itself is enforced in characters.
 */
const TOKEN_COST = {
  letter: 0.25,
  digit: 0.35,
  space: 0,
  newline: 0.7,
  mergeablePunctuation: 0.45,
  symbol: 0.75,
  latin1: 0.4,
  indic: 0.34,
  cjk: 0.74,
  other: 0.9,
} as const;

/** Punctuation that BPE routinely merges with an adjacent character. */
const MERGEABLE_PUNCTUATION = new Set([
  34, 38, 39, 40, 41, 44, 45, 46, 47, 58, 59, 61, 91, 93, 95, 123, 125,
]);

function isCjk(code: number): boolean {
  return (
    (code >= 0x2e80 && code <= 0x9fff) ||
    (code >= 0xac00 && code <= 0xd7af) ||
    (code >= 0xf900 && code <= 0xfaff)
  );
}

/**
 * Dependency-free token estimate for display purposes. A real tokenizer needs a
 * ~27 MB merge table that must not reach the browser bundle, and the budget is
 * enforced in characters on the server, so this only needs to be indicative.
 */
export function estimateTokens(text: string): number {
  let tokens = 0;

  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);

    if (code === 32 || code === 9 || code === 13) {
      tokens += TOKEN_COST.space;
    } else if (code === 10) {
      tokens += TOKEN_COST.newline;
    } else if (code < 128) {
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        tokens += TOKEN_COST.letter;
      } else if (code >= 48 && code <= 57) {
        tokens += TOKEN_COST.digit;
      } else if (MERGEABLE_PUNCTUATION.has(code)) {
        tokens += TOKEN_COST.mergeablePunctuation;
      } else {
        tokens += TOKEN_COST.symbol;
      }
    } else if (code <= 0x2ff) {
      tokens += TOKEN_COST.latin1;
    } else if (code >= 0x900 && code <= 0xd7f) {
      tokens += TOKEN_COST.indic;
    } else if (isCjk(code)) {
      tokens += TOKEN_COST.cjk;
    } else {
      tokens += TOKEN_COST.other;
    }
  }

  return Math.max(1, Math.round(tokens));
}

function readPositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getBudgetConfig(): BudgetConfig {
  return {
    maxInputChars: readPositiveInt(
      process.env.MAX_INPUT_CHARS,
      DEFAULT_MAX_INPUT_CHARS,
    ),
    maxHistoryTurns: readPositiveInt(
      process.env.MAX_HISTORY_TURNS,
      DEFAULT_MAX_HISTORY_TURNS,
    ),
    minTruncatedChars: readPositiveInt(
      process.env.MIN_TRUNCATED_CHARS,
      DEFAULT_MIN_TRUNCATED_CHARS,
    ),
  };
}

function totalChars(messages: ChatMessage[]): number {
  return messages.reduce((sum, message) => sum + message.content.length, 0);
}

function elisionMarker(omitted: number): string {
  return `\n\n... [${omitted} characters omitted to fit the input budget] ...\n\n`;
}

/**
 * Collapses near-duplicate lines (differing only by numbers, timestamps or hex
 * ids) into a single line tagged with an occurrence count. Log dumps and pasted
 * stack traces lose most of their bulk this way while keeping every distinct
 * message.
 */
export function collapseRepeatedLines(content: string): string {
  const lines = content.split("\n");
  if (lines.length < 2) return content;

  const firstIndex = new Map<string, number>();
  const counts: number[] = [];
  const kept: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length < MIN_COLLAPSIBLE_LINE_LENGTH) {
      kept.push(line);
      counts.push(1);
      continue;
    }

    const signature = trimmed
      .toLowerCase()
      .replace(/[0-9a-f]{6,}/g, "#")
      .replace(/\d+/g, "#");

    const existing = firstIndex.get(signature);
    if (existing === undefined) {
      firstIndex.set(signature, kept.length);
      kept.push(line);
      counts.push(1);
    } else {
      counts[existing] += 1;
    }
  }

  const collapsed = kept
    .map((line, index) =>
      counts[index] >= MIN_REPEATS_TO_COLLAPSE ? `${line} (x${counts[index]})` : line,
    )
    .join("\n");

  return collapsed.length < content.length ? collapsed : content;
}

/**
 * Keeps the head and tail of an over-long message and replaces the middle with
 * an explicit marker. Chat requests put the actual instruction last, so the
 * tail is what must survive.
 */
export function truncateMiddle(content: string, maxChars: number): string {
  if (content.length <= maxChars) return content;

  const marker = elisionMarker(content.length - maxChars);
  const available = Math.max(0, maxChars - marker.length);
  const headLength = Math.floor(available * HEAD_RATIO);
  const tailLength = available - headLength;

  return (
    content.slice(0, headLength) +
    marker +
    (tailLength > 0 ? content.slice(-tailLength) : "")
  );
}

/**
 * Keeps only the most recent `maxTurns` user/assistant pairs, then trims any
 * leading assistant message so the history still starts with a user turn.
 */
function windowHistory(messages: ChatMessage[], maxTurns: number): ChatMessage[] {
  const maxMessages = maxTurns * 2;
  if (messages.length <= maxMessages) return messages;

  const windowed = messages.slice(-maxMessages);
  while (windowed.length > 0 && windowed[0].role === "assistant") {
    windowed.shift();
  }
  return windowed;
}

export function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { role?: unknown; content?: unknown };
  return (
    (candidate.role === "system" ||
      candidate.role === "user" ||
      candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

/**
 * Shrinks a request until it fits `maxInputChars`, using the cheapest step that
 * works: window history, collapse repeats, drop oldest history, then truncate.
 * Returns `null` when the newest message cannot be cut down to a usable size.
 */
export function fitMessagesToBudget(
  messages: ChatMessage[],
  config: BudgetConfig,
): BudgetResult | null {
  const originalChars = totalChars(messages);
  const report: BudgetReport = {
    originalChars,
    finalChars: originalChars,
    maxInputChars: config.maxInputChars,
    droppedHistoryMessages: 0,
    collapsedMessages: 0,
    truncatedMessages: 0,
  };

  let working = windowHistory(messages, config.maxHistoryTurns);
  report.droppedHistoryMessages = messages.length - working.length;

  if (totalChars(working) > config.maxInputChars) {
    working = working.map((message) => {
      const collapsed = collapseRepeatedLines(message.content);
      if (collapsed.length < message.content.length) report.collapsedMessages += 1;
      return collapsed === message.content
        ? message
        : { ...message, content: collapsed };
    });
  }

  // History is the least valuable content, so drop it oldest-first before
  // touching the message the user actually just typed.
  while (working.length > 1 && totalChars(working) > config.maxInputChars) {
    working = working.slice(1);
    report.droppedHistoryMessages += 1;
  }

  if (working.length === 0) return null;

  if (totalChars(working) > config.maxInputChars) {
    const last = working[working.length - 1];
    if (last.content.length > config.maxInputChars) {
      if (config.maxInputChars < config.minTruncatedChars) return null;
      working = [
        ...working.slice(0, -1),
        { ...last, content: truncateMiddle(last.content, config.maxInputChars) },
      ];
      report.truncatedMessages += 1;
    }

    if (totalChars(working) > config.maxInputChars) return null;
  }

  report.finalChars = totalChars(working);
  return { messages: working, report };
}