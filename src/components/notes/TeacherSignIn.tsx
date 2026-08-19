"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LogIn, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export function TeacherSignIn() {
  const { user, authChecked } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  if (!authChecked) return null;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--muted)]">Signed in as teacher</span>
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[var(--surface-2)]"
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    );
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOpen(false);
      setEmail("");
      setPassword("");
    } catch {
      setError("Sign-in failed. Check the email and password.");
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[var(--surface-2)]"
      >
        <LogIn size={13} /> Teacher Sign In
      </button>
      {open && (
        <form
          onSubmit={handleSignIn}
          className="absolute right-0 top-full z-10 mt-2 w-64 space-y-2 rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg"
        >
          <div>
            <label className="mb-1 block text-[11px] text-[var(--muted)]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-zinc-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-[var(--muted)]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-zinc-100"
            />
          </div>
          <button
            type="submit"
            disabled={signingIn}
            className="w-full rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-500 disabled:opacity-50"
          >
            {signingIn ? "Signing in…" : "Sign In"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>
      )}
    </div>
  );
}
