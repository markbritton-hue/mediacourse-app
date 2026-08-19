"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  DAY_NAMES,
  LESSON_STATUS_COLORS,
  LESSON_STATUS_LABELS,
  LESSON_TYPE_LABELS,
} from "@/lib/constants";
import type { CurriculumWeeks } from "@/lib/queries";

type Weeks = CurriculumWeeks;

export function CurriculumBrowser({ weeks }: { weeks: Weeks }) {
  // group by unit, preserving week order
  const groups: { unitId: string | null; unitTitle: string; unitNumber: number | null; weeks: Weeks }[] = [];
  for (const week of weeks) {
    const unitId = week.unitId;
    const last = groups[groups.length - 1];
    if (last && last.unitId === unitId) {
      last.weeks.push(week);
    } else {
      groups.push({
        unitId,
        unitTitle: week.unit?.title ?? "Unassigned",
        unitNumber: week.unit?.number ?? null,
        weeks: [week],
      });
    }
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <UnitGroup key={`${group.unitId}-${group.weeks[0].id}`} group={group} />
      ))}
    </div>
  );
}

function UnitGroup({
  group,
}: {
  group: { unitTitle: string; unitNumber: number | null; weeks: Weeks };
}) {
  const [open, setOpen] = useState(group.unitNumber === 1);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-[var(--surface-2)]"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="text-sm font-semibold text-white">
            {group.unitNumber ? `Unit ${group.unitNumber} — ` : ""}
            {group.unitTitle}
          </span>
        </div>
        <span className="text-xs text-[var(--muted)]">{group.weeks.length} weeks</span>
      </button>
      {open && (
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {group.weeks.map((week) => (
            <WeekRow key={week.id} week={week} />
          ))}
        </div>
      )}
    </div>
  );
}

function WeekRow({ week }: { week: Weeks[number] }) {
  const [open, setOpen] = useState(week.number === 1);

  return (
    <div id={`week-${week.id}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-2.5 pl-10 text-left hover:bg-[var(--surface-2)]"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="text-sm text-zinc-200">
            Week {week.number}
            {week.title ? ` — ${week.title}` : ""}
          </span>
        </div>
        <span className="text-xs text-[var(--muted)]">{week.lessons.length}/5 days planned</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-2 bg-[var(--background)] px-5 py-3 pl-10 sm:grid-cols-5">
          {[1, 2, 3, 4, 5].map((day) => {
            const lesson = week.lessons.find((l) => l.dayOfWeek === day);
            return (
              <div key={day} className="min-h-[92px]">
                {lesson ? (
                  <Link
                    href={`/curriculum/${lesson.id}`}
                    className="flex h-full flex-col justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] p-2.5 hover:border-orange-500"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-[var(--muted)]">
                        {DAY_NAMES[day]}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs font-medium text-zinc-100">
                        {lesson.title}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      <Badge className="bg-zinc-800 text-zinc-400">
                        {LESSON_TYPE_LABELS[lesson.lessonType]}
                      </Badge>
                      <Badge className={LESSON_STATUS_COLORS[lesson.status]}>
                        {LESSON_STATUS_LABELS[lesson.status]}
                      </Badge>
                    </div>
                  </Link>
                ) : (
                  <EmptyDaySlot weekId={week.id} day={day} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyDaySlot({ weekId, day }: { weekId: string; day: number }) {
  return (
    <form
      action={`/api/lessons/create`}
      method="POST"
      className="flex h-full flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[var(--border)] p-2.5 text-[var(--muted)] hover:border-zinc-500 hover:text-zinc-300"
    >
      <input type="hidden" name="weekId" value={weekId} />
      <input type="hidden" name="dayOfWeek" value={day} />
      <p className="text-[11px] font-medium">{DAY_NAMES[day]}</p>
      <button type="submit" className="flex items-center gap-1 text-xs">
        <Plus size={12} /> Add lesson
      </button>
    </form>
  );
}
