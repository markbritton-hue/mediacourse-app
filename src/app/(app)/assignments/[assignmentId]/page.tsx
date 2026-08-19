import { notFound } from "next/navigation";
import Link from "next/link";
import { ASSIGNMENTS, getAssignment } from "@/data/assignments";
import { getLesson } from "@/data/curriculum";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ASSIGNMENT_TYPE_LABELS } from "@/lib/constants";

export function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({ assignmentId: a.id }));
}

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  const assignment = getAssignment(assignmentId);
  if (!assignment) notFound();

  const lesson = assignment.lessonId ? getLesson(assignment.lessonId) : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">{assignment.title}</h1>
        <div className="mt-2 flex gap-2">
          <Badge className="bg-zinc-800 text-zinc-300">{ASSIGNMENT_TYPE_LABELS[assignment.assignmentType]}</Badge>
          <Badge className="bg-zinc-800 text-zinc-300">{assignment.points} pts</Badge>
        </div>
      </div>

      <Card>
        <CardHeader title="Details" />
        <CardBody className="space-y-3">
          {assignment.description && <p className="text-sm text-zinc-300">{assignment.description}</p>}
          {assignment.instructions && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Instructions</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-300">{assignment.instructions}</p>
            </div>
          )}
        </CardBody>
      </Card>

      {lesson && (
        <Card>
          <CardHeader title="From Lesson" />
          <CardBody>
            <Link href={`/curriculum/${lesson.id}`} className="text-sm text-orange-400 hover:text-orange-300">
              Week {lesson.weekNumber} — {lesson.title}
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
