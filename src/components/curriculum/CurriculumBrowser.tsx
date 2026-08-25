"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, NotebookText } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { Badge } from "@/components/ui/Badge";
import { LESSON_TYPE_LABELS } from "@/lib/constants";
import { db } from "@/lib/firebase";
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
  const [lessonsWithNotes, setLessonsWithNotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    return onSnapshot(collection(db, "lessonNotes"), (snap) => {
      const withNotes = new Set<string>();
      snap.forEach((doc) => {
        const data = doc.data() as { notes?: string; videoLinks?: unknown[] };
        if ((data.notes ?? "").trim() || (data.videoLinks ?? []).length > 0) {
          withNotes.add(doc.id);
        }
      });
      setLessonsWithNotes(withNotes);
    });
  }, []);

  return (
    <div className="space-y-4">
      {units.map((unit) => {
        const unitWeekNumbers = new Set(
          weeks.filter((w) => w.unitNumber === unit.number).map((w) => w.number)
        );
        const unitLessons = lessons
          .filter((l) => unitWeekNumbers.has(l.weekNumber))
          .sort((a, b) => a.lessonNumber - b.lessonNumber);

        return (
          <UnitGroup
            key={unit.number}
            unit={unit}
            lessons={unitLessons}
            lessonsWithNotes={lessonsWithNotes}
          />
        );
      })}
    </div>
  );
}

function UnitGroup({
  unit,
  lessons,
  lessonsWithNotes,
}: {
  unit: Unit;
  lessons: Lesson[];
  lessonsWithNotes: Set<string>;
}) {
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
        <span className="text-xs text-[var(--muted)]">
          {lessons.length > 0 ? `${lessons.length} lessons` : "No lessons yet"}
        </span>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] px-5 py-3">
          {lessons.length === 0 ? (
            <p className="py-3 text-sm text-[var(--muted)]">No lessons added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/curriculum/${lesson.id}`}
                  className="flex flex-col justify-between rounded-md border border-[var(--border)] bg-[var(--background)] p-3 hover:border-orange-500"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-medium text-[var(--muted)]">
                        Lesson {lesson.lessonNumber}
                      </p>
                      {lessonsWithNotes.has(lesson.id) && (
                        <span
                          title="Has teacher notes"
                          className="flex items-center gap-1 rounded-full bg-orange-600/15 px-1.5 py-0.5 text-[10px] font-medium text-orange-400"
                        >
                          <NotebookText size={10} />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm font-medium text-zinc-100">
                      {lesson.title}
                    </p>
                  </div>
                  <Badge className="mt-2 bg-zinc-800 text-zinc-400 w-fit">
                    {LESSON_TYPE_LABELS[lesson.lessonType]}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
