import Link from "next/link";
import { getDashboardData } from "@/lib/queries";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DAY_NAMES, LESSON_TYPE_LABELS, PROJECT_STATUS_LABELS } from "@/lib/constants";

const QUICK_ACTIONS = [
  { label: "Create Lesson", href: "/curriculum" },
  { label: "Create Assignment", href: "/assignments/new" },
  { label: "Create Project", href: "/projects/new" },
  { label: "Create Quiz", href: "/quizzes/new" },
  { label: "Create Equipment Lab", href: "/curriculum" },
  { label: "Create Skills Test", href: "/skills/tests/new" },
];

export default async function DashboardPage() {
  const { today, totalDays, completedDays, percentComplete, upcoming, activeProjects } =
    await getDashboardData();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Teacher control room — today's class, course pace, and quick actions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Today's Class" />
            <CardBody>
              {today ? (
                <>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge className="bg-zinc-800 text-zinc-300">
                      Week {today.week.number} · {DAY_NAMES[today.dayOfWeek]}
                    </Badge>
                    {today.week.unit && (
                      <Badge className="bg-zinc-800 text-zinc-300">{today.week.unit.title}</Badge>
                    )}
                    <Badge className="bg-zinc-800 text-zinc-300">
                      {LESSON_TYPE_LABELS[today.lessonType]}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{today.title}</h3>
                  {today.objective && (
                    <p className="mt-1 text-sm text-zinc-300">{today.objective}</p>
                  )}
                  {today.handsOnActivity && (
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      <span className="font-medium text-zinc-400">Today's activity: </span>
                      {today.handsOnActivity}
                    </p>
                  )}
                  {today.requiredEquipment && (
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      <span className="font-medium text-zinc-400">Equipment: </span>
                      {today.requiredEquipment}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <LinkButton href={`/present/${today.id}`} variant="primary" size="sm">
                      Start Lesson
                    </LinkButton>
                    <LinkButton href={`/curriculum/${today.id}/edit`} variant="secondary" size="sm">
                      Edit Lesson
                    </LinkButton>
                    <LinkButton href={`/curriculum/${today.id}`} variant="secondary" size="sm">
                      View Assignment
                    </LinkButton>
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No upcoming lesson found"
                  description="Every lesson in the curriculum is marked complete, or no curriculum has been seeded yet."
                  action={
                    <LinkButton href="/curriculum" variant="secondary" size="sm">
                      Open Curriculum
                    </LinkButton>
                  }
                />
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Upcoming" subtitle="Next 5 lessons" />
            <CardBody>
              {upcoming.length === 0 ? (
                <EmptyState title="Nothing scheduled next" />
              ) : (
                <ul className="divide-y divide-[var(--border)]">
                  {upcoming.map((l) => (
                    <li key={l.id} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="text-sm text-zinc-200">{l.title}</p>
                        <p className="text-xs text-[var(--muted)]">
                          Week {l.week.number} · {DAY_NAMES[l.dayOfWeek]} ·{" "}
                          {LESSON_TYPE_LABELS[l.lessonType]}
                        </p>
                      </div>
                      <Link
                        href={`/curriculum/${l.id}`}
                        className="text-xs font-medium text-orange-400 hover:text-orange-300"
                      >
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Active Projects" />
            <CardBody>
              {activeProjects.length === 0 ? (
                <EmptyState
                  title="No active projects"
                  action={
                    <LinkButton href="/projects/new" variant="secondary" size="sm">
                      Create Project
                    </LinkButton>
                  }
                />
              ) : (
                <ul className="divide-y divide-[var(--border)]">
                  {activeProjects.map((p) => (
                    <li key={p.id} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="text-sm text-zinc-200">{p.name}</p>
                        <p className="text-xs text-[var(--muted)]">
                          {p.members.length} student{p.members.length === 1 ? "" : "s"} ·{" "}
                          {PROJECT_STATUS_LABELS[p.status]}
                        </p>
                      </div>
                      <Link
                        href={`/projects/${p.id}`}
                        className="text-xs font-medium text-orange-400 hover:text-orange-300"
                      >
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Course Progress" />
            <CardBody>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                <div
                  className="h-full rounded-full bg-orange-600"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <p className="text-2xl font-semibold text-white">{percentComplete}%</p>
              <p className="text-xs text-[var(--muted)]">of course complete</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--muted)]">Days completed</dt>
                  <dd className="text-zinc-200">{completedDays}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--muted)]">Days remaining</dt>
                  <dd className="text-zinc-200">{Math.max(totalDays - completedDays, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--muted)]">Total planned days</dt>
                  <dd className="text-zinc-200">{totalDays}</dd>
                </div>
                {today && (
                  <div className="flex justify-between">
                    <dt className="text-[var(--muted)]">Current week</dt>
                    <dd className="text-zinc-200">Week {today.week.number}</dd>
                  </div>
                )}
                {today?.week.unit && (
                  <div className="flex justify-between">
                    <dt className="text-[var(--muted)]">Current unit</dt>
                    <dd className="text-zinc-200">{today.week.unit.title}</dd>
                  </div>
                )}
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Quick Actions" />
            <CardBody className="grid grid-cols-1 gap-2">
              {QUICK_ACTIONS.map((a) => (
                <LinkButton key={a.label} href={a.href} variant="secondary" size="sm" className="justify-start">
                  {a.label}
                </LinkButton>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
