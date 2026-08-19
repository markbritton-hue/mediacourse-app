import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { createStudent } from "@/lib/actions/entities";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    where: { active: true },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    include: {
      _count: { select: { productionRoles: true, portfolioItems: true, submissions: true } },
    },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Students</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Roster, skills, production roles, and portfolios.
        </p>
      </div>

      <Card>
        <CardHeader title="Add Student" />
        <CardBody>
          <form action={createStudent} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <input name="firstName" placeholder="First name" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="lastName" placeholder="Last name" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="classPeriod" placeholder="Class period" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="gradeLevel" placeholder="Grade level" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <Button type="submit" size="sm" className="col-span-2 sm:col-span-1">
              Add Student
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Roster" subtitle={`${students.length} students`} />
        <CardBody>
          {students.length === 0 ? (
            <EmptyState title="No students yet" description="Add your first student above." />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {students.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <Link href={`/students/${s.id}`} className="text-sm font-medium text-zinc-100 hover:text-orange-400">
                      {s.firstName} {s.lastName}
                    </Link>
                    <p className="text-xs text-[var(--muted)]">{s.classPeriod ?? "No period assigned"}</p>
                  </div>
                  <p className="text-xs text-[var(--muted)]">
                    {s._count.productionRoles} roles · {s._count.portfolioItems} portfolio items
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
