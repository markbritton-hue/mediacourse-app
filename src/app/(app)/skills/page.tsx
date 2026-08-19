import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkillMatrix } from "@/components/skills/SkillMatrix";

export default async function SkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { orderIndex: "asc" },
    include: { skills: { orderBy: { orderIndex: "asc" } } },
  });
  const students = await prisma.student.findMany({
    where: { active: true },
    orderBy: [{ lastName: "asc" }],
  });
  const studentSkills = await prisma.studentSkill.findMany();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Skills Matrix</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Track camera, audio, live production, streaming, and editing skills per student.
        </p>
      </div>

      {students.length === 0 || categories.length === 0 ? (
        <EmptyState title="Add students and seed skill categories to use the matrix" />
      ) : (
        categories.map((cat) => (
          <Card key={cat.id}>
            <CardHeader title={cat.name} />
            <CardBody className="overflow-x-auto">
              <SkillMatrix
                skills={cat.skills}
                students={students}
                studentSkills={studentSkills.filter((ss) =>
                  cat.skills.some((sk) => sk.id === ss.skillId)
                )}
              />
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
