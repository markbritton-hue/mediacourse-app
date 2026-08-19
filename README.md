# Media Production Course — Curriculum & Assignments

A static site for a full-year high school Media Production course: a
browsable 36-week/12-unit curriculum (Week 1 fully written out), a lesson
viewer, a full-screen classroom Presentation Mode with a segment timer, and
an assignments list tied back to lessons.

No backend, no database — this deploys as plain static HTML/CSS/JS and runs
on GitHub Pages.

## Architecture

- `src/data/curriculum.ts` — the 12 units, 36 weeks, and Week 1's five
  lessons, hardcoded as typed data. **This file is how you edit the
  curriculum** — add a `Lesson` object to `LESSONS` to fill in another day.
- `src/data/assignments.ts` — assignments, optionally linked to a lesson via
  `lessonId`.
- `src/app/(app)/curriculum` — curriculum browser (expandable units → weeks
  → days) and lesson viewer, statically generated from the data above via
  `generateStaticParams`.
- `src/app/(app)/assignments` — assignment list and detail pages.
- `src/app/present/[lessonId]` — full-screen Presentation Mode (segment
  timer, previous/next, hides nothing since there's no teacher-only data
  layer left to hide).
- `next.config.ts` sets `output: "export"` so `next build` produces plain
  static files in `out/` — no Node server required to serve it.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes the site
automatically on every push to `master`/`main`.

One-time setup in the GitHub repo: **Settings → Pages → Build and
deployment → Source → GitHub Actions**. After that, the next push deploys
to `https://<your-username>.github.io/<repo-name>/`.

To build the static export locally (matching what CI produces):

```bash
GITHUB_PAGES_BASE_PATH=/mediacourse-app npm run build
```

The output lands in `out/` and can be served with any static file server.
