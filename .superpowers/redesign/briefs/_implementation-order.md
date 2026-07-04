# Implementation Order — Parallel Astro-Coder Map

> **Read first:** `_shared-moves.md` and every page-brief referenced below.

This document is the topo sort for the 11-page redesign + 1 footer-surface redesign + 1 data module. Each page is implemented by one `astro-coder` agent. The map maximizes parallelism while respecting the dependency chain between shared components.

---

## 0. Dependency graph

```
PHASE 0 (foundation — single agent, must complete first):
  - new token: --text-prose in theme.css
  - new .prose utility in global.css (consolidates per-page rules)
  - new components: CuratedMark, CuratedPicks, NewsletterBand
  - modified components: TopicPhoto (scale="portrait" + showCredit), Timeline (dot), GardenCard (newSince), Nav (7-item list + mobile hamburger), Footer (three clusters + blogroll), Frap (label)
  - new collections: projects (+ 4 MDX entries); books schema gets currentlyReading?
  - new data files: src/data/now.ts, src/data/blogroll.ts, src/lib/onThisDay.ts
  - new pages: random.astro (bare HTML, no Layout)

PHASE 1 (after Phase 0):
  - every page brief can run in parallel — they all depend on Phase 0.

PHASE 2 (verification):
  - a single QA pass that runs `npm run check && npm run build` and walks every page.
```

---

## 1. Phase 0 — Foundation (single agent, blocks everything else)

**One astro-coder agent runs Phase 0.** Estimated tasks:

1. Add `--text-prose: 1.8rem` to `src/styles/theme.css`.
2. Add the `.prose` utility block + all per-element rules (h2, h3, p, ul, ol, li, blockquote, code, pre, a, strong) to `src/styles/global.css`. These rules are CONSOLIDATED from the existing inline rules in `essays/[slug].astro`, `notes/[slug].astro`, and `patterns/[slug].astro`.
3. Create `src/components/CuratedMark.astro` (signature in `_shared-moves.md` §7).
4. Create `src/components/CuratedPicks.astro` (signature in `_shared-moves.md` §8).
5. Create `src/components/NewsletterBand.astro` (signature in `_shared-moves.md` §12).
6. Modify `src/components/TopicPhoto.astro`:
   - Add `scale="portrait"` (3:4) variant to the `scale` enum and to the `.tp-{scale}` CSS rule.
   - Add `showCredit?: boolean` prop (default `true`); if `false`, do NOT render the `<figcaption>`.
7. Modify `src/components/Timeline.astro`:
   - Change `.timeline-dot` styling to `background: var(--color-neutral-warm); border: 1px solid var(--color-green-accent); box-shadow: 0 0 0 1px var(--color-green-accent);`.
8. Modify `src/components/GardenCard.astro`:
   - Add `newSince?: Date` prop. If `newSince` is set and `newSince >= (now - 30 days)`, render `<CuratedMark size="sm" />` inside `.garden-card-title`.
9. Modify `src/components/Nav.astro`:
   - Replace `navLinks` array with the 7-item list (Home / Garden / Essays / Notes / Patterns / Now / Random).
   - Add a mobile hamburger disclosure (toggles a vertical list of links below the nav on `<768px`).
10. Modify `src/components/Footer.astro`:
    - Restructure into three clusters (Subscribe / Find more / Social+brand).
    - Cluster 2: 13 inline links (Garden, Essays, ..., Concepts, Blogroll, RSS) with the Blogroll as a `<details>` block.
    - Cluster 3: existing 5 social icons + © line.
    - Footer must import `blogroll` from `src/data/blogroll.ts` and the on-this-day logic stays in Footer.astro itself.
11. Modify `src/components/Frap.astro`:
    - Default `label` from `'Quick order'` → `'Email me'`.
12. Add `src/content.config.ts`:
    - New `projects` collection (`{ title, desc, tags[], year?, url? }`).
    - `books` collection: add `currentlyReading?: z.boolean().default(false)`.
13. Create `src/content/projects/` directory with 4 MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`).
14. Create `src/data/now.ts` exporting `nowItems` + `lastUpdated`.
15. Create `src/data/blogroll.ts` exporting `blogroll` (20 entries seeded).
16. Create `src/lib/onThisDay.ts` exporting `findOnThisDay(entries, today)`.
17. Create `src/pages/random.astro` (bare HTML, no `<Layout>`, inline-script redirect, manifest built at build time).
18. Optional but recommended: modify one existing book's frontmatter to set `currentlyReading: true` so the visual treatment is verifiable.

**Phase 0 acceptance gate:** `npm run check` exits 0; `npm run build` succeeds; `/random` redirects; `/garden` renders the new nav; the home page renders the new footer (old hardcoded nav still works for now).

---

## 2. Phase 1 — Page briefs (parallel agents)

After Phase 0 completes, the following briefs can run **in parallel** — they are independent of each other. **Each brief is one astro-coder agent.**

| Brief | File written | Depends on (all satisfied by Phase 0) |
|---|---|---|
| `_shared-moves.md` | Already exists. | — |
| `index.md` | `src/pages/index.astro` | CuratedPicks, CuratedMark, NewsletterBand, new Nav/Footer/Frap. |
| `about.md` | `src/pages/about.astro` | NewsletterBand, projects collection, Timeline fix, new Nav/Footer/Frap, `src/data/now.ts`. |
| `contact.md` | `src/pages/contact.astro` | New Nav/Footer/Frap. |
| `garden.md` | `src/pages/garden.astro` | CuratedMark via `GardenCard`, new Nav/Footer/Frap, optional `src/lib/onThisDay.ts`. |
| `library.md` | `src/pages/library.astro` | BookTile `currentlyReading?` prop, new Nav/Footer/Frap. |
| `now.md` | `src/pages/now.astro` | `src/data/now.ts`, new Nav/Footer (no Frap). |
| `projects.md` | `src/pages/projects.astro` | projects collection, new Nav/Footer/Frap. |
| `talks.md` | `src/pages/talks.astro` | New Nav/Footer/Frap. |
| `essays-index.md` | `src/pages/essays/index.astro` | CuratedPicks, CuratedMark, new Nav/Footer/Frap. |
| `essays-slug.md` | `src/pages/essays/[slug].astro` | `.prose` utility, `--text-prose`, new Nav/Footer (no Frap). |
| `notes-index.md` | `src/pages/notes/index.astro` | `src/lib/onThisDay.ts`, `GardenCard.newSince`, new Nav/Footer/Frap. |
| `notes-slug.md` | `src/pages/notes/[slug].astro` | `.prose` utility, `GrowthBadge.size`, new Nav/Footer (no Frap). |
| `patterns-index.md` | `src/pages/patterns/index.astro` | New Nav/Footer/Frap. |
| `patterns-slug.md` | `src/pages/patterns/[slug].astro` | `.prose` utility, new Nav/Footer (no Frap). |
| `404.md` | `src/pages/404.astro` | New Nav/Footer/Frap. |
| `colophon.md` | `src/pages/colophon.astro` | `.prose` utility, new Nav/Footer/Frap. |
| `concepts.md` | `src/pages/concepts.astro` | New Nav/Footer/Frap. |
| `random.md` | (Phase 0) | — |
| `blogroll.md` | `src/data/blogroll.ts` + Footer integration | Phase 0 creates the data; this brief mostly defines the rendering contract that Footer.astro already implements in Phase 0. **Effectively no-op in Phase 1 unless the blogroll data needs post-build curation.** |

### Per-pair dependency notes

The chart above says "independent," but a few pairs have soft dependencies worth noting:

- **`about.md` ↔ `now.md`** — both read from `src/data/now.ts`. The data file is created in Phase 0, so both briefs can run in parallel and read the same source. The `/about` preview slices `.slice(0, 3)`.
- **`essays-slug.md` ↔ `notes-slug.md` ↔ `patterns-slug.md`** — all three depend on the `.prose` utility being moved into `global.css`. Phase 0 does this consolidation, so all three can run in parallel and DROP their inline `.prose` rules.
- **`essays-index.md` ↔ `index.md`** — both use `<CuratedPicks>`. Phase 0 creates the component, so both can render independently.
- **`index.md` ↔ `about.md`** — both use `<NewsletterBand>`. Phase 0 creates the component.
- **`garden.md` ↔ `notes-index.md`** — both use `src/lib/onThisDay.ts`. Phase 0 creates the helper.
- **`blogroll.md`** — the data module is created in Phase 0 and rendered by Footer.astro. This brief is mostly documentation; no Phase 1 work required.
- **`contact.md` ↔ `404.md`** — both update one CTA label ("Send an Email" → "Email me directly", "Browse Projects" → "Browse the Garden"). Independent edits; can run in parallel.

---

## 3. Phase 2 — Single QA pass

One agent runs after all Phase 1 agents finish:

1. `npm run check` → exit 0.
2. `npm run build` → exit 0; `dist/` contains every expected route:
   - `/`, `/about/`, `/contact/`, `/garden/`, `/library/`, `/now/`, `/projects/`, `/talks/`, `/essays/`, `/essays/{slug}/` (×N), `/notes/`, `/notes/{slug}/` (×N), `/patterns/`, `/patterns/{slug}/` (×N), `/404.html`, `/colophon/`, `/concepts/`, `/random/`.
3. Walk each route in a headless browser (or `npm run preview`) and verify the per-page Acceptance checks in each brief.
4. Sitemap check: `/random/` is NOT in `dist/sitemap-0.xml`; `/404` is NOT in sitemap.
5. Visual sanity: every page shows the new nav (7 items) and new footer (3 clusters + blogroll).
6. JSON-LD check: every essay and note detail page has a valid `BlogPosting` JSON-LD block.
7. Lora check: open a long-form page (e.g. `/essays/on-typography-and-trust/`); body text is Lora, NOT Inter.
8. Frap check: `/now`, `/essays/{slug}`, `/notes/{slug}`, `/patterns/{slug}` do NOT show the Frap; every other page does.
9. Random check: visit `/random` 5 times; 5 different destinations (assuming the union has ≥5 entries).

---

## 4. Concurrency budget

- **Phase 0:** 1 agent (foundation).
- **Phase 1:** up to **16 agents in parallel** (one per brief, though several briefs are trivial enough — `contact.md`, `404.md`, `patterns-index.md`, `now.md`, `library.md`, `talks.md` — that they could be batched onto fewer agents).
- **Phase 2:** 1 agent (QA).

If you have fewer agents available, batch by surface type:

- **Batch A (chrome-only changes):** `contact.md`, `404.md`, `now.md`, `library.md`, `projects.md`, `talks.md`, `patterns-index.md` — these are mostly page-header upgrades + content swaps. One agent can do all 7.
- **Batch B (curation surfaces):** `index.md`, `essays-index.md` — both use `<CuratedPicks>`. One agent can do both.
- **Batch C (prose detail pages):** `essays-slug.md`, `notes-slug.md`, `patterns-slug.md` — all use `.prose`. One agent can do all three.
- **Batch D (identity surfaces):** `about.md`, `colophon.md`, `concepts.md`, `garden.md`, `notes-index.md` — each is a moderately complex page. Each could be its own agent.

---

## 5. Single-line summary

**Phase 0 = foundation (1 agent). Phase 1 = all page briefs in parallel (up to 16 agents). Phase 2 = QA (1 agent).** Within Phase 1, every brief is independent after Phase 0 completes.