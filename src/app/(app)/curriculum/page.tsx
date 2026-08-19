import { getCurriculum } from "@/lib/queries";
import { CurriculumBrowser } from "@/components/curriculum/CurriculumBrowser";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function CurriculumPage() {
  const { course, weeks } = await getCurriculum();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Curriculum</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {course?.name ?? "Media Production"} · 36 weeks · ~180 class periods
        </p>
      </div>

      {weeks.length === 0 ? (
        <EmptyState
          title="No curriculum data yet"
          description="Run the database seed script to populate the 36-week curriculum structure."
        />
      ) : (
        <CurriculumBrowser weeks={weeks} />
      )}
    </div>
  );
}
