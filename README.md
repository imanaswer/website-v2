<div align="center">

# Sri Gujarati Vidyalaya — Higher Secondary School

**A heritage school website (est. 1869, Mananchira, Kozhikode) with a built-in admin CMS.**

React + Vite · Vercel Serverless Functions · Supabase (Postgres + Storage)

</div>

---

## Overview

A premium, editorial-style website for Sri Gujarati Vidyalaya, paired with a
secure **admin panel** so school staff can manage content themselves — no
developer or code changes needed. Every error is shown in plain language so a
non-technical admin always knows what happened and what to do.

- **Public site** — Home, Heritage, Academics, Faculty, Admissions, Campus
  (gallery), Alumni, Careers, Contact.
- **Admin CMS** at `/admin` — manage News & Events today; Faculty, Jobs, Gallery
  and Alumni roll out on the same pattern.
- **Real content** — faculty are the school's actual 18 teachers; nothing is
  fabricated.

---

## ✨ Demo: showing the client

> The site runs locally with one command once the environment is configured
> (see [Quick start](#-quick-start)). Use these demo admin credentials.

**Public site:** `http://localhost:5173/`
**Admin panel:** `http://localhost:5173/admin/login`

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `SGV@admin2026` |

The matching `ADMIN_PASSWORD_HASH` for this demo password is already provided in
[Quick start](#-quick-start), so login works as soon as the env vars are set.

> ⚠️ **Change these before going live.** Generate a new password hash with
> `npm run hash 'your-real-password'` and update `ADMIN_PASSWORD_HASH`.

**What to show the client in the admin:**
1. Sign in at `/admin/login`.
2. **Dashboard** → news count and quick links.
3. **News & Events** → create a post, upload a photo, toggle **Published**, save.
4. See friendly validation/errors (e.g. submit with no title, or upload a huge
   file) — every message is plain English with an optional "Show details".
5. Sign out; visit the public site to see published content.

---

## 🧱 Architecture

```
┌─────────────────────────── Vercel ───────────────────────────┐
│  React + Vite SPA                                             │
│   • Public pages (real URLs via react-router)                │
│   • /admin  → protected admin panel (consumes REST only)     │
│                                                              │
│  /api/*  Serverless Functions  (no Express; modular REST)    │
│   /auth · /news · /uploads   (faculty, jobs, gallery, alumni │
│   follow next on the same pattern)                           │
└───────────────┬───────────────────────────┬─────────────────┘
                │                           │
        Supabase Postgres            Supabase Storage
        (postgres.js, pooler)        (images/PDFs, public URLs)
```

- The **frontend only calls the REST API** — it never queries Postgres or uses
  Supabase privileged keys directly.
- Admin **auth** is a JWT in an httpOnly cookie, issued by the backend.
- Uploads go **through the backend**, which uses the Supabase **service-role key
  (server-only)**; only the resulting public URL is stored in the database.

### Tech stack
| Layer | Choice |
|-------|--------|
| Frontend | React 18, Vite, React Router |
| Backend | Vercel Serverless Functions (Node) |
| Database | Supabase PostgreSQL (`postgres.js`, Transaction Pooler) |
| Storage | Supabase Storage (public bucket) |
| Auth | Single admin · bcrypt + JWT (httpOnly cookie, `jose`) |
| Hosting | Vercel (frontend + functions) |

---

## 🚀 Quick start

**Prerequisites:** Node 18+ and a free [Supabase](https://supabase.com) project.
(The Vercel CLI is optional — `npm run dev` runs the API locally on its own.)

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
```

Fill `.env.local` (the demo admin values are filled in for you):

```ini
# Supabase Postgres — "Connection pooling" string (Transaction mode, port 6543)
DATABASE_URL="postgresql://postgres.PROJECT:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres"

# Admin login (demo password is: SGV@admin2026)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2b$10$0/QnVdOf0jpGurUv2Xk9Xu0rUtKt3I16SmDYLNveY9pnGhWluf.Km"
JWT_SECRET="paste-a-long-random-string-here"

# Supabase Storage (server-only key — never exposed to the browser)
SUPABASE_URL="https://PROJECT.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_STORAGE_BUCKET="media"
```

```bash
# 3. Create the database tables — paste schema.sql into the Supabase SQL Editor
#    (or:  psql "$DATABASE_URL" -f schema.sql)

# 4. Create a PUBLIC Storage bucket named "media" in Supabase → Storage

# 5. Seed starting content (18 real faculty, news, gallery)
npm run seed

# 6. Run locally — serves the frontend AND the /api functions together
npm run dev
```

Open `http://localhost:5173`. Admin: `/admin/login`.

> A dev-only Vite plugin runs the `api/` functions during `npm run dev`, so the
> admin login and API work locally with **no Vercel CLI needed**. `vercel dev`
> also works if you prefer. The **admin login works with just the `ADMIN_*` and
> `JWT_SECRET` vars** — the database/storage features additionally need the
> Supabase vars.

Full step-by-step provisioning is in **[SETUP.md](./SETUP.md)**.

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel → **Import** the repo (framework preset: **Vite**).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. `vercel.json` already routes `/api/*` to functions and everything
   else to the SPA.

---

## 📁 Project structure

```
api/                     Vercel serverless functions (backend)
  _lib/                  shared logic
    db.js                Supabase Postgres client (postgres.js)
    auth.js              JWT + admin guard + cookies
    storage.js           Supabase Storage upload utility
    validation.js        input validators
    response.js          consistent JSON + friendly errors
  auth/                  login · logout · me
  news/                  news CRUD  (index.js, [id].js)
  uploads/               file upload → Supabase Storage
src/
  pages/                 public editorial pages
  components/            shared UI (Button, Input, PageHero, …)
  admin/                 the admin CMS (login, dashboard, news, …)
schema.sql               database tables
scripts/                 seed.mjs · hash-password.mjs
docs/superpowers/specs/  design + architecture spec
SETUP.md                 full provisioning guide
```

### npm scripts
| Command | Does |
|---------|------|
| `npm run dev` | Frontend only (Vite) |
| `vercel dev` | Frontend **and** API together |
| `npm run build` | Production build |
| `npm run seed` | Load starting content into the database |
| `npm run hash 'pwd'` | Generate a bcrypt hash for an admin password |

---

## 🗺️ Status & roadmap

**Live now:** full public site · admin login · a config-driven CMS managing
**News & Events, Faculty, Hiring/Jobs, Alumni, and Gallery (photos + video
links)** — each with create/edit/delete, publish toggles, photo uploads to
Supabase Storage, and friendly errors throughout.

**Next:** wire the public pages to read from the API (so admin edits appear on
the site). The CMS is config-driven, so future modules — Admissions, Downloads,
Events, Settings — are added with a single config entry + a DB table, no
architectural changes.

---

<div align="center">
<em>विद्या विनयेन शोभते — “Knowledge is adorned by humility.”</em>
</div>
