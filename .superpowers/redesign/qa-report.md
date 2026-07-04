# Phurix Redesign — Phase 2 QA Report

**Run:** 2026-07-05
**Build:** 39 pages built successfully (`npm run build` exit 0)
**Typecheck:** `npm run check` — 0 errors, 0 warnings, 5 hints (the hints are unused `Props`/`color`/`i` declarations + 2 deprecation hints on `z.string().url()`; none fail the gate)
**`as any` audit:** 0 occurrences in `src/`

---

## 1. Summary table

| § | Check | Result | Notes |
|---|---|---|---|
| **A** | Build gates | **PASS** | `npm run check` and `npm run build` exit 0; no `as any` in src. |
| **B** | Route inventory | **PASS** | All 16 routes present in `dist/`; 4 essay / 8 note / 12 pattern slugs; `rss.xml`, `sitemap-0.xml`, `sitemap-index.xml` all present. |
| **C** | Sitemap excludes `/random/` and `/404.html` | **PASS** | Verified in `dist/sitemap-0.xml`. |
| **D** | Chrome sanity (nav 7 + 3 footer clusters + 20 blogroll entries) | **PASS** | `index`, `about`, `garden`, essay slug (`on-typography-and-trust`), `library` all have `Home/Garden/Essays/Notes/Patterns/Now/Random` (7 links in `.nav-links`, mirrored in `.nav-mobile`). All 5 render `footer-cluster-subscribe / footer-cluster-links / footer-cluster-social`. The blogroll `<details>` contains 20 unique external entries on every page. |
| **E** | Typography check (Lora for prose) | **PASS w/ note** | Essay body uses `var(--font-serif)` (Lora). Concepts uses Inter for term + Lora for definition. Colophon prose uses `.prose` (Lora). **Spec note:** task spec stated "verify hero h1 uses Lora", but the brief (`briefs/index.md`) and proposal (§4) explicitly want Inter 600 for the chrome h1. Implementation is correct; spec wording was wrong. No fix. |
| **F** | Frap visibility | **FAIL — critical** | Frap renders ONLY on `/`. The 12 other chrome-bearing pages ship no Frap. See defect #1. |
| **G** | CuratedMark (✦) on relevant pages | **PASS** | Home + essays index render 3 ✦ each (in `CuratedPicks`). Garden / notes index have CSS for `curated-mark` but no rendered ✦ (expected: latest entry is 2025-04-12, 30-day window for 2026-07-05 yields zero matches). |
| **H** | Random route | **PASS** | `dist/random/index.html` ships `<meta name="robots" content="noindex">`, an inline `<script>` with the manifest of `{type, slug}` for 24 entries (essays+notes+patterns), and `window.location.replace('/' + type + '/' + slug + '/')`. No `<Layout>` wrapper. |
| **I** | JSON-LD `BlogPosting` | **PARTIAL FAIL** | Essays (4/4 slugs) ship `<script type="application/ld+json">` with `@type: BlogPosting`. **Notes (0/8 slugs) and patterns (0/12 slugs) ship NO JSON-LD.** See defect #2. |
| **J** | CuratedPicks + NewsletterBand counts | **PASS** | Home has 3 CuratedPicks items; essays index has 3. `/about` has exactly 1 `subscribe-section`. |
| **K** | Library "currently reading" | **PASS** | `Thinking in Systems` renders with `book-tile-current` (gold border) + `book-reading-chip`. Source frontmatter has `currentlyReading: true`. |
| **L** | `/projects` collection wiring | **FAIL — major** | `src/content/projects/` has 4 MDX entries; the `projects` collection is registered in `src/content.config.ts`. But `src/pages/projects.astro:13-38` still ships the hardcoded array with an explicit comment marking the fallback: *"the `projects` content collection was unavailable at write time"*. See defect #3. |
| **M** | Nav hamburger | **PASS** | `dist/index.html` has `<button class="nav-toggle">` plus the `<nav id="nav-mobile-menu" class="nav-mobile" hidden>` companion. Toggle script wires `aria-expanded` and re-binds on `astro:after-swap`. |
| **N** | Footer blogroll 20 entries | **PASS** | 20 unique external `https://` hrefs (notes.andymatuschak.org → stratechery.com) in the `<details>` block. |
| **O** | `/now` data file usage | **FAIL — major** | `src/data/now.ts` exists with `nowItems` and `lastUpdated`, but `src/pages/now.astro:13-41` defines the items inline instead of importing. `/about` correctly imports (good). See defect #4. |
| **P** | `/projects` collection wiring | **FAIL — major** | Same as defect #3. |

---

## 2. Defects found

### 1. (CRITICAL) Frap is absent from 12 of 13 chrome-bearing pages

- **Severity:** Critical (the contact CTA per the brief contract is missing on every page except home — this is the most prominent persistent affordance of the redesign)
- **Affected routes:** `/about`, `/contact`, `/garden`, `/library`, `/projects`, `/talks`, `/essays`, `/notes`, `/patterns`, `/404`, `/colophon`, `/concepts`
- **Description:** `Layout.astro:65-67` renders the Frap only when `!hideFrap` AND the `<slot name="frap" />` has content. **Only `src/pages/index.astro:158-160` passes `<Fragment slot="frap"><Frap /></Fragment>`.** Every other chrome page passes neither the slot nor a Frap import. The deep-focus pages (`/now`, `/essays/[slug]`, `/notes/[slug]`, `/patterns/[slug]`) correctly suppress the Frap by passing `hideFrap`. The remaining 12 pages — explicitly required to keep the Frap visible per their briefs (e.g. `briefs/library.md:57-61`: "Frap stays"; `briefs/projects.md`: "The Frap is visible with label 'Email me'"; `briefs/about.md:100-102`: "Stays. Pending label change to 'Email me'"; `briefs/contact.md:34-37`: "Stays"; `briefs/404.md`: "The Frap is visible with label 'Email me'"; plus `garden`, `talks`, `essays-index`, `notes-index`, `patterns-index`, `colophon`, `concepts`) — all have it missing. `random.astro` correctly omits the Layout wrapper entirely (no chrome, no Frap).
- **Suggested fix:** Cleanest is to **inline the Frap in Layout** and drop the slot indirection (no page ever passes anything but a single `<Frap />` — the slot adds complexity for no benefit). Concretely: in `src/layouts/Layout.astro`, replace lines 8 (`import Footer from '@/components/Footer.astro';`) with `import Frap from '@/components/Frap.astro';`, and replace lines 63-67 (the closing `</Footer>` + slot) with:
  ```astro
  <Footer />
  {!hideFrap && <Frap />}
  ```
  Then delete the `<Fragment slot="frap"><Frap /></Fragment>` from `src/pages/index.astro`. This makes "Frap everywhere unless `hideFrap`" trivially true. Alternative: add the slot fragment to the 12 affected pages (more edits; same result).
- **Files cited:**
  - `src/layouts/Layout.astro:65-67` (render gate)
  - `src/pages/index.astro:15,158-160` (only Frap consumer)
  - `src/pages/now.astro:52`, `src/pages/essays/[slug].astro:43`, `src/pages/notes/[slug].astro:43`, `src/pages/patterns/[slug].astro:39` (correct `hideFrap` users)

### 2. (MAJOR) JSON-LD `BlogPosting` missing from notes and patterns detail pages

- **Severity:** Major (SEO; the `_shared-moves.md` §13 verification gate explicitly lists this)
- **Affected routes:** All 8 note detail pages (`/notes/*/`) and all 12 pattern detail pages (`/patterns/*/`) — 20 routes total.
- **Description:** `src/pages/essays/[slug].astro:45-58` ships `<script type="application/ld+json">` with `@type: BlogPosting`, headline, datePublished, description, keywords, mainEntityOfPage. The notes and patterns detail pages ship no `<script type="application/ld+json">` block. The shared contract (`briefs/_shared-moves.md:122`) says: *"JSON-LD check: every essay and note detail page has a valid `BlogPosting` JSON-LD block."* The system-review (§3) listed the schemas as matching but did not verify the runtime rendering. Patterns is also implicated by the `Phase 2` checklist that includes patterns detail.
- **Suggested fix:** Mirror the essay JSON-LD block in `src/pages/notes/[slug].astro` and `src/pages/patterns/[slug].astro`. Use `entry.data.title` for `headline`, `entry.data.date.toISOString()` for `datePublished`, `entry.data.excerpt ?? entry.data.lede` for `description`, `(entry.data.topics ?? []).join(', ')` for `keywords`, `new URL(Astro.url.pathname, Astro.site).href` for `mainEntityOfPage`. The `notes/[slug]` schema has `excerpt` (verified at `src/content.config.ts:6`); `patterns/[slug]` has `lede`; both have `date` and `topics`.

### 3. (MAJOR) `/projects` still hardcodes the project array instead of using `getCollection('projects')`

- **Severity:** Major (data hygiene; future maintainability; the brief's "projects source-of-truth" requirement)
- **Affected route:** `/projects`
- **Description:** `src/content/projects/` has 4 MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`). The `projects` collection is registered in `src/content.config.ts:62` with `{ title, desc, tags[], year?, url? }` per the system-review. Despite this, `src/pages/projects.astro:13-38` still ships the hardcoded array with an explicit comment at lines 6-9 admitting the fallback was never replaced: *"the `projects` content collection was unavailable at write time, so the hardcoded seed data below stands in for it."* The brief `projects.md` requires `getCollection('projects')`. About already correctly reads from the collection (`src/pages/about.astro:48-52`), so the collection is trustworthy; only `/projects` itself is stale.
- **Suggested fix:** In `src/pages/projects.astro`:
  - Replace the literal `projects = [{...}, ...]` with `const projects = await getCollection('projects');` (added import `import { getCollection } from 'astro:content';`).
  - Update JSX: `{p.title}` → `{p.data.title}`, `{p.desc}` → `{p.data.desc}`, `p.tags.map(...)` → `p.data.tags.map(...)`, `p.url` → `p.data.url`.
  - Drop the "Note:" comment at lines 6-9.

### 4. (MAJOR) `/now` hardcodes `nowItems` instead of importing from `src/data/now.ts`

- **Severity:** Major (data hygiene)
- **Affected route:** `/now`
- **Description:** `src/data/now.ts:14-42` exports `nowItems: NowItem[]` and `lastUpdated: string` — the exact shape both briefs require. `src/pages/now.astro:13-41` instead defines the items inline (essentially a copy of the file's data). `src/pages/about.astro:26,63` correctly imports `nowItems` from the module and slices `.slice(0, 3)`. The brief `now.md` requires the module; Phase 1A reported falling back to inline data because the module didn't exist yet — but `src/data/now.ts` exists (added in Phase 0 / system-review §4), so the fallback should have been replaced. Note: `/about` is fine.
- **Suggested fix:** In `src/pages/now.astro`:
  - Add `import { nowItems, lastUpdated } from '@/data/now';` at the top.
  - Delete the inline `NowItem` type, the inline `nowItems` array, and the inline `lastUpdated` constant (now.astro:9-44 becomes `import { nowItems, lastUpdated } from '@/data/now';`).

### Minor observations (informational, not "defects")

- **CuratedMark size:** `CuratedPicks.astro` hardcodes `size="md"` (1.1em) for the mark. The briefs imply `size="sm"` for the home page is also acceptable; visually identical at the rendered scale. `system-review.md §8 #5` flagged this as a known minor mismatch.
- **CuratedPicks heading placement:** Home and essays index use the eyebrow variant consistently (good).
- **`CuratedMark` extension to `/notes` index:** `briefs/notes-index.md:41` extends the ✦ glyph to notes cards for newly-added entries; `ui-review.md §2.2` flagged the brief-vs-shared-contract gap. The current build accepts the brief (notes index has CSS for the mark, ready to render when an entry falls within the 30-day window). No fix-up needed unless the author disagrees.
- **`/library` tile aspect**: book hover rotation `translateY(-4px) rotate(-1deg)` is preserved per brief; the prop `--book-hover-transform` was not extracted into a CSS variable (was named as "preferred" in `_shared-moves.md §5` but is a trivial polish).
- **`/about` subscribe band placement:** brief places between Identity and Now (Section 3); proposal enumerated it between Identity and Work History. `ui-review.md §2.5` flagged the brief-vs-proposal drift; current build follows the brief. Author confirm.
- **`/about` identity prose has TODO:** `src/pages/about.astro:109` has the marker `{/* TODO: author can revise the identity prose. */}`. The first-draft prose (4 paragraphs) is in place. Author voice work required post-build — see follow-up #1 below.
- **`/concepts` seed count:** 7 entries; proposal says "6-8". `ui-review.md §5.2` flagged for author expansion if desired.
- **`/colophon` eyebrow:** defaults to "Colophon"; proposal suggests "Site" or "Colophon". `ui-review.md §5.4` open.

---

## 3. Follow-up items

### 1. Author-voice / post-build TODOs flagged by the reviews

From `briefs/about.md:131` and the file's inline comment (`src/pages/about.astro:109`): the identity prose (4 paragraphs starting "I'm a web developer and designer based in Bangkok...") is a first draft the implementer wrote. **Author should replace post-build** to match the site's actual voice. Same for `/concepts` definitions (they're opinionated, possibly too), `/colophon` paragraphs (`src/pages/colophon.astro:35-` onwards — implementer-written), and the `Library` "Updated quarterly" micro copy.

The `ui-review.md` and `system-review.md` both identify the **about page** as the highest-risk editorial surface — the brief handles it with care but it's the page most likely to need post-build revision.

### 2. Brief vs shared-contract gaps that need author / spec reconciliation

Three open inconsistencies surfaced in the pre-flight reviews that didn't get resolved during Phase 1:

- `design-proposal.md §4 /library` says "thin **green** border + small `Reading` chip" (`design-proposal.md:154`), but `design-proposal.md §6` rule reserves gold (`#cba258`) for `/library` "currently reading" tile border (`:346`). **`briefs/library.md:91` chooses gold** (the §6 rule wins). **Proposal needs a one-line fix at §4 /library** to say "thin gold border." (Defect-free in code; doc drift only.)
- `briefs/notes-index.md:41` extends `CuratedMark` to `/notes` index cards; `briefs/_shared-moves.md §7` only authorizes the ✦ glyph for `/garden`. Either tighten `_shared-moves.md` to "garden + notes" or restrict `notes-index.md`. (`ui-review.md §2.2`, `§5.3`)
- `briefs/notes-slug.md:91` requires a `GrowthBadge.size?: 'sm' | 'md'` prop, but `_shared-moves.md §12` lists `GrowthBadge` as "Existing — no change." **The component DOES have the `size` prop** (`src/components/GrowthBadge.astro:9-10`) — system-review noted this as "prop mismatch" but the implementer added the prop anyway. **Either update `_shared-moves.md §12` to acknowledge the new prop, or revert the component.** Author confirm.

`ui-review.md §5` also flags author-decisions still open: (5.1) 3:4 vs 4:5 portrait on `/about`; (5.2) should `/concepts` ship with 7 or more terms; (5.3) is ✦ site-wide or `/garden`-only; (5.4) canonical `/colophon` eyebrow; (5.5) `/about` subscribe band placement; (5.6) is the picked `/library` "currently reading" book the right one.

---

## 4. Verdict

**The redesign ships as follows:** every route renders, the build is type-clean, all chrome (Nav 7-item, Footer 3-cluster + 20-entry blogroll) is wired correctly across all 16 routes, typography follows the brief on every prose surface, CuratedPicks + CuratedMark + NewsletterBand + Library "currently-reading" all match the contract, the random route and its manifest/redirect logic is correct, and the `.prose` utility has been consolidated into global.css with no inline rule duplicates surviving. **Four defects need fix-up:** (1) **critical** Frap is missing on 12 of 13 chrome pages because the rendering is gated by an empty `frap` slot — easiest fix is to inline `<Frap />` in `Layout.astro` and remove the slot indirection; (2) **major** JSON-LD `BlogPosting` is missing from all 8 notes detail and 12 patterns detail pages (essays are correct); (3) **major** `/projects` still uses a hardcoded inline array (`src/pages/projects.astro:13-38`) with a comment marking it as a Phase 1A fallback that was never replaced — the `projects` collection has 4 MDX entries registered and ready; (4) **major** `/now` hardcodes `nowItems` instead of importing from `src/data/now.ts` (which exists and is already consumed correctly by `/about`). Plus two documentation gaps to reconcile in `_shared-moves.md` / `design-proposal.md` and several author-voice TODOs to address post-build (most importantly the `/about` identity prose).
