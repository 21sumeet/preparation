import { NextResponse } from "next/server";
import { createGroqClient, DEFAULT_GROQ_MODEL } from "@/lib/groq";

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

    const completion = await createGroqClient().chat.completions.create({
      model:
        typeof model === "string" && model.trim()
          ? model.trim()
          : DEFAULT_GROQ_MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
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