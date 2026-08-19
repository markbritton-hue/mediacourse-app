"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LESSON_FIELDS = [
  "title",
  "duration",
  "lessonType",
  "objective",
  "essentialQuestion",
  "teacherPrep",
  "requiredEquipment",
  "introduction",
  "demonstration",
  "content",
  "handsOnActivity",
  "productionLab",
  "studentAssignmentText",
  "assessment",
  "exitTicket",
  "homework",
  "teacherNotes",
  "standards",
  "timingBellwork",
  "timingInstruct",
  "timingDemo",
  "timingHandsOn",
  "timingCleanup",
  "timingReview",
] as const;

export async function updateLesson(lessonId: string, formData: FormData) {
  const data: Record<string, unknown> = {};

  for (const field of LESSON_FIELDS) {
    if (!formData.has(field)) continue;
    const raw = formData.get(field);
    if (typeof raw !== "string") continue;
    if (field.startsWith("timing") || field === "duration") {
      data[field] = raw === "" ? 0 : parseInt(raw, 10);
    } else {
      data[field] = raw;
    }
  }

  const vocabRaw = formData.get("vocabulary");
  if (typeof vocabRaw === "string") {
    data.vocabulary = vocabRaw
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  await prisma.lesson.update({ where: { id: lessonId }, data });

  revalidatePath(`/curriculum/${lessonId}`);
  revalidatePath("/curriculum");
  revalidatePath("/dashboard");
  redirect(`/curriculum/${lessonId}`);
}

export async function setLessonStatus(lessonId: string, status: string) {
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { status: status as never },
  });
  revalidatePath("/curriculum");
  revalidatePath("/dashboard");
  revalidatePath(`/curriculum/${lessonId}`);
}

export async function duplicateLesson(lessonId: string) {
  const original = await prisma.lesson.findUniqueOrThrow({ where: { id: lessonId } });
  const occupied = await prisma.lesson.findMany({
    where: { weekId: original.weekId },
    select: { dayOfWeek: true },
  });
  const occupiedDays = new Set(occupied.map((l) => l.dayOfWeek));
  const openDay = [1, 2, 3, 4, 5].find((d) => !occupiedDays.has(d));
  if (!openDay) throw new Error("Week is full (Mon-Fri all occupied).");

  const copy = await prisma.lesson.create({
    data: {
      weekId: original.weekId,
      lessonNumber: original.lessonNumber,
      dayOfWeek: openDay,
      title: `${original.title} (Copy)`,
      duration: original.duration,
      lessonType: original.lessonType,
      status: "PLANNED",
      orderIndex: original.orderIndex + 1,
      objective: original.objective,
      essentialQuestion: original.essentialQuestion,
      vocabulary: original.vocabulary,
      teacherPrep: original.teacherPrep,
      requiredEquipment: original.requiredEquipment,
      introduction: original.introduction,
      demonstration: original.demonstration,
      content: original.content,
      handsOnActivity: original.handsOnActivity,
      productionLab: original.productionLab,
      studentAssignmentText: original.studentAssignmentText,
      assessment: original.assessment,
      exitTicket: original.exitTicket,
      homework: original.homework,
      teacherNotes: original.teacherNotes,
      standards: original.standards,
    },
  });

  revalidatePath("/curriculum");
  return copy.id;
}

export async function deleteLesson(lessonId: string) {
  const lesson = await prisma.lesson.findUniqueOrThrow({ where: { id: lessonId } });
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath("/curriculum");
  redirect(`/curriculum#week-${lesson.weekId}`);
}

export async function moveLessonToDay(lessonId: string, dayOfWeek: number) {
  await prisma.lesson.update({ where: { id: lessonId }, data: { dayOfWeek } });
  revalidatePath("/curriculum");
  revalidatePath(`/curriculum/${lessonId}`);
}

export async function createLesson(weekId: string, dayOfWeek: number) {
  const week = await prisma.week.findUniqueOrThrow({ where: { id: weekId } });
  const maxLessonNumber = await prisma.lesson.aggregate({
    where: { week: { schoolYearId: week.schoolYearId } },
    _max: { lessonNumber: true },
  });

  const lesson = await prisma.lesson.create({
    data: {
      weekId,
      dayOfWeek,
      lessonNumber: (maxLessonNumber._max.lessonNumber ?? 0) + 1,
      title: "New Lesson",
      lessonType: "INSTRUCTION",
    },
  });

  revalidatePath("/curriculum");
  return lesson;
}
