import { TeacherSignIn } from "@/components/notes/TeacherSignIn";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
      <p className="text-sm font-medium text-zinc-300">Media Production Course</p>
      <TeacherSignIn />
    </header>
  );
}
