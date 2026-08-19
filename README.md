# Media Production Course Platform

A curriculum management, classroom instruction, and media-production training
system for a full-year high school Media Production course. Built with
Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL, and Prisma.

## Architecture

- `prisma/schema.prisma` — full relational schema: users/roles, course →
  school year → unit → week → lesson hierarchy, assignments/submissions,
  projects/productions, production roles, skills matrix, practical tests,
  troubleshooting scenarios, rubrics, grading, equipment, resources,
  portfolios, calendar, and quizzes. Designed so later phases (student
  login, AI generation) are additive, not schema-breaking.
- `prisma/seed.ts` — seeds one course, 12 units, 36 weeks, full Week 1
  lessons, skill categories, production roles, grading categories, sample
  equipment/students/project/practical test.
- `src/lib/prisma.ts` — Prisma Client singleton using the `pg` driver
  adapter (Prisma 7 style).
- `src/lib/queries.ts` — read-side data access for dashboard/curriculum.
- `src/lib/actions/*.ts` — server actions (mutations) per feature area.
- `src/lib/ai/service.ts` — `AiService` interface with a
  not-implemented-yet default. Future AI features (lesson plan generation,
  quiz generation, rubric generation, etc.) implement this interface
  without touching call sites.
- `src/app/(app)/*` — teacher/admin app shell (sidebar + top bar) with
  Dashboard, Curriculum, Students, Assignments, Projects, Skills,
  Production Roles, Equipment, Grades, Portfolios, Resources, Calendar,
  Search, Settings.
- `src/app/present/[lessonId]` — full-screen classroom Presentation Mode
  (outside the admin shell), with a segment timer and teacher-notes hidden.

## Phase status

- **Phase 1 (curriculum core) — done:** architecture, schema, navigation,
  dashboard, curriculum browser, lesson viewer/editor, Week 1 seed data,
  Presentation Mode.
- **Phase 2 (assignments/projects/skills/roles/students) — done:**
  functional list + create flows backed by real data.
- **Phase 3 (equipment/grading) — done:** equipment inventory + status,
  grading category weights, grade recording. Practical tests and
  troubleshooting scenarios have schema + seed data but no dedicated UI yet.
- **Phase 4 (calendar/portfolio/resources) — done:** functional list +
  create flows. Drag-to-reschedule and rubric UI are not yet built.
- **Phase 5 (student login/self-service) — not started.** Explicitly
  marked as planned functionality in Settings; `User.role = STUDENT` and
  `Student.userId` already exist in the schema for this.

Anything not yet wired to real data or actions is labeled "Planned" in the
UI rather than presented as working.

## Local development

This project uses Prisma's local dev Postgres server (`prisma dev`),
backed by PGlite — a **single-connection** embedded Postgres. That's why
`src/lib/prisma.ts` pins the connection pool to `max: 1`; a real Postgres
instance in staging/production can raise this.

```bash
npm install
npx prisma dev -d      # starts the local Postgres server in the background
npx prisma migrate dev # applies the schema (already applied in this repo)
npm run db:seed        # seeds course/curriculum/sample data
npm run dev
```

For production, point `DATABASE_URL` at a real PostgreSQL instance and
raise the adapter's pool size in `src/lib/prisma.ts`.
