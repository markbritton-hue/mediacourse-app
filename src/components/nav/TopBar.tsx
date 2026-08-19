import { Search } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
      <Link
        href="/search"
        className="flex w-80 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:border-zinc-500"
      >
        <Search size={15} />
        Search lessons, students, equipment…
      </Link>
      <div className="flex items-center gap-3">
        <span className="rounded bg-emerald-900 px-2 py-1 text-xs font-medium text-emerald-300 border border-emerald-700">
          Fall Semester · Active
        </span>
      </div>
    </header>
  );
}
