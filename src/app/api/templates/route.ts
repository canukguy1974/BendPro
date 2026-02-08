import { NextResponse } from "next/server";
import { getTemplates, TemplateType } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type") || undefined;
  const templateType = typeParam as TemplateType | undefined;

  const templates = getTemplates(templateType);
  return NextResponse.json({ templates });
}
