import { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--border)] px-6 py-12 text-center">
      <p className="text-sm font-medium text-zinc-300">{title}</p>
      {description && (
        <p className="max-w-md text-xs text-[var(--muted)]">{description}</p>
      )}
      {action}
    </div>
  );
}

export function FutureFeature({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-zinc-600 px-2 py-0.5 text-[11px] font-medium text-zinc-500">
      Planned: {label}
    </span>
  );
}
