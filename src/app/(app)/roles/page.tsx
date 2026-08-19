import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { logProductionRole } from "@/lib/actions/entities";

export default async function RolesPage() {
  const roles = await prisma.productionRoleDef.findMany({ orderBy: { name: "asc" } });
  const students = await prisma.student.findMany({ where: { active: true }, orderBy: { lastName: "asc" } });
  const assignments = await prisma.studentProductionRole.findMany({
    include: { student: true, role: true },
    orderBy: { date: "desc" },
    take: 25,
  });

  const rolesByStudent = new Map<string, Map<string, number>>();
  for (const a of assignments) {
    const key = `${a.student.firstName} ${a.student.lastName}`;
    if (!rolesByStudent.has(key)) rolesByStudent.set(key, new Map());
    const m = rolesByStudent.get(key)!;
    m.set(a.role.name, (m.get(a.role.name) ?? 0) + 1);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Production Roles</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Log crew roles performed on productions and track experience across the year.
        </p>
      </div>

      <Card>
        <CardHeader title="Log a Role" />
        <CardBody>
          {students.length === 0 || roles.length === 0 ? (
            <EmptyState title="Add students first to log roles" />
          ) : (
            <form action={logProductionRole} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <select name="studentId" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                ))}
              </select>
              <select name="roleId" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <input name="notes" placeholder="Notes (optional)" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
              <Button type="submit" size="sm">Log Role</Button>
            </form>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Role Experience by Student" />
        <CardBody>
          {rolesByStudent.size === 0 ? (
            <EmptyState title="No roles logged yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {Array.from(rolesByStudent.entries()).map(([name, roleMap]) => (
                <li key={name} className="py-2.5">
                  <p className="text-sm font-medium text-zinc-100">{name}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {Array.from(roleMap.entries())
                      .map(([r, c]) => `${r} — ${c}`)
                      .join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
