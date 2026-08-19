import { notFound } from "next/navigation";
import Link from "next/link";
import { getLesson } from "@/lib/queries";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import {
  DAY_NAMES,
  LESSON_STATUS_COLORS,
  LESSON_STATUS_LABELS,
  LESSON_TYPE_LABELS,
} from "@/lib/constants";
import { LessonActionsBar } from "@/components/curriculum/LessonActionsBar";

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
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
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  const timing = [
    { label: "Bell work / Intro", minutes: lesson.timingBellwork },
    { label: "Instruction", minutes: lesson.timingInstruct },
    { label: "Demonstration", minutes: lesson.timingDemo },
    { label: "Hands-on / Production", minutes: lesson.timingHandsOn },
    { label: "Cleanup", minutes: lesson.timingCleanup },
    { label: "Review / Exit Ticket", minutes: lesson.timingReview },
  ];

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-1 flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/curriculum" className="hover:text-zinc-200">
          Curriculum
        </Link>
        <span>/</span>
        <span>
          Week {lesson.week.number} · {DAY_NAMES[lesson.dayOfWeek]}
        </span>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">{lesson.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-zinc-800 text-zinc-300">
              Lesson {lesson.lessonNumber}
            </Badge>
            <Badge className="bg-zinc-800 text-zinc-300">
              {LESSON_TYPE_LABELS[lesson.lessonType]}
            </Badge>
            <Badge className={LESSON_STATUS_COLORS[lesson.status]}>
              {LESSON_STATUS_LABELS[lesson.status]}
            </Badge>
            <Badge className="bg-zinc-800 text-zinc-300">{lesson.duration} min</Badge>
            {lesson.week.unit && (
              <Badge className="bg-zinc-800 text-zinc-300">{lesson.week.unit.title}</Badge>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkButton href={`/present/${lesson.id}`} variant="primary">
            Start Lesson
          </LinkButton>
          <LinkButton href={`/curriculum/${lesson.id}/edit`} variant="secondary">
            Edit Lesson
          </LinkButton>
        </div>
      </div>

      <LessonActionsBar lessonId={lesson.id} status={lesson.status} />

      <div className="mt-6 space-y-4">
        <Card>
          <CardHeader title="Overview" />
          <CardBody className="space-y-4">
            <Field label="Objective" value={lesson.objective} />
            <Field label="Essential Question" value={lesson.essentialQuestion} />
            {lesson.vocabulary.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Vocabulary
                </p>
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
          <CardHeader
            title="60-Minute Structure"
            subtitle={`Total: ${timing.reduce((a, t) => a + t.minutes, 0)} min`}
          />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {timing.map((t) => (
                <div
                  key={t.label}
                  className="flex-1 min-w-[120px] rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-3 text-center"
                >
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
          <CardHeader title="Assignment & Assessment" />
          <CardBody className="space-y-4">
            <Field label="Student Assignment" value={lesson.studentAssignmentText} />
            <Field label="Assessment" value={lesson.assessment} />
            <Field label="Exit Ticket" value={lesson.exitTicket} />
            <Field label="Homework" value={lesson.homework} />
          </CardBody>
        </Card>

        {(lesson.teacherNotes || lesson.standards) && (
          <Card className="border-amber-800/50">
            <CardHeader title="Teacher-Only Notes" subtitle="Hidden in Presentation Mode" />
            <CardBody className="space-y-4">
              <Field label="Teacher Notes" value={lesson.teacherNotes} />
              <Field label="Standards" value={lesson.standards} />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
