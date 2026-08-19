import { UNITS, WEEKS, LESSONS } from "@/data/curriculum";
import { CurriculumBrowser } from "@/components/curriculum/CurriculumBrowser";

export default function CurriculumPage() {
  const builtOutUnits = UNITS.filter((u) =>
    WEEKS.some((w) => w.unitNumber === u.number && LESSONS.some((l) => l.weekNumber === w.number))
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Curriculum</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Media Production · {UNITS.length} units · {LESSONS.length} lessons built out so far.{" "}
          {builtOutUnits.map((u) => u.title).join(", ")} {builtOutUnits.length === 1 ? "is" : "are"}{" "}
          fully written; remaining units are planned but empty.
        </p>
      </div>

      <CurriculumBrowser units={UNITS} weeks={WEEKS} lessons={LESSONS} />
    </div>
  );
}
