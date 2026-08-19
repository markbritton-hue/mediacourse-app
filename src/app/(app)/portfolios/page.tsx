import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function PortfoliosPage() {
  const students = await prisma.student.findMany({
    where: { active: true },
    orderBy: { lastName: "asc" },
    include: { portfolioItems: { orderBy: { date: "desc" } } },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Student Portfolios</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Portfolio items are added from each student's profile page.
        </p>
      </div>

      {students.length === 0 ? (
        <EmptyState title="No students yet" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {students.map((s) => (
            <Card key={s.id}>
              <CardHeader
                title={`${s.firstName} ${s.lastName}`}
                subtitle={`${s.portfolioItems.length} item(s)`}
              />
              <CardBody>
                {s.portfolioItems.length === 0 ? (
                  <EmptyState title="No portfolio items yet" />
                ) : (
                  <ul className="space-y-1">
                    {s.portfolioItems.slice(0, 3).map((p) => (
                      <li key={p.id} className="text-sm text-zinc-300">
                        {p.title}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/students/${s.id}`} className="mt-2 inline-block text-xs font-medium text-orange-400 hover:text-orange-300">
                  View profile
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
