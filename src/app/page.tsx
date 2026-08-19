"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/curriculum");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--background)] text-zinc-400">
      <p>
        Redirecting to{" "}
        <Link href="/curriculum" className="text-orange-400 hover:text-orange-300">
          Curriculum
        </Link>
        …
      </p>
    </div>
  );
}
