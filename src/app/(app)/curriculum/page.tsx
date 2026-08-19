import { UNITS, WEEKS, LESSONS } from "@/data/curriculum";
import { CurriculumBrowser } from "@/components/curriculum/CurriculumBrowser";

export default function CurriculumPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Curriculum</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Media Production · 36 weeks · ~180 class periods. Week 1 is fully built out; remaining
          weeks show the planned unit structure.
        </p>
      </div>

      <CurriculumBrowser units={UNITS} weeks={WEEKS} lessons={LESSONS} />
    </div>
  );
}
