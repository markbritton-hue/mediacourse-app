import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { members: { include: { student: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Student projects and production crews.</p>
        </div>
        <LinkButton href="/projects/new">Create Project</LinkButton>
      </div>

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" action={<LinkButton href="/projects/new" size="sm">Create Project</LinkButton>} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardBody>
                <div className="mb-2 flex items-start justify-between">
                  <Link href={`/projects/${p.id}`} className="text-sm font-semibold text-zinc-100 hover:text-orange-400">
                    {p.name}
                  </Link>
                  <Badge className="bg-zinc-800 text-zinc-300">{PROJECT_STATUS_LABELS[p.status]}</Badge>
                </div>
                {p.description && <p className="text-xs text-[var(--muted)]">{p.description}</p>}
                <p className="mt-2 text-xs text-[var(--muted)]">{p.members.length} crew member(s)</p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
