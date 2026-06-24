# Editorial-Heritage Redesign — Sri Gujarati Vidyalaya

**Date:** 2026-06-23
**Goal:** Elevate the existing React/Vite marketing site from a competent-but-templated
"AI-builder" look into a genuinely premium, prestigious institutional site — the digital
equivalent of a 150-year-old school's own identity (think university prospectus / museum,
not a SaaS template).

## Direction (approved)
- **Aesthetic:** Editorial heritage. Type-led, generous whitespace, hairline rules,
  restrained colour, photography given room. Confidence through restraint.
- **Scope:** All six pages. Home built first as the reference, then rolled out.
- **Brand kept:** Crest-sampled maroon / gold / cream palette; Newsreader (display/serif)
  + Hanken Grotesk (UI/labels) + IBM Plex Mono (data). These are correct and authentic.

## Principles
1. **Type as the hero.** Bigger, lighter Newsreader display with optical sizing; serif
   long-form leads; Hanken reserved for labels/nav/UI; Plex Mono for facts/figures.
2. **Whitespace + hairlines** replace heavy cards/shadows as the default rhythm. Cards
   become the exception, not the beat.
3. **Colour discipline.** Cream canvas dominant; maroon for anchors + one or two
   full-bleed interstitials; gold strictly as hairline/marker accent, never fills.
4. **Calm motion.** Keep reveal-on-scroll + ken-burns, slower and fewer. Respect
   `prefers-reduced-motion`.
5. **Consistent photo treatment.** A unified warm duotone/overlay + consistent crops so
   the hotlinked real photos read as one art-directed set.
6. **Signature moments.** Per page, 1–2 distinctive editorial moments (asymmetric index
   lists, large serif numerals, the Sanskrit motto used as a recurring mark) so it reads
   as crafted, not "generous-whitespace cliché".

## "AI tells" removed
- **Gamified stats counters** (156+/2,400+/120+/98%) → editorial treatment using only
  *verifiable* facts. No invented numbers.
- **Fabricated content** — invented testimonial names and quotes are removed entirely
  (credibility risk, unverifiable).
- **Generic marketing copy** rewritten in a grounded, specific, institutional voice.
- **Sameness of section rhythm** broken with varied, intentional layouts.

## Verified facts to build on (from live site srigujaratividhyalaya.com)
- Founded 1869 (the live site says "153 years old"); Mananchira, Beach Rd, Kozhikode,
  Kerala 673032; phone 0495 236 5215.
- Kerala Government recognised, unaided, English-medium, co-educational.
- Managed by the Sri Gujarati Vidhyalaya Association (SGVA).
- Principal: **Vimala Jayaraj**.
- Mission (verbatim): "The school aims at the total development of the child through
  education where the child acquires the wisdom of humility and radiates happiness and
  contentment around."
- Real facilities: Computer Lab, Science Lab, Library, Transportation, Canteen, Medical
  Care, Swimming Pools, Play Courts, Open-Air Auditorium.
- Real news: Plus One Admission 2024-25.

## Per-page treatment
- **Home** — editorial hero; "letter from the school" intro (real mission); programs as a
  numbered index list; one full-bleed maroon heritage moment; facilities as a hairline
  list; principal's signed note; news as a refined editorial list; quiet admissions CTA.
- **Heritage** — narrative timeline spread, pull-quotes, principal's letter.
- **Academics** — streams as a structured index/table, label/content detail rows.
- **Admissions** — numbered process, real criteria, prominent dates; most functional page.
- **Campus/Gallery** — photography-led editorial grid with captions; text-tab filters.
- **Contact** — address/hours/map first-class; elegant secondary form.

## Kept (not flagged for removal)
- Floating WhatsApp / enquire / back-to-top actions — **restyled** smaller + hairline to
  shed the chat-widget feel.
- Card sections where they genuinely earn it.

## Addendum (2026-06-24): Faculty & Alumni pages
- **Faculty** — new dedicated page built on *real, verified* data from the
  school's live faculty page: 18 named teachers with subjects and photos,
  grouped by department (Languages; Mathematics & Sciences; Commerce; Computer
  Science; Early Years & Arts), with Principal Vimala Jayaraj featured. Photos
  hotlinked (verified 200/jpeg); rendered as uniform 1:1 squares (native ratio).
- **Alumni** — new page with **clearly-marked placeholder** profiles
  (`[Alumnus name]`, `Batch [year]`, `[role]`, `[quote]`, neutral silhouette)
  because the school publishes no alumni data. A code comment flags them for
  replacement. Real CTA links to Contact. No fabricated people.
- **Wiring** — `faculty` and `alumni` added to `App.jsx` PAGES and the
  `SiteHeader` nav (now 8 items); Academics "Our Teachers" links to Faculty;
  footer "Explore" column updated.

## Accessibility / quality floor (from ui-ux-pro-max)
4.5:1 contrast, visible focus rings, alt text, `prefers-reduced-motion`, 44px touch
targets, 150–300ms micro-interactions, 65–75ch measure, SVG/icon-font icons (no emoji).
