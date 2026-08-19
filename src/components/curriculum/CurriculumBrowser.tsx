"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DAY_NAMES, LESSON_TYPE_LABELS } from "@/lib/constants";
import type { Unit, Week, Lesson } from "@/data/curriculum";

export function CurriculumBrowser({
  units,
  weeks,
  lessons,
}: {
  units: Unit[];
  weeks: Week[];
  lessons: Lesson[];
}) {
  return (
    <div className="space-y-4">
      {units.map((unit) => (
        <UnitGroup
          key={unit.number}
          unit={unit}
          weeks={weeks.filter((w) => w.unitNumber === unit.number)}
          lessons={lessons}
        />
      ))}
    </div>
  );
}

function UnitGroup({ unit, weeks, lessons }: { unit: Unit; weeks: Week[]; lessons: Lesson[] }) {
  const [open, setOpen] = useState(unit.number === 1);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-[var(--surface-2)]"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="text-sm font-semibold text-white">
            Unit {unit.number} — {unit.title}
          </span>
        </div>
        <span className="text-xs text-[var(--muted)]">{weeks.length} weeks</span>
      </button>
      {open && (
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {weeks.map((week) => (
            <WeekRow key={week.number} week={week} lessons={lessons.filter((l) => l.weekNumber === week.number)} />
          ))}
        </div>
      )}
    </div>
  );
}

function WeekRow({ week, lessons }: { week: Week; lessons: Lesson[] }) {
  const [open, setOpen] = useState(week.number === 1);

  return (
    <div id={`week-${week.number}`}>
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
        <span className="text-xs text-[var(--muted)]">
          {lessons.length > 0 ? `${lessons.length}/5 days planned` : "Not yet planned"}
        </span>
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-2 bg-[var(--background)] px-5 py-3 pl-10 sm:grid-cols-5">
          {[1, 2, 3, 4, 5].map((day) => {
            const lesson = lessons.find((l) => l.dayOfWeek === day);
            return (
              <div key={day} className="min-h-[92px]">
                {lesson ? (
                  <Link
                    href={`/curriculum/${lesson.id}`}
                    className="flex h-full flex-col justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] p-2.5 hover:border-orange-500"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-[var(--muted)]">{DAY_NAMES[day]}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs font-medium text-zinc-100">{lesson.title}</p>
                    </div>
                    <Badge className="mt-2 bg-zinc-800 text-zinc-400 w-fit">
                      {LESSON_TYPE_LABELS[lesson.lessonType]}
                    </Badge>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[var(--border)] p-2.5 text-[var(--muted)]">
                    <p className="text-[11px] font-medium">{DAY_NAMES[day]}</p>
                    <p className="text-[11px]">Not yet planned</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
