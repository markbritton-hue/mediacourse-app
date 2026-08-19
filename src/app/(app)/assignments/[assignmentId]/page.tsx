import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: { submissions: { include: { student: true } } },
  });
  if (!assignment) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">{assignment.title}</h1>
        <div className="mt-2 flex gap-2">
          <Badge className="bg-zinc-800 text-zinc-300">{assignment.assignmentType}</Badge>
          <Badge className="bg-zinc-800 text-zinc-300">{assignment.points} pts</Badge>
          {assignment.dueDate && (
            <Badge className="bg-zinc-800 text-zinc-300">Due {assignment.dueDate.toLocaleDateString()}</Badge>
          )}
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

      <Card>
        <CardHeader title="Submissions" subtitle="Student submission portal is planned for Phase 5" />
        <CardBody>
          {assignment.submissions.length === 0 ? (
            <EmptyState title="No submissions yet" description="Student login and submission workflow ships in a later phase." />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {assignment.submissions.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2">
                  <p className="text-sm text-zinc-200">
                    {s.student.firstName} {s.student.lastName}
                  </p>
                  <Badge className="bg-zinc-800 text-zinc-300">{s.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
