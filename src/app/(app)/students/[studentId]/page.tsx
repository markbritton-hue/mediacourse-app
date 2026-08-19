import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SKILL_LEVEL_COLORS, SKILL_LEVEL_LABELS } from "@/lib/constants";
import { addStudentNote, createPortfolioItem } from "@/lib/actions/entities";

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      studentSkills: { include: { skill: { include: { category: true } } } },
      productionRoles: { include: { role: true }, orderBy: { date: "desc" } },
      portfolioItems: { orderBy: { date: "desc" } },
      grades: { include: { category: true }, orderBy: { date: "desc" } },
      teacherNotes: { orderBy: { createdAt: "desc" } },
      practicalResults: { include: { test: true } },
      submissions: { include: { assignment: true } },
    },
  });
  if (!student) notFound();

  const roleCounts = new Map<string, number>();
  for (const r of student.productionRoles) {
    roleCounts.set(r.role.name, (roleCounts.get(r.role.name) ?? 0) + 1);
  }

  const addNoteWithId = addStudentNote.bind(null, student.id);
  const addPortfolioItemWithId = createPortfolioItem.bind(null, student.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16">
      <div>
        <h1 className="text-xl font-semibold text-white">
          {student.firstName} {student.lastName}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">{student.classPeriod ?? "No period assigned"}</p>
      </div>

      <Card>
        <CardHeader title="Production Role Experience" />
        <CardBody>
          {roleCounts.size === 0 ? (
            <EmptyState title="No production roles logged yet" />
          ) : (
            <div className="flex flex-wrap gap-2">
              {Array.from(roleCounts.entries()).map(([role, count]) => (
                <Badge key={role} className="bg-[var(--surface-2)] text-zinc-200">
                  {role} · {count}
                </Badge>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Skills" />
        <CardBody>
          {student.studentSkills.length === 0 ? (
            <EmptyState title="No skills tracked yet" description="Update from the Skills matrix page." />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {student.studentSkills.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-zinc-200">{s.skill.name}</p>
                    <p className="text-xs text-[var(--muted)]">{s.skill.category.name}</p>
                  </div>
                  <Badge className={SKILL_LEVEL_COLORS[s.level]}>{SKILL_LEVEL_LABELS[s.level]}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Portfolio" />
        <CardBody className="space-y-4">
          <form action={addPortfolioItemWithId} className="grid grid-cols-1 gap-2 sm:grid-cols-4">
            <input name="title" placeholder="Title" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 sm:col-span-2" />
            <input name="studentRole" placeholder="Role" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="videoUrl" placeholder="Video URL" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="description" placeholder="Description" rows={2} className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 sm:col-span-3" />
            <Button type="submit" size="sm">Add</Button>
          </form>
          {student.portfolioItems.length === 0 ? (
            <EmptyState title="No portfolio items yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {student.portfolioItems.map((p) => (
                <li key={p.id} className="py-2">
                  <p className="text-sm text-zinc-200">{p.title}</p>
                  {p.studentRole && <p className="text-xs text-[var(--muted)]">Role: {p.studentRole}</p>}
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Grades" />
        <CardBody>
          {student.grades.length === 0 ? (
            <EmptyState title="No grades recorded yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {student.grades.map((g) => (
                <li key={g.id} className="flex items-center justify-between py-2">
                  <p className="text-sm text-zinc-200">{g.category.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {g.pointsEarned} / {g.pointsPossible}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Attendance" />
        <CardBody>
          <EmptyState title="Attendance tracking is planned functionality" description="Not yet implemented — placeholder for a future phase." />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Teacher Notes" subtitle="Never visible to students" />
        <CardBody className="space-y-4">
          <form action={addNoteWithId} className="flex gap-2">
            <input
              name="note"
              placeholder="Add a private note…"
              className="flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100"
            />
            <Button type="submit" size="sm">Add</Button>
          </form>
          {student.teacherNotes.length > 0 && (
            <ul className="space-y-2">
              {student.teacherNotes.map((n) => (
                <li key={n.id} className="rounded-md bg-[var(--surface-2)] px-3 py-2 text-sm text-zinc-300">
                  {n.note}
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
