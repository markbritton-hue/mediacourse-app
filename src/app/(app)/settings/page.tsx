import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FutureFeature } from "@/components/ui/EmptyState";
import { updateGradingWeights } from "@/lib/actions/entities";

export default async function SettingsPage() {
  const categories = await prisma.gradingCategory.findMany({ orderBy: { weightPct: "desc" } });
  const totalWeight = categories.reduce((sum, c) => sum + c.weightPct, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Course configuration.</p>
      </div>

      <Card>
        <CardHeader
          title="Grading Category Weights"
          subtitle={`Currently sums to ${totalWeight}%`}
        />
        <CardBody>
          <form action={updateGradingWeights} className="space-y-3">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-4">
                <label htmlFor={`weight-${c.id}`} className="text-sm text-zinc-300">{c.name}</label>
                <div className="flex items-center gap-1">
                  <input
                    id={`weight-${c.id}`}
                    name={`weight-${c.id}`}
                    type="number"
                    step="0.5"
                    defaultValue={c.weightPct}
                    className="w-20 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-zinc-100"
                  />
                  <span className="text-sm text-[var(--muted)]">%</span>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm">Save Weights</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="AI-Assisted Content Generation" />
        <CardBody className="flex flex-wrap gap-2">
          <FutureFeature label="Generate lesson plan" />
          <FutureFeature label="Generate quiz" />
          <FutureFeature label="Generate rubric" />
          <FutureFeature label="Generate troubleshooting scenario" />
          <FutureFeature label="Generate substitute lesson" />
          <FutureFeature label="Generate student feedback" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Student Access" />
        <CardBody>
          <FutureFeature label="Student login and self-service assignments (Phase 5)" />
        </CardBody>
      </Card>
    </div>
  );
}
