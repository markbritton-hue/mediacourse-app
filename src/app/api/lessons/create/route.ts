import { NextRequest, NextResponse } from "next/server";
import { createLesson } from "@/lib/actions/lessons";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const weekId = formData.get("weekId");
  const dayOfWeek = formData.get("dayOfWeek");
  if (typeof weekId !== "string" || typeof dayOfWeek !== "string") {
    return NextResponse.json({ error: "Missing weekId or dayOfWeek" }, { status: 400 });
  }
  const lesson = await createLesson(weekId, parseInt(dayOfWeek, 10));
  return NextResponse.redirect(new URL(`/curriculum/${lesson.id}/edit`, req.url));
}
