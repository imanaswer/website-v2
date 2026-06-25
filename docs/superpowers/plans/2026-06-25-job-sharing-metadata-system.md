# Shareable Jobs + Generic Metadata System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each careers vacancy a shareable, slug-based URL that renders a rich LinkedIn/social preview card and Google `JobPosting` structured data, built on a generic, entity-agnostic metadata system that News/Events/Faculty can reuse later.

**Architecture:** A pure, isomorphic `shared/meta/` module (imported by both serverless functions and the client) produces a canonical "meta object" from any entity via a registry (`resolveMetadata(type, entity, ctx)`). A single generic serverless endpoint (`api/meta.js`), wired through a `vercel.json` rewrite per content type, fetches the row, injects per-entity Open Graph + JSON-LD into `index.html` for crawlers, and serves the SPA shell to humans. Jobs is the only fully wired consumer this phase.

**Tech Stack:** Vite + React 18 (ESM, `"type": "module"`), Vercel serverless functions, `postgres.js` over Supabase Postgres, Node built-in `node --test` for unit tests (no new deps).

**Conventions for the executor:**
- TDD applies to the pure `shared/meta/` and `api/_lib/render-meta.js` helpers (they are pure string/object transforms). React components, the DB endpoint, and config files are verified manually (no DOM/DB test harness exists).
- **Every commit message must end with this trailer** (shown in Task 1, required on all commits):
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- Run all commands from the repo root `/Users/anaswerajay/Gujarathi-School`.

---

## File structure

**New — `shared/meta/` (pure, isomorphic, no DOM / no `process` / no postgres; explicit `.js` extensions):**
- `shared/meta/strings.js` — `slugify`, `truncate`, `parseTrailingId`, `escapeHtml`
- `shared/meta/site.js` — school constants + `absoluteUrl`
- `shared/meta/tags.js` — `tagsFromMeta` (meta object → `<head>` tag strings)
- `shared/meta/jsonld.js` — `JSONLD_BUILDERS` (`JobPosting`, `organizationNode`), `buildJsonLd`
- `shared/meta/resolvers.js` — `META_RESOLVERS` registry, `resolveMetadata`, `metaConfig`
- `shared/meta/index.js` — barrel re-export

**New — server:**
- `api/_lib/render-meta.js` — `injectMeta`, `fetchIndexHtml`, `originFromReq`
- `api/meta.js` — generic metadata endpoint

**New — client:**
- `src/lib/useDocumentMeta.js` — title/canonical/robots for client nav
- `src/components/ShareBar.jsx` — LinkedIn + copy-link controls
- `src/pages/JobDetailPage.jsx` — job detail page

**New — DB/migrations:**
- `scripts/migrate.mjs` — migration runner
- `migrations/0001_baseline.sql` — current schema snapshot (pre-`og_image`)
- `migrations/0002_jobs_og_image.sql` — add `og_image`

**Modified:**
- `package.json` — add `test` + `migrate` scripts
- `schema.sql` — add `og_image` to the `jobs` block (reference snapshot)
- `api/_lib/schemas.js` — add `og_image` to `jobs.parse`
- `src/admin/lib/resources.js` — add `og_image` field + default to jobs
- `vercel.json` — add the `/careers/:slug` rewrite before the catch-all
- `index.html` — add generic OG/Twitter fallback tags
- `src/App.jsx` — add `/careers/:slug` route; pass-through raw paths in `onNavigate`
- `src/pages/CareersPage.jsx` — link each opening to its detail page

---

## Task 1: String helpers + test runner

**Files:**
- Create: `shared/meta/strings.js`
- Test: `shared/meta/strings.test.js`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Add the `test` script**

In `package.json`, add to `"scripts"` (alongside `seed`/`hash`):

```json
    "test": "node --test",
    "migrate": "node scripts/migrate.mjs",
```

- [ ] **Step 2: Write the failing test**

Create `shared/meta/strings.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, truncate, parseTrailingId, escapeHtml } from "./strings.js";

test("slugify lowercases, strips punctuation, hyphenates", () => {
  assert.equal(slugify("Physics Teacher (PGT)!"), "physics-teacher-pgt");
  assert.equal(slugify("  Maths & Science  "), "maths-science");
});

test("slugify falls back to 'item' when empty", () => {
  assert.equal(slugify(""), "item");
  assert.equal(slugify("!!!"), "item");
});

test("truncate keeps short strings and cuts on a word boundary with ellipsis", () => {
  assert.equal(truncate("short text", 50), "short text");
  const long = "We are seeking an experienced and dedicated teacher to join our faculty";
  const out = truncate(long, 30);
  assert.ok(out.length <= 31, "respects max + ellipsis");
  assert.ok(out.endsWith("…"));
  assert.ok(!out.includes("  "));
});

test("parseTrailingId extracts the numeric suffix", () => {
  assert.equal(parseTrailingId("physics-teacher-123"), 123);
  assert.equal(parseTrailingId("42"), 42);
  assert.equal(parseTrailingId("no-number"), null);
  assert.equal(parseTrailingId(""), null);
});

test("escapeHtml escapes the five entities", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node --test shared/meta/strings.test.js`
Expected: FAIL — cannot find module `./strings.js`.

- [ ] **Step 4: Implement `shared/meta/strings.js`**

```js
/* Pure string helpers for metadata. No DOM, no Node, no side effects. */

export function slugify(text) {
  return (
    String(text || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "item"
  );
}

export function truncate(text, max = 180) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const clipped = s.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return base.replace(/[.,;:!?\-\s]+$/, "") + "…";
}

export function parseTrailingId(slug) {
  const m = String(slug || "").match(/(?:^|-)(\d+)$/);
  return m ? Number(m[1]) : null;
}

export function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test shared/meta/strings.test.js`
Expected: PASS (5 tests).

- [ ] **Step 6: Commit**

```bash
git add package.json shared/meta/strings.js shared/meta/strings.test.js
git commit -m "Add isomorphic string helpers + node:test runner

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Site constants

**Files:**
- Create: `shared/meta/site.js`
- Test: `shared/meta/site.test.js`

- [ ] **Step 1: Write the failing test**

Create `shared/meta/site.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { absoluteUrl, SITE_ORIGIN, DEFAULT_OG_IMAGE } from "./site.js";

test("absoluteUrl joins origin + root-relative path", () => {
  assert.equal(absoluteUrl("https://x.com", "/careers/a-1"), "https://x.com/careers/a-1");
  assert.equal(absoluteUrl("https://x.com/", "assets/og.jpg"), "https://x.com/assets/og.jpg");
});

test("absoluteUrl passes through already-absolute URLs", () => {
  assert.equal(absoluteUrl("https://x.com", "https://cdn.com/a.jpg"), "https://cdn.com/a.jpg");
});

test("absoluteUrl falls back to SITE_ORIGIN when origin missing", () => {
  assert.equal(absoluteUrl(undefined, "/x"), SITE_ORIGIN + "/x");
});

test("default OG image is 1200x627", () => {
  assert.equal(DEFAULT_OG_IMAGE.width, 1200);
  assert.equal(DEFAULT_OG_IMAGE.height, 627);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test shared/meta/site.test.js`
Expected: FAIL — cannot find module `./site.js`.

- [ ] **Step 3: Implement `shared/meta/site.js`**

```js
/* School-wide metadata constants. Pure data; no platform deps. */

// Production origin, used for static fallbacks (index.html) and when a request
// origin is unavailable. Change this single constant if the deploy domain moves.
export const SITE_ORIGIN = "https://www.srigujaratividhyalaya.com";
export const SITE_NAME = "Sri Gujarati Vidyalaya";

export const ORGANIZATION = {
  name: "Sri Gujarati Vidyalaya Higher Secondary School",
  logoPath: "/assets/logo-lockup.png",
  address: { locality: "Kozhikode", region: "Kerala", country: "IN" },
};

// A dedicated 1200x627 branded Careers OG image must be placed at this path
// (public/assets/careers-og.jpg) before deploy. See the plan's deploy steps.
export const DEFAULT_OG_IMAGE = { path: "/assets/careers-og.jpg", width: 1200, height: 627 };

export const CAREERS_DESCRIPTION =
  "Join the faculty of Sri Gujarati Vidyalaya — a 150-year-old English-medium, Government-recognised school in the heart of Kozhikode.";

/* Build an absolute URL from an origin + a root-relative path. */
export function absoluteUrl(origin, path) {
  const base = (origin || SITE_ORIGIN).replace(/\/$/, "");
  if (!path) return base;
  if (/^https?:\/\//.test(path)) return path;
  return base + (path.startsWith("/") ? path : "/" + path);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test shared/meta/site.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add shared/meta/site.js shared/meta/site.test.js
git commit -m "Add school metadata constants + absoluteUrl

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Tag serialization (`tagsFromMeta`)

**Files:**
- Create: `shared/meta/tags.js`
- Test: `shared/meta/tags.test.js`

- [ ] **Step 1: Write the failing test**

Create `shared/meta/tags.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { tagsFromMeta } from "./tags.js";

test("emits og + twitter + canonical + robots", () => {
  const tags = tagsFromMeta({
    title: "Physics Teacher — SGV",
    description: "Teach physics",
    url: "https://x.com/careers/physics-1",
    canonical: "https://x.com/careers/physics-1",
    image: "https://x.com/assets/og.jpg",
    imageWidth: 1200,
    imageHeight: 627,
    robots: "index,follow",
    type: "website",
  }).join("\n");
  assert.match(tags, /<meta property="og:title" content="Physics Teacher — SGV" \/>/);
  assert.match(tags, /<meta property="og:image:width" content="1200" \/>/);
  assert.match(tags, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(tags, /<link rel="canonical" href="https:\/\/x.com\/careers\/physics-1" \/>/);
  assert.match(tags, /<meta name="robots" content="index,follow" \/>/);
});

test("escapes attribute values", () => {
  const tags = tagsFromMeta({ title: `A "quoted" & <tag>` }).join("\n");
  assert.match(tags, /content="A &quot;quoted&quot; &amp; &lt;tag&gt;"/);
});

test("serializes JSON-LD into a script tag and neutralizes </script>", () => {
  const tags = tagsFromMeta({ jsonLd: { "@type": "JobPosting", description: "ends </script> here" } }).join("\n");
  assert.match(tags, /<script type="application\/ld\+json">/);
  assert.ok(!tags.includes("</script> here"), "raw </script> must be escaped");
});

test("omits image width/height when no image", () => {
  const tags = tagsFromMeta({ title: "x", imageWidth: 1200 }).join("\n");
  assert.ok(!tags.includes("og:image:width"));
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test shared/meta/tags.test.js`
Expected: FAIL — cannot find module `./tags.js`.

- [ ] **Step 3: Implement `shared/meta/tags.js`**

```js
import { escapeHtml } from "./strings.js";

/*
 * Serialize a meta object into an array of <head> tag strings. Single source of
 * truth for how a meta object becomes HTML. Pure: same input → same output.
 *
 * Meta shape:
 *   { title, description, image, imageWidth, imageHeight, url, canonical,
 *     robots, type, jsonLd }
 */
export function tagsFromMeta(meta = {}) {
  const e = escapeHtml;
  const tags = [];

  if (meta.title) tags.push(`<meta property="og:title" content="${e(meta.title)}" />`);
  if (meta.description) tags.push(`<meta property="og:description" content="${e(meta.description)}" />`);
  if (meta.url) tags.push(`<meta property="og:url" content="${e(meta.url)}" />`);
  tags.push(`<meta property="og:type" content="${e(meta.type || "website")}" />`);

  if (meta.image) {
    tags.push(`<meta property="og:image" content="${e(meta.image)}" />`);
    if (meta.imageWidth) tags.push(`<meta property="og:image:width" content="${e(meta.imageWidth)}" />`);
    if (meta.imageHeight) tags.push(`<meta property="og:image:height" content="${e(meta.imageHeight)}" />`);
  }

  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (meta.title) tags.push(`<meta name="twitter:title" content="${e(meta.title)}" />`);
  if (meta.description) tags.push(`<meta name="twitter:description" content="${e(meta.description)}" />`);
  if (meta.image) tags.push(`<meta name="twitter:image" content="${e(meta.image)}" />`);

  if (meta.canonical) tags.push(`<link rel="canonical" href="${e(meta.canonical)}" />`);
  if (meta.robots) tags.push(`<meta name="robots" content="${e(meta.robots)}" />`);
  if (meta.jsonLd) tags.push(`<script type="application/ld+json">${jsonLdString(meta.jsonLd)}</script>`);

  return tags;
}

/* JSON-LD goes inside a <script> as JSON (not HTML-escaped); only neutralize a
 * literal </script> so a string value can't break out of the element. */
function jsonLdString(obj) {
  return JSON.stringify(obj).replace(/<\/(script)/gi, "<\\/$1");
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test shared/meta/tags.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add shared/meta/tags.js shared/meta/tags.test.js
git commit -m "Add tagsFromMeta head-tag serializer

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Modular JSON-LD (`JobPosting`)

**Files:**
- Create: `shared/meta/jsonld.js`
- Test: `shared/meta/jsonld.test.js`

- [ ] **Step 1: Write the failing test**

Create `shared/meta/jsonld.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildJsonLd, organizationNode } from "./jsonld.js";

const future = "2999-01-01";
const past = "2000-01-01";
const base = {
  id: 7,
  role: "Physics Teacher",
  description: "Teach physics to senior students.",
  type: "Full-time",
  location: "Mananchira",
  created_at: "2026-06-01T00:00:00.000Z",
};

test("organizationNode builds an absolute logo + sameAs", () => {
  const o = organizationNode("https://x.com");
  assert.equal(o["@type"], "Organization");
  assert.equal(o.sameAs, "https://x.com/");
  assert.match(o.logo, /^https:\/\/x\.com\/assets\//);
});

test("JobPosting maps fields and employmentType enum", () => {
  const node = buildJsonLd("JobPosting", { ...base, closes_on: future }, { origin: "https://x.com" });
  assert.equal(node["@type"], "JobPosting");
  assert.equal(node.title, "Physics Teacher");
  assert.equal(node.employmentType, "FULL_TIME");
  assert.equal(node.validThrough, new Date(future).toISOString());
  assert.equal(node.hiringOrganization["@type"], "Organization");
  assert.equal(node.jobLocation.address.addressLocality, "Kozhikode");
  assert.equal(node.identifier.value, "7");
});

test("JobPosting omitted when description missing", () => {
  assert.equal(buildJsonLd("JobPosting", { ...base, description: "" }, {}), null);
});

test("JobPosting omitted when already closed (past closes_on)", () => {
  assert.equal(buildJsonLd("JobPosting", { ...base, closes_on: past }, {}), null);
});

test("JobPosting without closes_on omits validThrough but is still emitted", () => {
  const node = buildJsonLd("JobPosting", { ...base, closes_on: null }, {});
  assert.ok(node);
  assert.equal(node.validThrough, undefined);
});

test("unknown schema type returns null", () => {
  assert.equal(buildJsonLd("Nonsense", base, {}), null);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test shared/meta/jsonld.test.js`
Expected: FAIL — cannot find module `./jsonld.js`.

- [ ] **Step 3: Implement `shared/meta/jsonld.js`**

```js
import { ORGANIZATION, absoluteUrl } from "./site.js";

/* Maps the admin's Type select options to schema.org's employmentType enum. */
const EMPLOYMENT_TYPE = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Temporary: "TEMPORARY",
};

/* Reusable Organization node — also usable as a standalone schema later. */
export function organizationNode(origin) {
  return {
    "@type": "Organization",
    name: ORGANIZATION.name,
    sameAs: absoluteUrl(origin, "/"),
    logo: absoluteUrl(origin, ORGANIZATION.logoPath),
  };
}

/* true = future, false = past, null = absent/invalid (compared date-only, UTC). */
function dateIsFuture(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return d.getTime() >= todayUtc;
}

/*
 * JobPosting builder. Returns null when required fields are missing or the
 * posting has already closed (a past validThrough makes Google drop it).
 */
function jobPosting(job, { origin } = {}) {
  const title = job.role;
  const description = (job.description || "").trim();
  const datePosted = job.created_at;
  if (!title || !description || !datePosted) return null;

  const future = dateIsFuture(job.closes_on);
  if (job.closes_on && future === false) return null;

  const node = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title,
    description,
    datePosted: new Date(datePosted).toISOString(),
    hiringOrganization: organizationNode(origin),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location || undefined,
        addressLocality: ORGANIZATION.address.locality,
        addressRegion: ORGANIZATION.address.region,
        addressCountry: ORGANIZATION.address.country,
      },
    },
    identifier: { "@type": "PropertyValue", name: ORGANIZATION.name, value: String(job.id) },
  };

  if (job.closes_on && future) node.validThrough = new Date(job.closes_on).toISOString();
  const emp = EMPLOYMENT_TYPE[job.type];
  if (emp) node.employmentType = emp;
  return node;
}

/* Registry of schema.org builders. Add Article/Event/Person here later. */
export const JSONLD_BUILDERS = { JobPosting: jobPosting };

/* Entity-agnostic JSON-LD entry point. Unknown type or null result → null. */
export function buildJsonLd(schemaType, entity, ctx = {}) {
  const builder = JSONLD_BUILDERS[schemaType];
  return builder ? builder(entity, ctx) : null;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test shared/meta/jsonld.test.js`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add shared/meta/jsonld.js shared/meta/jsonld.test.js
git commit -m "Add modular JSON-LD builders with JobPosting

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Entity-agnostic resolver registry + barrel

**Files:**
- Create: `shared/meta/resolvers.js`
- Create: `shared/meta/index.js`
- Test: `shared/meta/resolvers.test.js`

- [ ] **Step 1: Write the failing test**

Create `shared/meta/resolvers.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveMetadata, metaConfig } from "./resolvers.js";

const job = {
  id: 12,
  role: "Maths Teacher",
  department: "Mathematics",
  type: "Full-time",
  location: "Kozhikode",
  description: "A long description ".repeat(40),
  created_at: "2026-06-01T00:00:00.000Z",
  closes_on: "2999-01-01",
  published: true,
};

test("resolves job meta with canonical slug-id URL", () => {
  const meta = resolveMetadata("jobs", job, { origin: "https://x.com" });
  assert.equal(meta.title, "Maths Teacher — Sri Gujarati Vidyalaya");
  assert.equal(meta.url, "https://x.com/careers/maths-teacher-12");
  assert.equal(meta.canonical, meta.url);
  assert.equal(meta.robots, "index,follow");
  assert.ok(meta.description.length <= 201);
  assert.equal(meta.jsonLd["@type"], "JobPosting");
});

test("uses per-job og_image when present (no width/height)", () => {
  const meta = resolveMetadata("jobs", { ...job, og_image: "https://cdn.com/j.jpg" }, { origin: "https://x.com" });
  assert.equal(meta.image, "https://cdn.com/j.jpg");
  assert.equal(meta.imageWidth, undefined);
});

test("falls back to default OG image with dimensions", () => {
  const meta = resolveMetadata("jobs", job, { origin: "https://x.com" });
  assert.match(meta.image, /\/assets\/careers-og\.jpg$/);
  assert.equal(meta.imageWidth, 1200);
});

test("description falls back to Dept • Type • Location when no body", () => {
  const meta = resolveMetadata("jobs", { ...job, description: "" }, { origin: "https://x.com" });
  assert.equal(meta.description, "Mathematics • Full-time • Kozhikode");
});

test("unknown type or missing entity returns null", () => {
  assert.equal(resolveMetadata("widgets", job, {}), null);
  assert.equal(resolveMetadata("jobs", null, {}), null);
});

test("metaConfig exposes table + filter for the server", () => {
  const cfg = metaConfig("jobs");
  assert.equal(cfg.table, "jobs");
  assert.equal(cfg.publicFilter, "published");
  assert.equal(cfg.lookupField, "id");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test shared/meta/resolvers.test.js`
Expected: FAIL — cannot find module `./resolvers.js`.

- [ ] **Step 3: Implement `shared/meta/resolvers.js`**

```js
import { slugify, truncate } from "./strings.js";
import { buildJsonLd } from "./jsonld.js";
import { SITE_NAME, CAREERS_DESCRIPTION, DEFAULT_OG_IMAGE, absoluteUrl } from "./site.js";

/* OG description priority: explicit SEO field → trimmed body → Dept • Type •
 * Location → site-wide careers default. (seo_description is a future column; the
 * resolver already honors it so adding it later needs only a parse + admin field.) */
function jobDescription(job) {
  if (job.seo_description) return truncate(job.seo_description, 200);
  if (job.description && job.description.trim()) return truncate(job.description, 200);
  const facts = [job.department, job.type, job.location].filter(Boolean).join(" • ");
  return facts || CAREERS_DESCRIPTION;
}

function jobCanonicalPath(job) {
  return `/careers/${slugify(job.role)}-${job.id}`;
}

function jobResolver(job, ctx = {}) {
  const { origin } = ctx;
  const url = absoluteUrl(origin, jobCanonicalPath(job));
  const hasOwnImage = Boolean(job.og_image);
  return {
    title: `${job.role} — ${SITE_NAME}`,
    description: jobDescription(job),
    image: hasOwnImage ? absoluteUrl(origin, job.og_image) : absoluteUrl(origin, DEFAULT_OG_IMAGE.path),
    imageWidth: hasOwnImage ? undefined : DEFAULT_OG_IMAGE.width,
    imageHeight: hasOwnImage ? undefined : DEFAULT_OG_IMAGE.height,
    url,
    canonical: url,
    robots: "index,follow",
    type: "website",
    jsonLd: buildJsonLd("JobPosting", job, ctx),
  };
}

/*
 * Entity-agnostic registry. Each entry: how to turn a DB row into a meta object,
 * its canonical path builder, and the table/lookup config the server uses. Add a
 * shareable type by adding one entry here (+ a vercel.json rewrite + a page).
 */
export const META_RESOLVERS = {
  jobs: {
    resolver: jobResolver,
    canonicalPath: jobCanonicalPath,
    table: "jobs",
    publicFilter: "published",
    lookupField: "id",
  },
};

export function resolveMetadata(type, entity, ctx = {}) {
  const entry = META_RESOLVERS[type];
  if (!entry || !entity) return null;
  return entry.resolver(entity, ctx);
}

export function metaConfig(type) {
  return META_RESOLVERS[type] || null;
}
```

- [ ] **Step 4: Create the barrel `shared/meta/index.js`**

```js
export * from "./strings.js";
export * from "./site.js";
export * from "./tags.js";
export * from "./jsonld.js";
export * from "./resolvers.js";
```

- [ ] **Step 5: Run the full suite to verify it passes**

Run: `node --test`
Expected: PASS — all suites green (strings, site, tags, jsonld, resolvers).

- [ ] **Step 6: Commit**

```bash
git add shared/meta/resolvers.js shared/meta/index.js shared/meta/resolvers.test.js
git commit -m "Add entity-agnostic metadata resolver registry + barrel

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Server-side metadata injection helper

**Files:**
- Create: `api/_lib/render-meta.js`
- Test: `api/_lib/render-meta.test.js`

- [ ] **Step 1: Write the failing test**

Create `api/_lib/render-meta.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { injectMeta } from "./render-meta.js";

const HTML = `<!doctype html><html><head>
  <title>SGV</title>
  <meta property="og:title" content="Generic" />
  <link rel="canonical" href="https://x.com/" />
  <script type="application/ld+json">{"@type":"WebSite"}</script>
</head><body><div id="root"></div></body></html>`;

test("injects per-entity tags before </head>", () => {
  const out = injectMeta(HTML, { title: "Job A", canonical: "https://x.com/careers/job-a-1" });
  assert.match(out, /<meta property="og:title" content="Job A" \/>/);
  assert.ok(out.indexOf("</head>") > out.indexOf("Job A"));
});

test("removes pre-existing generic og/canonical/jsonld so there are no duplicates", () => {
  const out = injectMeta(HTML, { title: "Job A", canonical: "https://x.com/careers/job-a-1" });
  assert.ok(!out.includes('content="Generic"'), "old og:title removed");
  assert.equal((out.match(/rel="canonical"/g) || []).length, 1, "single canonical");
  assert.ok(!out.includes('"@type":"WebSite"'), "old jsonld removed");
  assert.ok(out.includes('<div id="root">'), "body untouched");
});

test("returns html unchanged when meta is null", () => {
  assert.equal(injectMeta(HTML, null), HTML);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test api/_lib/render-meta.test.js`
Expected: FAIL — cannot find module `./render-meta.js`.

- [ ] **Step 3: Implement `api/_lib/render-meta.js`**

```js
import { tagsFromMeta } from "../../shared/meta/index.js";

/*
 * Inject metadata <head> tags into an HTML document string. First strips any
 * existing managed tags (so a generic fallback in index.html can't duplicate the
 * per-entity values), then inserts our tags just before </head>. Pure transform.
 */
export function injectMeta(html, meta) {
  if (!meta) return html;

  const doc = html
    .replace(/\s*<meta[^>]+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+name="robots"[^>]*>/gi, "")
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "");

  const block = tagsFromMeta(meta).map((t) => "    " + t).join("\n");
  if (!block) return doc;
  const idx = doc.indexOf("</head>");
  if (idx === -1) return doc;
  return doc.slice(0, idx) + block + "\n  " + doc.slice(idx);
}

/* The deployment's own index.html, fetched so Vite's hashed asset refs stay
 * intact. Returns null on any failure (caller falls back). */
export async function fetchIndexHtml(origin) {
  try {
    const res = await fetch(`${origin}/index.html`, { headers: { "user-agent": "sgv-meta-injector" } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/* Reconstruct the public origin from proxy headers. */
export function originFromReq(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test api/_lib/render-meta.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add api/_lib/render-meta.js api/_lib/render-meta.test.js
git commit -m "Add server-side metadata injection helper

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Generic metadata endpoint

**Files:**
- Create: `api/meta.js`

- [ ] **Step 1: Implement `api/meta.js`**

```js
import { sql } from "./_lib/db.js";
import { injectMeta, fetchIndexHtml, originFromReq } from "./_lib/render-meta.js";
import { resolveMetadata, metaConfig, parseTrailingId } from "../shared/meta/index.js";

/*
 * Generic, entity-agnostic metadata endpoint. A vercel.json rewrite maps each
 * public detail URL (e.g. /careers/:slug) here with ?type=...&slug=.... We fetch
 * the row, inject per-entity OG + JSON-LD into index.html for crawlers, and serve
 * HTML that also boots the SPA for humans. Never 5xx: on any problem we serve the
 * unmodified shell so the page still works.
 */
export default async function handler(req, res) {
  const origin = originFromReq(req);
  const html = await fetchIndexHtml(origin);

  // Could not fetch our own shell (broken deploy) — last-resort redirect home.
  if (!html) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.end('<!doctype html><meta http-equiv="refresh" content="0; url=/"><title>Loading…</title>');
  }

  const serveFallback = () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store"); // never pin a generic card onto a real URL
    res.end(html);
  };

  try {
    const type = String(req.query.type || "");
    const slug = String(req.query.slug || "");
    const config = metaConfig(type);
    const id = parseTrailingId(slug);
    if (!config || !id) return serveFallback();

    const rows = config.publicFilter
      ? await sql`select * from ${sql(config.table)} where ${sql(config.lookupField)} = ${id} and ${sql(config.publicFilter)} = true`
      : await sql`select * from ${sql(config.table)} where ${sql(config.lookupField)} = ${id}`;
    const row = rows[0];
    if (!row) return serveFallback();

    const out = injectMeta(html, resolveMetadata(type, row, { origin }));
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.end(out);
  } catch (e) {
    console.error("[api/meta]", e);
    serveFallback();
  }
}
```

- [ ] **Step 2: Manual verification (requires `DATABASE_URL` and a published job)**

Run the dev server: `npm run dev`
In another terminal, find a published job id (or use the admin panel), then:

Run: `curl -s "http://localhost:5173/api/meta?type=jobs&slug=test-<ID>" | grep -E 'og:title|application/ld\+json|canonical'`
Expected: a job-specific `og:title`, a `JobPosting` JSON-LD script, and a single canonical link.

Run: `curl -s "http://localhost:5173/api/meta?type=jobs&slug=nope-999999" | grep -c 'og:title'`
Expected: `0` or only the generic shell (graceful fallback, no crash).

- [ ] **Step 3: Commit**

```bash
git add api/meta.js
git commit -m "Add generic metadata endpoint for crawler-facing OG/JSON-LD

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Wire the rewrite + generic fallback tags

**Files:**
- Modify: `vercel.json`
- Modify: `index.html`

- [ ] **Step 1: Add the rewrite (before the catch-all)**

Replace the contents of `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/careers/:slug", "destination": "/api/meta?type=jobs&slug=:slug" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Add generic OG/Twitter fallback tags**

In `index.html`, immediately after the existing
`<meta name="description" ... />` line, add:

```html
    <!-- Generic social fallbacks; per-entity pages override these via api/meta -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Sri Gujarati Vidyalaya" />
    <meta property="og:title" content="Sri Gujarati Vidyalaya — Heritage School, Kozhikode" />
    <meta property="og:description" content="A Kerala Government recognised, English-medium, co-educational institution established in 1869, Kozhikode." />
    <meta property="og:url" content="https://www.srigujaratividhyalaya.com/" />
    <meta property="og:image" content="https://www.srigujaratividhyalaya.com/assets/careers-og.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Sri Gujarati Vidyalaya — Heritage School, Kozhikode" />
    <meta name="twitter:description" content="A Kerala Government recognised, English-medium, co-educational institution established in 1869, Kozhikode." />
    <meta name="twitter:image" content="https://www.srigujaratividhyalaya.com/assets/careers-og.jpg" />
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes; `dist/index.html` contains the new `og:` tags.

- [ ] **Step 4: Commit**

```bash
git add vercel.json index.html
git commit -m "Route /careers/:slug to metadata endpoint; add generic OG fallbacks

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 9: Versioned migrations + `og_image` column

**Files:**
- Create: `scripts/migrate.mjs`
- Create: `migrations/0001_baseline.sql`
- Create: `migrations/0002_jobs_og_image.sql`
- Modify: `schema.sql`

- [ ] **Step 1: Create the migration runner `scripts/migrate.mjs`**

```js
/*
 * Apply pending SQL migrations in lexical order, each in a transaction, tracking
 * applied filenames in a schema_migrations table. Idempotent — safe to re-run.
 * Usage:  DATABASE_URL='postgres://...' npm run migrate
 */
import postgres from "postgres";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");
const sql = postgres(process.env.DATABASE_URL, { ssl: "require", prepare: false });

try {
  await sql`create table if not exists schema_migrations (
    filename text primary key,
    applied_at timestamptz not null default now()
  )`;

  const applied = new Set((await sql`select filename from schema_migrations`).map((r) => r.filename));
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const text = await readFile(join(dir, file), "utf8");
    console.log(`Applying ${file}…`);
    await sql.begin(async (tx) => {
      await tx.unsafe(text);
      await tx`insert into schema_migrations (filename) values (${file})`;
    });
    count++;
  }
  console.log(count ? `Applied ${count} migration(s).` : "No pending migrations.");
} catch (e) {
  console.error("Migration failed:", e);
  process.exitCode = 1;
} finally {
  await sql.end();
}
```

- [ ] **Step 2: Create `migrations/0001_baseline.sql`** (current schema, pre-`og_image`; all `if not exists`, so it no-ops on the live DB)

```sql
-- Baseline schema (pre og_image). Safe to run on an existing DB: every statement
-- uses "if not exists", so it adds nothing that already exists.

create table if not exists news (
  id serial primary key,
  title text not null,
  category text,
  body text,
  date date not null default current_date,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists faculty (
  id serial primary key,
  name text not null,
  subject text,
  department text,
  photo_url text,
  sort_order integer not null default 0
);

create table if not exists jobs (
  id serial primary key,
  role text not null,
  department text,
  type text,
  location text,
  closes_on date,
  description text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists alumni (
  id serial primary key,
  name text not null,
  batch_year text,
  role text,
  quote text,
  photo_url text,
  sort_order integer not null default 0
);

create table if not exists gallery (
  id serial primary key,
  title text,
  category text,
  kind text not null default 'photo',
  image_url text,
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
```

- [ ] **Step 3: Create `migrations/0002_jobs_og_image.sql`**

```sql
alter table jobs add column if not exists og_image text;
```

- [ ] **Step 4: Update `schema.sql` reference snapshot**

In `schema.sql`, in the `create table if not exists jobs (...)` block, add the
`og_image` line after `description text,`:

```sql
  description text,
  og_image    text,
  published   boolean not null default true,
```

- [ ] **Step 5: Verify the runner loads (syntax / discovery, no DB write needed)**

Run: `node -e "import('node:fs/promises').then(fs=>fs.readdir('migrations')).then(f=>console.log(f.sort()))"`
Expected: `[ '0001_baseline.sql', '0002_jobs_og_image.sql' ]`

(The actual `npm run migrate` against the live DB is a deploy step — see the end.)

- [ ] **Step 6: Commit**

```bash
git add scripts/migrate.mjs migrations/ schema.sql
git commit -m "Add versioned migration runner + jobs.og_image migration

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 10: Accept `og_image` in the API + admin

**Files:**
- Modify: `api/_lib/schemas.js`
- Modify: `src/admin/lib/resources.js`

- [ ] **Step 1: Add `og_image` to the jobs schema parser**

In `api/_lib/schemas.js`, in the `jobs.parse` object, add after the
`description` line:

```js
    description: str(b, "description", { max: 20000 }),
    og_image: str(b, "og_image", { max: 1000 }),
    published: bool(b, "published", true),
```

- [ ] **Step 2: Add the admin field + default**

In `src/admin/lib/resources.js`, in the `jobs` resource `fields` array, add after
the `description` field entry:

```js
      { name: "description", label: "Description", type: "textarea", placeholder: "Role details, qualifications, how to apply…" },
      { name: "og_image", label: "Share image", type: "image", folder: "jobs", help: "Optional. Shown when this job is shared on LinkedIn/Google. Falls back to the default careers image." },
      { name: "published", label: "Published", type: "checkbox", help: "When on, this appears on the Careers page." },
```

In the same `jobs` resource, update `defaults()` to include `og_image: ""`:

```js
    defaults: () => ({ role: "", department: "", type: "Full-time", location: "Mananchira, Kozhikode", closes_on: "", description: "", og_image: "", published: true }),
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add api/_lib/schemas.js src/admin/lib/resources.js
git commit -m "Accept optional og_image on jobs in API + admin form

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 11: Client document-meta hook

**Files:**
- Create: `src/lib/useDocumentMeta.js`

- [ ] **Step 1: Implement `src/lib/useDocumentMeta.js`**

```js
import { useEffect } from "react";

/*
 * Apply page metadata for client-side navigation: document.title, the
 * <link rel="canonical">, and optionally <meta name="robots">. Server-side
 * injection (api/meta) owns OG + JSON-LD for crawlers, so this intentionally
 * manages only title/canonical/robots to avoid duplicating server tags.
 *
 * Pass { title, canonical, robots }.
 */
export function useDocumentMeta({ title, canonical, robots } = {}) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    if (!canonical) return;
    let link = document.head.querySelector('link[rel="canonical"]');
    const created = !link;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const prev = link.getAttribute("href");
    link.setAttribute("href", canonical);
    return () => {
      if (created) link.remove();
      else if (prev != null) link.setAttribute("href", prev);
    };
  }, [canonical]);

  useEffect(() => {
    if (!robots) return;
    let tag = document.head.querySelector('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    const prev = tag.getAttribute("content");
    tag.setAttribute("content", robots);
    return () => {
      if (created) tag.remove();
      else if (prev != null) tag.setAttribute("content", prev);
    };
  }, [robots]);
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/useDocumentMeta.js
git commit -m "Add useDocumentMeta hook for client-side title/canonical/robots

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 12: ShareBar component

**Files:**
- Create: `src/components/ShareBar.jsx`

- [ ] **Step 1: Implement `src/components/ShareBar.jsx`**

```jsx
import { useState } from "react";
import { Icon } from "./Icon";

/*
 * Reusable social-share controls for any detail page. Pass the absolute `url`.
 * LinkedIn's share dialog reads only the URL — the rich card comes from the
 * Open Graph tags our server injects at that URL.
 */
export function ShareBar({ url, label = "Share this role" }) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", flexWrap: "wrap" }}>
      {label && <span className="label" style={{ color: "var(--text-muted)" }}>{label}</span>}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--maroon-800)" }}
      >
        <Icon name="linkedin-logo" size={18} /> LinkedIn
      </a>
      <button
        onClick={copy}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <Icon name={copied ? "check" : "link"} size={18} /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ShareBar.jsx
git commit -m "Add reusable ShareBar (LinkedIn + copy link)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 13: Job detail page

**Files:**
- Create: `src/pages/JobDetailPage.jsx`

- [ ] **Step 1: Implement `src/pages/JobDetailPage.jsx`**

```jsx
import { useParams } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";
import { ShareBar } from "../components/ShareBar";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

const FALLBACK_HERO = "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg";

function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export function JobDetailPage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: job, loading, error } = useApi(id ? `jobs/${id}` : "jobs/0");

  const notFound = !loading && (error || !job);
  const canonical = job ? `${window.location.origin}/careers/${slugify(job.role)}-${job.id}` : undefined;

  useDocumentMeta({
    title: job ? `${job.role} — ${SITE_NAME}` : `Careers — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) {
    return (
      <div className="section">
        <div className="container container--wide">Loading…</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>Careers</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>
            This opening is no longer available.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            The role you're looking for may have closed or been filled. See our current openings, or send us your CV.
          </p>
          <TextLink onClick={() => onNavigate("careers")}>View current openings</TextLink>
        </div>
      </div>
    );
  }

  const facts = [job.type, job.location].filter(Boolean).join(" · ");
  return (
    <div>
      <PageHero
        onNavigate={onNavigate}
        crumb="Careers"
        eyebrow={job.department || "Careers"}
        title={job.role}
        lead={facts}
        image={job.og_image || FALLBACK_HERO}
      />
      <section className="section">
        <div className="container container--wide">
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: "var(--space-12)" }}>
            <div>
              {fmtDate(job.closes_on) && (
                <Reveal>
                  <div className="label" style={{ color: "var(--gold-700)", marginBottom: "1.4rem" }}>
                    Closes {fmtDate(job.closes_on)}
                  </div>
                </Reveal>
              )}
              <Reveal>
                <div className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
                  {job.description || "Details for this role are available on request — please get in touch."}
                </div>
              </Reveal>
              <Reveal>
                <div style={{ marginTop: "var(--space-10)" }}>
                  <TextLink onClick={() => onNavigate("contact")}>Apply for this role</TextLink>
                </div>
              </Reveal>
            </div>
            <aside style={{ alignSelf: "start", position: "sticky", top: 110, display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              <div>
                <Label>Share</Label>
                <div className="rule--gold" style={{ margin: "1rem 0" }} />
                {canonical && <ShareBar url={canonical} />}
              </div>
              <TextLink onClick={() => onNavigate("careers")}>← All openings</TextLink>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/JobDetailPage.jsx
git commit -m "Add job detail page with share bar + client meta

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 14: Routing + careers list links

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/pages/CareersPage.jsx`

- [ ] **Step 1: Import the detail page and add the route**

In `src/App.jsx`, add the import after the `CareersPage` import:

```js
import { CareersPage } from "./pages/CareersPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { ContactPage } from "./pages/ContactPage";
```

Add the route immediately after the existing `/careers` route (before the `*` route):

```jsx
          <Route path="/careers" element={<CareersPage onNavigate={onNavigate} />} />
          <Route path="/careers/:slug" element={<JobDetailPage onNavigate={onNavigate} />} />
```

- [ ] **Step 2: Let `onNavigate` pass through raw paths and mark careers current**

In `src/App.jsx`, replace the `current` and `onNavigate` lines inside
`PublicSite`:

```js
  const current = PATH_TO_ID[location.pathname] || (location.pathname.startsWith("/careers") ? "careers" : "home");

  const onNavigate = (id) => navigate(typeof id === "string" && id.startsWith("/") ? id : ID_TO_PATH[id] || "/");
```

- [ ] **Step 3: Link each opening to its detail page**

In `src/pages/CareersPage.jsx`, add the slug import at the top with the other
imports:

```js
import { useApi } from "../lib/useApi";
import { slugify } from "../../shared/meta/index.js";
```

In the `Openings` component, replace the vacancy `.map(...)` block so each row
navigates to the detail page. Replace this existing block:

```jsx
            {vacancies.map((v, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  onMouseEnter={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--maroon-800)"; }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--text-primary)"; }}
                  className="index-row ed-index-row"
                  style={{ display: "grid", gridTemplateColumns: "6fr 4fr auto", gap: "clamp(1rem,3vw,2.4rem)", padding: "clamp(1.6rem,2.8vw,2.4rem) 0", alignItems: "center" }}
                >
                  <div>
                    <h3 className="ed-role" style={{ fontSize: "clamp(1.4rem,1.1rem + 1vw,2rem)", fontWeight: 400, transition: "color var(--dur)" }}>{v.role}</h3>
                    <div className="label" style={{ marginTop: "0.55rem", color: "var(--gold-700)" }}>{v.department}</div>
                  </div>
                  <div className="ed-index-desc" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--text-secondary)" }}>{[v.type, v.location].filter(Boolean).join(" · ")}</span>
                    {fmtDate(v.closes_on) && <span className="label" style={{ color: "var(--text-muted)" }}>Closes {fmtDate(v.closes_on)}</span>}
                  </div>
                  <TextLink onClick={() => onNavigate("contact")}>Apply</TextLink>
                </div>
              </Reveal>
            ))}
```

with:

```jsx
            {vacancies.map((v) => {
              const to = `/careers/${slugify(v.role)}-${v.id}`;
              return (
              <Reveal key={v.id} delay={0}>
                <div
                  onClick={() => onNavigate(to)}
                  onMouseEnter={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--maroon-800)"; }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--text-primary)"; }}
                  className="index-row ed-index-row"
                  style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "6fr 4fr auto", gap: "clamp(1rem,3vw,2.4rem)", padding: "clamp(1.6rem,2.8vw,2.4rem) 0", alignItems: "center" }}
                >
                  <div>
                    <h3 className="ed-role" style={{ fontSize: "clamp(1.4rem,1.1rem + 1vw,2rem)", fontWeight: 400, transition: "color var(--dur)" }}>{v.role}</h3>
                    <div className="label" style={{ marginTop: "0.55rem", color: "var(--gold-700)" }}>{v.department}</div>
                  </div>
                  <div className="ed-index-desc" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--text-secondary)" }}>{[v.type, v.location].filter(Boolean).join(" · ")}</span>
                    {fmtDate(v.closes_on) && <span className="label" style={{ color: "var(--text-muted)" }}>Closes {fmtDate(v.closes_on)}</span>}
                  </div>
                  <TextLink onClick={(e) => { e.stopPropagation(); onNavigate(to); }}>View role</TextLink>
                </div>
              </Reveal>
              );
            })}
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`, open `http://localhost:5173/careers`, click an opening.
Expected: navigates to `/careers/<slug>-<id>`, the detail page renders the role,
description, and a working "Copy link" + LinkedIn button; the browser tab title
becomes "<role> — Sri Gujarati Vidyalaya".

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/pages/CareersPage.jsx
git commit -m "Wire job detail route + link careers list to detail pages

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 15: Full verification + deploy steps

- [ ] **Step 1: Run the whole unit suite**

Run: `node --test`
Expected: all suites pass (strings, site, tags, jsonld, resolvers, render-meta).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: success; `dist/index.html` contains generic `og:` tags.

- [ ] **Step 3: Record the manual/deploy checklist in the PR description**

These cannot be verified on localhost and must be done against the deployment:

1. **DB migration:** `DATABASE_URL='<live>' npm run migrate`
   Expected: "Applying 0002_jobs_og_image.sql…" then "Applied 1 migration(s)."
   (0001 is recorded as applied; on an already-populated DB it no-ops.)
2. **Default OG image:** add a dedicated **1200×627 branded Careers image** at
   `public/assets/careers-og.jpg` (must read well on LinkedIn, Facebook, X,
   Discord, Slack, WhatsApp). Until present, social cards show a broken image.
3. **LinkedIn Post Inspector:** run a live `/careers/<slug>-<id>` URL through
   `https://www.linkedin.com/post-inspector/` → confirm role-specific card.
4. **Google Rich Results Test:** run the same URL → `JobPosting` validates with
   no errors; closed jobs (past `closes_on`) correctly omit structured data.

---

## Self-review notes (completed by plan author)

- **Spec coverage:** slug-id URLs (Task 5/7/14), per-job `og_image` with fallback
  (Tasks 9/10/5), description priority (Task 5), server JSON-LD with guards +
  enum (Task 4/7), canonical + robots (Tasks 5/11/13), generic OG fallbacks
  (Task 8), split cache headers (Task 7), entity-agnostic `resolveMetadata` +
  modular JSON-LD (Tasks 4/5), versioned migrations (Task 9), ShareBar (Task 12),
  job detail page (Task 13), local-dev inspection + post-deploy validation
  (Tasks 7/15). All spec sections map to a task.
- **Type consistency:** `resolveMetadata(type, entity, ctx)`, `metaConfig(type)`,
  `buildJsonLd(schemaType, entity, ctx)`, `tagsFromMeta(meta)`,
  `injectMeta(html, meta)`, `parseTrailingId(slug)`, and the meta-object shape are
  used identically across server, client, and tests.
- **No placeholders:** every code step contains complete, runnable code.
