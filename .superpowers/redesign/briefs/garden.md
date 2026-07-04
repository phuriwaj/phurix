# Brief — `/garden`

**Route:** `/garden`
**File:** `src/pages/garden.astro`
**One-line job (from proposal §4):** The single filterable surface where every writing artifact lives.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/garden`) and §9:

- The Garden is **not** the home page — it is the second thing in the nav.
- Filters are URL-driven (`/garden?type=note&topic=design&growth=seedling`) — linkable from home-page section headers.
- An "On this day" treatment: if any garden entry was published on today's month/day in a prior year, surface one as a single quiet line at the top of the grid.
- Sticky filter bar with three filter groups (Type / Topic / Growth).
- The page is one of the four "always-on" surfaces — it shows everything, filterable.
- The Frap **stays** on this page (the proposal says it hides only on `/now` and individual essay/notes/patterns detail — `/garden` is a hub).

---

## 2. Sections, top to bottom

### Section 1 — Page header (existing)

- `.page-header-section` (existing CSS). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- `<h1 class="page-title">The Garden</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.** Update h1 text from "Garden" to "The Garden".
- Lede: `Everything I've written, in reverse chronological order. Filter by type, topic, or growth stage.` (existing copy kept; minor punctuation tightening).

### Section 2 — On this day (NEW)

- **Container:** `.container-phx`, sits ABOVE the filter bar.
- **Conditional render:** compute a single entry that matches today's `MM-DD` from any prior year (NOT today). If multiple match, pick the most recent. If none match, render nothing.
- **Render:** single Lora italic line: `On this day in 2023 — <a href="/essays/{slug}">{title}</a>`. (Year is dynamic — use the entry's actual year.)
- **Style:** Lora italic at `--text-body`, color `var(--color-text-black)`. Link hover → `var(--color-starbucks-green)`. Surrounding `<p>` has `margin-block: var(--spacing-4) var(--spacing-2)`.
- **The ✦ glyph** appears in front of any "newly added in past 30 days" entry inside the grid (per proposal §7). Implementation: in the per-entry render inside the grid loop, check if `entryDate >= (today - 30 days)`; if so, prepend `<CuratedMark size="sm" />` to the entry's title in the card.

### Section 3 — Sticky filter bar (existing)

- Existing `.filter-section` CSS kept.
- Three filter groups: Type / Topic / Growth. Existing chip implementation kept (`<button class="topic-chip">`).
- Sticky beneath the nav: top values `var(--nav-h-xs)` → `var(--nav-h-lg)` at breakpoints (existing).
- Filter script: existing — keep. URL params on load (existing `typeParam` logic) — keep. **ADD: `topicParam` and `growthParam` URL hydration** (existing only hydrates `type`). On load, read `?topic=` and `?growth=`, find the matching chip, set it active, apply filter.

### Section 4 — Card grid (existing)

- `<CollectionGrid cols={3} gap="md">` — existing.
- Each entry wrapped in `.entry-card-wrapper` with `data-type`, `data-topics` (JSON), `data-growth` (existing).
- `<GardenCard>` per entry — existing.
- **Add the CuratedMark** (NEW) prefix on entries published in the last 30 days, per §2 above.

### Section 5 — Empty/no-results state (NEW)

- When the active filter combination produces zero matches, show a single sentence: "No matches — clear filters." Lora italic, color `--color-text-black-soft`, centered, `padding-block: var(--spacing-7)`. Show ONLY when no `.entry-card-wrapper` has `display !== 'none'`.
- Implementation: a small `<p class="garden-empty" hidden id="garden-empty">` that the existing filter script can toggle (`hidden` attribute) when filter result is empty.

### Section 6 — Random link footer micro-line (NEW)

- Below the grid: single line, centered, Lora italic, color `--color-text-black-soft`, `--text-body`:
  ```html
  <p class="garden-random-link">
    Or — <a href="/random">read something random</a>.
  </p>
  ```
  Margin-block-start: `var(--spacing-6)`.

### Frap

- Stays. Label "Email me" (per `_shared-moves.md` §12).

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `CuratedMark.astro` | **NEW** | Used to mark newly-added entries in the grid. |
| `Nav.astro` | Modified | New 7-item navLinks (includes Random). |
| `Footer.astro` | Modified | Three-cluster restructure. |
| `Frap.astro` | Modified | Default label change. |
| `GardenCard.astro` | Possibly modified | If the implementer wants the CuratedMark INSIDE the card title (per proposal — "at the start of any one entry marked 'newly added'"), wrap `garden-card-title` and add `growthStage` or a `newSince?: Date` prop. **Implementer decision: add a `newSince?: Date` prop to `GardenCard`; if `newSince && newSince > (now - 30 days)`, render `<CuratedMark size="sm" />` immediately before the h3.** This keeps the home page and garden consistent. |

---

## 4. Content additions needed

- **No new content collections.**
- **No new frontmatter fields.**
- The filter URL hydration needs to be extended for `topic` and `growth` params (script-only change).

---

## 5. Edge cases / decisions left to the implementer

- **"On this day" computation** — proposal says "if any garden entry was published on today's month/day in a prior year, surface one as a single quiet line." Implementation:
  ```ts
  const today = new Date();
  const monthDay = `${today.getMonth()}-${today.getDate()}`;
  const onThisDay = allEntries.find(e => {
    const d = new Date(e.data.date);
    return d.getMonth() === today.getMonth()
      && d.getDate() === today.getDate()
      && d.getFullYear() !== today.getFullYear();
  });
  ```
  - If multiple match, sort by date desc, take the first (most recent prior year).
  - If none match, render nothing.
  - The line says "On this day in YYYY —" where YYYY is the entry's year, not today's year.
- **CuratedMark placement on `GardenCard`** — should it appear in the card title (`.garden-card-title`) or as an additional badge near `.garden-card-meta`? **Decision: prepend to the title h3, size sm.** The visual: `✦ <h3>Title</h3>`. The mark is `inline-block` so it sits inside the text flow. **Verify the title still wraps correctly with the mark prepended.**
- **Filter URL hydration** — implementer extends the existing `initGardenFilter` to read `topicParam` and `growthParam` from the URL params and apply the corresponding active state.
- **Empty state** — the proposal says "Lora italic, 'No matches — clear filters.'" The implementer needs to wire the visibility based on the filter result count. Compute on each `applyFilters()` call.
- **"Random" link in nav** — the page footer micro-link is in addition to the nav Random link. The nav link is the primary surface.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/garden/index.html`.
- Visiting `/garden` shows: header (green jumbo h1 "The Garden"), optional "On this day" line if any entry matches today's MM-DD, sticky filter bar with three groups, card grid of all entries (newest first), empty-state hidden when results > 0, footer micro-link to /random.
- Clicking a Type chip filters in place; URL updates; on reload, filters persist.
- Visiting `/garden?type=note&topic=design` hydrates both filter chips correctly.
- A note entry rendered with a `growthStage: 'evergreen'` shows its 🌳 badge. A pattern entry shows no growth badge.
- Visiting `/garden?type=impossible-value` does NOT crash; the filter falls back to "all".
- The CuratedMark ✦ appears in front of any entry published in the last 30 days — and ONLY those entries.
- If `today` matches no prior-year entry's MM-DD, the "On this day" section renders nothing.
- Frap visible bottom-right with label "Email me".
- `:focus-visible` visible on every chip and link.