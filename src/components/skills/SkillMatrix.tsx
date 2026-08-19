"use client";

import { useTransition } from "react";
import { setStudentSkillLevel } from "@/lib/actions/entities";
import { SKILL_LEVEL_LABELS } from "@/lib/constants";

type Skill = { id: string; name: string };
type Student = { id: string; firstName: string; lastName: string };
type StudentSkill = { studentId: string; skillId: string; level: string };

export function SkillMatrix({
  skills,
  students,
  studentSkills,
}: {
  skills: Skill[];
  students: Student[];
  studentSkills: StudentSkill[];
}) {
  const [isPending, startTransition] = useTransition();
  const lookup = new Map(studentSkills.map((s) => [`${s.studentId}:${s.skillId}`, s.level]));

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="sticky left-0 bg-[var(--surface)] px-2 py-1.5 text-left text-xs font-medium text-[var(--muted)]">
            Skill
          </th>
          {students.map((s) => (
            <th key={s.id} className="px-2 py-1.5 text-left text-xs font-medium text-[var(--muted)] whitespace-nowrap">
              {s.firstName} {s.lastName[0]}.
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill.id} className="border-t border-[var(--border)]">
            <td className="sticky left-0 bg-[var(--surface)] px-2 py-1.5 text-zinc-300 whitespace-nowrap">
              {skill.name}
            </td>
            {students.map((student) => {
              const level = lookup.get(`${student.id}:${skill.id}`) ?? "NOT_INTRODUCED";
              return (
                <td key={student.id} className="px-2 py-1.5">
                  <select
                    defaultValue={level}
                    disabled={isPending}
                    onChange={(e) =>
                      startTransition(() =>
                        setStudentSkillLevel(student.id, skill.id, e.target.value)
                      )
                    }
                    className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-1 text-xs text-zinc-200"
                  >
                    {Object.entries(SKILL_LEVEL_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
