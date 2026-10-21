import type { ChatCompletionFunctionTool } from "openai/resources/chat/completions";

export const CALCULATOR_TOOL: ChatCompletionFunctionTool = {
  type: "function",
  function: {
    name: "calculate",
    description:
      "Evaluate an arithmetic expression exactly. Use this for any numeric calculation instead of computing it yourself. Supports + - * / % (modulo) ^ (power), parentheses, and unary minus.",
    parameters: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description:
            'The arithmetic expression to evaluate, e.g. "(12 + 8) * 3 / 4" or "5679495 * 239583".',
        },
      },
      required: ["expression"],
    },
  },
};

/** Parses and evaluates an expression, throwing a readable Error on bad input. */
function parseExpression(input: string): number {
  let index = 0;

  const peek = (): string => {
    while (index < input.length && /\s/.test(input[index])) index++;
    return input[index] ?? "";
  };

  function parseNumber(): number {
    peek();
    const match = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(input.slice(index));
    if (!match) throw new Error(`expected a number at position ${index + 1}`);
    index += match[0].length;
    return Number(match[0]);
  }

  function parsePrimary(): number {
    if (peek() !== "(") return parseNumber();
    index++; // consume "("
    const value = parseSum();
    if (peek() !== ")") throw new Error("missing closing parenthesis");
    index++; // consume ")"
    return value;
  }

  function parsePower(): number {
    const base = parsePrimary();
    if (peek() !== "^") return base;
    index++; // consume "^"
    return base ** parseUnary();
  }

  function parseUnary(): number {
    const char = peek();
    if (char === "-") {
      index++;
      return -parseUnary();
    }
    if (char === "+") {
      index++;
      return parseUnary();
    }
    return parsePower();
  }

  function parseProduct(): number {
    let value = parseUnary();
    for (;;) {
      const char = peek();
      if (char !== "*" && char !== "/" && char !== "%") return value;
      index++; // consume the operator
      const right = parseUnary();
      if (char === "*") {
        value *= right;
      } else if (char === "/") {
        if (right === 0) throw new Error("division by zero");
        value /= right;
      } else {
        if (right === 0) throw new Error("modulo by zero");
        value %= right;
      }
    }
  }

  function parseSum(): number {
    let value = parseProduct();
    for (;;) {
      const char = peek();
      if (char !== "+" && char !== "-") return value;
      index++; // consume the operator
      const right = parseProduct();
      value = char === "+" ? value + right : value - right;
    }
  }

  const value = parseSum();
  const leftover = input.slice(index).trim();
  if (leftover) throw new Error(`unexpected "${leftover}" in the expression`);
  return value;
}

/** Trims float64 noise (0.1 + 0.2 -> 0.3) while keeping integers exact. */
function formatNumber(value: number): string {
  if (Object.is(value, -0)) return "0";
  return Number.isInteger(value)
    ? String(value)
    : String(Number(value.toPrecision(12)));
}

/**
 * Runs a tool call the model asked for. The arguments are an LLM-authored JSON
 * string, so they are validated here instead of trusted.
 */
export function runCalculatorTool(name: string, rawArguments: string): string {
  if (name !== CALCULATOR_TOOL.function.name) {
    return `Error: unknown tool "${name}".`;
  }

  let expression: unknown;
  try {
    expression = (JSON.parse(rawArguments) as { expression?: unknown })
      .expression;
  } catch {
    return "Error: arguments were not valid JSON.";
  }
  if (typeof expression !== "string") {
    return 'Error: the "expression" argument must be a string.';
  }

  try {
    const value = parseExpression(expression);
    if (!Number.isFinite(value)) return "Error: result is not a finite number.";
    return `${expression.trim()} = ${formatNumber(value)}`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "could not evaluate it";
    return `Error: ${message}.`;
  }
}