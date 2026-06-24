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
- **Media:** files → **Supabase Storage** (public bucket) via an admin-only
  `/api/uploads` endpoint. The frontend base64-encodes the file and POSTs it to
  our backend, which uploads it using the **service role key (server-only)** and
  returns the public URL; only that URL/path is stored in Postgres. The frontend
  never touches Supabase or any privileged key directly. Videos → stored as a
  YouTube/Vimeo URL and rendered as an embed.
- **Budget:** free tiers only.

## Architecture
```
Vercel project
├── Vite SPA  ── react-router ──┬── public pages (read /api)
│                               └── /admin/* (protected admin panel)
├── /api/* serverless functions (public GET; admin POST/PUT/DELETE via JWT)
│     /api/auth/{login,logout,me}   /api/uploads (Supabase Storage)
│     /api/{news,faculty,jobs,alumni,gallery}[/:id]
└── Supabase Postgres  +  Supabase Storage (files)
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
- `POST /api/uploads` (admin) → file to Supabase Storage, returns `{ url, path }`.
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
  `ADMIN_PASSWORD_HASH`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  `SUPABASE_STORAGE_BUCKET`. Documented in `.env.example` and `SETUP.md`.

## Phasing (each independently shippable)
- **Phase 0 — Foundations:** deps, `schema.sql`, `/api/_lib` (db, auth, response,
  validation, storage), auth endpoints, admin shell + protected routing, adopt
  react-router, setup docs.
- **Phase 1 — News slice:** news CRUD API + admin UI + image upload + public News
  reads from API. Proves the whole stack end-to-end.
- **Phase 2 — Faculty · Jobs · Alumni:** replicate CRUD + admin + wire public
  pages; seed real faculty.
- **Phase 3 — Media:** Supabase Storage uploads across content; video embeds.
- **Phase 4 — Gallery:** photos + video embeds.
- **Phase 5 — Deploy & migrate:** Vercel project, env vars, seed, go live.

## What the user must provision (cannot be automated here)
A Supabase project (free) with a public storage bucket, a Vercel project, and
the env-var secrets above (including generating `ADMIN_PASSWORD_HASH` with the
provided script and the Supabase service role key). `SETUP.md` gives exact steps.

## Final architecture (2026-06-24 update)
Locked decisions for all current and future work:

- **Frontend:** React + Vite SPA on Vercel. It **only consumes the REST API** —
  it never queries Postgres or talks to Supabase with privileged credentials.
- **Backend:** Vercel Serverless Functions under `/api` — no Express server,
  modular and RESTful.
- **Database:** Supabase Postgres via `postgres.js` over the **Transaction
  Pooler (port 6543)**, keeping the existing `api/_lib/db.js` config. The service
  role key is never exposed to the frontend.
- **Storage:** Supabase Storage for **all** uploaded assets (news images,
  faculty photos, gallery images, PDFs, documents, logos…). Only the public
  URL/path is stored in Postgres. Uploads use the reusable `uploadAsset()` util
  in `api/_lib/storage.js` behind the admin-only `/api/uploads` endpoint.
- **Auth:** admin only, always via backend API endpoints (JWT in an httpOnly
  cookie). The frontend never authenticates against Supabase directly.

### API layout (each endpoint: validate input · consistent JSON · graceful errors · extendable)
```
/api
  /auth      (login, logout, me)
  /news      [implemented]
  /faculty   [next]
  /gallery   [next]
  /jobs      [next]
  /alumni    [next]
  /uploads   [implemented — Supabase Storage]
```

### Shared backend code (`api/_lib`)
```
db.js          Supabase Postgres client (postgres.js)
auth.js        JWT sign/verify, requireAdmin, cookies
storage.js     Supabase Storage client + uploadAsset() util
validation.js  input validators (str, bool, date, intId)
response.js    sendData / sendError / withErrors / ApiError / Err
```

### Future CMS modules (addable without architectural change)
Dashboard · News · Faculty · Jobs · Gallery · Alumni · Admissions · Downloads ·
Events · Settings. Each follows the same pattern: a `/api/<module>` resource
(using `_lib`), an admin section under `/admin/<module>`, and a public page that
reads the resource.

### Quality bar
Everything serverless and Vercel-compatible; business logic stays in the
backend; consistent `{ data } / { error }` JSON; env vars for all secrets;
clean, extendable, production-ready code.
