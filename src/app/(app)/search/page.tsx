import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const results =
    query.length === 0
      ? null
      : await Promise.all([
          prisma.lesson.findMany({
            where: { title: { contains: query, mode: "insensitive" } },
            take: 10,
            include: { week: true },
          }),
          prisma.student.findMany({
            where: {
              OR: [
                { firstName: { contains: query, mode: "insensitive" } },
                { lastName: { contains: query, mode: "insensitive" } },
              ],
            },
            take: 10,
          }),
          prisma.equipment.findMany({
            where: {
              OR: [
                { model: { contains: query, mode: "insensitive" } },
                { manufacturer: { contains: query, mode: "insensitive" } },
              ],
            },
            take: 10,
          }),
          prisma.assignment.findMany({
            where: { title: { contains: query, mode: "insensitive" } },
            take: 10,
          }),
          prisma.skill.findMany({
            where: { name: { contains: query, mode: "insensitive" } },
            take: 10,
          }),
          prisma.resource.findMany({
            where: { title: { contains: query, mode: "insensitive" } },
            take: 10,
          }),
        ]);

  const [lessons, students, equipment, assignments, skills, resources] = results ?? [[], [], [], [], [], []];
  const totalResults = lessons.length + students.length + equipment.length + assignments.length + skills.length + resources.length;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Search</h1>
        <form className="mt-3">
          <input
            name="q"
            defaultValue={query}
            autoFocus
            placeholder="Search lessons, vocabulary, assignments, projects, equipment, skills, students, resources…"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-zinc-100"
          />
        </form>
      </div>

      {!results ? (
        <EmptyState title="Start typing and press Enter to search" />
      ) : totalResults === 0 ? (
        <EmptyState title={`No results for "${query}"`} />
      ) : (
        <div className="space-y-4">
          {lessons.length > 0 && (
            <Card>
              <CardHeader title="Lessons" />
              <CardBody>
                <ul className="space-y-1.5">
                  {lessons.map((l) => (
                    <li key={l.id}>
                      <Link href={`/curriculum/${l.id}`} className="text-sm text-zinc-200 hover:text-orange-400">
                        {l.title} <span className="text-xs text-[var(--muted)]">— Week {l.week.number}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {students.length > 0 && (
            <Card>
              <CardHeader title="Students" />
              <CardBody>
                <ul className="space-y-1.5">
                  {students.map((s) => (
                    <li key={s.id}>
                      <Link href={`/students/${s.id}`} className="text-sm text-zinc-200 hover:text-orange-400">
                        {s.firstName} {s.lastName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {equipment.length > 0 && (
            <Card>
              <CardHeader title="Equipment" />
              <CardBody>
                <ul className="space-y-1.5">
                  {equipment.map((e) => (
                    <li key={e.id} className="text-sm text-zinc-200">
                      {e.manufacturer} {e.model}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {assignments.length > 0 && (
            <Card>
              <CardHeader title="Assignments" />
              <CardBody>
                <ul className="space-y-1.5">
                  {assignments.map((a) => (
                    <li key={a.id}>
                      <Link href={`/assignments/${a.id}`} className="text-sm text-zinc-200 hover:text-orange-400">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {skills.length > 0 && (
            <Card>
              <CardHeader title="Skills" />
              <CardBody>
                <ul className="space-y-1.5">
                  {skills.map((s) => (
                    <li key={s.id} className="text-sm text-zinc-200">{s.name}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {resources.length > 0 && (
            <Card>
              <CardHeader title="Resources" />
              <CardBody>
                <ul className="space-y-1.5">
                  {resources.map((r) => (
                    <li key={r.id} className="text-sm text-zinc-200">{r.title}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
