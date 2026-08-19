import { notFound } from "next/navigation";
import Link from "next/link";
import { getLesson } from "@/lib/queries";
import { updateLesson } from "@/lib/actions/lessons";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { LESSON_TYPE_LABELS } from "@/lib/constants";

function TextField({
  name,
  label,
  defaultValue,
  textarea = false,
  rows = 3,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          defaultValue={defaultValue ?? ""}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
        />
      )}
    </div>
  );
}

export default async function LessonEditPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  const updateWithId = updateLesson.bind(null, lesson.id);

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--muted)]">
            <Link href={`/curriculum/${lesson.id}`} className="hover:text-zinc-200">
              {lesson.title}
            </Link>{" "}
            / Edit
          </p>
          <h1 className="text-xl font-semibold text-white">Edit Lesson</h1>
        </div>
        <LinkButton href={`/curriculum/${lesson.id}`} variant="ghost">
          Cancel
        </LinkButton>
      </div>

      <form action={updateWithId} className="space-y-4">
        <Card>
          <CardHeader title="Basics" />
          <CardBody className="space-y-4">
            <TextField name="title" label="Lesson Title" defaultValue={lesson.title} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Lesson Type
                </label>
                <select
                  name="lessonType"
                  defaultValue={lesson.lessonType}
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100"
                >
                  {Object.entries(LESSON_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <TextField name="duration" label="Duration (minutes)" defaultValue={String(lesson.duration)} />
            </div>
            <TextField name="objective" label="Objective" defaultValue={lesson.objective} textarea />
            <TextField
              name="essentialQuestion"
              label="Essential Question"
              defaultValue={lesson.essentialQuestion}
            />
            <TextField
              name="vocabulary"
              label="Vocabulary (comma-separated)"
              defaultValue={lesson.vocabulary.join(", ")}
            />
            <TextField
              name="requiredEquipment"
              label="Required Equipment"
              defaultValue={lesson.requiredEquipment}
              textarea
              rows={2}
            />
            <TextField name="teacherPrep" label="Teacher Preparation" defaultValue={lesson.teacherPrep} textarea rows={2} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Timing (minutes)" subtitle="Defaults to the standard 60-minute template" />
          <CardBody>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              <TextField name="timingBellwork" label="Bell Work" defaultValue={String(lesson.timingBellwork)} />
              <TextField name="timingInstruct" label="Instruction" defaultValue={String(lesson.timingInstruct)} />
              <TextField name="timingDemo" label="Demo" defaultValue={String(lesson.timingDemo)} />
              <TextField name="timingHandsOn" label="Hands-On" defaultValue={String(lesson.timingHandsOn)} />
              <TextField name="timingCleanup" label="Cleanup" defaultValue={String(lesson.timingCleanup)} />
              <TextField name="timingReview" label="Review" defaultValue={String(lesson.timingReview)} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Lesson Flow" />
          <CardBody className="space-y-4">
            <TextField name="introduction" label="Introduction / Bell Work" defaultValue={lesson.introduction} textarea />
            <TextField name="demonstration" label="Instructor Demonstration" defaultValue={lesson.demonstration} textarea />
            <TextField name="content" label="Lesson Content" defaultValue={lesson.content} textarea />
            <TextField name="handsOnActivity" label="Hands-On Activity" defaultValue={lesson.handsOnActivity} textarea />
            <TextField name="productionLab" label="Production Lab" defaultValue={lesson.productionLab} textarea />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Assignment & Assessment" />
          <CardBody className="space-y-4">
            <TextField
              name="studentAssignmentText"
              label="Student Assignment"
              defaultValue={lesson.studentAssignmentText}
              textarea
            />
            <TextField name="assessment" label="Assessment" defaultValue={lesson.assessment} textarea rows={2} />
            <TextField name="exitTicket" label="Exit Ticket" defaultValue={lesson.exitTicket} textarea rows={2} />
            <TextField name="homework" label="Homework" defaultValue={lesson.homework} textarea rows={2} />
          </CardBody>
        </Card>

        <Card className="border-amber-800/50">
          <CardHeader title="Teacher-Only" subtitle="Never shown in Presentation Mode" />
          <CardBody className="space-y-4">
            <TextField name="teacherNotes" label="Teacher Notes" defaultValue={lesson.teacherNotes} textarea rows={2} />
            <TextField name="standards" label="Standards" defaultValue={lesson.standards} textarea rows={2} />
          </CardBody>
        </Card>

        <div className="flex justify-end gap-2">
          <LinkButton href={`/curriculum/${lesson.id}`} variant="secondary">
            Cancel
          </LinkButton>
          <Button type="submit">Save Lesson</Button>
        </div>
      </form>
    </div>
  );
}
