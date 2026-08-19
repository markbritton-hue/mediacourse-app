# Media Production Course — Curriculum & Assignments

A static site for a full-year high school Media Production course: a
browsable 37-week/13-unit curriculum (Weeks 1, 3, 4, 5, and 6 fully written
out) with a lesson viewer, an assignments list tied back to lessons, and a
per-lesson Notes & Video Links editor.

The site itself is a static export with no server — it deploys as plain
HTML/CSS/JS and runs on GitHub Pages. The one piece of dynamic data (lesson
notes/video links) is stored in Firebase (Firestore + Auth) and read/written
directly from the browser, so it stays in sync across devices without
needing a server of our own.

## Architecture

- `src/data/curriculum.ts` — all 13 units, 37 weeks, and the lessons for
  Week 1 (foundations) and Week 3 (cabling and connectors), hardcoded as
  typed data. **This file is how you edit the curriculum** — add a `Lesson`
  object to `LESSONS` to fill in another day.
- `src/data/assignments.ts` — assignments, optionally linked to a lesson via
  `lessonId`.
- `src/app/(app)/curriculum` — curriculum browser (expandable units → weeks
  → days) and lesson viewer, statically generated from the data above via
  `generateStaticParams`.
- `src/app/(app)/assignments` — assignment list and detail pages.
- `src/lib/firebase.ts` — Firebase client init. The config object here is
  not secret (it identifies the project, not a credential); access control
  is entirely in Firestore Security Rules.
- `src/components/notes/LessonNotes.tsx` — per-lesson Notes & Video Links
  editor. Reads live from Firestore (`lessonNotes/{lessonId}` documents,
  visible to everyone). Editing requires Firebase Auth sign-in.
- `next.config.ts` sets `output: "export"` so `next build` produces plain
  static files in `out/` — no Node server required to serve it.

### Editing access (teacher notes)

Anyone can view a lesson's notes/links; only a signed-in user can edit them.
There's exactly one account, created directly in the Firebase console
(**Authentication → Users → Add user**) — sign in on the lesson page with
that email and password to unlock editing. Firestore's rules
(`lessonNotes/{lessonId}`: `allow read: if true; allow write: if request.auth != null;`)
are what actually enforce this — the UI is just a form around it.

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
