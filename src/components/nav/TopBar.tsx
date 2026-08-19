export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
      <p className="text-sm font-medium text-zinc-300">Media Production Course</p>
      <span className="rounded bg-emerald-900 px-2 py-1 text-xs font-medium text-emerald-300 border border-emerald-700">
        Static Build · Week 1 Live
      </span>
    </header>
  );
}
