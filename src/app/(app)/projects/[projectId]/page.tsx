import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import { ProjectStatusSelect } from "@/components/projects/ProjectStatusSelect";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: { include: { student: true } } },
  });
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">{project.name}</h1>
          {project.description && <p className="mt-1 text-sm text-[var(--muted)]">{project.description}</p>}
        </div>
        <ProjectStatusSelect projectId={project.id} status={project.status} />
      </div>

      <Card>
        <CardHeader title="Production Plan" />
        <CardBody className="space-y-3">
          {project.objective && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Objective</p>
              <p className="mt-1 text-sm text-zinc-300">{project.objective}</p>
            </div>
          )}
          {project.requiredEquipment && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Required Equipment</p>
              <p className="mt-1 text-sm text-zinc-300">{project.requiredEquipment}</p>
            </div>
          )}
          {project.deliverables && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Deliverables</p>
              <p className="mt-1 text-sm text-zinc-300">{project.deliverables}</p>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Crew" />
        <CardBody>
          {project.members.length === 0 ? (
            <EmptyState title="No crew assigned yet" />
          ) : (
            <div className="flex flex-wrap gap-2">
              {project.members.map((m) => (
                <Badge key={m.id} className="bg-[var(--surface-2)] text-zinc-200">
                  {m.student.firstName} {m.student.lastName}
                </Badge>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
