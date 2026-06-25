# Shareable Job Postings + Generic Metadata System — Design

**Date:** 2026-06-25
**Status:** Approved design (revised for a generic, reusable metadata system),
ready for implementation planning

## Goal

Let each careers vacancy be shared to LinkedIn (and other platforms) as a
distinct post with its own rich preview card and be eligible for Google's Jobs
rich results. Build this as a **generic, reusable metadata/SEO system** — not a
jobs-only solution — so News, Events, Faculty, and future content types can reuse
the same infrastructure by adding a small resolver, a route, and a detail page.

**Scope boundary:** Jobs is the first and only *fully wired* consumer in this
phase. The metadata infrastructure is built generic; other content types' detail
pages and routes are explicit follow-on work.

## Background & constraints

The site is a Vite single-page app (client-rendered) deployed on Vercel, with
serverless functions under `api/`, a config-driven admin CMS
(`src/admin/lib/resources.js`), Postgres via `postgres.js`, and Supabase Storage
for uploads. Facts that shape the design:

- **LinkedIn's link-preview crawler does not run JavaScript.** A purely
  client-rendered route yields no entity-specific preview.
- **LinkedIn's share dialog accepts only a `url` parameter**
  (`https://www.linkedin.com/sharing/share-offsite/?url=<encoded>`); the preview
  card is built entirely from Open Graph tags scraped at that URL.
- **Google's Jobs experience does not reliably read client-rendered JSON-LD** —
  `JobPosting` structured data must be present in the server response.
- Content is dynamic (served from Postgres), so OG/JSON-LD must be injected at
  request time, not at build time.
- `index.html` currently has **no** OG/Twitter tags.
- There is currently **no individual job page**; the careers list renders inline
  and "Apply" routes to contact.

## URL scheme: slug-id hybrid

Public job URL:

```
/careers/software-engineer-123
```

- The **trailing numeric id is the authoritative lookup key** (rename-safe, no
  slug column needed, no collision handling).
- The slug is cosmetic, derived from `role` via `slugify(role)`.
- The server and client both parse the trailing `-(\d+)` to get the id, then
  fetch the job by id.
- Both emit `<link rel="canonical">` and `og:url` using the **recomputed**
  canonical slug, so a stale or hand-edited slug still resolves and points search
  engines at the correct URL. No 301 redirect — the canonical tag is sufficient.
- Bare `/careers` (the list) is unaffected: the rewrite requires a slug segment.

## Architecture: a generic metadata system

Three layers, with the pure logic shared isomorphically:

### 1. `shared/meta/` — isomorphic, pure, side-effect-free

A new top-level `shared/` directory imported by **both** the serverless functions
(`api/`) and the client bundle (`src/`). `@vercel/nft` traces it into the
serverless bundle; Vite bundles it for the client; the dev plugin's dynamic
`import()` handles it server-side in dev.

Rules: **no postgres, no DOM, no `process`, no side effects**, and **explicit
`.js` extensions** on internal imports (Node ESM requirement).

Contents:
- `slugify(text)` and `truncate(text, max)` (word-boundary, ~160–200 chars, no
  mid-word cut, ellipsis).
- The canonical **meta shape**:
  `{ title, description, image, imageWidth, imageHeight, url, canonical, robots, type, jsonLd }`.
- `tagsFromMeta(meta)` → serializes a meta object into the list of `<head>` tag
  strings (OG, Twitter, canonical link, robots, JSON-LD script). Single source of
  truth for serialization, HTML-escaped.

**Entity-agnostic dispatch (required).** Metadata is resolved through a single
generic entry point backed by a registry — never a per-type function name like
`getJobMetadata`:

```
resolveMetadata(type, entity, ctx) -> meta object
```

- `META_RESOLVERS` is a registry keyed by `type` (`{ jobs: jobResolver, … }`).
  `resolveMetadata` looks up the resolver, calls it, and returns the canonical
  meta shape. Unknown `type` → `null` (caller falls back to generic tags).
- Each resolver also declares its **canonical path builder**
  (`(entity) => '/careers/' + slugify(entity.role) + '-' + entity.id`) and its
  **table/lookup config**, so the server endpoint stays fully generic and a new
  type plugs in by adding one registry entry.
- This phase populates **only** the `jobs` entry. The dispatch layer and registry
  exist now (cheap, enables plug-in); no speculative resolvers are written for
  types we are not building.

**Modular JSON-LD (required).** JSON-LD generation is a separate registry of
schema-type builders so `Article`, `Event`, `Organization`, `Person`, etc. can be
added cleanly later:

```
buildJsonLd(schemaType, entity, ctx) -> JSON-LD object | null
```

- `JSONLD_BUILDERS` keyed by schema.org type (`{ JobPosting: …, Organization: … }`).
- A resolver requests JSON-LD by schema type; the meta object carries the result
  in its `jsonLd` field. This phase implements the `JobPosting` builder (and a
  reusable `hiringOrganization`/`Organization` fragment); other builders are
  follow-on.

### 2. Server — generic metadata endpoint + injection

- **`api/_lib/render-meta.js`**: `injectMeta(html, meta)` — inserts
  `tagsFromMeta(meta)` into the `<head>` of an HTML string. Pure string transform.
- **`api/meta.js`** (or `api/meta/index.js`): one generic endpoint for all types.
  1. Read `type` and `slug` from the query (provided by the rewrite).
  2. Look up the registry entry (resolver + table/lookup config) for `type`; if
     none, fall back. Parse the trailing id from `slug`.
  3. Fetch the row (published only) via the existing `sql` client.
  4. Fetch the deployment's own `/index.html` (`https://<host>/index.html`) so
     Vite's fingerprinted asset references stay intact.
  5. `injectMeta(html, resolveMetadata(type, row, { origin }))` — the endpoint is
     entity-agnostic; it never references jobs directly.
  6. Respond `text/html` with cache headers (below).
  - **Graceful fallback:** row missing/unpublished, unknown type, or DB error →
    return the **unmodified** `index.html`. Never a 5xx.

### 3. Client — `useDocumentMeta` hook

- **`src/lib/useDocumentMeta.js`**: imperatively manages `document.title` (and the
  `<link rel="canonical">`) for client-side navigations, cleaning up on unmount.
- **The server already owns OG + JSON-LD for every crawler.** To avoid duplicating
  the server-injected tags after the SPA boots, the client hook manages **only
  `document.title` and canonical** — it does not re-emit OG/JSON-LD. (Decision
  recorded explicitly to prevent double tags.)

### Routing (`vercel.json`)

Add, **before** the existing catch-all:

```json
{ "source": "/careers/:slug", "destination": "/api/meta?type=jobs&slug=:slug" }
```

Future types add one line each (`/news/:slug` → `type=news`, etc.). Because
`/careers/:slug` now routes *any* single segment to the function, the fallback
path must be cheap and robust — which it is (see caching).

## Data model change: optional per-job OG image

Add an optional `og_image` column to `jobs`:

- **Versioned migrations (new convention — required).** All schema changes are
  now managed through ordered, versioned migration files so the live DB is
  reproducible from migrations rather than ad-hoc SQL. See "Migrations" below. The
  `og_image` change ships as a migration file:
  ```sql
  -- migrations/0002_jobs_og_image.sql
  alter table jobs add column if not exists og_image text;
  ```
- **`schema.sql`**: also add `og_image text` to the `create table jobs` block so
  the reference snapshot stays current (note: `create table if not exists` is
  skipped on the existing DB, which is exactly why the migration above is the
  thing that actually applies the column live).
- **`api/_lib/schemas.js`** → `jobs.parse`: add
  `og_image: str(b, "og_image", { max: 1000 })`.
- **`src/admin/lib/resources.js`** → jobs `fields`: add
  `{ name: "og_image", label: "Share image", type: "image", folder: "jobs", help: "Optional. Shown when the job is shared on LinkedIn/Google. Falls back to the default careers image." }`
  and add `og_image: ""` to its `defaults()`.

**Image resolution order:** per-job `og_image` (absolute Supabase URL) → default
careers image.

## Migrations (new convention)

The DB must be reproducible from versioned migrations; no more relying on ad-hoc
manual SQL.

- **`migrations/` directory** with ordered, immutable, append-only files:
  `NNNN_description.sql` (e.g. `0001_baseline.sql`, `0002_jobs_og_image.sql`).
- **`migrations/0001_baseline.sql`** captures the current full schema (the
  existing `schema.sql` content) so a fresh DB is built entirely from migrations.
  `schema.sql` is retained as a human-readable reference snapshot, kept in sync,
  but migrations are the source of truth.
- **Tracking:** a `schema_migrations` table records applied filenames; the runner
  applies only pending files in lexical order, each in a transaction.
- **`scripts/migrate.mjs` + `npm run migrate`**: reuses the existing `postgres.js`
  `DATABASE_URL` setup (consistent with `scripts/seed.mjs`). Idempotent — safe to
  re-run.
- This phase ships the runner, the `0001_baseline.sql`, and
  `0002_jobs_og_image.sql`. Future schema changes add a new numbered file — never
  edit an applied one.

## Per-job metadata (the `jobs` resolver)

### Open Graph / Twitter

| Tag | Value |
| --- | --- |
| `og:title` | `{role} — Sri Gujarati Vidyalaya` |
| `og:description` | see priority below |
| `og:url` | canonical `/careers/{slug}-{id}` |
| `og:type` | `website` |
| `og:image` | `og_image` if set, else the default careers image |
| `og:image:width` / `:height` | dimensions of the chosen image |
| `twitter:card` | `summary_large_image` |

**OG description priority:**
1. Explicit SEO description field (not added now; resolver checks for it so a
   future `seo_description` column needs only a parse + admin field).
2. Job `description`, truncated to ~160–200 chars on a word boundary.
3. `Department • {Type} • {Location}` (present fields only).
4. Site-wide careers description (a constant).

### Canonical & robots

- `<link rel="canonical" href="{canonical}">` on every job page.
- `robots`: published jobs → `index,follow`. The server serves published jobs
  only; the client "no longer available" state sets `noindex,follow`.

### JSON-LD `JobPosting` (server-injected, guarded)

Produced by the modular `JobPosting` builder in `JSONLD_BUILDERS` (see
"Modular JSON-LD"), reusing the shared `Organization` fragment for
`hiringOrganization`. Emit **only** when all of `title`, `description`,
`datePosted` (`created_at`),
`hiringOrganization`, and `jobLocation` are present, **and** `closes_on` is not in
the past (a past `validThrough` causes Google to drop/flag the posting). Otherwise
omit JSON-LD entirely to avoid Search Console errors.

Field mapping:
- `title` ← `role`
- `description` ← job description (fallback text if structurally required)
- `datePosted` ← `created_at`
- `validThrough` ← `closes_on` (only if present and future)
- `employmentType` ← mapped to Google's enum:
  `Full-time→FULL_TIME`, `Part-time→PART_TIME`, `Contract→CONTRACTOR`,
  `Temporary→TEMPORARY`
- `hiringOrganization` ← `{ @type: Organization, name, sameAs: site origin, logo }`
- `jobLocation` ← `{ @type: Place, address: { @type: PostalAddress,
  addressLocality: "Kozhikode", addressRegion: "Kerala", addressCountry: "IN",
  streetAddress: location } }`
- `identifier` ← `{ @type: PropertyValue, name: org, value: id }`

## Caching (crawler responses)

- **Successful job response:** `Cache-Control: public, s-maxage=300,
  stale-while-revalidate=600` — edits propagate within minutes; SWR avoids
  latency.
- **Fallback response (not found / DB error / unknown type):** `no-store` (or a
  few seconds), so a transient blip never pins a *generic* card onto a real job's
  URL for the full `s-maxage`.

## Client components / pages

- **`src/components/ShareBar.jsx`** (new, reusable): "Share on LinkedIn" (opens
  `share-offsite?url=<encoded canonical>`) and "Copy link" (clipboard + brief
  confirmation). Takes a `url`; reusable on future detail pages.
- **`src/pages/JobDetailPage.jsx`** (new): fetches one job from the existing
  `/api/jobs/:id` (id parsed from the slug), renders role/department/type/
  location/closes/description in the editorial style, an **Apply** action
  (→ contact), and the share bar; drives `useDocumentMeta` for title/canonical;
  shows the "no longer available" state on 404/error (with `noindex`).
- **`src/App.jsx`**: add route `/careers/:slug` → `JobDetailPage`.
- **`src/pages/CareersPage.jsx`**: each opening's role links to its
  `/careers/{slug}-{id}` detail page (Apply action retained).

## `index.html` generic fallbacks

Add generic OG/Twitter tags (`og:title`, `og:description`, `og:image` [absolute],
`og:image:width`/`height`, `og:type`, `og:url`, `twitter:card`) — improves every
shared page that isn't entity-specific.

**Default OG image:** a dedicated **1200×627 branded Careers OG image** (not the
logo/crest), **absolute** URL, with declared width/height. Must read well across
LinkedIn, Facebook, X (Twitter), Discord, Slack, and WhatsApp.

## Error handling & edge cases

- **Serverless:** missing/unpublished row, unknown type, or DB error → unmodified
  `index.html` (never 5xx), with `no-store`.
- **Client detail page:** 404/error → "This opening is no longer available" + link
  back to Careers, `noindex` (mirrors the fallback-friendly `useApi` philosophy).
- **Stale/mismatched slug:** id still resolves; canonical points at the correct
  slug.
- **`/careers/<not-a-job>`:** function fetches nothing → generic fallback HTML;
  the SPA boots and routes accordingly.

## Local dev note

The Vite dev plugin only intercepts `/api/*` and does not process `vercel.json`
rewrites, so in `npm run dev`, `/careers/<slug>` renders the SPA directly (no OG
injection) — fine, since injection only matters for crawlers in production. To
inspect injected tags locally, request `/api/meta?type=jobs&slug=<slug>-<id>`.

## Testing / verification

No test runner exists in this repo. Plan:
1. **Pure helpers** (`slugify`, `truncate`, `tagsFromMeta`, `buildJobPostingJsonLd`,
   `injectMeta`) are pure string-in/string-out — structured to be the natural
   first unit tests if a runner is added.
2. **Local manual** — request `/api/meta?type=jobs&slug=…` and confirm per-job
   OG + JSON-LD tags and intact SPA asset refs.
3. **Post-deploy (required, not possible on localhost):**
   - LinkedIn Post Inspector (`linkedin.com/post-inspector`) on the live
     `/careers/{slug}-{id}` URL → rich card renders.
   - Google Rich Results Test on the same URL → `JobPosting` validates with no
     errors.

## Out of scope (YAGNI / follow-on)

- Detail pages and routes for News/Events/Faculty (infrastructure is built generic
  this phase; wiring each type is follow-on: add a resolver + a `vercel.json` line
  + a detail page).
- Auto-posting to LinkedIn via the Community Management API (external approval
  gates).
- An explicit `seo_description` column (resolver leaves a slot for it).
- "Apply via LinkedIn" external application URLs.

## Required deploy steps (not auto-applied)

1. Run `npm run migrate` against the live Supabase DB (applies
   `0002_jobs_og_image.sql`; `0001_baseline.sql` is already-satisfied and tracked
   as applied).
2. Provide the dedicated 1200×627 branded Careers OG image (absolute URL) — must
   read well on LinkedIn, Facebook, X, Discord, Slack, and WhatsApp.
3. After deploy, validate via LinkedIn Post Inspector and Google Rich Results
   Test.
