import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { createCalendarEvent } from "@/lib/actions/entities";

const TYPES = ["LESSON", "PROJECT_DUE", "PRODUCTION", "TEST", "SCHOOL_EVENT", "CANCELLATION", "SPECIAL_EVENT", "PRODUCTION_DAY"];

export default async function CalendarPage() {
  const events = await prisma.calendarEvent.findMany({ orderBy: { date: "asc" } });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Calendar</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          School-year events, due dates, productions, and cancellations. Lessons are scheduled from the Curriculum page.
        </p>
      </div>

      <Card>
        <CardHeader title="Add Event" />
        <CardBody>
          <form action={createCalendarEvent} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <input name="title" placeholder="Title" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 sm:col-span-2" />
            <input name="date" type="date" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <select name="type" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
              {TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
            </select>
            <Button type="submit" size="sm">Add Event</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Upcoming Events" />
        <CardBody>
          {events.length === 0 ? (
            <EmptyState title="No calendar events yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {events.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm text-zinc-200">{e.title}</p>
                    <p className="text-xs text-[var(--muted)]">{e.date.toLocaleDateString()}</p>
                  </div>
                  <Badge className="bg-zinc-800 text-zinc-300">{e.type.replace(/_/g, " ")}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
