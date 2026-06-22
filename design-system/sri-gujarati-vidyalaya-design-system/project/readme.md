# Sri Gujarati Vidyalaya — Design System

A complete, modern design system and website UI kit for **Sri Gujarati Vidyalaya Higher Secondary School**, Kozhikode (Kerala) — a Kerala Government recognised, English-medium, co-educational institution established in **1869**.

The brief: reimagine the school's web presence as a *prestigious heritage institution with modern education standards* — premium, trustworthy, parent- and student-friendly, optimised for admissions — while preserving all of the school's existing content.

## Sources

- **Live website (content + photography):** https://www.srigujaratividhyalaya.com/ — all copy, news, faculty, admissions and history were drawn from here. School photography in the UI kit is hotlinked from this domain; the `Img` helper falls back to a maroon crest panel if any image is unavailable.
- **Logo:** `uploads/download.png` — the original maroon heraldic crest + blackletter wordmark, copied into `assets/`.
- No codebase or Figma file was provided; the visual identity below was designed from scratch around the crest and the school's heritage narrative.

> **Font substitution (please confirm):** The original site used a generic WordPress theme font. The redesign establishes **Newsreader** (editorial serif) + **Hanken Grotesk** (UI sans) + **IBM Plex Mono**, loaded from Google Fonts. Swap `tokens/fonts.css` for self-hosted files if a specific licence or offline use is required.

---

## Brand positioning

> **विद्या विनयेन शोभते** — *"Knowledge is adorned by humility."*

A 150-year-old community institution. The identity balances **heritage** (the maroon crest, an editorial serif, a "Since 1869" timeline) with **modern education** (clean cards, generous space, calm motion, a frictionless admissions journey). Not a SaaS landing page; not a futuristic AI brand — a trusted, warm, premium school.

---

## CONTENT FUNDAMENTALS

**Voice:** warm, dignified, plain-spoken. Speaks *to* parents ("your child", "we'd love to hear from you") and *about* the school in the first person plural ("we nurture", "our campus"). Confident but never boastful — achievements are stated quietly ("Results that speak quietly").

**Tone:** heritage + care. Leans on the school's own language: "total development of the child", "wisdom of humility", "serene, eco-friendly campus". Sanskrit motto used as a recurring signature, not decoration.

**Casing:** Sentence case for headlines and buttons ("Apply for Admission", "Take a Campus Tour"). UPPERCASE only for small eyebrow/kicker labels with wide tracking. Years and stats are concrete ("Est. 1869", "98% Board Results").

**Emoji:** none. Iconography is line icons (Phosphor) only.

**Examples**
- Hero: *"A heritage of learning, for every child."*
- Eyebrow: `SINCE 1869` · `WHY GUJARATI` · `SCHOOL AT A GLANCE`
- CTA: *Apply Now · Admission Enquiry · Book a Campus Visit*
- Reassurance: *"A warm, guided admissions experience — enquire today."*

---

## VISUAL FOUNDATIONS

**Colour.** Warm, earthy heritage palette derived from the crest:
- **Maroon / sienna** (`--brand` = `--maroon-700` #7A3414) — primary actions, headers, links, dark sections. Deepest tone `--maroon-950` for the richest backgrounds.
- **Heritage gold** (`--accent` = `--gold-500` #C29A45) — used *sparingly*: rule lines under eyebrows, the focus ring, the active timeline track, award/featured accents.
- **Parchment neutrals** (`--cream-50` page, `--cream-100` raised, white cards) and **warm ink** (`--ink-900` text). Status colours are muted to suit the tone.
- Imagery vibe: warm, natural daylight, real students and campus — never cold or corporate-blue.

**Type.** Newsreader (display serif, opsz 6–72, weights 300–600, roman + italic) for all headings, big stats and pull-quotes — italic maroon is the signature emphasis. Hanken Grotesk for body, UI and labels. Display sizes are fluid (`--text-hero`, `--text-section`). Headlines use tight tracking and `text-wrap: balance`.

**Spacing & layout.** 4px base grid. Section rhythm via `--section-y` (clamp 4–8rem). Containers: `--container-lg` 1200 (default), `--container-xl` 1440 (wide), `--container-md` 960 (narrow). Sticky header (utility bar + main nav) that shrinks and frosts on scroll.

**Radius.** Moderate, heritage-modern: cards `--radius-lg` (16px), feature panels `--radius-xl`/`2xl`, pills for buttons & badges. Never sharp, never overly bubbly.

**Elevation.** Soft, warm-tinted shadows (brown-based, not grey). `--shadow-sm` for resting cards, `--shadow-md`/`lg` for raised and hover, `--shadow-brand` (maroon-tinted) for primary CTAs. Hairline borders (`--border-subtle`) on outline cards.

**Motion.** Calm and confident. `--ease-out` for entrances; `Reveal` fades content up 24px on scroll (gated, respects `prefers-reduced-motion`). Stats count up on view. Cards lift 4px + image zooms 1.05 on hover. No bounces on content, no infinite loops. Press = 1px translate-down.

**Hover / press.** Nav items get a maroon-tint pill background; buttons darken / lift; cards lift + shadow grows; gallery tiles reveal a maroon gradient caption. Press shrinks/translates subtly.

**Backgrounds.** Mostly flat parchment and white. Dark sections use `--maroon-900`/`950` with a faint crest watermark at ~5% opacity. Gradients used only as **photo protection scrims** (hero, page heroes, gallery captions) and the single admissions CTA band — never as decorative rainbow fills.

**Transparency / blur.** Used once, purposefully: the sticky nav frosts (`backdrop-filter: blur`) after scroll. Otherwise opaque.

---

## ICONOGRAPHY

- **System:** [Phosphor Icons](https://phosphoricons.com/) (regular / bold / fill weights) via CDN, rendered through the `Icon` helper (`<Icon name="arrow-right" />`). Chosen for a refined, slightly rounded line style that suits the warm, humane tone — at ~1.5px stroke it pairs with the serif display without feeling techy.
- **Why a substitution:** the original site had no icon system of its own; Phosphor is the closest premium match. Swap freely if the school adopts a set.
- **Brand marks:** the crest (`assets/crest.png` / `crest-cream.png`) is used as a watermark, seal and inline lockup detail. The full lockup (`assets/logo-lockup*.png`) sits in the header and footer.
- **No emoji, no unicode glyph icons.** The single Sanskrit motto line is typographic, not iconographic.

---

## Index / manifest

**Root**
- `styles.css` — global entry (imports only). Consumers link this one file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (radius/shadow/motion/layout/z), `base.css`.
- `assets/` — `logo-lockup.png` (+ cream / gold), `crest.png` (+ cream).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**Components** (`components/`, namespace `SriGujaratiVidyalayaDesignSystem_89aa2a`)
- `core/` — **Button, Badge, Stat** (count-up), **Card, SectionHeading, Avatar**
- `forms/` — **Input, Select, Checkbox**
- `feedback/` — **Accordion**

**UI kit** (`ui_kits/website/`) — interactive multi-page recreation
- `index.html` — full click-through site (also a Starting Point)
- Pages: **Home** (`HomeParts1/2`, `HomePage`), **Heritage/About**, **Academics**, **Admissions**, **Gallery**, **Contact**
- `shared.jsx` — header, footer, quick actions, `PageHero`, `Reveal`, `Img`, `Icon`, image map

**Other** — `SKILL.md` (Agent Skill manifest), this `readme.md`.
