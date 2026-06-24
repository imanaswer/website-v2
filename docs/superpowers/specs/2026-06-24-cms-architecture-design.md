# Full-stack CMS — Sri Gujarati Vidyalaya

**Date:** 2026-06-24
**Goal:** Turn the static editorial site into a full-stack app on Vercel with a
single-admin CMS so non-technical staff can manage news/events, faculty, jobs,
alumni and the gallery (photos + video embeds) — with clear, human-readable
errors throughout.

## Stack (approved)
- **Frontend:** existing Vite React SPA (all editorial pages kept). Adopt
  `react-router-dom` (already a dependency) for real URLs — improves SEO, fixes
  deep-linking, and enables a protected `/admin` area.
- **Backend:** Vercel Serverless Functions under `/api` (Node.js runtime).
- **Database:** Supabase Postgres (free tier), accessed with `postgres.js` over
  the Supabase connection pooler (Transaction mode).
- **Auth:** single admin. Username + bcrypt password **hash stored in env vars**
  (no users table). Login issues a **JWT in an httpOnly cookie** (`jose`);
  admin endpoints verify it.
- **Media:** images → **Vercel Blob** (free tier) via a signed `/api/upload`;
  videos → stored as a YouTube/Vimeo URL and rendered as an embed.
- **Budget:** free tiers only.

## Architecture
```
Vercel project
├── Vite SPA  ── react-router ──┬── public pages (read /api)
│                               └── /admin/* (protected admin panel)
├── /api/* serverless functions (public GET; admin POST/PUT/DELETE via JWT)
│     /api/auth/{login,logout,me}   /api/upload (Blob)
│     /api/{news,faculty,jobs,alumni,gallery}[/:id]
└── Supabase Postgres  +  Vercel Blob (images)
```

## Data model (Postgres)
- `news` — id, title, category, body, date, image_url, published, created_at
- `faculty` — id, name, subject, department, photo_url, sort_order
- `jobs` — id, role, department, type, location, closes_on, description, published, created_at
- `alumni` — id, name, batch_year, role, quote, photo_url, sort_order
- `gallery` — id, title, category, kind ('photo'|'video'), image_url, video_url, sort_order, created_at

## API
- `POST /api/auth/login` → verify creds, set httpOnly JWT cookie.
- `POST /api/auth/logout` → clear cookie. `GET /api/auth/me` → `{ authenticated }`.
- Per resource: `GET /api/<r>` (public list), `GET /api/<r>/:id` (public),
  `POST /api/<r>` · `PUT /api/<r>/:id` · `DELETE /api/<r>/:id` (admin only).
- `POST /api/upload` (admin) → image to Vercel Blob, returns `{ url }`.
- Public list endpoints only return `published` rows for news/jobs.

## Admin panel (`/admin`)
Login → dashboard → a CRUD section per content type (list + create/edit forms,
reusing existing `Input`/`Select`/`Checkbox`/`Button`), each with an image-upload
widget. A protected-route wrapper checks `/api/auth/me` and redirects to login.

## Error handling & feedback (first-class)
The admin never sees a stack trace — only plain English saying what happened and
what to do. Technical detail is logged server-side.
- **Consistent API error shape:** `{ error: { message, code, detail? } }` with the
  right HTTP status; all handlers wrap work in try/catch. An `ApiError` helper
  carries a friendly `message` + machine `code`.
- **Plain-language mapping** for common cases: oversized image
  ("That photo is too large — please use one under 5 MB."), wrong file type,
  expired session ("Please log in again."), missing field (shown by the field),
  server/network down ("We couldn't reach the server…"), upload failure.
- **Frontend:** a shared `api()` fetch wrapper turns any failure into a friendly
  message; inline field errors + a dismissible toast/banner for operation errors,
  with an optional "Show details" expander (technical code) and `aria-live`.
  Client-side validation catches most issues before submit. Clear success
  confirmations ("Saved", "Uploaded", "Published").

## Frontend integration
Hardcoded arrays in Home/Faculty/Alumni/Careers/Gallery/News become
`fetch('/api/...')` with loading/empty/error states — the editorial design is
unchanged, just data-fed. A seed script loads today's real content (the 18
faculty, news items, etc.) so nothing starts empty.

## Deployment
- `vercel.json`: SPA rewrite must **exclude** `/api/*` (use
  `/((?!api/).*)` → `/index.html`).
- Env vars: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`,
  `ADMIN_PASSWORD_HASH`, `BLOB_READ_WRITE_TOKEN`. Documented in `.env.example`
  and `SETUP.md`.

## Phasing (each independently shippable)
- **Phase 0 — Foundations:** deps, `schema.sql`, `/api/_lib` (db, auth, errors),
  auth endpoints, admin shell + protected routing, adopt react-router, setup docs.
- **Phase 1 — News slice:** news CRUD API + admin UI + image upload + public News
  reads from API. Proves the whole stack end-to-end.
- **Phase 2 — Faculty · Jobs · Alumni:** replicate CRUD + admin + wire public
  pages; seed real faculty.
- **Phase 3 — Media:** Blob uploads across content; video embeds.
- **Phase 4 — Gallery:** photos + video embeds.
- **Phase 5 — Deploy & migrate:** Vercel project, env vars, seed, go live.

## What the user must provision (cannot be automated here)
A Supabase project (free), a Vercel project, and the env-var secrets above
(including generating `ADMIN_PASSWORD_HASH` with the provided script and a
`BLOB_READ_WRITE_TOKEN` from Vercel Blob). `SETUP.md` gives exact steps.
