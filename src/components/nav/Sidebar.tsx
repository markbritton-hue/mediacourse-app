"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, Video } from "lucide-react";

const NAV_ITEMS = [
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-600">
          <Video size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-white">
            Media Production
          </p>
          <p className="text-[11px] leading-tight text-[var(--muted)]">
            Course Control Room
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-orange-600/15 text-orange-400 font-medium"
                      : "text-zinc-400 hover:bg-[var(--surface-2)] hover:text-zinc-100"
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--border)] px-4 py-3">
        <p className="text-[11px] text-[var(--muted)]">Signed in as</p>
        <p className="text-xs font-medium text-zinc-200">Teacher / Admin</p>
      </div>
    </aside>
  );
}
