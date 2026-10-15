import { NextResponse } from "next/server";
import { createGroqClient, DEFAULT_GROQ_MODEL } from "@/lib/groq";
import {
  fitMessagesToBudget,
  getBudgetConfig,
  isChatMessage,
} from "@/lib/input-budget";

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array." },
        { status: 400 },
      );
    }
    if (model !== undefined && (typeof model !== "string" || !model.trim())) {
      return NextResponse.json(
        { error: "Model must be a non-empty string." },
        { status: 400 },
      );
    }
    if (!messages.every(isChatMessage)) {
      return NextResponse.json(
        {
          error:
            "Each message needs a role of system, user or assistant and string content.",
        },
        { status: 400 },
      );
    }

    const config = getBudgetConfig();
        const budgeted = fitMessagesToBudget(messages, config);
        if (!budgeted) {
          return NextResponse.json(
            {
              error:
                "This request is too large to send within the configured input limit. Please shorten your message or start a new chat.",
              maxInputChars: config.maxInputChars,
            },
            { status: 413 },
          );
        }

    const completion = await createGroqClient().chat.completions.create({
      model:
        typeof model === "string" && model.trim()
          ? model.trim()
          : DEFAULT_GROQ_MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...budgeted.messages,
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
          budget: budgeted.report,
        });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
}