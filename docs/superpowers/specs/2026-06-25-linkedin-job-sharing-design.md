# Shareable Job Postings with LinkedIn — Design

**Date:** 2026-06-25
**Status:** Approved design, ready for implementation planning

## Goal

Let each careers vacancy be shared to LinkedIn (and other social platforms) as a
distinct post with its own rich preview card. A recruiter or admin shares a
job's link; LinkedIn shows that job's role, department, and an image — not a
generic site card.

## Background & constraints

The site is a Vite single-page app (client-rendered) deployed on Vercel, with
serverless functions under `api/`. Key facts that shape the design:

- **LinkedIn's link-preview crawler does not run JavaScript.** A purely
  client-rendered route therefore yields no job-specific preview.
- **LinkedIn's share dialog accepts only a `url` parameter**
  (`https://www.linkedin.com/sharing/share-offsite/?url=<encoded>`). The
  `title`/`summary` params were removed years ago, so the preview card is built
  entirely from the Open Graph (OG) tags the crawler scrapes at that URL.
- Jobs are dynamic (served from Postgres via the existing `jobs` resource), so
  build-time prerendering is not viable — OG tags must be injected at request
  time.
- `index.html` currently has **no** OG/Twitter tags.
- There is currently **no individual job page**; the careers list renders jobs
  inline and "Apply" routes to the contact page.

The consequence: to produce distinct LinkedIn cards we must serve job-specific OG
tags from the shared URL via a serverless function. This is "Approach B" from
brainstorming. A client-only approach was rejected because every job would share
an identical generic card, defeating the feature's purpose.

## Architecture

### Canonical share URL: `/careers/:id`

A single clean URL serves both audiences:

- **Humans:** the URL boots the SPA; React Router renders a new job detail page.
- **Crawlers:** a `vercel.json` rewrite maps `/careers/:id` (numeric id only) to
  a serverless function that returns `index.html` with per-job OG tags injected
  into `<head>`. Because the returned HTML still contains the SPA boot script,
  any human who hits the function also gets a working app — one URL, no
  user-agent sniffing, no redirect flash.

The bare `/careers` list page is unaffected: the rewrite's numeric guard
(`:id(\\d+)`) means non-numeric paths fall through to the existing SPA catch-all.

### Data flow

```
Share button  ──>  https://www.linkedin.com/sharing/share-offsite/?url=<origin>/careers/123
                                                   │
LinkedIn crawler fetches /careers/123 ────────────┘
                                                   │
        vercel.json: /careers/:id(\d+)  ─────────> api/share/job/[id].js
                                                   │  fetch job from DB
                                                   │  fetch own /index.html
                                                   │  inject OG tags (injectOg)
                                                   v
                                          HTML with job-specific <head>

Human opens /careers/123  ──> same function (or SPA) ──> SPA boots ──> JobDetailPage
                                                          fetches /api/jobs/123
```

## Components / files

### New

- **`api/_lib/og.js`** — pure helper `injectOg(html, tags)`: takes the
  `index.html` string and a map of OG/Twitter values, returns HTML with the tags
  inserted into `<head>`. All values HTML-escaped. Pure string-in/string-out so
  it is trivially verifiable without a DB or network.
- **`api/share/job/[id].js`** — serverless function:
  1. Read `id` (numeric).
  2. Fetch the job via the existing `sql` client / `jobs` table (published only).
  3. Fetch the deployment's own `/index.html` (e.g. `https://<host>/index.html`)
     so Vite's fingerprinted asset references stay intact.
  4. Build the OG tag map and call `injectOg`.
  5. Return the HTML with `Content-Type: text/html` and a short cache header.
  - **Graceful fallback:** if the job is missing/unpublished or the DB is
    unreachable, return the unmodified `index.html` (never a 5xx). The crawler
    simply gets the generic card; the SPA still loads for humans.
- **`src/pages/JobDetailPage.jsx`** — fetches one job from the existing
  `/api/jobs/:id` endpoint and renders role, department, type, location,
  closes-on, and description in the site's editorial style. Includes an **Apply**
  action (→ contact page) and the share bar.
- **`src/components/ShareBar.jsx`** — reusable share controls:
  - "Share on LinkedIn" → opens
    `https://www.linkedin.com/sharing/share-offsite/?url=<encoded canonical>` in
    a new tab.
  - "Copy link" → copies the canonical URL to the clipboard with brief
    confirmation feedback.
  - Built generic (takes a `url` and optional `title`) so it can later drop into
    news or other pages.

### Changed

- **`vercel.json`** — add `{ "source": "/careers/:id(\\d+)", "destination":
  "/api/share/job/:id" }` **before** the existing catch-all rewrite.
- **`index.html`** — add generic OG/Twitter fallback tags (`og:title`,
  `og:description`, `og:image`, `og:type`, `og:url`, `twitter:card`). Improves
  every shared page, not just jobs.
- **`src/App.jsx`** — add a `/careers/:id` route rendering `JobDetailPage`.
- **`src/pages/CareersPage.jsx`** — make each opening's role link to its
  `/careers/:id` detail page (in addition to the existing Apply action).

## Open Graph tags per job

| Tag | Value |
| --- | --- |
| `og:title` | `{role} — Sri Gujarati Vidyalaya` |
| `og:description` | job `description`, trimmed; fallback to `{department} · {type} · {location}` |
| `og:url` | the canonical `/careers/:id` URL |
| `og:type` | `website` |
| `og:image` | a single default careers image (see below) |
| `twitter:card` | `summary_large_image` |

**OG image:** jobs have no image column. To keep scope tight we use one default
careers image for all jobs (distinctiveness comes from title + description,
which is what matters most on a feed). A per-job image field is explicitly out of
scope and can be added later. The image must be an absolute, stable, publicly
reachable URL.

## Error handling & edge cases

- **Serverless:** job missing/unpublished or DB error → serve unmodified
  `index.html`. Never return 5xx to a crawler or human.
- **Client detail page:** 404/error from `/api/jobs/:id` → show "This opening is
  no longer available" with a link back to Careers (mirrors the existing
  fallback-friendly `useApi` philosophy that keeps the public site from ever
  looking broken).
- **Non-numeric `/careers/abc`:** the `\\d+` guard means it falls through to the
  SPA catch-all → home (existing `*` route behavior).
- **Unpublished jobs:** the share function fetches published rows only, so a
  shared link to an unpublished/closed job degrades to the generic card and the
  detail page shows the not-available state.

## Local dev note

The Vite dev plugin (`vite.config.js`) only intercepts `/api/*`; it does not
process `vercel.json` rewrites. So in `npm run dev`, hitting `/careers/123`
renders the SPA directly (no OG injection) — which is fine, since OG injection
only matters for crawlers in production. To inspect injected tags locally, hit
`/api/share/job/123` directly.

## Testing / verification

This repo has no test runner. Verification plan:

1. **`injectOg` correctness** — structured as a pure function so its output
   (tags present, values escaped, original asset refs intact) is easy to check;
   if/when a test runner is added it is the natural first unit test.
2. **Local manual check** — request `/api/share/job/<id>` and confirm the
   returned HTML contains the expected per-job OG tags and still references the
   built SPA assets.
3. **Post-deploy confirmation (required, cannot be done on localhost)** — after
   deployment, run the live `/careers/:id` URL through LinkedIn's Post Inspector
   (linkedin.com/post-inspector) to confirm the rich card renders. This is the
   true acceptance check and happens after deploy, not in-session.

## Out of scope (YAGNI)

- Auto-posting openings to LinkedIn via the Community Management API (deferred;
  requires a verified company page, a LinkedIn developer app, app review, and
  OAuth token storage — external approval gates).
- Per-job OG images / an image field on the `jobs` schema.
- "Apply via LinkedIn" external application URLs.
