import OpenAI from "openai";

export const DEFAULT_GROQ_MODEL =
  process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

export function createGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
}
