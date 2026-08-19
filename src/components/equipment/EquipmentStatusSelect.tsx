"use client";

import { useTransition } from "react";
import { updateEquipmentStatus } from "@/lib/actions/entities";

const STATUSES = ["AVAILABLE", "CHECKED_OUT", "IN_USE", "NEEDS_REPAIR", "RETIRED"];

export function EquipmentStatusSelect({ equipmentId, status }: { equipmentId: string; status: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateEquipmentStatus(equipmentId, e.target.value))}
      className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 text-xs text-zinc-100"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}
