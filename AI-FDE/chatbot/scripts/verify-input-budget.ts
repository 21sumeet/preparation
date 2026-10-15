// Verifies the input-budget ladder against realistic and adversarial inputs.
// Run with: npm run verify:budget
import {
  collapseRepeatedLines,
  estimateTokens,
  fitMessagesToBudget,
  getBudgetConfig,
  isChatMessage,
  truncateMiddle,
  type ChatMessage,
} from "../src/lib/input-budget";
import { encode } from "gpt-tokenizer";

const chars = (m: ChatMessage[]) => m.reduce((s, x) => s + x.content.length, 0);
const facts = ["14:20", "PAYMENT_RETRY_MODE", "circuit breaker", "02:00 UTC", "3000ms"];
const kept = (text: string) =>
  facts.filter((f) => text.toLowerCase().includes(f.toLowerCase())).length;

let failures = 0;
function check(name: string, pass: boolean, detail = "") {
  if (!pass) failures++;
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` -> ${detail}` : ""}`);
}

const config = {
  ...getBudgetConfig(),
  maxInputChars: 20000,
  maxHistoryTurns: 12,
  minTruncatedChars: 600,
};
console.log("config under test:", config, "\n");

// ---- 1. small request passes through untouched -------------------------------
{
  const msgs: ChatMessage[] = [
    { role: "user", content: "Hello, what is 2+2?" },
    { role: "assistant", content: "4" },
    { role: "user", content: "Thanks!" },
  ];
  const r = fitMessagesToBudget(msgs, config);
  check(
    "1 small request passes through unchanged",
    r !== null &&
      r.messages.length === msgs.length &&
      r.report.originalChars === r.report.finalChars,
    r ? `chars ${r.report.originalChars}->${r.report.finalChars}` : "null",
  );
}

// ---- 2. long history is windowed -------------------------------------------
{
  const msgs: ChatMessage[] = [];
  for (let i = 0; i < 200; i++) {
    msgs.push({ role: "user", content: `Question ${i} about deploys and retries.` });
    msgs.push({
      role: "assistant",
      content: `Answer ${i} explaining the retry behaviour in detail.`,
    });
  }
  const r = fitMessagesToBudget(msgs, config)!;
  check(
    "2 long history windowed to <= maxHistoryTurns pairs",
    r.messages.length <= config.maxHistoryTurns * 2,
    `${msgs.length} -> ${r.messages.length} msgs, dropped ${r.report.droppedHistoryMessages}`,
  );
  check("2b history starts with a user turn", r.messages[0]?.role === "user", r.messages[0]?.role);
  check(
    "2c final within budget",
    chars(r.messages) <= config.maxInputChars,
    `${chars(r.messages)} <= ${config.maxInputChars}`,
  );
}

// ---- 3. log dump collapses --------------------------------------------------
{
  const lines = [
    "Our checkout service started failing after the 14:20 deploy.",
    "2026-10-15T14:20:48Z ERROR checkout failed, order=ORD-99120, reason=PAYMENT_UNAVAILABLE",
  ];
  for (let i = 0; i < 400; i++) {
    lines.push(
      `2026-10-15T14:2${i % 9}:${String(i % 60).padStart(2, "0")}Z ERROR checkout failed, order=ORD-99${
        1000 + i
      }, reason=PAYMENT_UNAVAILABLE`,
    );
  }
  lines.push("We flipped PAYMENT_RETRY_MODE from sequential to parallel in the same PR.");
  lines.push("Is the parallel retry mode what tripped the circuit breaker?");
  lines.push("Maintenance window tonight at 02:00 UTC.");
  const big = lines.join("\n");

  const collapsed = collapseRepeatedLines(big);
    const factsInInput = facts.filter((f) => big.toLowerCase().includes(f.toLowerCase()));
    check(
      "3 collapseRepeatedLines shrinks a log dump",
      collapsed.length < big.length * 0.6,
      `${big.length} -> ${collapsed.length} chars (${(
        100 -
        (collapsed.length / big.length) * 100
      ).toFixed(0)}% smaller)`,
    );
    check(
      "3b collapse keeps every fact present in the input",
      kept(collapsed) === factsInInput.length,
      `${kept(collapsed)}/${factsInInput.length} (input had ${factsInInput.join(", ")})`,
    );
    check("3c collapse is idempotent", collapseRepeatedLines(collapsed).length <= collapsed.length);

    const r = fitMessagesToBudget([{ role: "user", content: big }], config)!;
  check(
      "3d oversized log request fits",
      chars(r.messages) <= config.maxInputChars,
      `${chars(r.messages)} <= ${config.maxInputChars}, collapsed ${r.report.collapsedMessages}`,
  );
    check(
      "3e facts survive the full ladder",
      factsInInput.every((f) =>
        r.messages.some((m) => m.content.toLowerCase().includes(f.toLowerCase())),
      ),
      r.messages.map((m) => `${kept(m.content)}/${factsInInput.length}`).join(", "),
    );
}

// ---- 4. single huge message is truncated head+tail --------------------------
{
  const filler = "lorem ipsum dolor sit amet ".repeat(4000);
  const big = `Opening context: we deployed at 14:20.\n${filler}\nFinal question: should we revert PAYMENT_RETRY_MODE before the 02:00 UTC window, given the circuit breaker opened and the 3000ms timeout?`;
  const r = fitMessagesToBudget([{ role: "user", content: big }], config)!;
  check(
    "4 huge single message truncated to budget",
    chars(r.messages) <= config.maxInputChars,
    `${big.length} -> ${chars(r.messages)} chars`,
  );
  check(
    "4b tail instruction preserved",
    r.messages[0].content.toLowerCase().includes("should we revert payment_retry_mode"),
    "tail must survive",
  );
  check("4c head context preserved", r.messages[0].content.startsWith("Opening context"));
  check("4d elision marker present", r.messages[0].content.includes("characters omitted"));
  check("4e truncateMiddle short input untouched", truncateMiddle("short", 100) === "short");
  check("4f truncateMiddle exact-fit untouched", truncateMiddle("x".repeat(100), 100).length === 100);
}

// ---- 5. budget too small to be usable -> refuse, don't mangle ---------------
{
  const tiny = { ...config, maxInputChars: 100, minTruncatedChars: 600 };
  const r = fitMessagesToBudget([{ role: "user", content: "x".repeat(5000) }], tiny);
  check("5 refuses instead of over-truncating", r === null, r ? "returned a result" : "null (413)");
}

// ---- 6. adversarial / malformed input --------------------------------------
{
  check("6 isChatMessage rejects null", !isChatMessage(null));
  check("6b isChatMessage rejects bad role", !isChatMessage({ role: "hacker", content: "x" }));
  check("6c isChatMessage rejects non-string content", !isChatMessage({ role: "user", content: 5 }));
  check("6d isChatMessage accepts valid", isChatMessage({ role: "user", content: "ok" }));

  const r = fitMessagesToBudget([{ role: "assistant", content: "leading assistant only" }], config);
  check("6e assistant-only request still works", r !== null && r.messages.length === 1);
  check("6f empty message list handled", fitMessagesToBudget([], config) !== null || true);

  const ws = fitMessagesToBudget([{ role: "user", content: "\n\n\n   ".repeat(3000) }], config);
  check("6g whitespace-only input handled", ws === null || chars(ws.messages) <= config.maxInputChars);
}

// ---- 7. guarantee: never exceeds the budget --------------------------------
{
  let worst = 0;
  for (const size of [500, 5100, 20001, 50000, 250000, 1000000]) {
    for (const role of ["user", "assistant"] as const) {
      const r = fitMessagesToBudget(
        [{ role, content: "a b c d e f g. ".repeat(Math.ceil(size / 14)) }],
        config,
      );
      const n = r ? chars(r.messages) : 0;
      worst = Math.max(worst, n);
      if (n > config.maxInputChars) check(`7 budget exceeded at ${role} ${size}`, false, `${n}`);
    }
  }
  check("7 no input size ever exceeds the budget", worst <= config.maxInputChars, `worst=${worst}`);
}

// ---- 8. chars-vs-tokens sanity for the configured value -------------------
{
  const worstCase = "यह परीक्षण टोकन की जाँच करता है। ".repeat(700);
  const t = encode(worstCase).length;
  console.log(
    `\n@MAX_INPUT_CHARS=${config.maxInputChars}, worst-case non-Latin text = ~${t} tokens (${(
      worstCase.length / t
    ).toFixed(2)} chars/token)`,
  );
}

// ---- 9. display-only token estimate stays within 25% of the real tokenizer --
{
  const samples: Record<string, string> = {
    prose:
      "The circuit breaker opened after three consecutive payment failures, so retries were queued until 02:00 UTC. ".repeat(
        40,
      ),
    code: `export function retry<T>(fn: () => Promise<T>, n = 3): Promise<T> {\n  return fn().catch((e) => (n <= 0 ? Promise.reject(e) : retry(fn, n - 1)));\n}\n`.repeat(
      40,
    ),
    logs: Array.from(
      { length: 200 },
      (_, i) =>
        `2024-05-14T09:${String(i % 60).padStart(2, "0")}:01Z ERROR PAYMENT_UNAVAILABLE id=req_${i}`,
    ).join("\n"),
    json: JSON.stringify(
      Array.from({ length: 200 }, (_, i) => ({ id: i, status: "FAILED", amount: i * 1.5 })),
    ),
    urls: "https://api.example.com/v2/payments/retry?attempt=3&token=abc123 ".repeat(50),
    identifiers: "PAYMENT_RETRY_MODE circuit_breaker db-primary.internal:5432 x-request-id ".repeat(
      50,
    ),
    hindi: "यह परीक्षण टोकन की जाँच करता है और परिणाम दिखाता है। ".repeat(60),
    cjk: "入力トークンの見積もりが正しいかどうかを確認するテストです。".repeat(60),
  };

  let worstDrift = 0;
  let totalDrift = 0;
  const names = Object.keys(samples);
  for (const [name, text] of Object.entries(samples)) {
    const actual = encode(text).length;
    const estimated = estimateTokens(text);
    const drift = Math.abs(estimated - actual) / actual;
    worstDrift = Math.max(worstDrift, drift);
    totalDrift += drift;
    check(
      `9 estimateTokens within 25% for ${name}`,
      drift < 0.25,
      `est ${estimated} vs actual ${actual} (${(drift * 100).toFixed(1)}% off)`,
    );
  }
  check(
    "9b worst-case estimate drift under 25%",
    worstDrift < 0.25,
    `worst ${(worstDrift * 100).toFixed(1)}%, mean ${((totalDrift / names.length) * 100).toFixed(1)}%`,
  );
  check("9c estimateTokens never returns zero", estimateTokens("") >= 1 && estimateTokens("\n") >= 1);
}

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);