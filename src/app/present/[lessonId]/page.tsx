import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/data/curriculum";
import { PresentationView } from "@/components/presentation/PresentationView";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function PresentPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const segments = [
    { title: "Bell Work / Introduction", minutes: lesson.timing.bellwork, content: lesson.introduction ?? null },
    { title: "Instruction", minutes: lesson.timing.instruct, content: lesson.content ?? null },
    { title: "Demonstration", minutes: lesson.timing.demo, content: lesson.demonstration ?? null },
    {
      title: "Hands-On / Production Lab",
      minutes: lesson.timing.handsOn,
      content: lesson.handsOnActivity ?? lesson.productionLab ?? null,
    },
    { title: "Cleanup", minutes: lesson.timing.cleanup, content: "Return equipment, wrap cables, reset stations." },
    { title: "Review / Exit Ticket", minutes: lesson.timing.review, content: lesson.exitTicket ?? null },
  ].filter((s) => s.minutes > 0);

  const publicLesson = {
    id: lesson.id,
    title: lesson.title,
    objective: lesson.objective ?? null,
    essentialQuestion: lesson.essentialQuestion ?? null,
    vocabulary: lesson.vocabulary ?? [],
    requiredEquipment: lesson.requiredEquipment ?? null,
    exitTicket: lesson.exitTicket ?? null,
    weekNumber: lesson.weekNumber,
  };

  return <PresentationView lesson={publicLesson} segments={segments} />;
}
