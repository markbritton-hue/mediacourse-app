"use server";

import { prisma } from "@/lib/prisma";
import { getActiveCourse } from "@/lib/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function createStudent(formData: FormData) {
  const firstName = str(formData, "firstName");
  const lastName = str(formData, "lastName");
  if (!firstName || !lastName) throw new Error("First and last name are required.");

  const active = await getActiveCourse();
  const student = await prisma.student.create({
    data: {
      firstName,
      lastName,
      classPeriod: str(formData, "classPeriod"),
      gradeLevel: str(formData, "gradeLevel"),
    },
  });
  if (active?.course) {
    await prisma.courseEnrollment.create({
      data: { courseId: active.course.id, studentId: student.id },
    });
  }
  revalidatePath("/students");
  redirect(`/students/${student.id}`);
}

export async function addStudentNote(studentId: string, formData: FormData) {
  const note = str(formData, "note");
  if (!note) return;
  await prisma.studentNote.create({ data: { studentId, note } });
  revalidatePath(`/students/${studentId}`);
}

export async function createAssignment(formData: FormData) {
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required.");

  const assignment = await prisma.assignment.create({
    data: {
      title,
      description: str(formData, "description"),
      instructions: str(formData, "instructions"),
      dueDate: str(formData, "dueDate") ? new Date(str(formData, "dueDate")!) : null,
      points: parseInt(str(formData, "points") ?? "100", 10),
      assignmentType: (str(formData, "assignmentType") ?? "WRITTEN") as never,
      submissionRequired: formData.get("submissionRequired") === "on",
    },
  });
  revalidatePath("/assignments");
  redirect(`/assignments/${assignment.id}`);
}

export async function createProject(formData: FormData) {
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required.");

  const project = await prisma.project.create({
    data: {
      name,
      description: str(formData, "description"),
      objective: str(formData, "objective"),
      dueDate: str(formData, "dueDate") ? new Date(str(formData, "dueDate")!) : null,
      deliverables: str(formData, "deliverables"),
      requiredEquipment: str(formData, "requiredEquipment"),
    },
  });
  revalidatePath("/projects");
  redirect(`/projects/${project.id}`);
}

export async function updateProjectStatus(projectId: string, status: string) {
  await prisma.project.update({ where: { id: projectId }, data: { status: status as never } });
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
}

export async function createEquipment(formData: FormData) {
  const manufacturer = str(formData, "manufacturer");
  const model = str(formData, "model");
  const category = str(formData, "category");
  if (!manufacturer || !model || !category) throw new Error("Manufacturer, model, and category are required.");

  const active = await getActiveCourse();
  if (!active?.course) throw new Error("No active course.");

  await prisma.equipment.create({
    data: {
      courseId: active.course.id,
      manufacturer,
      model,
      category: category as never,
      quantity: parseInt(str(formData, "quantity") ?? "1", 10),
      assetNumber: str(formData, "assetNumber"),
      location: str(formData, "location"),
      notes: str(formData, "notes"),
    },
  });
  revalidatePath("/equipment");
}

export async function updateEquipmentStatus(equipmentId: string, status: string) {
  await prisma.equipment.update({ where: { id: equipmentId }, data: { status: status as never } });
  revalidatePath("/equipment");
}

export async function createResource(formData: FormData) {
  const title = str(formData, "title");
  const category = str(formData, "category");
  const kind = str(formData, "kind");
  if (!title || !category || !kind) throw new Error("Title, category, and kind are required.");

  const active = await getActiveCourse();
  if (!active?.course) throw new Error("No active course.");

  await prisma.resource.create({
    data: {
      courseId: active.course.id,
      title,
      category,
      kind: kind as never,
      url: str(formData, "url"),
      notes: str(formData, "notes"),
    },
  });
  revalidatePath("/resources");
}

export async function setStudentSkillLevel(
  studentId: string,
  skillId: string,
  level: string
) {
  await prisma.studentSkill.upsert({
    where: { studentId_skillId: { studentId, skillId } },
    update: { level: level as never, dateAchieved: level === "NOT_INTRODUCED" ? null : new Date() },
    create: { studentId, skillId, level: level as never, dateAchieved: level === "NOT_INTRODUCED" ? null : new Date() },
  });
  revalidatePath("/skills");
  revalidatePath(`/students/${studentId}`);
}

export async function logProductionRole(formData: FormData) {
  const studentId = str(formData, "studentId");
  const roleId = str(formData, "roleId");
  if (!studentId || !roleId) throw new Error("Student and role are required.");

  await prisma.studentProductionRole.create({
    data: { studentId, roleId, notes: str(formData, "notes") },
  });
  revalidatePath("/roles");
  revalidatePath(`/students/${studentId}`);
}

export async function updateGradingWeights(formData: FormData) {
  const entries = Array.from(formData.entries()).filter(([k]) => k.startsWith("weight-"));
  for (const [key, value] of entries) {
    const id = key.replace("weight-", "");
    const weightPct = parseFloat(String(value));
    if (!Number.isNaN(weightPct)) {
      await prisma.gradingCategory.update({ where: { id }, data: { weightPct } });
    }
  }
  revalidatePath("/settings");
  revalidatePath("/grades");
}

export async function recordGrade(formData: FormData) {
  const studentId = str(formData, "studentId");
  const categoryId = str(formData, "categoryId");
  const pointsEarned = str(formData, "pointsEarned");
  const pointsPossible = str(formData, "pointsPossible");
  if (!studentId || !categoryId || !pointsEarned || !pointsPossible) {
    throw new Error("Student, category, and points are required.");
  }
  await prisma.grade.create({
    data: {
      studentId,
      categoryId,
      pointsEarned: parseFloat(pointsEarned),
      pointsPossible: parseFloat(pointsPossible),
      comments: str(formData, "comments"),
    },
  });
  revalidatePath("/grades");
  revalidatePath(`/students/${studentId}`);
}

export async function createPortfolioItem(studentId: string, formData: FormData) {
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required.");
  await prisma.portfolioItem.create({
    data: {
      studentId,
      title,
      description: str(formData, "description"),
      videoUrl: str(formData, "videoUrl"),
      studentRole: str(formData, "studentRole"),
    },
  });
  revalidatePath("/portfolios");
  revalidatePath(`/students/${studentId}`);
}

export async function createCalendarEvent(formData: FormData) {
  const title = str(formData, "title");
  const date = str(formData, "date");
  const type = str(formData, "type");
  if (!title || !date || !type) throw new Error("Title, date, and type are required.");

  const active = await getActiveCourse();
  if (!active?.schoolYear) throw new Error("No active school year.");

  await prisma.calendarEvent.create({
    data: {
      schoolYearId: active.schoolYear.id,
      title,
      date: new Date(date),
      type: type as never,
      notes: str(formData, "notes"),
    },
  });
  revalidatePath("/calendar");
}
