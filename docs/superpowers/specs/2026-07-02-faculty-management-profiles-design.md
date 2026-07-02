# Faculty directory + profiles & School Management — Design

**Date:** 2026-07-02
**Branch:** fix/language-switcher-dropdown-clip (feature work will branch from here)

## Goal

Make faculty cards clickable into dedicated profile pages, add search / filter /
sort to the faculty listing, and introduce a parallel **School Management**
section with its own listing and profile pages. Everything data-driven through
the existing config-driven CMS. Preserve the current design language entirely —
this extends, it does not redesign.

## Decisions (confirmed with user)

1. **URLs:** `name-slug-{id}` (e.g. `/faculty/anjali-nair-7`, `/management/harshad-shah-3`).
   Reuses `slugify` + `parseTrailingId`; gets server-rendered OG/JSON-LD via the
   existing generic `api/meta.js`. Matches the Careers convention exactly.
2. **Content:** CMS-driven, not fabricated. Real faculty roster (already in
   `scripts/seed.mjs`) provides name/photo/dept/subject; rich fields render only
   when an admin fills them. Management starts empty (empty-state) until members
   are added via `/admin`.
3. **Nav:** a flat top-level **Management** link beside Faculty. No dropdown.

## Architecture — reuse over invention

The codebase already has every primitive we need. This feature is almost entirely
*configuration + two pages + one endpoint*, not new infrastructure.

| Concern | Existing thing we reuse |
|---|---|
| REST CRUD for a table | `resource(config)` in `api/_lib/crud.js` |
| Content-type config | `schemas.js` (server) + `admin/lib/resources.js` (CMS forms) |
| Detail page pattern | `JobDetailPage.jsx` (slug → `parseTrailingId` → `useApi`) |
| Client title/canonical | `useDocumentMeta` |
| Server OG + JSON-LD | `api/meta.js` + `META_RESOLVERS` registry (add 2 entries) |
| Slug helpers | `slugify`, `parseTrailingId`, `truncate` in `shared/meta/strings.js` |
| Data fetch + fallback | `useApi` |

### Function budget
Currently **10/12** Vercel functions. Adding `api/management/index.js` → **11/12**.
That is the last new endpoint we can afford — management OG reuses the shared
`api/meta.js` (switch on `?type=`), **no** separate detail/by-slug function.

## Data model

### faculty (ALTER existing table — migration `0003`)
Add nullable columns; existing 5 columns (`name, subject, department, photo_url,
sort_order`) stay. `sort_order` already serves `displayOrder`.

```
designation text
qualification text      -- newline-separated list
subjects text           -- newline-separated list (supplements existing single `subject`)
experience text         -- free text, e.g. "18 Years"
bio text
expertise text          -- newline-separated list
achievements text       -- newline-separated list
certifications text      -- newline-separated list
languages text          -- newline-separated list (optional)
email text
office_hours text
active boolean not null default true
slug -> NOT stored; derived at render as slugify(name)-{id}
```

### management (new table — migration `0003`)
```
id serial pk
name text not null
position text
photo_url text
bio text
message text            -- "message from the member" (optional)
years_of_service text
education text          -- newline-separated list
responsibilities text    -- newline-separated list
achievements text       -- newline-separated list
email text
sort_order integer not null default 0
active boolean not null default true
```

**List fields as newline-separated text, not Postgres arrays.** The admin
`ResourceForm` has no array widget; a `textarea` split on `\n` at render gives
the `qualification[] / achievements[] …` the spec asks for with zero new form
infrastructure. A tiny `lines(str)` helper does the split. (ponytail: upgrade to
array columns + a repeater widget only if per-item editing is ever needed.)

**`active`** filtered on public reads; **`sort_order`** orders them — mirroring
the existing pattern. Public list endpoints currently return all rows; we add an
`active` publicFilter equivalent for these two configs.

## Backend changes

1. **`migrations/0003_profiles.sql`** — `alter table faculty add column if not
   exists …`; `create table if not exists management …`. Idempotent, same style
   as existing migrations.
2. **`api/_lib/schemas.js`** — extend `faculty.parse` with the new columns; add a
   `management` config. Use existing `str/int/bool` validators. Add `active`
   handling; set `publicFilter: "active"` so public reads hide inactive rows
   (note: `active` defaults true, so existing rows stay visible).
3. **`api/management/index.js`** — `export default withErrors(resource(management))`.
   One line, mirrors `api/faculty/index.js`.
4. **`shared/meta/resolvers.js`** — add `faculty` and `management` entries to
   `META_RESOLVERS` (Person-style OG: title `Name — Designation — SITE_NAME`,
   description from bio/designation, photo as image). Add a `Person` builder to
   `JSONLD_BUILDERS` in `jsonld.js` (or pass `jsonLd: null` — Person JSON-LD is a
   nice-to-have; include a minimal one).
5. **`vercel.json`** — add rewrites:
   - `/faculty/:slug` → `/api/meta?type=faculty&slug=:slug`
   - `/management/:slug` → `/api/meta?type=management&slug=:slug`
   - extend the API id-rewrite regex group to include `management`.
6. **`scripts/seed.mjs`** — extend faculty insert to include new columns (blank),
   so re-seeding doesn't drop them. No fabricated bios. Management seed: none (or
   an empty array) — admins add members.

## Frontend changes

### Reusable components (`src/components/`)
Built only where there are ≥2 real consumers or the spec names them explicitly.
All use existing tokens/classes — no new visual language.

- **`ProfileCard`** — photo + name + role + optional short line; wrapped in a
  router `<Link>` when the row has an id (clickable), plain `<figure>` otherwise.
  Consumers: faculty listing **and** management listing. *(Refactors the current
  inline `PersonCard`.)*
- **`ProfileHeader`** — large photo + name + designation/position block for detail
  pages. Consumers: faculty + management detail.
- **`ProfileSection`** — a titled section with an optional bulleted list; renders
  **nothing when empty**. Powers About / Qualification / Subjects / Achievements /
  Certifications / Responsibilities / Education. This single component covers the
  spec's `AchievementList` + `QualificationSection` (they're the same shape) —
  one component, not three. (ponytail: no separate `AchievementList`/
  `QualificationSection` — they'd be identical.)
- **`FacultyToolbar`** — search input + department `<select>` + sort `<select>`.
  Uses existing `Input`/`Select` components. This is the spec's `SearchBar` +
  `DepartmentFilter` combined; one consumer (faculty listing), kept thin.

### Pages
- **`FacultyPage.jsx`** (rewrite listing behaviour, keep hero + principal
  feature + CTA):
  - State: `query`, `department`, `sort`. Derive department options from the
    data (unique departments), not hardcoded.
  - Filter/sort the flat list, then group with the existing `buildDepartments`
    logic → still renders "Primary / Higher Secondary / …" department groups.
  - Cards → `ProfileCard`, clickable when the row has an id.
  - Fallback roster (no ids) renders non-clickable, exactly as today — no dead
    links. Once the DB is seeded (real roster already in `seed.mjs`) cards link
    out.
- **`FacultyProfilePage.jsx`** (new, modeled on `JobDetailPage`): slug →
  `parseTrailingId` → `useApi("faculty/{id}")` → `ProfileHeader` + `ProfileSection`s.
  Not-found state mirrors JobDetailPage. `useDocumentMeta` for title/canonical.
- **`ManagementPage.jsx`** (new): hero + `ProfileCard` grid from
  `useApi("management")`. Empty-state message when none.
- **`ManagementProfilePage.jsx`** (new): same shape as faculty profile, with
  management fields (position, message, years of service, responsibilities…).

### Routing (`App.jsx`)
Add routes + `ID_TO_PATH` entry for `management`:
```
/faculty/:slug        -> FacultyProfilePage
/management           -> ManagementPage
/management/:slug     -> ManagementProfilePage
```
`onNavigate` already passes through absolute paths (`startsWith("/")`), so cards
navigate via `onNavigate('/faculty/anjali-nair-7')` or a router `<Link>`.

### Nav (`SiteHeader.jsx`)
Add `{ id: "management", label: "Management" }` to `NAV` after `faculty`. Works in
desktop + mobile lists unchanged. `PATH_TO_ID`/`ID_TO_PATH` get `management: "/management"`.

### CMS (`admin/lib/resources.js`)
- Extend the `faculty` config with the new fields (textareas for list fields,
  text for the rest, an `active` checkbox).
- Add a `management` config entry (same field types).
No changes to `ResourceForm`/`ResourceList` — they're already generic.

## SEO & Accessibility
- **SEO:** server OG + canonical via `api/meta.js` (crawlers); client
  title/canonical via `useDocumentMeta`. Title format:
  `Anjali Nair — Senior Mathematics Teacher — Sri Gujarati Vidyalaya`.
- **A11y:** cards are real `<Link>`s (keyboard + focus for free); `ProfileHeader`
  emits one `<h1>`, sections use `<h2>`; images carry `alt` (`Img` already lazy-
  loads); toolbar inputs get `<label>`s / `aria-label`s; sort/filter are native
  `<select>`.

## Testing
- Unit: `lines()` splitter (empty/blank/trailing newlines); faculty
  filter+sort+group helper (search match, department filter, sort order). Node
  `--test`, matching existing `*.test.js` style.
- The meta resolver additions are covered by extending the existing
  `resolvers.test.js` pattern (canonical path + title for a faculty row).

## Out of scope / deferred
- No Postgres array columns, no repeater form widget (newline textareas instead).
- No management data seeding (CMS-entered).
- No redesign of hero/typography/spacing.

## Note (unrelated, flagged for user)
`README.md:40` contains `SGV@admin2026`, which looks like a committed admin
credential. Not touched by this work, but worth rotating + removing from git
history separately.
