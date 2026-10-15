import { NextResponse } from "next/server";
import { getBudgetConfig } from "@/lib/input-budget";

/** Exposes the server-side input budget so the client can show live usage. */
export async function GET() {
  return NextResponse.json(getBudgetConfig());
}