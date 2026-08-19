import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function AssignmentsPage() {
  const assignments = await prisma.assignment.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { submissions: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Assignments</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Written, video, audio, and production assignments.</p>
        </div>
        <LinkButton href="/assignments/new">Create Assignment</LinkButton>
      </div>

      <Card>
        <CardBody>
          {assignments.length === 0 ? (
            <EmptyState title="No assignments yet" action={<LinkButton href="/assignments/new" size="sm">Create Assignment</LinkButton>} />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {assignments.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/assignments/${a.id}`} className="text-sm font-medium text-zinc-100 hover:text-orange-400">
                      {a.title}
                    </Link>
                    <p className="text-xs text-[var(--muted)]">
                      {a.points} pts {a.dueDate ? `· Due ${a.dueDate.toLocaleDateString()}` : ""}
                    </p>
                  </div>
                  <Badge className="bg-zinc-800 text-zinc-300">{a.assignmentType}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
