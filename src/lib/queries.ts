import { prisma } from "@/lib/prisma";

/**
 * Single-tenant helper: returns the (currently only) course + active
 * school year. Once multi-course/user support lands this becomes a
 * lookup by session/user instead of "first record".
 */
export async function getActiveCourse() {
  const course = await prisma.course.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!course) return null;

  const schoolYear = await prisma.schoolYear.findFirst({
    where: { courseId: course.id },
    orderBy: { startDate: "asc" },
  });

  return { course, schoolYear };
}

export type CurriculumWeeks = Awaited<ReturnType<typeof fetchCurriculumWeeks>>;

function fetchCurriculumWeeks(schoolYearId: string) {
  return prisma.week.findMany({
    where: { schoolYearId },
    orderBy: { number: "asc" },
    include: {
      unit: true,
      lessons: { orderBy: { dayOfWeek: "asc" } },
    },
  });
}

export async function getCurriculum() {
  const active = await getActiveCourse();
  if (!active?.schoolYear) {
    const weeks: CurriculumWeeks = [];
    return { course: null, schoolYear: null, weeks };
  }

  const weeks = await fetchCurriculumWeeks(active.schoolYear.id);

  return { course: active.course, schoolYear: active.schoolYear, weeks };
}

export async function getLesson(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      week: { include: { unit: true } },
      activities: { orderBy: { orderIndex: "asc" } },
      attachments: true,
      assignments: true,
    },
  });
}

export async function getAllLessonsOrdered() {
  const active = await getActiveCourse();
  if (!active?.schoolYear) return [];
  return prisma.lesson.findMany({
    where: { week: { schoolYearId: active.schoolYear.id } },
    include: { week: { include: { unit: true } } },
    orderBy: [{ week: { number: "asc" } }, { dayOfWeek: "asc" }],
  });
}

export async function getDashboardData() {
  const lessons = await getAllLessonsOrdered();
  const totalDays = lessons.length;
  const completedDays = lessons.filter(
    (l) => l.status === "COMPLETE" || l.status === "PARTIAL"
  ).length;

  const nextIncomplete = lessons.find(
    (l) => l.status === "PLANNED" || l.status === "RESCHEDULED"
  );
  const todaysIndex = nextIncomplete ? lessons.indexOf(nextIncomplete) : -1;
  const upcoming =
    todaysIndex >= 0 ? lessons.slice(todaysIndex + 1, todaysIndex + 6) : [];

  const activeProjects = await prisma.project.findMany({
    where: { status: { in: ["PLANNING", "PRE_PRODUCTION", "PRODUCTION", "POST_PRODUCTION"] } },
    include: { members: { include: { student: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    today: nextIncomplete ?? null,
    totalDays,
    completedDays,
    percentComplete: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
    upcoming,
    activeProjects,
  };
}
