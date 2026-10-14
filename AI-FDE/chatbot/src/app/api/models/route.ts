import { NextResponse } from "next/server";
import { createGroqClient, DEFAULT_GROQ_MODEL } from "@/lib/groq";

export async function GET() {
  try {
    const models = await createGroqClient().models.list();

    return NextResponse.json({
      models: models.data.map(({ id }) => id),
      defaultModel: DEFAULT_GROQ_MODEL,
    });
  } catch (error) {
    console.error("Failed to fetch Groq models:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not fetch available models.",
      },
      { status: 500 },
    );
  }
}
