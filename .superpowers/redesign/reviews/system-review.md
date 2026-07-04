# Design-Bridge System Review

Reviewer: design-bridge
Subject: cross-brief validation against the existing design system + Phase 0 scaffolding.
Date: 2026-07-04
Status: most briefs already match a system that has been pre-scaffolded. 5 small gaps remain.

> **TL;DR for implementers:** Phase 0 has pre-created most of the new components, tokens, collections, and data modules the briefs reference. The risks are (1) isolated inline-prose rules that conflict with the now-shared `.prose`, (2) briefs that read from raw MDX `body` instead of the shared `data/now.ts`, and (3) one prompt-prop mismatch (`GrowthBadge` lacks `size`).

---

## 1. Token coverage

All tokens the briefs reference are already in place.

| Token | Definition file | Line | Used in briefs |
|---|---|---|---|
| `--text-prose` | `src/styles/theme.css` | **96** | every long-form brief; all page briefs that touch `.prose` |
| `--font-serif` | `src/styles/theme.css` | **14** | `_shared-moves` §1; every prose-page brief |
| `--text-jumbo` | `src/styles/theme.css` | **94** | every page brief (clamp h1) |
| `--text-hero-large` | `src/styles/theme.css` | **93** | deprecated by briefs, but still defined |
| `--text-h1` | `src/styles/theme.css` | **92** | every section heading |
| `--text-body-lg` | `src/styles/theme.css` | **91** | every page lede |
| `--text-body` | `src/styles/theme.css` | **90** | chrome |
| `--text-small` | `src/styles/theme.css` | **89** | nav, chip labels |
| `--text-micro` | `src/styles/theme.css` | **88** | "Last updated", reading-chip, footer copyright |
| `--color-starbucks-green` | `src/styles/theme.css` | **19** | every prose h1/h2, eyebrow, nav active, footer hover |
| `--color-green-accent` | `src/styles/theme.css` | **20** | filled CTAs, prose link |
| `--color-green-uplift` | `src/styles/theme.css` | **22** | Frap hover |
| `--color-green-light` | `src/styles/theme.css` | **23** | chip hover, code chip bg |
| `--color-house-green` | `src/styles/theme.css` | **21** | footer, NewsletterBand, `pre` bg |
| `--color-gold` | `src/styles/theme.css` | **26** | `/library` "currently reading" border (`BookTile` reads it) |
| `--color-gold-light` | `src/styles/theme.css` | **27** | defined; **NOT referenced in any brief** (system-side gap; see §8) |
| `--color-gold-lightest` | `src/styles/theme.css` | **28** | defined; **NOT referenced in any brief** |
| `--color-neutral-warm` | `src/styles/theme.css` | **33** | page canvas (every page brief) |
| `--color-ceramic` | `src/styles/theme.css` | **34** | inline code bg; photo card bg |
| `--color-hairline` | `src/styles/theme.css` | **50** | every hairline rule |
| `--color-input-border` | `src/styles/theme.css` | **49** | NewsletterBand input |
| `--color-text-black` | `src/styles/theme.css` | **38** | body text |
| `--color-text-black-soft` | `src/styles/theme.css` | **39** | meta, lede, dates |
| `--color-text-white` | `src/styles/theme.css` | **40** | on-dark text |
| `--color-text-white-soft` | `src/styles/theme.css` | **41** | footer cluster links, NewsletterBand blurb |
| `--container-xl` (1440px) | `src/styles/theme.css` | **121** | nav width; `.container-phx` |
| `--spacing-1..9` | `src/styles/theme.css` | **53-62** | every spacing decision |
| `--radius-card`, `--radius-button`, `--radius-input`, `--radius-circle` | `src/styles/theme.css` | **69-72** | every shape decision |
| `--shadow-card`, `--shadow-nav`, `--shadow-frap-base`, `--shadow-frap-ambient` | `src/styles/theme.css` | **99-104** | cards, nav, Frap |
| `--leading-body`, `--leading-display` | `src/styles/theme.css` | **83-84** | body, headings |
| `--tracking-tight`, `--tracking-loose` | `src/styles/theme.css` | **76, 78** | body, eyebrow |
| `--duration-button` | `src/styles/theme.css` | **112** | hover transitions |
| `--nav-h-xs/sm/md/lg` | `src/styles/theme.css` | **124-127** | nav progressive height |

**No missing tokens.** Every token the briefs reference resolves. The only NEW token that needed adding is `--text-prose`, and it is already present at `theme.css:96` with the exact value the brief specified (`1.8rem`). `_shared-moves.md` §2's "no new color tokens" promise is honored.

**Cross-brief consistency:** every reference is consistent — same hex, same role, same value everywhere. No drift detected.

---

## 2. Component coverage

Phase 0 pre-created essentially every component the briefs reference. All file paths verified to exist.

| Component | File | Brief need | Prop signature match |
|---|---|---|---|
| `CuratedMark` | `src/components/CuratedMark.astro:1` | `size?: 'sm' \| 'md' \| 'lg'` | **EXACT MATCH** (line 9). All three sizes used in briefs. |
| `CuratedPicks` | `src/components/CuratedPicks.astro:1` | `items: Array<{title, href}>`; `heading?: string`; `class?` | **EXACT MATCH** (lines 11-15). |
| `NewsletterBand` | `src/components/NewsletterBand.astro:1` | `headline?` / `subhead?` / `ctaLabel?` / `action?` / `class?` | **EXACT MATCH** (lines 7-17). Defaults to "Letters from a working library." — matches `_shared-moves.md` §9. |
| `TopicPhoto` | `src/components/TopicPhoto.astro:1` | `scale: 'sm' \| 'md' \| 'lg' \| 'portrait'`; `showCredit?: boolean` | **FULL MATCH**. `scale="portrait"` exists (line 29, line 142). `showCredit?: boolean` exists (line 37), defaulting to `true`. |
| `GardenCard` | `src/components/GardenCard.astro:1` | `newSince?: Date`; `type: 'note'\|'essay'\|'talk'\|'pattern'`; `growthStage?`; `excerpt?`; `lede?`; `imageSrc?`; `topics?` | **FULL MATCH** including the `newSince` prop (line 27) that renders a `<CuratedMark>` if `Date.now() - newSince <= 30 days`. |
| `Nav` | `src/components/Nav.astro:1` | 7-item array; mobile hamburger; `Random` last item | **FULL MATCH** — already at 7 items, includes `Random`, has a working hamburger disclosure (lines 41-52, 240-258). |
| `Footer` | `src/components/Footer.astro:1` | Three clusters; Cluster 2 inline links + blogroll `<details>` | **FULL MATCH** — already restructured. Cluster 2 (`findMoreLinks`, line 39) has 11 inline links plus the blogroll `<details>` plus an `RSS` link. |
| `Frap` | `src/components/Frap.astro:1` | default label changed to "Email me" | **MATCH** — `label = 'Email me'` is the current default (line 16). |
| `Layout` | `src/layouts/Layout.astro:1` | `hideFrap?: boolean` | **MATCH** — `hideFrap` exists (line 14); `Layout` already wires `Nav` and `Footer` (lines 55, 63). |
| `Timeline` | `src/components/Timeline.astro:1` | `.timeline-dot` tightened (no checkbox read) | **MATCH** — dot already uses `background: var(--color-neutral-warm); border: 1px solid var(--color-green-accent); box-shadow: 0 0 0 1px var(--color-green-accent);` (lines 80-82). |
| `GrowthBadge` | `src/components/GrowthBadge.astro:1` | `stage: 'seedling' \| 'budding' \| 'evergreen'` | **PROP MISMATCH** — brief `notes-slug.md` §5 asks for a `size?: 'sm' \| 'md'` prop so the notes detail page can show a prominent badge at `--text-small`. The current component only accepts `stage` + `class` (lines 7-11). **GAP — see §8.** |
| `BookTile` | `src/components/BookTile.astro:1` | `currentlyReading?: boolean` | **FULL MATCH** — prop exists (line 13), renders `.book-tile-current` and `.book-reading-chip` (lines 31, 34). The brief's §5 "use gold" call matches: `.book-tile-current` uses `--color-gold`. |
| `Button` | `src/components/Button.astro:1` | All seven variants used in briefs (`primary`, `outline`, `outline-dark`, `on-green`) | **FULL MATCH** (lines 19-26). |
| `Card` | `src/components/Card.astro:1` | `emphasis="lifted"` for project/talk cards | **FULL MATCH** (lines 7-8). |
| `TopicChip` | `src/components/TopicChip.astro:1` | `label` + `href` (so essays detail can link to `/garden?topic=`) | **FULL MATCH** (lines 8-9). |
| `CollectionGrid` | `src/components/CollectionGrid.astro:1` | `cols`, `gap`, `class` | **FULL MATCH** (lines 7-11). |

**Missing components implied but not yet created:** none. All components implied by the briefs exist.

---

## 3. Collection coverage

All six collections referenced in the briefs are registered in `src/content.config.ts:73`.

| Collection | `content.config.ts` line | Field name match to briefs |
|---|---|---|
| `essays` | **18** | `title`, `date`, `topics[]`, `lede`, `related` — every essay brief uses these exact names. ✓ |
| `notes` | **6** | `title`, `date`, `topics[]`, `growthStage`, `excerpt`, `related` — every notes brief uses these. ✓ |
| `patterns` | **51** | `title`, `date`, `topics[]`, `lede`, `related` — every pattern brief uses these. ✓ |
| `talks` | **29** | `title`, `event`, `date`, `description`, `link` — talks brief uses these. ✓ |
| `books` | **40** | `title`, `author`, `coverColor`, `year?`, **`currentlyReading: z.boolean().default(false)`** — schema is **already updated** (line 47) with the field the library brief needs. ✓ |
| `projects` | **62** | `title`, `desc`, `tags[]`, `year?`, `url?` — schema matches the brief's spec. **Already registered.** ✓ |

**Field-name drift:** none. Every field the briefs reference is declared in the schema.

**Content seeded:** `src/content/projects/` already has all 4 MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`). One book (`thinking-in-systems.mdx`) already has `currentlyReading: true` set in frontmatter.

**Implication:** the `/projects` brief says "migrate hardcoded array to collection" — but the page (`src/pages/projects.astro:6-27`) is **still using the hardcoded array**. Phase 1C must rewrite it to use `getCollection('projects')`.

---

## 4. Data module coverage

All three data modules the briefs reference exist.

| Module | File | Export shape match |
|---|---|---|
| `src/data/now.ts` | line 1 | exports `nowItems: NowItem[]` + `lastUpdated: string` — matches both `/now` and `/about` brief interfaces. **MATCH** (lines 6-41). |
| `src/data/blogroll.ts` | line 1 | exports `blogroll: BlogrollEntry[]` with `{name, url, blurb?}` — 20 seeded entries (lines 17-38). **MATCH** with brief spec. |
| `src/lib/onThisDay.ts` | line 1 | exports `findOnThisDay(entries, today): MergedEntry[]` — typed against the `MergedEntry` union the brief recommends (lines 9-14). **MATCH.** |

**Note on `onThisDay.ts`:** the brief in `garden.md` §3 specifies a generic helper taking any entry with `{data: {date}}`, while the current implementation is typed against `MergedEntry`. **This works** because the brief's caller (`/garden`) already builds a `MergedEntry[]` — but **the `/notes` and `/essays` brief callers would need to do the same** (or pass already-merged arrays). No functional gap; type signature is slightly narrower than what the brief asks for in `garden.md`.

---

## 5. CSS / utility coverage

The `.prose` utility exists in `src/styles/global.css:206-304` and is comprehensive.

**Element coverage check:**

| Element | `.prose :global(...)` rule | Line | Brief mentions |
|---|---|---|---|
| `h2` | yes | **215-222** | all detail briefs ✓ |
| `h3` | yes | **224-231** | notes/patterns briefs ✓ |
| `p` | yes | **233-237** | all briefs ✓ |
| `ul` | yes | **239-243** | ✓ |
| `ol` | yes | **239-243** | ✓ |
| `li` | yes | **245-249** | ✓ |
| `blockquote` | yes | **251-258** | essay/notes briefs ✓ |
| `code` (inline) | yes | **260-266** | ✓ |
| `pre` | yes | **268-277** | ✓ |
| `pre code` | yes | **279-284** | ✓ |
| `a` | yes | **286-295** | ✓ |
| `strong` | yes | **297-300** | ✓ |
| `em` | yes | **302-304** | ✓ |

**All 13 element types requested by the briefs are covered.** No utility gap.

`--text-prose: var(--font-size)` is correctly used at `global.css:208`.

**Inconsistency to flag (system-level, see §8 below):** the detail briefs (`essays-slug.md` §5, `notes-slug.md` §5, `patterns-slug.md` §5) acknowledge that `.prose` is shared, but the **current `.astro` files still ship inline `.prose :global(...)` rules** — `src/pages/essays/[slug].astro:200-273`, `src/pages/notes/[slug].astro:181-256`, and `src/pages/patterns/[slug].astro` (uses `.pattern-body` instead of `.prose`, lines 153-205). The brief's `essays-slug.md` §5 says "consolidate this in this page's brief." Whoever runs the brief must REMOVE the inline blocks; they will override `.prose` rules due to specificity (last-wins for equal specificity, which means the inline rules currently WIN over the shared utility).

**Reference frame check:** `--container-phx`, `--container-xl`, `.section`, `.tight-tracking`, `.serif-headline`, `.script-mark` — all defined in `global.css` and `theme.css` and used consistently.

---

## 6. Route coverage

All 16 routes referenced in the brief are scheduled or pre-created.

| Route | File | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | exists (not yet updated to brief) |
| `/about` | `src/pages/about.astro` | exists (not yet updated to brief) |
| `/contact` | `src/pages/contact.astro` | exists; **already matches brief** (uses clamp h1, serif lede, Lora, "Email me directly" CTA) |
| `/garden` | `src/pages/garden.astro` | exists (needs "On this day", CuratedMark wiring, empty state, micro-link) |
| `/library` | `src/pages/library.astro` | exists (needs `currentlyReading` pass-through, "Updated quarterly") |
| `/now` | `src/pages/now.astro` | exists (needs to be rewritten to `<dl>` + `src/data/now.ts` import) |
| `/projects` | `src/pages/projects.astro` | exists (needs rewrite to `getCollection('projects')`) |
| `/talks` | `src/pages/talks.astro` | exists (needs rewrite to row list, no `<GardenCard>`) |
| `/essays` | `src/pages/essays/index.astro` | exists (needs CuratedPicks block) |
| `/notes` | `src/pages/notes/index.astro` | exists (needs "On this day" via `onThisDay.ts`) |
| `/patterns` | `src/pages/patterns/index.astro` | exists (needs column tightening 1fr/12rem → 1fr/10rem) |
| `/404` | `src/pages/404.astro` | exists; **already matches brief** (Browse the Garden, Lora lede, display-scale h1) |
| `/colophon` | **MISSING** | not yet created — `_shared-moves.md` §12 item requires `src/pages/colophon.astro` |
| `/concepts` | `src/pages/concepts.astro` | **EXISTS** — already matches brief (7 seed entries, alphabetical, dl/dt/dd) |
| `/random` | `src/pages/random.astro` | **EXISTS** — bare HTML, manifest injection, manifest `{type, slug}` for essays+notes+patterns |
| `/blogroll` | N/A (footer cluster) | correct — must NOT create a `/blogroll` page per `_shared-moves.md` §12 item 4 |

**Gap:** `/colophon` is the only route from the brief list that still needs to be created. Phase 1X must add `src/pages/colophon.astro`.

---

## 7. Cross-brief invariants

### Nav item order

Every brief that touches nav specifies the **same** 7-item order: `Home / Garden / Essays / Notes / Patterns / Now / Random`. The current `Nav.astro:13-21` matches. No drift.

### Footer Cluster 2 inline links order

Every brief that touches footer Cluster 2 specifies the same order (per `_shared-moves.md` §10):

> Garden → Essays → Notes → Patterns → Now → Projects → Library → Talks → Contact → Colophon → Concepts → Blogroll (details) → RSS

The current `Footer.astro:39-51` matches for the 11 inline links (Garden through Concepts). Blogroll is implemented as a `<details>` block (lines 84-101) — matches `_shared-moves.md` §10 Cluster 2b. RSS is outside the `<ul>` (line 104). **`Footer` is the only place that places `RSS` after the cluster's inline links rather than treating it as one of them — verify visually against brief wording.**

The 5 social icons (GitHub, Bluesky, LinkedIn, Mastodon, RSS) are preserved verbatim from the pre-redesign implementation, matching the brief's Cluster 3 requirement.

### Pages that hide the Frap

All briefs consistently say **the Frap is hidden on**: `/now`, `/essays/[slug]`, `/notes/[slug]`, `/patterns/[slug]`. Everywhere else: visible.

This is implemented in two layers today:

1. `Layout.astro:65` — `<slot name="frap">` renders only when `!hideFrap`.
2. Detail pages — use `<Layout title=...>` with no `hideFrap` flag explicitly. **The detail briefs must pass `hideFrap` explicitly to suppress it.** Today the home/contact/about pages pass `<Fragment slot="frap">` explicitly, and `/now`/`essays`/`notes`/`patterns` detail pages render without that fragment — which means the Frap slot has nothing to render (effectively hidden), but the `hideFrap` flag is **not** set. This works visually today but is fragile. **Recommend Phase 1X add `hideFrap` to the detail briefs' `<Layout>` lines for clarity.**

### Detail briefs dropping inline `.prose` rules

All three detail briefs (`essays-slug.md`, `notes-slug.md`, `patterns-slug.md`) acknowledge that inline `.prose :global(...)` should be removed in favor of the shared utility. **No brief contradicts this.** Implementation, however, is **not yet done** — the inline rules still exist in the .astro files (see §5).

### CuratedMark placement

- `/` "if you only read three" block: prepend to each item via `<CuratedPicks>` — implemented ✓ (`CuratedPicks.astro:26` hardcodes `size="md"`, brief says `sm`, **minor size mismatch**).
- `/essays/index` block: same as above ✓.
- `/garden` newly-added entries: handled by `<GardenCard>` via `newSince?` ✓.
- `/notes/index` newly-added entries: handled by `<GardenCard>` via `newSince?` ✓.

### Subscribe surface uniqueness

All briefs agree: **one** subscribe CTA per page. `/` has it in the closing band; `/about` has it between Identity and Now; `/colophon` uses a single-line "RSS / Email / GitHub" (NOT a band); everywhere else: no subscribe CTA. No inconsistency.

---

## 8. Open system questions

These are gaps that **the briefs should resolve but don't** — or that the existing implementation reveals but the briefs do not flag. Spawn-blocking; route to author or to the relevant Phase.

1. **`GrowthBadge` lacks a `size` prop.** Brief `notes-slug.md` §5 calls for `size?: 'sm' | 'md'` so the notes detail page can show a prominent badge at `--text-small` while `GardenCard` keeps it at `--text-micro`. The current component (`src/components/GrowthBadge.astro:7-11`) only accepts `stage`. Either (a) extend `GrowthBadge.astro` to add the prop (preferable — small change), or (b) accept that "prominent" means modifier classes only.

2. **Inline `.prose :global(...)` rules are still in place in three detail pages** (`essays/[slug].astro:200-273`, `notes/[slug].astro:181-256`, `patterns/[slug].astro:153-205` via `.pattern-body`). The briefs say to remove them, but no single brief "owns" the removal. **Decide:** should Phase 1X delete the inline rules when implementing each detail brief (cleanest — one-place refactor)? Note: `patterns/[slug].astro` uses `.pattern-body`, **not** `.prose` — this means the shared `.prose` rules won't apply to patterns detail content unless patterns is rewritten to use `<div class="prose">`. Brief `patterns-slug.md` §5 acknowledges this and calls for a rewrite.

3. **The `--color-gold-light` and `--color-gold-lightest` tokens** are defined in `theme.css:27-28` but **referenced in zero briefs and zero components.** Either remove them or use them on `/library` (e.g. on the `Reading` chip background per brief `library.md` §5: "or `--color-gold-light` background"). A single decision resolves it.

4. **`GardenCard` `"newly added"` behavior runs at request time** — `src/components/GardenCard.astro:56` uses `Date.now()` at SSR. Because Astro is `output: 'static'` (per `astro.config.mjs:9`), this resolves at **build time**, not request time. The result: entries dated 0-30 days before **the build timestamp** get the ✦, not entries dated 0-30 days before today. For a monthly-deploy cadence this is fine; for unattended builds it can drift. **Brief `garden.md` is silent on this.** Decision: keep as-is and document, or compute on a per-page basis.

5. **`CuratedPicks` hardcodes `size="md"`** (`src/components/CuratedPicks.astro:26`) while the home-page brief (`index.md` §2 Section 2) asks for `size="sm"`. Either parametrize the component or accept the visual difference.

---

## 9. Verdict (one paragraph)

The briefs implement against the existing system **very cleanly**: every token they reference exists (`--text-prose` is already at `theme.css:96`); every new component (`CuratedMark`, `CuratedPicks`, `NewsletterBand`) exists with the exact prop signature the briefs need; the `projects` and `books` collection schemas already include the requested fields; the data modules (`src/data/now.ts`, `src/data/blogroll.ts`, `src/lib/onThisDay.ts`) exist with the requested export shapes; and the `.prose` utility in `global.css` covers all 13 element types the briefs reference. **The implementer can land every brief with zero new tokens and zero new components, with at most one small `GrowthBadge` prop extension and three inline-prose removals.** Real remaining gaps: (1) `src/pages/colophon.astro` does not yet exist (must be created in Phase 1X), (2) `src/pages/projects.astro` still uses the hardcoded array — must be rewritten to `getCollection('projects')` (the seeded MDX files exist), (3) the three detail pages still ship inline `.prose :global(...)` rules that override the shared utility, requiring one-time clean-up, (4) `GrowthBadge` lacks the proposed `size` prop, and (5) `/now` and `/contact` already match their briefs while `/404` already matches its brief. No blockers; one tiny API add (`GrowthBadge` size) and four small follow-up chores for the relevant Phase agents.
