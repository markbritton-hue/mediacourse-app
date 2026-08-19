"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";

type Segment = { title: string; minutes: number; content: string | null };
type PublicLesson = {
  id: string;
  title: string;
  objective: string | null;
  essentialQuestion: string | null;
  vocabulary: string[];
  requiredEquipment: string | null;
  exitTicket: string | null;
  weekNumber: number;
};

export function PresentationView({
  lesson,
  segments,
}: {
  lesson: PublicLesson;
  segments: Segment[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const current = segments[index];
  const next = segments[index + 1];

  const [secondsLeft, setSecondsLeft] = useState((current?.minutes ?? 0) * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSecondsLeft((current?.minutes ?? 0) * 60);
    setRunning(false);
  }, [index, current?.minutes]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const mm = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex h-screen w-full flex-col bg-[#0b0c0f] text-zinc-100">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-8 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Week {lesson.weekNumber} · Presentation Mode
          </p>
          <h1 className="text-2xl font-semibold text-white">{lesson.title}</h1>
        </div>
        <button
          onClick={() => router.push(`/curriculum/${lesson.id}`)}
          className="flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--surface-2)]"
        >
          <X size={16} /> End Lesson
        </button>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-6 overflow-y-auto px-8 py-6">
        <div className="col-span-2 space-y-6">
          {lesson.objective && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                Objective
              </p>
              <p className="mt-1 text-lg text-zinc-100">{lesson.objective}</p>
            </div>
          )}
          {lesson.essentialQuestion && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
                Essential Question
              </p>
              <p className="mt-1 text-lg text-zinc-100">{lesson.essentialQuestion}</p>
            </div>
          )}

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Current Activity
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {current?.title ?? "Lesson complete"}
            </h2>
            {current?.content && (
              <p className="mt-3 whitespace-pre-wrap text-base text-zinc-300">
                {current.content}
              </p>
            )}
          </div>

          {next && (
            <div className="rounded-lg border border-dashed border-[var(--border)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Next: {next.title}
              </p>
            </div>
          )}

          {lesson.vocabulary.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Vocabulary
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {lesson.vocabulary.map((v) => (
                  <span
                    key={v}
                    className="rounded bg-[var(--surface-2)] px-3 py-1 text-sm text-zinc-200"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {lesson.requiredEquipment && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Equipment Required
              </p>
              <p className="mt-1 text-zinc-300">{lesson.requiredEquipment}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Timer
            </p>
            <p className="mt-2 font-mono text-6xl font-bold text-orange-400">
              {mm}:{ss}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => setRunning((r) => !r)}
                className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500"
              >
                {running ? <Pause size={16} /> : <Play size={16} />}
                {running ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => setSecondsLeft((current?.minutes ?? 0) * 60)}
                className="flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-[var(--surface-2)]"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Lesson Segments
            </p>
            <ul className="space-y-1">
              {segments.map((s, i) => (
                <li key={s.title}>
                  <button
                    onClick={() => setIndex(i)}
                    className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-sm ${
                      i === index
                        ? "bg-orange-600/15 text-orange-400"
                        : "text-zinc-400 hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <span>{s.title}</span>
                    <span className="text-xs">{s.minutes}′</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {lesson.exitTicket && (
            <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                Exit Ticket
              </p>
              <p className="mt-1 text-sm text-zinc-200">{lesson.exitTicket}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] px-8 py-4">
        <button
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="flex items-center gap-2 rounded-md border border-[var(--border)] px-5 py-3 text-base font-medium text-zinc-200 hover:bg-[var(--surface-2)] disabled:opacity-30"
        >
          <ChevronLeft size={20} /> Previous
        </button>
        <p className="text-sm text-[var(--muted)]">
          Step {Math.min(index + 1, segments.length)} of {segments.length}
        </p>
        <button
          disabled={index >= segments.length - 1}
          onClick={() => setIndex((i) => Math.min(segments.length - 1, i + 1))}
          className="flex items-center gap-2 rounded-md bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-500 disabled:opacity-30"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
