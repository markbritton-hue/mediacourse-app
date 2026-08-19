"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

interface VideoLink {
  title: string;
  url: string;
}

interface NotesDoc {
  notes: string;
  videoLinks: VideoLink[];
}

const EMPTY: NotesDoc = { notes: "", videoLinks: [] };

export function LessonNotes({ lessonId }: { lessonId: string }) {
  const { user, authChecked } = useAuth();
  const [saved, setSaved] = useState<NotesDoc>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<NotesDoc>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, "lessonNotes", lessonId), (snap) => {
      const data = snap.data() as Partial<NotesDoc> | undefined;
      setSaved({
        notes: data?.notes ?? "",
        videoLinks: data?.videoLinks ?? [],
      });
      setLoaded(true);
    });
  }, [lessonId]);

  function startEditing() {
    setDraft(saved);
    setEditing(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await setDoc(
        doc(db, "lessonNotes", lessonId),
        {
          notes: draft.notes,
          videoLinks: draft.videoLinks.filter((l) => l.title.trim() || l.url.trim()),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader
        title="Teacher Notes & Video Links"
        subtitle="Visible to anyone viewing this lesson"
        action={
          authChecked && user && !editing ? (
            <button
              onClick={startEditing}
              className="flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[var(--surface-2)]"
            >
              <Pencil size={13} /> Edit
            </button>
          ) : undefined
        }
      />
      <CardBody className="space-y-4">
        {!loaded ? (
          <p className="text-sm text-[var(--muted)]">Loading…</p>
        ) : editing ? (
          <EditForm
            draft={draft}
            setDraft={setDraft}
            onCancel={() => setEditing(false)}
            onSave={handleSave}
            saving={saving}
          />
        ) : (
          <ReadView notes={saved} />
        )}
      </CardBody>
    </Card>
  );
}

function ReadView({ notes }: { notes: NotesDoc }) {
  const hasNotes = notes.notes.trim().length > 0;
  const hasLinks = notes.videoLinks.length > 0;

  if (!hasNotes && !hasLinks) {
    return <p className="text-sm text-[var(--muted)]">No notes or video links added yet.</p>;
  }

  return (
    <div className="space-y-4">
      {hasNotes && (
        <p className="whitespace-pre-wrap text-sm text-zinc-200">{notes.notes}</p>
      )}
      {hasLinks && (
        <ul className="space-y-1.5">
          {notes.videoLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-orange-400 hover:text-orange-300 hover:underline"
              >
                {link.title || link.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditForm({
  draft,
  setDraft,
  onCancel,
  onSave,
  saving,
}: {
  draft: NotesDoc;
  setDraft: (d: NotesDoc) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  function updateLink(i: number, field: keyof VideoLink, value: string) {
    const next = [...draft.videoLinks];
    next[i] = { ...next[i], [field]: value };
    setDraft({ ...draft, videoLinks: next });
  }

  function removeLink(i: number) {
    setDraft({ ...draft, videoLinks: draft.videoLinks.filter((_, idx) => idx !== i) });
  }

  function addLink() {
    setDraft({ ...draft, videoLinks: [...draft.videoLinks, { title: "", url: "" }] });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Notes
        </label>
        <textarea
          rows={4}
          value={draft.notes}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
          placeholder="Notes for this lesson…"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Video Links
        </label>
        <div className="space-y-2">
          {draft.videoLinks.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={link.title}
                onChange={(e) => updateLink(i, "title", e.target.value)}
                placeholder="Title"
                className="w-40 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-zinc-100"
              />
              <input
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                placeholder="https://…"
                className="flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-zinc-100"
              />
              <button
                onClick={() => removeLink(i)}
                className="rounded-md border border-[var(--border)] px-2 text-zinc-400 hover:bg-[var(--surface-2)]"
                aria-label="Remove link"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLink}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300"
        >
          <Plus size={13} /> Add video link
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-zinc-300 hover:bg-[var(--surface-2)]"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-500 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
