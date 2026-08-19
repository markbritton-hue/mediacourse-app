import Link from "next/link";
import { ASSIGNMENTS } from "@/data/assignments";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ASSIGNMENT_TYPE_LABELS } from "@/lib/constants";

export default function AssignmentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Assignments</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Written, video, audio, and production assignments tied to the curriculum.
        </p>
      </div>

      <Card>
        <CardHeader title="All Assignments" subtitle={`${ASSIGNMENTS.length} assignments`} />
        <CardBody>
          <ul className="divide-y divide-[var(--border)]">
            {ASSIGNMENTS.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <Link href={`/assignments/${a.id}`} className="text-sm font-medium text-zinc-100 hover:text-orange-400">
                    {a.title}
                  </Link>
                  <p className="text-xs text-[var(--muted)]">
                    {a.points} pts {a.weekNumber ? `· Week ${a.weekNumber}` : ""}
                  </p>
                </div>
                <Badge className="bg-zinc-800 text-zinc-300">{ASSIGNMENT_TYPE_LABELS[a.assignmentType]}</Badge>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
