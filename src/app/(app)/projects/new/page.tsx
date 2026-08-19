import { createProject } from "@/lib/actions/entities";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-xl font-semibold text-white">Create Project</h1>
      <Card>
        <CardHeader title="Project Details" />
        <CardBody>
          <form action={createProject} className="space-y-4">
            <input name="name" placeholder="Project name" required className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="description" placeholder="Description" rows={2} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="objective" placeholder="Objective" rows={2} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="dueDate" type="date" className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="requiredEquipment" placeholder="Required equipment" rows={2} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="deliverables" placeholder="Deliverables" rows={2} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <div className="flex justify-end gap-2">
              <LinkButton href="/projects" variant="secondary">Cancel</LinkButton>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
