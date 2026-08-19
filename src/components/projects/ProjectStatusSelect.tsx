"use client";

import { useTransition } from "react";
import { updateProjectStatus } from "@/lib/actions/entities";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";

export function ProjectStatusSelect({ projectId, status }: { projectId: string; status: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateProjectStatus(projectId, e.target.value))}
      className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-zinc-100"
    >
      {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
