import { notFound } from "next/navigation";
import { getLesson } from "@/lib/queries";
import { PresentationView } from "@/components/presentation/PresentationView";

export default async function PresentPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  // Presentation Mode never receives teacher-only fields.
  const segments = [
    { title: "Bell Work / Introduction", minutes: lesson.timingBellwork, content: lesson.introduction },
    { title: "Instruction", minutes: lesson.timingInstruct, content: lesson.content },
    { title: "Demonstration", minutes: lesson.timingDemo, content: lesson.demonstration },
    { title: "Hands-On / Production Lab", minutes: lesson.timingHandsOn, content: lesson.handsOnActivity || lesson.productionLab },
    { title: "Cleanup", minutes: lesson.timingCleanup, content: "Return equipment, wrap cables, reset stations." },
    { title: "Review / Exit Ticket", minutes: lesson.timingReview, content: lesson.exitTicket },
  ].filter((s) => s.minutes > 0);

  const publicLesson = {
    id: lesson.id,
    title: lesson.title,
    objective: lesson.objective,
    essentialQuestion: lesson.essentialQuestion,
    vocabulary: lesson.vocabulary,
    requiredEquipment: lesson.requiredEquipment,
    exitTicket: lesson.exitTicket,
    weekNumber: lesson.week.number,
  };

  return <PresentationView lesson={publicLesson} segments={segments} />;
}
