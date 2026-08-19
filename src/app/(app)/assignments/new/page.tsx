import { createAssignment } from "@/lib/actions/entities";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";

const TYPES = ["WRITTEN", "VIDEO", "AUDIO", "PHOTOGRAPHY", "EDITING", "PRODUCTION", "RESEARCH", "REFLECTION"];

export default function NewAssignmentPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-xl font-semibold text-white">Create Assignment</h1>
      <Card>
        <CardHeader title="Assignment Details" />
        <CardBody>
          <form action={createAssignment} className="space-y-4">
            <input name="title" placeholder="Assignment name" required className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="description" placeholder="Description" rows={2} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <textarea name="instructions" placeholder="Instructions" rows={3} className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <div className="grid grid-cols-3 gap-3">
              <input name="dueDate" type="date" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
              <input name="points" type="number" defaultValue={100} className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
              <select name="assignmentType" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" name="submissionRequired" defaultChecked /> Requires student submission
            </label>
            <div className="flex justify-end gap-2">
              <LinkButton href="/assignments" variant="secondary">Cancel</LinkButton>
              <Button type="submit">Create Assignment</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
