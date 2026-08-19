import { notFound } from "next/navigation";
import Link from "next/link";
import { LESSONS, getLesson, getUnit, getWeek } from "@/data/curriculum";
import { ASSIGNMENTS } from "@/data/assignments";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DAY_NAMES, LESSON_TYPE_LABELS } from "@/lib/constants";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-200">{value}</p>
    </div>
  );
}

export default async function LessonViewerPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const week = getWeek(lesson.weekNumber);
  const unit = week ? getUnit(week.unitNumber) : undefined;
  const relatedAssignments = ASSIGNMENTS.filter((a) => a.lessonId === lesson.id);

  const timing = [
    { label: "Bell work / Intro", minutes: lesson.timing.bellwork },
    { label: "Instruction", minutes: lesson.timing.instruct },
    { label: "Demonstration", minutes: lesson.timing.demo },
    { label: "Hands-on / Production", minutes: lesson.timing.handsOn },
    { label: "Cleanup", minutes: lesson.timing.cleanup },
    { label: "Review / Exit Ticket", minutes: lesson.timing.review },
  ];

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-1 flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/curriculum" className="hover:text-zinc-200">
          Curriculum
        </Link>
        <span>/</span>
        <span>
          Week {lesson.weekNumber} · {DAY_NAMES[lesson.dayOfWeek]}
        </span>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">{lesson.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-zinc-800 text-zinc-300">Lesson {lesson.lessonNumber}</Badge>
            <Badge className="bg-zinc-800 text-zinc-300">{LESSON_TYPE_LABELS[lesson.lessonType]}</Badge>
            <Badge className="bg-zinc-800 text-zinc-300">{lesson.duration} min</Badge>
            {unit && <Badge className="bg-zinc-800 text-zinc-300">{unit.title}</Badge>}
          </div>
        </div>
        <LinkButton href={`/present/${lesson.id}`} variant="primary">
          Start Lesson
        </LinkButton>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader title="Overview" />
          <CardBody className="space-y-4">
            <Field label="Objective" value={lesson.objective} />
            <Field label="Essential Question" value={lesson.essentialQuestion} />
            {lesson.vocabulary && lesson.vocabulary.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Vocabulary</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {lesson.vocabulary.map((v) => (
                    <Badge key={v} className="bg-[var(--surface-2)] text-zinc-300">
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <Field label="Required Equipment" value={lesson.requiredEquipment} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="60-Minute Structure" subtitle={`Total: ${timing.reduce((a, t) => a + t.minutes, 0)} min`} />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {timing.map((t) => (
                <div key={t.label} className="flex-1 min-w-[120px] rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-3 text-center">
                  <p className="text-lg font-semibold text-orange-400">{t.minutes}′</p>
                  <p className="mt-0.5 text-[11px] text-[var(--muted)]">{t.label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Lesson Flow" />
          <CardBody className="space-y-4">
            <Field label="Teacher Preparation" value={lesson.teacherPrep} />
            <Field label="Introduction / Bell Work" value={lesson.introduction} />
            <Field label="Instructor Demonstration" value={lesson.demonstration} />
            <Field label="Lesson Content" value={lesson.content} />
            <Field label="Hands-On Activity" value={lesson.handsOnActivity} />
            <Field label="Production Lab" value={lesson.productionLab} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Assessment" />
          <CardBody className="space-y-4">
            <Field label="Assessment" value={lesson.assessment} />
            <Field label="Exit Ticket" value={lesson.exitTicket} />
            <Field label="Homework" value={lesson.homework} />
          </CardBody>
        </Card>

        {relatedAssignments.length > 0 && (
          <Card>
            <CardHeader title="Related Assignments" />
            <CardBody>
              <ul className="divide-y divide-[var(--border)]">
                {relatedAssignments.map((a) => (
                  <li key={a.id} className="flex items-center justify-between py-2">
                    <Link href={`/assignments/${a.id}`} className="text-sm text-zinc-200 hover:text-orange-400">
                      {a.title}
                    </Link>
                    <span className="text-xs text-[var(--muted)]">{a.points} pts</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
