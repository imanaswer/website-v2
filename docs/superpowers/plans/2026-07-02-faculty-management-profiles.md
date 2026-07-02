# Faculty Profiles + School Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make faculty cards clickable into data-driven profile pages, add search/filter/sort/grouping to the faculty listing, and add a parallel School Management section with its own listing and profile pages — all through the existing config-driven CMS, preserving the current design language.

**Architecture:** Reuse the existing `resource(config)` CRUD, the `JobDetailPage` slug pattern (`slugify(name)-{id}` decoded by `parseTrailingId`), the generic `api/meta.js` OG/JSON-LD endpoint, and the config-driven admin CMS. New work is: one migration, one endpoint (`api/management`), config entries, four reusable components, and four pages/rewrites. List fields (qualifications, achievements…) are stored as newline-separated text and split at render — no Postgres arrays, no new form widget.

**Tech Stack:** React 18 + react-router-dom 6, Vite, Vercel serverless functions, postgres.js, Node `--test`.

## Global Constraints

- **Vercel function budget: ≤ 12 serverless functions total.** Currently 10. This plan adds exactly ONE (`api/management/index.js`) → 11. Do not add another; management OG reuses `api/meta.js`.
- **No new npm dependencies.** Use existing components/helpers only.
- **Do not redesign.** Reuse existing CSS tokens/classes (`--font-serif`, `.section`, `.container`, `.faculty-grid`, `.photo`, `.label`, `Label`, etc.). No new visual language.
- **No fabricated content.** Rich profile fields render only when populated. Real faculty roster comes from `scripts/seed.mjs`; management is CMS-entered.
- **Slugs are derived, never stored:** `` `${slugify(name)}-${id}` ``. Detail lookup is by trailing id via `parseTrailingId`.
- **Site name string:** `Sri Gujarati Vidyalaya` (import `SITE_NAME`).
- Tests use Node `--test` on pure ES-module helpers only (matching existing `*.test.js`). No React test harness exists; pages are verified by `npm run build` + manual check.

---

### Task 1: Database migration + seed columns

**Files:**
- Create: `migrations/0003_profiles.sql`
- Modify: `scripts/seed.mjs`
- Modify: `schema.sql`

**Interfaces:**
- Produces: `faculty` table gains columns `designation, qualification, subjects, experience, bio, expertise, achievements, certifications, languages, email, office_hours, active`. New `management` table with `id, name, position, photo_url, bio, message, years_of_service, education, responsibilities, achievements, email, sort_order, active`.

- [ ] **Step 1: Write the migration**

Create `migrations/0003_profiles.sql`:

```sql
-- Faculty profile fields + School Management table. Idempotent.

alter table faculty add column if not exists designation text;
alter table faculty add column if not exists qualification text;
alter table faculty add column if not exists subjects text;
alter table faculty add column if not exists experience text;
alter table faculty add column if not exists bio text;
alter table faculty add column if not exists expertise text;
alter table faculty add column if not exists achievements text;
alter table faculty add column if not exists certifications text;
alter table faculty add column if not exists languages text;
alter table faculty add column if not exists email text;
alter table faculty add column if not exists office_hours text;
alter table faculty add column if not exists active boolean not null default true;

create table if not exists management (
  id serial primary key,
  name text not null,
  position text,
  photo_url text,
  bio text,
  message text,
  years_of_service text,
  education text,
  responsibilities text,
  achievements text,
  email text,
  sort_order integer not null default 0,
  active boolean not null default true
);
```

- [ ] **Step 2: Mirror into `schema.sql`**

In `schema.sql`, add the same new faculty columns to the `create table faculty` block (append the new columns before the closing `)`), and append the full `create table if not exists management (...)` block (copy from Step 1).

- [ ] **Step 3: Extend the seed insert so re-seeding preserves the new shape**

In `scripts/seed.mjs`, find the faculty insert loop. The `faculty` array rows are `[name, subject, department, photo_url]`. Update the insert to also set `active` (true) and leave rich fields null. Locate the faculty insert (search for `insert into faculty`) and ensure it lists explicit columns, e.g.:

```js
// faculty rows are [name, subject, department, photo_url]
for (let i = 0; i < faculty.length; i++) {
  const [name, subject, department, photo_url] = faculty[i];
  await sql`insert into faculty (name, subject, department, photo_url, sort_order, active)
            values (${name}, ${subject}, ${department}, ${photo_url}, ${i}, true)`;
}
```

(Adjust to match the file's existing delete-then-insert style; keep the existing `delete from faculty` / truncate that precedes it. Do NOT seed management.)

- [ ] **Step 4: Verify SQL parses**

Run: `node -e "const fs=require('fs');const s=fs.readFileSync('migrations/0003_profiles.sql','utf8');if(!/create table if not exists management/.test(s))process.exit(1);console.log('ok')"`
Expected: `ok`

- [ ] **Step 5: Commit**

```bash
git add migrations/0003_profiles.sql schema.sql scripts/seed.mjs
git commit -m "feat(db): faculty profile columns + management table"
```

---

### Task 2: `lines()` list helper + test

**Files:**
- Create: `src/lib/lists.js`
- Test: `src/lib/lists.test.js`

**Interfaces:**
- Produces: `lines(value: string) -> string[]` — splits on newlines, trims, drops empties. Used by every profile page to turn a textarea into a bulleted list.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lists.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { lines } from "./lists.js";

test("splits newline text into trimmed items", () => {
  assert.deepEqual(lines("M.Sc\nB.Ed\nM.Ed"), ["M.Sc", "B.Ed", "M.Ed"]);
});

test("drops blank lines and trims whitespace", () => {
  assert.deepEqual(lines("  A \n\n  B  \n"), ["A", "B"]);
});

test("empty / nullish input -> empty array", () => {
  assert.deepEqual(lines(""), []);
  assert.deepEqual(lines(null), []);
  assert.deepEqual(lines(undefined), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/lists.test.js`
Expected: FAIL — cannot find module `./lists.js`.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/lists.js`:

```js
/* Split a newline-separated textarea value into a clean list of items.
 * Used to render qualification / subjects / achievements etc. from a single
 * text column (the admin form has no array widget). */
export function lines(value) {
  return String(value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/lists.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/lists.js src/lib/lists.test.js
git commit -m "feat: lines() textarea-to-list helper"
```

---

### Task 3: Faculty listing transform (filter/sort/group) + test

**Files:**
- Create: `src/lib/faculty.js`
- Test: `src/lib/faculty.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `normalizeFaculty(rows) -> Person[]` where `Person = { id, name, subject, department, photo, active }` (maps DB rows; `photo` from `photo_url`).
  - `departmentsOf(people) -> string[]` — unique departments in first-seen order.
  - `filterSortGroup(people, { query, department, sort }) -> { name, people }[]` — filters by case-insensitive name `query` and exact `department` (`""` = all), sorts (`"default"` keeps input order, `"name-asc"`/`"name-desc"` by name), then groups by department preserving order. Inactive people (`active === false`) are dropped.

- [ ] **Step 1: Write the failing test**

Create `src/lib/faculty.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeFaculty, departmentsOf, filterSortGroup } from "./faculty.js";

const rows = [
  { id: 1, name: "Bina", subject: "Hindi", department: "Languages", photo_url: "b.jpg", active: true },
  { id: 2, name: "Asha", subject: "Physics", department: "Sciences", photo_url: "a.jpg", active: true },
  { id: 3, name: "Cara", subject: "English", department: "Languages", photo_url: "c.jpg", active: false },
];

test("normalizeFaculty maps photo_url -> photo", () => {
  const p = normalizeFaculty(rows);
  assert.equal(p[0].photo, "b.jpg");
  assert.equal(p[0].id, 1);
});

test("departmentsOf is unique, first-seen order", () => {
  assert.deepEqual(departmentsOf(normalizeFaculty(rows)), ["Languages", "Sciences"]);
});

test("filterSortGroup drops inactive and groups by department", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "", department: "", sort: "default" });
  assert.deepEqual(groups.map((g) => g.name), ["Languages", "Sciences"]);
  assert.deepEqual(groups[0].people.map((p) => p.name), ["Bina"]); // Cara inactive
});

test("query filters by name (case-insensitive)", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "as", department: "", sort: "default" });
  assert.deepEqual(groups.flatMap((g) => g.people).map((p) => p.name), ["Asha"]);
});

test("department filter narrows to one group", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "", department: "Sciences", sort: "default" });
  assert.deepEqual(groups.map((g) => g.name), ["Sciences"]);
});

test("name-asc sorts within groups", () => {
  const many = normalizeFaculty([
    { id: 1, name: "Zed", department: "X", active: true },
    { id: 2, name: "Ann", department: "X", active: true },
  ]);
  const groups = filterSortGroup(many, { query: "", department: "", sort: "name-asc" });
  assert.deepEqual(groups[0].people.map((p) => p.name), ["Ann", "Zed"]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/faculty.test.js`
Expected: FAIL — cannot find module `./faculty.js`.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/faculty.js`:

```js
/* Pure transforms for the faculty listing: normalize DB rows, derive the
 * department filter options, and produce department-grouped results after
 * search/filter/sort. No React, no DOM — unit-tested. */

export function normalizeFaculty(rows) {
  return (Array.isArray(rows) ? rows : []).map((r) => ({
    id: r.id,
    name: r.name,
    subject: r.subject || "",
    department: r.department || "Faculty",
    photo: r.photo_url || "",
    active: r.active !== false,
  }));
}

export function departmentsOf(people) {
  const seen = [];
  for (const p of people) if (!seen.includes(p.department)) seen.push(p.department);
  return seen;
}

export function filterSortGroup(people, { query = "", department = "", sort = "default" } = {}) {
  const q = query.trim().toLowerCase();
  let list = people.filter((p) => p.active);
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
  if (department) list = list.filter((p) => p.department === department);
  if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

  const order = [];
  const map = new Map();
  for (const p of list) {
    if (!map.has(p.department)) { map.set(p.department, []); order.push(p.department); }
    map.get(p.department).push(p);
  }
  return order.map((name) => ({ name, people: map.get(name) }));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/faculty.test.js`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/faculty.js src/lib/faculty.test.js
git commit -m "feat: faculty filter/sort/group transform"
```

---

### Task 4: Backend schemas + management endpoint

**Files:**
- Modify: `api/_lib/schemas.js`
- Create: `api/management/index.js`
- Modify: `api/faculty/index.js` (no change needed if it already imports `faculty` — verify only)

**Interfaces:**
- Consumes: `str`, `int`, `bool` from `api/_lib/validation.js`; `resource`, `withErrors`.
- Produces: `faculty` config extended with the new columns; new `management` config; `/api/management` + `/api/management/:id` endpoints.

- [ ] **Step 1: Extend the `faculty` config**

In `api/_lib/schemas.js`, replace the `faculty` export's `parse` to include the new columns (keep existing `name/subject/department/photo_url/sort_order`):

```js
export const faculty = {
  table: "faculty",
  order: "sort_order asc, id asc",
  publicFilter: "active",
  parse: (b) => ({
    name: str(b, "name", { required: true, max: 160, label: "a name" }),
    subject: str(b, "subject", { max: 120 }),
    department: str(b, "department", { max: 120 }),
    photo_url: str(b, "photo_url", { max: 1000 }),
    designation: str(b, "designation", { max: 200 }),
    qualification: str(b, "qualification", { max: 2000 }),
    subjects: str(b, "subjects", { max: 2000 }),
    experience: str(b, "experience", { max: 200 }),
    bio: str(b, "bio", { max: 20000 }),
    expertise: str(b, "expertise", { max: 4000 }),
    achievements: str(b, "achievements", { max: 4000 }),
    certifications: str(b, "certifications", { max: 4000 }),
    languages: str(b, "languages", { max: 1000 }),
    email: str(b, "email", { max: 320 }),
    office_hours: str(b, "office_hours", { max: 500 }),
    sort_order: int(b, "sort_order", 0),
    active: bool(b, "active", true),
  }),
};
```

- [ ] **Step 2: Add the `management` config**

Append to `api/_lib/schemas.js`:

```js
export const management = {
  table: "management",
  order: "sort_order asc, id asc",
  publicFilter: "active",
  parse: (b) => ({
    name: str(b, "name", { required: true, max: 160, label: "a name" }),
    position: str(b, "position", { max: 200 }),
    photo_url: str(b, "photo_url", { max: 1000 }),
    bio: str(b, "bio", { max: 20000 }),
    message: str(b, "message", { max: 20000 }),
    years_of_service: str(b, "years_of_service", { max: 200 }),
    education: str(b, "education", { max: 4000 }),
    responsibilities: str(b, "responsibilities", { max: 4000 }),
    achievements: str(b, "achievements", { max: 4000 }),
    email: str(b, "email", { max: 320 }),
    sort_order: int(b, "sort_order", 0),
    active: bool(b, "active", true),
  }),
};
```

- [ ] **Step 3: Verify `bool` supports a default** 

Open `api/_lib/validation.js` and confirm `bool(b, key, fallback)` accepts a third default arg (jobs config already calls `bool(b, "published", true)`). If the signature differs, match the existing call style used by `jobs`. No code change if it already works.

- [ ] **Step 4: Create the management endpoint**

Create `api/management/index.js`:

```js
import { withErrors } from "../_lib/response.js";
import { resource } from "../_lib/crud.js";
import { management } from "../_lib/schemas.js";

export default withErrors(resource(management));
```

- [ ] **Step 5: Verify function count ≤ 12**

Run: `find api -name '*.js' ! -name '*.test.js' -not -path '*/_lib/*' | wc -l`
Expected: `11`

- [ ] **Step 6: Commit**

```bash
git add api/_lib/schemas.js api/management/index.js
git commit -m "feat(api): faculty profile fields + management resource"
```

---

### Task 5: Meta resolvers + Person JSON-LD + rewrites

**Files:**
- Modify: `shared/meta/resolvers.js`
- Modify: `shared/meta/jsonld.js`
- Modify: `shared/meta/resolvers.test.js`
- Modify: `vercel.json`

**Interfaces:**
- Consumes: `slugify`, `truncate`, `SITE_NAME`, `absoluteUrl`, `DEFAULT_OG_IMAGE`, `buildJsonLd`.
- Produces: `META_RESOLVERS.faculty` and `META_RESOLVERS.management` entries (each `{ resolver, canonicalPath, table, publicFilter, lookupField }`); `JSONLD_BUILDERS.Person`. Canonical paths: `/faculty/${slugify(name)}-${id}`, `/management/${slugify(name)}-${id}`.

- [ ] **Step 1: Write the failing test**

Add to `shared/meta/resolvers.test.js` (append; keep existing imports/tests):

```js
test("faculty resolver builds titled OG + canonical", () => {
  const meta = resolveMetadata(
    "faculty",
    { id: 7, name: "Anjali Nair", designation: "Senior Mathematics Teacher", bio: "Loves calculus.", photo_url: "/p.jpg" },
    { origin: "https://x.test" }
  );
  assert.equal(meta.title, "Anjali Nair — Senior Mathematics Teacher — Sri Gujarati Vidyalaya");
  assert.equal(meta.canonical, "https://x.test/faculty/anjali-nair-7");
});

test("management resolver falls back to position when no bio", () => {
  const meta = resolveMetadata(
    "management",
    { id: 3, name: "Harshad Shah", position: "President" },
    { origin: "https://x.test" }
  );
  assert.equal(meta.canonical, "https://x.test/management/harshad-shah-3");
  assert.ok(meta.description.length > 0);
});
```

(If the existing test file imports `resolveMetadata`, reuse it; otherwise add `import { resolveMetadata } from "./resolvers.js";` and `import { test } from "node:test"; import assert from "node:assert/strict";` to match the file's style.)

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test shared/meta/resolvers.test.js`
Expected: FAIL — `resolveMetadata("faculty", …)` returns null.

- [ ] **Step 3: Add a Person JSON-LD builder**

In `shared/meta/jsonld.js`, add before the `JSONLD_BUILDERS` registry:

```js
/* Minimal Person node for a faculty/management profile. */
function person(entity, { origin } = {}) {
  if (!entity || !entity.name) return null;
  const node = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: entity.name,
    jobTitle: entity.designation || entity.position || undefined,
    worksFor: organizationNode(origin),
  };
  if (entity.photo_url) node.image = absoluteUrl(origin, entity.photo_url);
  if (entity.email) node.email = entity.email;
  return node;
}
```

Then extend the registry:

```js
export const JSONLD_BUILDERS = { JobPosting: jobPosting, Person: person };
```

- [ ] **Step 4: Add the two resolvers**

In `shared/meta/resolvers.js`, add before `META_RESOLVERS`:

```js
function personResolver(pathBase, roleField) {
  return function resolver(entity, ctx = {}) {
    const { origin } = ctx;
    const role = entity[roleField] || "";
    const path = `/${pathBase}/${slugify(entity.name)}-${entity.id}`;
    const url = absoluteUrl(origin, path);
    const hasPhoto = Boolean(entity.photo_url);
    const description = truncate(
      (entity.bio && entity.bio.trim()) || [entity.name, role].filter(Boolean).join(", "),
      200
    );
    return {
      title: [entity.name, role, SITE_NAME].filter(Boolean).join(" — "),
      description,
      image: hasPhoto ? absoluteUrl(origin, entity.photo_url) : absoluteUrl(origin, DEFAULT_OG_IMAGE.path),
      imageWidth: hasPhoto ? undefined : DEFAULT_OG_IMAGE.width,
      imageHeight: hasPhoto ? undefined : DEFAULT_OG_IMAGE.height,
      url,
      canonical: url,
      robots: "index,follow",
      type: "profile",
      jsonLd: buildJsonLd("Person", entity, ctx),
    };
  };
}
```

Then add entries to `META_RESOLVERS` (alongside `jobs`):

```js
  faculty: {
    resolver: personResolver("faculty", "designation"),
    canonicalPath: (r) => `/faculty/${slugify(r.name)}-${r.id}`,
    table: "faculty",
    publicFilter: "active",
    lookupField: "id",
  },
  management: {
    resolver: personResolver("management", "position"),
    canonicalPath: (r) => `/management/${slugify(r.name)}-${r.id}`,
    table: "management",
    publicFilter: "active",
    lookupField: "id",
  },
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test shared/meta/resolvers.test.js shared/meta/jsonld.test.js`
Expected: PASS (existing + 2 new).

- [ ] **Step 6: Add the rewrites**

In `vercel.json`, add the two profile rewrites above the API rewrite, and add `management` to the API id-rewrite regex group:

```json
{
  "rewrites": [
    { "source": "/careers/:slug", "destination": "/api/meta?type=jobs&slug=:slug" },
    { "source": "/faculty/:slug", "destination": "/api/meta?type=faculty&slug=:slug" },
    { "source": "/management/:slug", "destination": "/api/meta?type=management&slug=:slug" },
    { "source": "/api/:resource(news|faculty|jobs|gallery|alumni|management)/:id", "destination": "/api/:resource?id=:id" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

**Note:** the SPA routes must be `/faculty/:slug` and `/management/:slug`. The bare `/faculty` and `/management` listing pages are served by the last `index.html` rewrite (they don't match `:slug`).

- [ ] **Step 7: Commit**

```bash
git add shared/meta/resolvers.js shared/meta/jsonld.js shared/meta/resolvers.test.js vercel.json
git commit -m "feat(seo): faculty + management OG/JSON-LD resolvers and rewrites"
```

---

### Task 6: Reusable profile components

**Files:**
- Create: `src/components/ProfileCard.jsx`
- Create: `src/components/ProfileHeader.jsx`
- Create: `src/components/ProfileSection.jsx`

**Interfaces:**
- Consumes: `Img`, `Reveal`, `Label`, `slugify` (from `shared/meta/index.js`), `Link`/`useNavigate` (react-router-dom).
- Produces:
  - `ProfileCard({ person, basePath })` — `person = { id, name, photo, role }`. Renders a clickable card linking to `` `${basePath}/${slugify(person.name)}-${person.id}` `` when `person.id` is set; otherwise a non-clickable figure. `role` is the small gold sub-line.
  - `ProfileHeader({ photo, name, role, crumb })` — large photo + `<h1>` name + role line.
  - `ProfileSection({ title, text, items })` — titled block. Renders `text` as a paragraph and/or `items` (array) as a bulleted list. Renders **null** when both are empty.

- [ ] **Step 1: Create `ProfileSection.jsx`**

```jsx
import { Reveal } from "./Reveal";
import { Label } from "./Ed";

/* A titled profile block. Renders nothing when it has no content, so profile
 * pages never show empty headers. `items` renders as a list; `text` as a
 * paragraph (both optional). */
export function ProfileSection({ title, text, items }) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  const hasText = Boolean(text && String(text).trim());
  if (!hasText && list.length === 0) return null;
  return (
    <Reveal>
      <section style={{ marginTop: "var(--space-10)" }}>
        <Label>{title}</Label>
        <div className="rule--gold" style={{ margin: "1rem 0" }} />
        {hasText && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", whiteSpace: "pre-wrap", maxWidth: "60ch" }}>
            {text}
          </p>
        )}
        {list.length > 0 && (
          <ul style={{ margin: hasText ? "1rem 0 0" : 0, paddingLeft: "1.2rem", fontFamily: "var(--font-sans)", fontSize: "1.08rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            {list.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        )}
      </section>
    </Reveal>
  );
}
```

- [ ] **Step 2: Create `ProfileHeader.jsx`**

```jsx
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { Label } from "./Ed";

/* Detail-page header: large portrait + name + role. Emits the page's single
 * <h1>. Mirrors the PrincipalFeature layout so it matches the current design. */
export function ProfileHeader({ photo, name, role, crumb }) {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col principal-feature" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "center" }}>
            <div className="principal-photo-wrapper">
              <div className="photo photo-frame">
                <Img src={photo} alt={role ? `${name}, ${role}` : name} style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div className="principal-text-wrapper">
              {crumb && <Label>{crumb}</Label>}
              <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 1.8vw,2.8rem)", fontWeight: 400, margin: "1rem 0 0.4rem" }}>{name}</h1>
              {role && <div className="label" style={{ color: "var(--gold-700)" }}>{role}</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `ProfileCard.jsx`**

```jsx
import { Link } from "react-router-dom";
import { Img } from "./Img";
import { slugify } from "../../shared/meta/index.js";

/* One person card for a listing grid. Clickable (router Link) when the person
 * has an id; otherwise a plain figure (curated fallback rows have no id, so we
 * never render a dead link). `basePath` is e.g. "/faculty" or "/management". */
export function ProfileCard({ person, basePath }) {
  const inner = (
    <figure style={{ margin: 0 }}>
      <div className="photo photo-frame">
        <Img src={person.photo} alt={person.role ? `${person.name}, ${person.role}` : person.name} style={{ aspectRatio: "1/1" }} />
      </div>
      <figcaption style={{ marginTop: "0.9rem" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)", lineHeight: 1.25 }}>{person.name}</div>
        {person.role && <div className="label" style={{ marginTop: "0.35rem", color: "var(--gold-700)" }}>{person.role}</div>}
      </figcaption>
    </figure>
  );

  if (!person.id) return inner;
  return (
    <Link to={`${basePath}/${slugify(person.name)}-${person.id}`} className="profile-card-link" style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: "var(--radius-md, 8px)" }}>
      {inner}
    </Link>
  );
}
```

- [ ] **Step 4: Add a focus-visible style for the card link**

In `src/styles.css`, append:

```css
.profile-card-link { transition: transform var(--dur, .2s) var(--ease-out, ease); }
.profile-card-link:hover { transform: translateY(-3px); }
.profile-card-link:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 4px; }
```

- [ ] **Step 5: Verify build compiles**

Run: `npm run build`
Expected: build succeeds (these components are imported next task, but must parse now). If unused-import errors occur, they will clear once wired in Task 7.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProfileCard.jsx src/components/ProfileHeader.jsx src/components/ProfileSection.jsx src/styles.css
git commit -m "feat(ui): reusable ProfileCard/Header/Section components"
```

---

### Task 7: Faculty listing rewrite + toolbar

**Files:**
- Modify: `src/pages/FacultyPage.jsx`

**Interfaces:**
- Consumes: `normalizeFaculty`, `departmentsOf`, `filterSortGroup` (Task 3); `ProfileCard` (Task 6); existing `PageHero`, `Reveal`, `Label`, `Img`, `TextLink`, `useApi`.
- Produces: faculty listing with search/department-filter/sort, department grouping, clickable `ProfileCard`s.

- [ ] **Step 1: Rewrite FacultyPage**

Replace the body of `src/pages/FacultyPage.jsx`. Keep the `BASE`/`HERO`/`PRINCIPAL` constants, `DEPARTMENTS`/`FALLBACK_DEPARTMENTS`, `PrincipalFeature`, and `FacultyCTA` as-is. Replace `PersonCard`, `buildDepartments`, `Department`, and the `FacultyPage` export with:

```jsx
import { useMemo, useState } from "react";
import { normalizeFaculty, departmentsOf, filterSortGroup } from "../lib/faculty";
import { ProfileCard } from "../components/ProfileCard";
// (existing imports: Img, Reveal, PageHero, TextLink, Label, useApi remain)

/* Flatten the curated fallback into normalizeFaculty's row shape (no ids -> not
 * clickable) so the same pipeline drives both DB and fallback content. */
function fallbackRows() {
  const rows = [];
  for (const d of FALLBACK_DEPARTMENTS) {
    for (const p of d.people) rows.push({ name: p.n, subject: p.s, department: d.name, photo_url: p.img, active: true });
  }
  return rows;
}

function Toolbar({ query, setQuery, department, setDepartment, sort, setSort, departments }) {
  return (
    <div className="faculty-toolbar" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
      <label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Search</span>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" aria-label="Search faculty by name"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Department</span>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }}>
          <option value="">All departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Sort</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort faculty"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }}>
          <option value="default">Default order</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </label>
    </div>
  );
}

function Department({ dept, index }) {
  return (
    <section className="section" style={index % 2 === 1 ? { background: "var(--surface-raised)" } : undefined}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
            <Label>{dept.name}</Label>
            <span className="rule" style={{ flex: 1 }} />
          </div>
        </Reveal>
        <Reveal>
          <div className="faculty-grid">
            {dept.people.map((p) => (
              <ProfileCard key={p.id ?? p.name} person={{ id: p.id, name: p.name, photo: p.photo, role: p.subject }} basePath="/faculty" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FacultyPage({ onNavigate }) {
  const { data } = useApi("faculty");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [sort, setSort] = useState("default");

  const people = useMemo(
    () => normalizeFaculty(Array.isArray(data) && data.length ? data : fallbackRows()),
    [data]
  );
  const departments = useMemo(() => departmentsOf(people), [people]);
  const groups = useMemo(() => filterSortGroup(people, { query, department, sort }), [people, query, department, sort]);

  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Faculty" eyebrow="Our Faculty"
        title="The teachers behind every child"
        lead="A dedicated faculty across languages, the sciences, commerce, computing and the arts — guided by our Principal, Vimala Jayaraj."
        image={HERO} />
      <PrincipalFeature />
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container container--wide">
          <Toolbar query={query} setQuery={setQuery} department={department} setDepartment={setDepartment}
            sort={sort} setSort={setSort} departments={departments} />
        </div>
      </section>
      {groups.length === 0 ? (
        <section className="section"><div className="container container--wide"><p style={{ color: "var(--text-secondary)" }}>No faculty match your search.</p></div></section>
      ) : (
        groups.map((dept, i) => <Department key={dept.name} dept={dept} index={i} />)
      )}
      <FacultyCTA onNavigate={onNavigate} />
    </div>
  );
}
```

Ensure the top-of-file imports still include `Img`, `Reveal`, `PageHero`, `TextLink`, `Label`, `useApi` (they are already there from the original file). Remove the now-unused `buildDepartments` if it remains.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manual check**

Run `npm run dev`, open `/faculty`. Verify: department groups render, search narrows by name, department dropdown filters, sort reorders, and (against a seeded DB) cards are clickable. Without a DB, fallback cards show and are non-clickable.

- [ ] **Step 4: Commit**

```bash
git add src/pages/FacultyPage.jsx
git commit -m "feat(faculty): search/filter/sort + clickable cards"
```

---

### Task 8: Faculty & Management profile pages

**Files:**
- Create: `src/pages/FacultyProfilePage.jsx`
- Create: `src/pages/ManagementPage.jsx`
- Create: `src/pages/ManagementProfilePage.jsx`

**Interfaces:**
- Consumes: `useParams`, `parseTrailingId`, `slugify`, `SITE_NAME`; `useApi`, `useDocumentMeta`; `ProfileHeader`, `ProfileSection`, `ProfileCard`; `lines`; existing `PageHero`, `Label`, `TextLink`, `Reveal`.
- Produces: three routed pages.

- [ ] **Step 1: Create `FacultyProfilePage.jsx`**

```jsx
import { useParams } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileSection } from "../components/ProfileSection";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { lines } from "../lib/lists";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

export function FacultyProfilePage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: f, loading, error } = useApi(id ? `faculty/${id}` : "faculty/0");
  const notFound = !loading && (error || !f);
  const canonical = f ? `${window.location.origin}/faculty/${slugify(f.name)}-${f.id}` : undefined;
  const role = f && (f.designation || f.subject) ? (f.designation || f.subject) : "";

  useDocumentMeta({
    title: f ? [f.name, role, SITE_NAME].filter(Boolean).join(" — ") : `Faculty — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) return <div className="section"><div className="container container--wide">Loading…</div></div>;

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>Faculty</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>This profile isn’t available.</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            The faculty member you’re looking for may have moved. See our full faculty.
          </p>
          <TextLink onClick={() => onNavigate("faculty")}>View all faculty</TextLink>
        </div>
      </div>
    );
  }

  const subjects = lines(f.subjects);
  const subjectItems = subjects.length ? subjects : (f.subject ? [f.subject] : []);
  return (
    <div>
      <ProfileHeader photo={f.photo_url} name={f.name} role={role} crumb={f.department || "Faculty"} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <ProfileSection title="About" text={f.bio} />
          <ProfileSection title="Qualification" items={lines(f.qualification)} />
          <ProfileSection title="Experience" text={f.experience} />
          <ProfileSection title="Subjects" items={subjectItems} />
          <ProfileSection title="Areas of Expertise" items={lines(f.expertise)} />
          <ProfileSection title="Achievements" items={lines(f.achievements)} />
          <ProfileSection title="Certifications" items={lines(f.certifications)} />
          <ProfileSection title="Languages Known" items={lines(f.languages)} />
          {(f.email || f.office_hours) && (
            <ProfileSection title="Contact" items={[f.email, f.office_hours && `Office hours: ${f.office_hours}`].filter(Boolean)} />
          )}
          <div style={{ marginTop: "var(--space-12)" }}>
            <TextLink onClick={() => onNavigate("faculty")}>← All faculty</TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `ManagementProfilePage.jsx`**

```jsx
import { useParams } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileSection } from "../components/ProfileSection";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { lines } from "../lib/lists";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

export function ManagementProfilePage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: m, loading, error } = useApi(id ? `management/${id}` : "management/0");
  const notFound = !loading && (error || !m);
  const canonical = m ? `${window.location.origin}/management/${slugify(m.name)}-${m.id}` : undefined;

  useDocumentMeta({
    title: m ? [m.name, m.position, SITE_NAME].filter(Boolean).join(" — ") : `School Management — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) return <div className="section"><div className="container container--wide">Loading…</div></div>;

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>School Management</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>This profile isn’t available.</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            See our full leadership team.
          </p>
          <TextLink onClick={() => onNavigate("management")}>View School Management</TextLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader photo={m.photo_url} name={m.name} role={m.position} crumb="School Management" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <ProfileSection title="Biography" text={m.bio} />
          <ProfileSection title="Message" text={m.message} />
          <ProfileSection title="Years of Service" text={m.years_of_service} />
          <ProfileSection title="Education" items={lines(m.education)} />
          <ProfileSection title="Responsibilities" items={lines(m.responsibilities)} />
          <ProfileSection title="Achievements" items={lines(m.achievements)} />
          {m.email && <ProfileSection title="Contact" items={[m.email]} />}
          <div style={{ marginTop: "var(--space-12)" }}>
            <TextLink onClick={() => onNavigate("management")}>← School Management</TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Create `ManagementPage.jsx`**

```jsx
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Label } from "../components/Ed";
import { ProfileCard } from "../components/ProfileCard";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { SITE_NAME } from "../../shared/meta/index.js";

const HERO = "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg";

export function ManagementPage({ onNavigate }) {
  const { data } = useApi("management");
  const people = (Array.isArray(data) ? data : []).map((m) => ({ id: m.id, name: m.name, photo: m.photo_url || "", role: m.position || "" }));

  useDocumentMeta({
    title: `School Management — ${SITE_NAME}`,
    canonical: `${window.location.origin}/management`,
  });

  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="School Management" eyebrow="Leadership"
        title="The people who steer the school"
        lead="Our trustees, office-bearers and executive committee — the leadership behind a 150-year-old institution."
        image={HERO} />
      <section className="section">
        <div className="container container--wide">
          {people.length === 0 ? (
            <Reveal><p style={{ color: "var(--text-secondary)" }}>Our leadership team will be published here shortly.</p></Reveal>
          ) : (
            <>
              <Reveal>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
                  <Label>Leadership Team</Label>
                  <span className="rule" style={{ flex: 1 }} />
                </div>
              </Reveal>
              <Reveal>
                <div className="faculty-grid">
                  {people.map((p) => <ProfileCard key={p.id ?? p.name} person={p} basePath="/management" />)}
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: succeeds (pages compile; routing wired next task).

- [ ] **Step 5: Commit**

```bash
git add src/pages/FacultyProfilePage.jsx src/pages/ManagementPage.jsx src/pages/ManagementProfilePage.jsx
git commit -m "feat(pages): faculty + management profile and listing pages"
```

---

### Task 9: Routing + navigation wiring

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/SiteHeader.jsx`

**Interfaces:**
- Consumes: the three pages from Task 8 and existing `FacultyPage`.
- Produces: routes `/faculty/:slug`, `/management`, `/management/:slug`; nav item `Management`; `ID_TO_PATH.management = "/management"`.

- [ ] **Step 1: Wire routes in `App.jsx`**

Add imports:

```jsx
import { FacultyProfilePage } from "./pages/FacultyProfilePage";
import { ManagementPage } from "./pages/ManagementPage";
import { ManagementProfilePage } from "./pages/ManagementProfilePage";
```

Add `management` to `ID_TO_PATH` (after `faculty`):

```js
  admissions: "/admissions", gallery: "/campus", alumni: "/alumni",
  careers: "/careers", contact: "/contact", management: "/management",
```

Add routes inside `<Routes>` (after the existing `/faculty` route):

```jsx
          <Route path="/faculty/:slug" element={<FacultyProfilePage onNavigate={onNavigate} />} />
          <Route path="/management" element={<ManagementPage onNavigate={onNavigate} />} />
          <Route path="/management/:slug" element={<ManagementProfilePage onNavigate={onNavigate} />} />
```

Note: `current` derivation uses `PATH_TO_ID[location.pathname]`; `/management` maps via the new `ID_TO_PATH` entry. Profile sub-routes fall through to `home` highlighting, which is acceptable (matches how `/careers/:slug` behaves).

- [ ] **Step 2: Add the nav item in `SiteHeader.jsx`**

In the `NAV` array, add after the `faculty` entry:

```js
  { id: "management",  label: "Management" },
```

- [ ] **Step 3: Build + manual check**

Run: `npm run build` (expect success), then `npm run dev` and verify:
- `/management` renders (empty-state without DB data).
- Clicking a seeded faculty card navigates to `/faculty/<name>-<id>` and back-links work.
- Nav shows **Management** on desktop and mobile.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/components/SiteHeader.jsx
git commit -m "feat(nav): routes + Management nav item"
```

---

### Task 10: Admin CMS config

**Files:**
- Modify: `src/admin/lib/resources.js`

**Interfaces:**
- Consumes: existing generic `ResourceList`/`ResourceForm` (no change).
- Produces: extended `faculty` config + new `management` config entry, so both are fully editable in `/admin` including the newline-list fields.

- [ ] **Step 1: Extend the `faculty` resource config**

Replace the `faculty` entry's `fields` and `defaults` in `src/admin/lib/resources.js`:

```js
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", half: true, placeholder: "e.g. Senior Mathematics Teacher" },
      { name: "subject", label: "Primary subject", type: "text", half: true, placeholder: "e.g. Physics" },
      { name: "department", label: "Department", type: "text", half: true, placeholder: "e.g. Mathematics & Sciences" },
      { name: "experience", label: "Experience", type: "text", half: true, placeholder: "e.g. 18 Years" },
      { name: "photo_url", label: "Photo", type: "image", folder: "faculty" },
      { name: "bio", label: "Biography", type: "textarea", placeholder: "About this teacher…" },
      { name: "qualification", label: "Qualifications", type: "textarea", help: "One per line — e.g. M.Sc / B.Ed / M.Ed" },
      { name: "subjects", label: "Subjects handled", type: "textarea", help: "One per line. Leave blank to use the primary subject." },
      { name: "expertise", label: "Areas of expertise", type: "textarea", help: "One per line." },
      { name: "achievements", label: "Awards & achievements", type: "textarea", help: "One per line." },
      { name: "certifications", label: "Certifications", type: "textarea", help: "One per line." },
      { name: "languages", label: "Languages known", type: "textarea", help: "One per line. Optional." },
      { name: "email", label: "Contact email", type: "text", half: true, placeholder: "name@example.com" },
      { name: "office_hours", label: "Office hours", type: "text", half: true, placeholder: "e.g. Mon–Fri, 10–11am" },
      { name: "sort_order", label: "Sort order", type: "number", half: true, help: "Lower numbers show first." },
      { name: "active", label: "Active", type: "checkbox", help: "When off, this profile is hidden from the site." },
    ],
    defaults: () => ({ name: "", designation: "", subject: "", department: "", experience: "", photo_url: "", bio: "", qualification: "", subjects: "", expertise: "", achievements: "", certifications: "", languages: "", email: "", office_hours: "", sort_order: 0, active: true }),
```

- [ ] **Step 2: Add the `management` resource config**

Append a new entry to the `RESOURCES` array:

```js
  {
    key: "management", path: "management", label: "School Management", icon: "users-three",
    primary: "name",
    subtitle: (r) => [r.position].filter(Boolean).join(" · "),
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "position", label: "Position", type: "text", half: true, placeholder: "e.g. President" },
      { name: "years_of_service", label: "Years of service", type: "text", half: true, placeholder: "e.g. 12 Years" },
      { name: "photo_url", label: "Photo", type: "image", folder: "management" },
      { name: "bio", label: "Biography", type: "textarea", placeholder: "About this member…" },
      { name: "message", label: "Message from the member", type: "textarea", help: "Optional." },
      { name: "education", label: "Education", type: "textarea", help: "One per line. Optional." },
      { name: "responsibilities", label: "Responsibilities", type: "textarea", help: "One per line." },
      { name: "achievements", label: "Achievements", type: "textarea", help: "One per line." },
      { name: "email", label: "Contact email", type: "text", half: true, placeholder: "name@example.com" },
      { name: "sort_order", label: "Sort order", type: "number", half: true, help: "Lower numbers show first." },
      { name: "active", label: "Active", type: "checkbox", help: "When off, this profile is hidden from the site." },
    ],
    defaults: () => ({ name: "", position: "", years_of_service: "", photo_url: "", bio: "", message: "", education: "", responsibilities: "", achievements: "", email: "", sort_order: 0, active: true }),
  },
```

- [ ] **Step 3: Confirm the image `folder: "management"` is acceptable to uploads**

Check `api/uploads/index.js` / `api/_lib/storage.js` for a folder allowlist. If uploads restrict folders to a fixed set, add `"management"` to that set. If folders are unrestricted, no change.

- [ ] **Step 4: Build + manual check**

Run: `npm run build` (expect success). Then `npm run dev`, open `/admin`, log in, and confirm **Faculty** shows the new fields and **School Management** appears as a new module with a working create form.

- [ ] **Step 5: Commit**

```bash
git add src/admin/lib/resources.js
git commit -m "feat(cms): faculty profile fields + management admin module"
```

---

### Task 11: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all Node `--test` files pass (existing + `lists.test.js`, `faculty.test.js`, extended `resolvers.test.js`).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: succeeds with no errors.

- [ ] **Step 3: Function budget guard**

Run: `find api -name '*.js' ! -name '*.test.js' -not -path '*/_lib/*' | wc -l`
Expected: `11` (≤ 12).

- [ ] **Step 4: Final commit (if any lint/cleanup)**

```bash
git add -A
git commit -m "chore: faculty profiles + management section verification" || echo "nothing to commit"
```

---

## Self-Review

**Spec coverage:**
- Clickable faculty cards → Task 6 (`ProfileCard`), Task 7. ✓
- Dynamic faculty profile pages `/faculty/[slug]` → Task 8 + Task 9 routing + Task 5 rewrites. ✓
- Full profile field set (photo, name, designation, dept, subjects, qualification, experience, bio, expertise, achievements, certifications, languages, email, office hours) → Task 1 columns + Task 8 render. ✓
- Search / department filter / sort / department grouping → Task 3 + Task 7. ✓
- School Management section (separate, not mixed) → Tasks 1,4,8,9,10. ✓
- Management profile pages `/management/[slug]` (bio, message, years of service, education, achievements, responsibilities, contact) → Task 1 + Task 8. ✓
- Data-driven model / CMS → Tasks 1,4,10 (no hardcoded profiles). ✓
- Reusable components (ProfileCard, ProfileHeader, AchievementList/QualificationSection→ProfileSection, DepartmentFilter/SearchBar→Toolbar, ManagementCard→ProfileCard) → Tasks 6,7. ✓ (consolidated per design)
- SEO metadata (title/description/OG/canonical) → Task 5 (server) + Task 8 (client). ✓
- Accessibility (semantic HTML, keyboard via `<Link>`/native controls, `<h1>`/`<h2>` hierarchy, alt text, focus states, aria labels) → Tasks 6,7,8. ✓
- Performance (lazy images via existing `Img`, no new deps, reused styles) → Global Constraints + component reuse. ✓

**Placeholder scan:** No TBD/TODO; every code step contains complete code. ✓

**Type consistency:** `normalizeFaculty` → `{ id, name, subject, department, photo, active }`; `ProfileCard` consumes `{ id, name, photo, role }` (role mapped from `subject`/`position` at call sites in Tasks 7/8) — consistent. `filterSortGroup` signature matches its test and its FacultyPage call. `personResolver(pathBase, roleField)` matches both registry entries. ✓

**Deferred/again:** management folder allowlist (Task 10 Step 3) and `bool` default arg (Task 4 Step 3) are verify-only guards, not assumptions.
