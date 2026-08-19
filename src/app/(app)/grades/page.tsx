import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button, LinkButton } from "@/components/ui/Button";
import { recordGrade } from "@/lib/actions/entities";

export default async function GradesPage() {
  const categories = await prisma.gradingCategory.findMany({ orderBy: { weightPct: "desc" } });
  const students = await prisma.student.findMany({ where: { active: true }, orderBy: { lastName: "asc" } });
  const totalWeight = categories.reduce((sum, c) => sum + c.weightPct, 0);

  const allGrades = await prisma.grade.findMany();

  const studentAverages = students.map((s) => {
    const grades = allGrades.filter((g) => g.studentId === s.id);
    let weightedSum = 0;
    let weightUsed = 0;
    for (const cat of categories) {
      const catGrades = grades.filter((g) => g.categoryId === cat.id);
      if (catGrades.length === 0) continue;
      const pct =
        catGrades.reduce((a, g) => a + g.pointsEarned, 0) /
        catGrades.reduce((a, g) => a + g.pointsPossible, 0);
      weightedSum += pct * cat.weightPct;
      weightUsed += cat.weightPct;
    }
    return { student: s, grade: weightUsed > 0 ? Math.round((weightedSum / weightUsed) * 100) : null };
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Grades</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Weighted categories: {categories.map((c) => `${c.name} ${c.weightPct}%`).join(" · ")}
            {totalWeight !== 100 && (
              <span className="ml-2 text-amber-400">(weights sum to {totalWeight}%)</span>
            )}
          </p>
        </div>
        <LinkButton href="/settings" variant="secondary" size="sm">Edit Weights</LinkButton>
      </div>

      <Card>
        <CardHeader title="Record a Grade" />
        <CardBody>
          {students.length === 0 || categories.length === 0 ? (
            <EmptyState title="Add students and grading categories first" />
          ) : (
            <form action={recordGrade} className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <select name="studentId" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
                {students.map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
              </select>
              <select name="categoryId" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input name="pointsEarned" type="number" step="0.1" placeholder="Points earned" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
              <input name="pointsPossible" type="number" step="0.1" placeholder="Points possible" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
              <Button type="submit" size="sm">Record</Button>
            </form>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Current Averages" />
        <CardBody>
          {studentAverages.length === 0 ? (
            <EmptyState title="No students yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {studentAverages.map(({ student, grade }) => (
                <li key={student.id} className="flex items-center justify-between py-2.5">
                  <p className="text-sm text-zinc-200">{student.firstName} {student.lastName}</p>
                  <p className="text-sm font-medium text-zinc-100">{grade !== null ? `${grade}%` : "No grades yet"}</p>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
