"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { setLessonStatus, duplicateLesson, deleteLesson } from "@/lib/actions/lessons";

export function LessonActionsBar({
  lessonId,
  status,
}: {
  lessonId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <span className="text-xs text-[var(--muted)] mr-1">Mark:</span>
      <Button
        size="sm"
        variant={status === "COMPLETE" ? "primary" : "secondary"}
        disabled={isPending}
        onClick={() => startTransition(() => setLessonStatus(lessonId, "COMPLETE"))}
      >
        Complete
      </Button>
      <Button
        size="sm"
        variant={status === "PARTIAL" ? "primary" : "secondary"}
        disabled={isPending}
        onClick={() => startTransition(() => setLessonStatus(lessonId, "PARTIAL"))}
      >
        Partially Complete
      </Button>
      <Button
        size="sm"
        variant={status === "SKIPPED" ? "primary" : "secondary"}
        disabled={isPending}
        onClick={() => startTransition(() => setLessonStatus(lessonId, "SKIPPED"))}
      >
        Skip
      </Button>
      <Button
        size="sm"
        variant="secondary"
        disabled={isPending}
        onClick={() => startTransition(() => setLessonStatus(lessonId, "PLANNED"))}
      >
        Reset to Planned
      </Button>

      <span className="ml-auto flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              const newId = await duplicateLesson(lessonId);
              router.push(`/curriculum/${newId}/edit`);
            })
          }
        >
          Duplicate
        </Button>
        <Button
          size="sm"
          variant="danger"
          disabled={isPending}
          onClick={() => {
            if (confirm("Delete this lesson? This cannot be undone.")) {
              startTransition(() => deleteLesson(lessonId));
            }
          }}
        >
          Delete
        </Button>
      </span>
    </div>
  );
}
