import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { createResource } from "@/lib/actions/entities";

const KINDS = ["PDF", "VIDEO_LINK", "WEBSITE_LINK", "DOCUMENT", "IMAGE", "DIAGRAM", "TEACHER_NOTES"];
const CATEGORIES = ["Camera", "Audio", "Lighting", "Editing", "Streaming", "NDI", "SRT", "RTMP", "Networking", "Sports Production", "Broadcasting", "Graphics", "Troubleshooting"];

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Resources</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Reference library for camera, audio, editing, streaming, and more.</p>
      </div>

      <Card>
        <CardHeader title="Add Resource" />
        <CardBody>
          <form action={createResource} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <input name="title" placeholder="Title" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 sm:col-span-2" />
            <select name="category" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select name="kind" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
              {KINDS.map((k) => <option key={k} value={k}>{k.replace(/_/g, " ")}</option>)}
            </select>
            <input name="url" placeholder="URL (optional)" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 sm:col-span-3" />
            <Button type="submit" size="sm">Add</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Library" subtitle={`${resources.length} resources`} />
        <CardBody>
          {resources.length === 0 ? (
            <EmptyState title="No resources yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {resources.map((r) => (
                <li key={r.id} className="flex items-center justify-between py-2.5">
                  <div>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-100 hover:text-orange-400">
                        {r.title}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-zinc-100">{r.title}</p>
                    )}
                    <p className="text-xs text-[var(--muted)]">{r.category}</p>
                  </div>
                  <Badge className="bg-zinc-800 text-zinc-300">{r.kind.replace(/_/g, " ")}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
