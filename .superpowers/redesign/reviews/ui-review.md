# UI Design Review — Phurix Redesign Pre-Flight Coherence Check

> **Reviewer:** ui-designer (parallel to astro-coder agents Phases 1A-1D).
> **Scope:** Pre-implementation visual coherence review of all 16 page briefs + the shared moves contract + the design proposal.
> **Guardrail reminder:** This is a review-only artifact. The source files (briefs, DESIGN.md, theme.css, proposal) are not modified. Issues are documented here for the orchestrator.

---

## 1. Coherence Check (per-page)

For each page I checked: (a) does the brief match the proposal, (b) is the visual language consistent with `_shared-moves.md`, (c) is the section list coherent and complete, (d) does the brief honor the shared-moves contract.

### 1.1 `/` — Home (`briefs/index.md`)
- **Matches proposal §4 (Home).** All 7 sections match (hero / curated picks / 3 collection strips / library strip / subscribe band).
- **Visual language:** uses `--text-jumbo` fluid clamp for h1, `--text-body-lg` for lede, `--text-small` for eyebrow, `--color-starbucks-green` for h1, `--color-text-black` for section h2s. Consistent with shared-moves §1.
- **Section list coherence:** no missing/duplicated sections. The brief explicitly notes (in §5) that section h2s stay black while the page h1 is green — this is the correct distinction the proposal's "what we reject" list implicitly demands (avoid color on every sentence of running text).
- **Honors shared-moves:** yes — uses `NewsletterBand`, `CuratedPicks`, `CuratedMark`, modified `Nav`/`Footer`/`Frap`. Pass.
- **Note:** brief Section 2 (curated picks) offers "no heading at all OR eyebrow `If you only read three things`" — the proposal (`design-proposal.md:79`) just says "three hand-picked links" with no heading. The brief's default of including the eyebrow matches `essays-index.md` (which also adds the eyebrow). Consistent across the two curated-pick surfaces.

### 1.2 `/about` (`briefs/about.md`)
- **Matches proposal §4.** 9 sections matching header / identity / subscribe / now-preview / work-history / projects / talks / skills / closing-CTA.
- **Visual language:** uses `--text-jumbo` h1, Lora lede, Lora 18px prose body, `--color-starbucks-green` h1.
- **One small inconsistency** vs. proposal: brief §5 ("Edge cases") says "The proposal does NOT put the subscribe band between Identity and Work history in its enumerated list — it puts it AFTER Identity in the narrative" and then **decides to place subscribe between Identity and Now** (as Section 3). This is a deliberate reordering that diverges from proposal §4 which lists the subscribe band between Identity and Work History in the numbered list (`design-proposal.md:105`). Acceptable editorial decision; flag for awareness but consistent with the proposal's "one subscribe CTA per page" rule.
- **Honors shared-moves:** uses `NewsletterBand`, `Timeline.astro` modification (dot tightening), modified `Nav`/`Footer`/`Frap`, and the new `projects` collection. Pass.
- **Strong note:** the brief carefully scopes the `.prose` import and the `nowItems` slice via `src/data/now.ts` — this is the one cross-brief dependency. Brief `now.md` must agree.

### 1.3 `/contact` (`briefs/contact.md`)
- **Matches proposal §4.** 3 sections (header / 3 channel cards / direct email CTA).
- **Visual language:** `--text-jumbo` h1, Lora lede at `--text-body-lg`.
- **Section list coherence:** minimal page, clean. Matches proposal exactly.
- **Honors shared-moves:** only chrome modifications (Nav/Footer/Frap). Pass.
- **Trivial:** the brief updates lede copy and the primary button label ("Send an Email" → "Email me directly"). Both consistent with the Frap relabel to "Email me."

### 1.4 `/garden` (`briefs/garden.md`)
- **Matches proposal §4.** 6 sections (header / on-this-day / sticky filter / grid / empty-state / random-link footer micro).
- **Visual language:** `--text-jumbo` h1 ("The Garden" — slight copy change from "Garden"), lede unchanged.
- **Section list coherence:** the brief introduces two new sections (on-this-day, empty-state, random-link). These are proposal-aligned (§4 /garden and §7 on-this-day).
- **Honors shared-moves:** uses `CuratedMark` via the new `GardenCard.newSince` prop. The brief (in §5) **decides to add a `newSince?: Date` prop to `GardenCard`** — this is a contract change that other briefs (`notes-index.md`) depend on. **`notes-index.md:55` and the implementation-order Phase 0 step 8 (`_implementation-order.md:46`) both reference this prop** — three-way contract is consistent. Pass.
- **Soft dependency:** brief assumes `src/lib/onThisDay.ts` exists — created by `notes-index.md:65`. This is documented but is a real ordering risk if garden runs before notes-index (the `_shared-moves.md` §5 says both import from a shared helper that doesn't exist yet). Brief §3 marks the helper as `src/lib/onThisDay.ts` (NEW) but garden assumes it exists — see Phase 0 (`_implementation-order.md:62`).

### 1.5 `/library` (`briefs/library.md`)
- **Matches proposal §4.** 4 sections (header / optional filter row / book grid / "Updated quarterly" micro-line).
- **Visual language:** `--text-jumbo` h1, standard page header treatment.
- **Section list coherence:** proposes skipping the filter row in v1 — matches proposal §4's "If author can't add these facets yet, ship without filters." Good.
- **Honors shared-moves:** uses new `BookTile.currentlyReading?: boolean` prop. Pass.
- **One important tension:** brief §5 explicitly flags a **palette conflict between proposal §4 /library and proposal §6 palette rule**. §4 says "thin **green** border + small `Reading` chip"; §6 says "Gold is reserved for `/library` 'currently reading' tile border." The brief chooses **gold for the border** (§5: "USE GOLD for the currently-reading border"). This is the right call (palette rule wins), but the proposal itself is internally inconsistent. **Flag: the proposal needs a one-line fix at §4 /library** to say "thin gold border" rather than "thin green border." Not a brief issue; a proposal issue.

### 1.6 `/now` (`briefs/now.md`)
- **Matches proposal §4.** 2 sections (header / single ordered list).
- **Visual language:** `--text-jumbo` h1, Lora lede, `--text-micro` "last updated" line, `<dl>` semantics, hairline dividers.
- **Section list coherence:** the brief **drops the closing "more on /now" footer line** (proposal didn't require it either). Clean.
- **Honors shared-moves:** introduces `src/data/now.ts` as a shared data file. Pass.
- **Cross-brief contract:** `about.md:104` slices `.slice(0, 3)` from `nowItems` in the same file — both briefs agree on the data shape. Pass.
- **A11y:** the brief uses real `<dl>`/`<dt>`/`<dd>` (semantic) with a `<div>` wrapper workaround for HTML5 — solid.

### 1.7 `/projects` (`briefs/projects.md`)
- **Matches proposal §3 (migrate hardcoded array) and §4.** 3 sections (header / project grid / "More on GitHub" link).
- **Visual language:** `--text-jumbo` h1, Lora lede at `--text-body-lg`, Lora `--text-body` desc (NEW; was sans). The Lora-switch is consistent with the proposal's "editorial register" move for non-chrome surfaces.
- **Section list coherence:** no issues. Brief notes (in §5) that the old hardcoded array must be removed and replaced with `getCollection('projects')`. Cross-brief contract with `about.md` which also reads from the same collection.
- **Honors shared-moves:** uses new `projects` collection. Pass.

### 1.8 `/talks` (`briefs/talks.md`)
- **Matches proposal §4.** 3 sections (header / row list / closing line).
- **Visual language:** `--text-jumbo` h1, Lora descriptions (NEW; was sans), Inter meta right column.
- **Section list coherence:** the brief replaces the existing `<CollectionGrid>` with a row list — matches proposal exactly. Pass.
- **Honors shared-moves:** only chrome changes; talk row is page-specific. Pass.
- **Soft note:** brief says "Talks still NOT in top nav" — confirmed by the proposal's 7-item nav (`_shared-moves.md:402` and `design-proposal.md:415`).

### 1.9 `/essays` (index) (`briefs/essays-index.md`)
- **Matches proposal §4.** 3 sections (header / curated-picks / card grid).
- **Visual language:** `--text-jumbo` h1, optional eyebrow for curated picks, 2-col `CollectionGrid`.
- **Section list coherence:** clean. Brief §5 confirms: **grid columns stay at 2 (not 3 like the home page)** — matches proposal's catalogue-vs-stream distinction.
- **Honors shared-moves:** uses `CuratedPicks` + `CuratedMark`. Pass.

### 1.10 `/essays/[slug]` (`briefs/essays-slug.md`)
- **Matches proposal §4.** 6 sections (back / hero / title / meta / prose / prev-next) + JSON-LD.
- **Visual language:** **Lora 600 h1** (the proposal's prose-page h1 — distinct from the chrome h1). 16:9 hero photo full 65ch column.
- **Section list coherence:** no missing sections. Brief explicitly says to **drop the 22rem padding clamp on `.essay-art`** (current implementation). Pass.
- **Honors shared-moves:** the brief **owns the `.prose` consolidation** (Phase 0 step 2; `_implementation-order.md:36`). Other prose pages (notes-slug, patterns-slug) drop their inline `.prose :global(...)` rules and inherit. Three briefs (essays-slug, notes-slug, patterns-slug) must agree on this; the contract is in `_shared-moves.md` §1. Pass.
- **Strong:** the brief mandates `TopicChip` hrefs to link to `/garden?topic={t}` — matches the notes-index and the proposal's filter URL convention.

### 1.11 `/notes` (index) (`briefs/notes-index.md`)
- **Matches proposal §4.** 3 sections (header / on-this-day / card grid).
- **Visual language:** `--text-jumbo` h1, eyebrow is "Garden" (KEEP existing — proposal agrees), 3-col `CollectionGrid`.
- **Honors shared-moves:** **creates** `src/lib/onThisDay.ts` (this brief, §4 and §3). Phase 0 step 16 (`_implementation-order.md:62`) lists it as a Phase 0 deliverable. **Both references are consistent.**
- **Cross-brief contract:** the brief reuses the new `GardenCard.newSince` prop and the `CuratedMark` prefix — same contract as garden.md. Pass.
- **Soft note:** brief says "render the CuratedMark prefix on `/notes` cards too if the note was published in the last 30 days." Proposal §7 only specifies `/garden` for the ✦ glyph on "newly added" entries. **Brief extends the proposal's intent (✦ on newly-added in last 30 days) to /notes too — defensible but a slight proposal expansion.** The `_shared-moves.md` §7 says "Where it appears: ... 2. At the start of any one entry marked 'newly added' in the past 30 days on `/garden`." So per the shared contract, the ✦ is `/garden` only. **Flag inconsistency between `notes-index.md:41` and `_shared-moves.md:214`.**

### 1.12 `/notes/[slug]` (`briefs/notes-slug.md`)
- **Matches proposal §4.** 6 sections (back / conditional hero / title / meta / prose / prev-next).
- **Visual language:** **Lora 600 h1** (matching essays), prose body line-height **1.65** (slightly tighter than essays 1.7 — proposal-mandated).
- **Section list coherence:** hero is conditional on `growthStage === 'evergreen'`. Clean.
- **Honors shared-moves:** uses the shared `.prose` utility with a scoped `1.65` override. Pass.
- **Cross-brief contract:** brief mandates a `GrowthBadge.size?: 'sm' | 'md'` prop addition. This is **not** in `_shared-moves.md` — only in this brief. **`_shared-moves.md:268` says `GrowthBadge` is unchanged.** **Flag inconsistency: notes-slug brief assumes a new `size` prop that the shared-moves contract doesn't list.** Likely benign (small addition) but worth surfacing.

### 1.13 `/patterns` (index) (`briefs/patterns-index.md`)
- **Matches proposal §4.** 2 sections (header / row list).
- **Visual language:** `--text-jumbo` h1, eyebrow "Catalogue" (existing), 1fr/10rem columns (tightened from 1fr/12rem per proposal).
- **Section list coherence:** minimal. Matches proposal.
- **Honors shared-moves:** only chrome changes. Pass.

### 1.14 `/patterns/[slug]` (`briefs/patterns-slug.md`)
- **Matches proposal §4.** 7 sections (back / hero / title / meta / prose / "Used in:" / bottom back-link).
- **Visual language:** **Lora 600 h1** (matching essays + notes), prose body line-height **1.7** (matches essays, NOT notes' 1.65 — proposal-aligned since patterns are full-prose like essays).
- **Section list coherence:** the "Used in:" footer line is **conditional** on `pattern.data.related && length > 0`. Brief §5 notes that the schema currently defines `related: z.array(reference('patterns')).optional()` — only other-pattern references, NOT cross-collection (notes/essays). The proposal §4 says "linking to notes/essays that reference this pattern" — but the schema doesn't support it. **Brief explicitly chooses the existing schema (`reference('patterns')` only) as a v1 scope decision. Flag: brief scopes-down the proposal's stated cross-collection intent.** Acceptable for v1; document in changelog.

### 1.15 `/404` (`briefs/404.md`)
- **Matches proposal §4.** 2 sections (header / two CTAs).
- **Visual language:** `--text-display` (5rem/80px) — the one place display-scale is earned. **`--text-jumbo` upgrade NOT applied here** — correct, since 404 is the display exception per proposal.
- **Honors shared-moves:** only chrome changes. Pass.
- **Note:** brief updates second CTA from `Browse Projects` to `Browse the Garden` (`href="/garden"`). Correct per proposal.

### 1.16 `/colophon` (`briefs/colophon.md`)
- **Matches proposal §3 + §8.** 3 sections (header / ~10-paragraph prose / single-line subscribe).
- **Visual language:** `--text-jumbo` h1 (standard), Lora 18px prose body.
- **Honors shared-moves:** uses `.prose` utility. Pass.
- **Note:** brief §1 explicitly flags the proposal's mixed signal: §3 says "colophon is the design statement as a page" (has its own URL), §8 says "Colophon lives in the footer, not as its own route." **Brief reconciles to "both: has its own URL AND is linked from the footer."** Pass.
- **Privacy honesty:** brief §5 softens the proposal's "no third-party requests" claim to admit font CDN + photo CDN. Honest.

### 1.17 `/concepts` (`briefs/concepts.md`)
- **Matches proposal §3 + §8.** 2 sections (header / glossary list).
- **Visual language:** `--text-jumbo` h1, eyebrow "Glossary," `<dl>`-style entries with hairline dividers (mirrors `/now` styling).
- **Honors shared-moves:** inline JSX (no new MDX collection). Pass.
- **Seed count:** brief ships **7 entries** (matches proposal's "6-8 entries"). Pass.
- **Cross-links skipped** in v1 (brief §5). Acceptable.

### 1.18 `/random` (`briefs/random.md`)
- **Matches proposal §3 + §8 + `_shared-moves.md` §12 #3.** Single-page redirect.
- **Visual language:** interstitial with `Picking a random post…` (Lora `--text-body-lg`).
- **Honors shared-moves:** brief implements as `.astro` (not `.ts`) because `output: 'static'` doesn't support server endpoints. Manifest built at build time. Pass.
- **No chrome:** page deliberately has no `Layout.astro` wrapper (no nav, footer, or Frap). Pass.

### 1.19 Blogroll (`briefs/blogroll.md`)
- **Matches proposal §8.** Data module `src/data/blogroll.ts` rendered inside the footer's Cluster 2 `<details>`.
- **Honors shared-moves:** the brief **explicitly forbids creating `src/pages/blogroll.mdx`** — the data module is the surface. Pass.
- **Note:** brief seeds 20 entries drawn from the proposal's reference set. Pass.

---

## 2. Inconsistencies (named)

### 2.1 Proposal §4 /library vs §6 palette rule
- **Location:** `design-proposal.md:154` ("thin green border + small `Reading` chip") vs `design-proposal.md:346` ("Gold (`#cba258`): off-limits except in the `/library` 'currently reading' tile border").
- **Conflict:** §4 says green; §6 says gold (and gold is the existing semantics per DESIGN.md §2).
- **Resolution in brief:** `briefs/library.md:91` chooses **gold** (the §6 rule wins). The proposal needs a one-line fix at §4 /library.

### 2.2 `_shared-moves.md` §7 (CuratedMark) vs `notes-index.md:41`
- **Conflict:** shared contract says ✦ appears "on `/garden`" for newly-added entries. `notes-index.md:41` extends the ✦ to notes index cards too.
- **Resolution:** defensible (consistent "newly added" affordance), but the brief silently expands the proposal's glyph scope. Either tighten the shared-moves to say "garden + notes" or restrict the brief. **Pick one.**

### 2.3 `_shared-moves.md` §12 (modified components) vs `notes-slug.md:91`
- **Conflict:** shared-moves lists `GrowthBadge` as "Existing — no change" (`_shared-moves.md:268`). `notes-slug.md:91` adds a new `size?: 'sm' | 'md'` prop.
- **Resolution:** add the new prop to `_shared-moves.md` §12, or restrict `notes-slug.md` to use the existing badge at a single size. Currently the two contracts disagree.

### 2.4 `garden.md` and `notes-index.md` shared helper ordering
- **Location:** `briefs/garden.md:97` references `src/lib/onThisDay.ts` as if it exists. `briefs/notes-index.md:65` creates it. Phase 0 step 16 (`_implementation-order.md:62`) lists it as a Phase 0 deliverable.
- **Resolution:** Phase 0 ordering handles this — the helper is created before any Phase 1 page runs. The briefs' references are consistent with Phase 0.

### 2.5 `briefs/about.md` subscribe-band placement vs `design-proposal.md:105`
- **Conflict:** proposal's enumerated list puts subscribe between Identity and Work History; brief places it between Identity and Now.
- **Resolution:** brief §5 acknowledges and chooses the editorial placement (between Identity and the more functional sections). Acceptable deviation.

### 2.6 Section heading color for collection strip h2s
- **Location:** proposal `design-proposal.md:339` says accent is for "h1, h2 prose headings, nav active state, links." Section-level h2s on home (`briefs/index.md:137`) are `--color-text-black`. The proposal doesn't explicitly say "section h2s are black" — this is inferred from the rule "Color is the 'where to look next' cue." Brief is consistent with the inference.

### 2.7 Hero h1 copy on home
- **Location:** `briefs/index.md:33` sets h1 copy to `Writing about web craft, design systems, and the occasional rabbit hole.` (existing). The proposal §4 /home (`design-proposal.md:78`) only says "h1 in Inter 600 (jumbo), lede in Lora body" — doesn't dictate copy. The existing h1 has been kept. Pass.

---

## 3. Cross-Page Consistency Gaps

### 3.1 Hub-page treatment is consistent
- All hub pages (`/garden`, `/library`, `/now`, `/projects`, `/talks`, `/essays`, `/notes`, `/patterns`) use the same `.page-header-section` block (`padding-block: var(--spacing-7) var(--spacing-5)`, bottom hairline, eyebrow + jumbo h1 + Lora lede). **Consistent.** Pass.

### 3.2 Detail-page reading frame is consistent
- Essay / note / pattern detail all share: back-link → (conditional) hero → Lora 600 h1 → meta row → `<div class="prose">` → prev/next. **Consistent.** Pass.
- The only divergence is hero-image presence (essay: always 16:9, note: conditional evergreen-only, pattern: always 4:3 at 32rem max-width) and body line-height (essay/pattern: 1.7, note: 1.65). Both divergences are proposal-mandated.

### 3.3 `.prose` utility adoption is consistent
- All four long-form surfaces (`/about` identity, `/essays/[slug]`, `/notes/[slug]`, `/patterns/[slug]`, `/now` (via `.now-value`), `/colophon`) use the shared `.prose` block. **Consistent.** Pass.
- One caveat: `/now`'s value is in `.now-value` (not `.prose`) but uses the same font-family / size / line-height (brief `now.md:78`). Visually identical; structurally outside `.prose` because `.now-value` is a `<dd>` inside a `<dl>`. Acceptable.

### 3.4 CTA wording is mostly consistent — one drift
- **Subscribe CTA:** "Letters from a working library." / "Subscribe" — verbatim across `/` (`briefs/index.md:94`), `/about` (`briefs/about.md:55`), and the proposal (§7). Pass.
- **"All X →" CTAs on collection strip h2s:** `All essays →` (`briefs/index.md:53`), `All notes →` (`briefs/index.md:59`), `All patterns →` (`briefs/index.md:64`), `Browse the library →` (`briefs/index.md:71`). **Pass.** Consistent.
- **`/about` "All projects →" / "All talks →":** uses the same arrow-glyph convention. Pass.
- **`/projects` "More on github"** (`briefs/projects.md:43`): **lowercase "github" in the body, but uppercase "GitHub" elsewhere (footer, contact card, blogroll entry, colophon link).** Minor drift — `briefs/projects.md:43` writes "github.com/phurix" but `briefs/contact.md:71` writes "@phurix" with the GitHub card labeled "GitHub." Cosmetic. **Flag.**
- **`/contact` primary CTA:** "Email me directly" (`briefs/contact.md:42`). This mirrors the Frap relabel ("Email me"). Consistent.

### 3.5 CuratedMark placement is mostly consistent — one extension
- `CuratedMark.astro` is a shared component (`_shared-moves.md:215`). Used in:
  - `CuratedPicks` (home / curated-picks block + essays-index curated-picks block) — proposal §7 explicitly authorized.
  - On `GardenCard` titles when `newSince >= now-30d` — proposal §7 explicitly authorized for `/garden`.
- **Extension in `notes-index.md:41`:** same affordance applied to note cards. **Brief extends proposal's scope** (see 2.2).

### 3.6 On-this-day is consistent
- Appears on `/garden` (`briefs/garden.md:32`) and `/notes` (`briefs/notes-index.md:29`) via shared helper `src/lib/onThisDay.ts`. **Consistent.** Pass.
- Proposal §4 mentions "On this day" treatment on `/garden` only; `/notes` extension is brief-side. Acceptable.

### 3.7 Frap visibility is consistent
- **Shown on:** `/` (`briefs/index.md:99`), `/about` (`briefs/about.md:102`), `/contact` (`briefs/contact.md:47`), `/garden` (`briefs/garden.md:71`), `/library` (`briefs/library.md:57`), `/projects` (`briefs/projects.md:47`), `/talks` (`briefs/talks.md:52`), `/essays` index (`briefs/essays-index.md:47`), `/notes` index (`briefs/notes-index.md:45`), `/patterns` index (`briefs/patterns-index.md:48`), `/404` (`briefs/404.md:41`), `/colophon` (`briefs/colophon.md:59`), `/concepts` (`briefs/concepts.md:18`).
- **Hidden on:** `/now` (`briefs/now.md:91`), `/essays/[slug]` (`briefs/essays-slug.md:65`), `/notes/[slug]` (`briefs/notes-slug.md:59`), `/patterns/[slug]` (`briefs/patterns-slug.md:61`), `/random` (`briefs/random.md:92` — no Layout wrapper).
- **Consistent with proposal §4:** "stays on every page except those with their own deep-focus surface." Pass.

### 3.8 Nav consistency
- 7-item list (`Home / Garden / Essays / Notes / Patterns / Now / Random`) appears verbatim across all briefs that reference it (`_shared-moves.md:393`, every brief that mentions `Nav.astro` modification). **Consistent.** Pass.

### 3.9 Footer cluster consistency
- Three clusters (Subscribe / Find more / Social+brand) referenced identically across all briefs. The Cluster 2 link list is 13 inline links + Blogroll `<details>` (12 inline + Blogroll-as-details + RSS = 13 items per `_shared-moves.md:354`). The 12-link list + Blogroll `<details>` is consistent across all briefs. **Consistent.** Pass.

### 3.10 `TopicChip` href is consistent
- All briefs that use `TopicChip` with a link pass `href={\`/garden?topic=\${t}\`}`: essays-slug (`briefs/essays-slug.md:47`), notes-slug (`briefs/notes-slug.md:46`). Pass.

### 3.11 Eyebrow wording
- Eyebrow copies:
  - `/essays`: "Collection" (existing; proposal agrees via §4)
  - `/notes`: "Garden" (existing; proposal agrees via §4)
  - `/patterns`: "Catalogue" (existing; proposal agrees via §4)
  - `/colophon`: "Colophon" (brief default; proposal says "Site or Colophon")
  - `/concepts`: "Glossary" (brief)
- These are **deliberately distinct** (one word per page that signals the page's role). Proposal §4 endorses this for the three index pages. Colophon/Concepts eyebrows are brief-chosen. Pass.

---

## 4. Visual Language Sanity

### 4.1 Accent glyph (✦)
- `_shared-moves.md:212` confirms ✦ (U+2726) is the single accent glyph, rendered in `var(--color-starbucks-green)` at three sizes. Component is `aria-hidden`. **Reads as intended.** Pass.
- One risk: ✦ next to a chip or italic Lora link may need a visual-weight check (the mark uses Inter 500 at 1.1em default — slightly heavier than the Lora italic it precedes). Implementer should preview the curated-picks block visually.

### 4.2 Subscribe band (`NewsletterBand`)
- `_shared-moves.md:334` and `design-proposal.md:401` agree: dark-green band, white headline (Lora 500, `--text-hero-large`), white-soft subhead (Inter `--text-body`), white-pill input, `Subscribe` CTA. Matches existing `/about` newsletter card. **On-brand.** Pass.

### 4.3 Mobile nav (7 items + hamburger)
- `_shared-moves.md:414` flags that the existing implementation hides nav links below 768px with no replacement. The fix is a disclosure toggle that shows nav links vertically below the nav bar.
- **7 items + wordmark + hamburger** is **dense** at <768px. Recommend the implementer verify the disclosure list fits within 8rem nav height + scrollable area. Should be OK (7 text links at ~14px each = ~100px). **Pass with verification.**

### 4.4 Footer 3-cluster balance
- Cluster 1 (Subscribe form + eyebrow): 1 line + form. Lightweight.
- Cluster 2 (Find more): 13 items including Blogroll `<details>`. The expansion of Blogroll to 20 inline links (2-col on desktop) makes Cluster 2 visually heavier than Cluster 1.
- Cluster 3 (Social icons + © + Colophon link): lightest.
- **Balance:** Clusters are unequal in weight, but that's the design intent (Cluster 1 = primary CTA, Cluster 2 = utility nav, Cluster 3 = brand). Acceptable.

### 4.5 Topic chips on detail pages
- Topic chips appear in essay-meta (`briefs/essays-slug.md:47`), note-meta (`briefs/notes-slug.md:46`). Proposal §6 says "Topic chips don't compete with the prose" — they're at `--text-small` Inter 600, uppercase + tracking-loose, green. They sit in the meta row above the prose body. **Should not compete.** Pass.

### 4.6 About portrait aspect
- Brief `about.md:132` chooses 3:4 for the portrait. Proposal §4 says "3:4 / 4:5" — the brief picks one. `TopicPhoto` will need a new `scale="portrait"` enum. **Implementer dependency.** Pass.

### 4.7 Library "Currently reading" tile
- After the gold-vs-green reconciliation (see 2.1), the tile gets `border: 2px solid var(--color-gold)` and a small "Reading" chip. Brief `library.md:91` defaults to `--color-gold` background for the chip with `--color-text-black` text. **Reads as a "rewards-status ceremony" tile — on-brand per DESIGN.md §2.**

### 4.8 Timeline dot tightening
- Brief `about.md:71` changes from `background: var(--color-green-accent); border: 3px solid var(--color-neutral-warm); box-shadow: 0 0 0 2px var(--color-green-accent);` to `background: var(--color-neutral-warm); border: 1px solid var(--color-green-accent); box-shadow: 0 0 0 1px var(--color-green-accent);`. **Result: a hollow green ring with a warm center.** Reads as a soft bead, not a checkbox. Per proposal §9 #9, this is the correct fix. Pass.

### 4.9 Hero art vs page h1 ordering on mobile
- Brief `index.md:38` says `order: -1` on mobile so art sits above copy. The existing layout has copy left, art right at desktop. **Mobile order swap is intentional and proposal-aligned** (Appleton pattern — visual anchor first). Pass.

### 4.10 "Updated quarterly" / "Last updated" micro-lines
- `/library` ends with "Updated quarterly" (`briefs/library.md:53`).
- `/now` has "Last updated [date]" (`briefs/now.md:31`).
- Both are Inter `--text-micro` `--text-black-soft`. **Consistent.** Pass.

---

## 5. Open Questions Worth Flagging to the Author

### 5.1 Is the portfolio portrait 3:4 or 4:5?
- `design-proposal.md:109` says "3:4 / 4:5" for the about-page portrait. Brief `about.md:132` chooses 3:4. **Author should confirm.** The `TopicPhoto.scale="portrait"` variant is being added regardless; the exact aspect is the only question.

### 5.2 Should `/concepts` ship with 7 terms or more for v1?
- Brief `concepts.md:43` seeds 7. Proposal says "6-8 entries." If the author has a richer vocabulary (the proposal mentions 7 candidates plus `calm defaults` in the design proposal's optional list at `_shared-moves.md:454`), they should pre-fill the rest. **Author should confirm or expand.**

### 5.3 Should the ✦ glyph appear on `/notes` index for newly-added entries?
- See 2.2. Proposal §7 only specifies `/garden`. Brief `notes-index.md:41` extends. **Author should confirm whether ✦ is a "newly-added" affordance site-wide or `/garden`-only.**

### 5.4 What is the canonical eyebrow word for `/colophon`?
- Brief `colophon.md:84` defaults to "Colophon" but the proposal mentions "Site" or "Colophon." **Author should confirm.** Affects consistency with other eyebrows (`Collection`, `Catalogue`, `Garden`).

### 5.5 Should the `/about` subscribe band sit between Identity and Now (brief's choice) or between Identity and Work History (proposal's enumerated order)?
- See 2.5. **Author should confirm placement.** The brief places it as Section 3 (between Identity and Now). Either works.

### 5.6 (Bonus) Is the `/library` "currently reading" book the implementer picks in Phase 0 the right one?
- Brief `library.md:81` says "pick whichever book the implementer judges most appropriate." **Author should confirm or override post-build.**

### 5.7 (Bonus) Should `/about` keep the existing identity-paragraph voice, or rewrite?
- Brief `about.md:131` writes a first draft and marks with TODO. **Author must replace post-build.** Flag explicitly to author.

---

## 6. One-Paragraph Verdict

**Your redesign will read as a calm, print-borrowed, single-accent publication with seven doors: a warm cream canvas, Lora 18px prose, Inter 600 chrome, one starbucks-green signal at headings and links, and ✦ as the single editorial mark.** The hub/index pages share a page-header vocabulary and the detail pages share a reading-frame; long-form surfaces consolidate into one `.prose` utility. There are three risks worth surfacing: **(1)** the proposal itself contains an internal inconsistency between §4 `/library` (green border) and §6 palette rule (gold border for "currently reading") — `briefs/library.md` reconciles to gold, but the proposal needs a fix; **(2)** three brief-vs-shared-contract gaps exist where briefs introduce new components/props (`CuratedMark` on `/notes`, `GrowthBadge.size`, the `/about` subscribe-band reordering) that aren't in `_shared-moves.md` — small but should be unified before Phase 0; **(3)** the `/about` page is the most editorially-heavy surface (identity prose + subscribe + now preview + timeline + projects + talks + skills) — the brief handles this with care but it's the page most likely to need post-build author revision.