# Setup — Sri Gujarati Vidyalaya (full-stack)

The site is a Vite React SPA with a Vercel Serverless API and a Supabase
Postgres database. An admin panel lives at **`/admin`**. This guide gets it
running.

> You only need to do steps 1–5 once. They require **your own** free Supabase
> and Vercel accounts — secrets are never committed to the repo.

## Prerequisites
- Node 18+ and npm
- A free [Supabase](https://supabase.com) project (Postgres)
- A free [Vercel](https://vercel.com) account
- Vercel CLI for local API dev: `npm i -g vercel`

## 1. Create the database (Supabase)
1. In your Supabase project → **SQL Editor**, paste `schema.sql` and run it to
   create the tables.
2. → **Project Settings → Database → Connection string → "Connection pooling"**
   (Transaction mode, port 6543). Copy it → this is `DATABASE_URL`. (The pooler
   string is the right one for serverless functions.)

## 2. Generate the admin login + secrets
```bash
# A long random session secret:
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"   # → JWT_SECRET

# Hash for your chosen admin password:
node scripts/hash-password.mjs 'your-strong-password'                       # → ADMIN_PASSWORD_HASH
```
Pick an `ADMIN_USERNAME` (e.g. `admin`).

## 3. Image uploads (Vercel Blob)
In your Vercel project → **Storage** → create a **Blob** store. Copy the
`BLOB_READ_WRITE_TOKEN`. (Uploads only work once this is set; everything else
works without it.)

## 4. Environment variables
Copy `.env.example` → `.env.local` and fill in all five values:
`DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`,
`BLOB_READ_WRITE_TOKEN`. Set the **same** variables in the Vercel project
(Settings → Environment Variables).

## 5. Seed the starting content
```bash
DATABASE_URL='postgres://...' node scripts/seed.mjs
```
Loads the 18 real faculty, the news items and gallery photos so the site isn't
empty. (Re-running replaces those rows.)

## Run locally
```bash
vercel dev          # runs the SPA *and* the /api functions together
```
Then open `http://localhost:3000` (or the port it prints) and the admin at
`/admin/login`.

> Note: plain `npm run dev` runs **only** the frontend — the `/api` endpoints
> won't respond, so login/content needs `vercel dev`.

## Deploy
1. Push the repo to GitHub.
2. In Vercel, **Import** the repo (framework preset: Vite). Add the five env
   vars. Deploy.
3. `vercel.json` already routes `/api/*` to the functions and everything else to
   the SPA.

## Using the admin
- Sign in at `/admin/login` with your `ADMIN_USERNAME` + password.
- **News & Events** is fully wired (create, edit, delete, publish, photo
  upload). Faculty, Jobs, Alumni and Gallery management land in the next phases.
- Any error shows a plain-language message; "Show details" reveals the technical
  code if you need it for support.
