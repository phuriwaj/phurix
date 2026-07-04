# Brief — `/talks`

**Route:** `/talks`
**File:** `src/pages/talks.astro`
**One-line job (from proposal §4):** A sparse, external-link-heavy index of public speaking.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/talks`) and §9:

- Talks are a **row list**, not a card grid (they're small in number, and a row list better mirrors bibliographic form).
- External links are visibly external (↗ glyph on hover) — keeps the boundary legible.
- Closing line: "For workshop enquiries: [contact link]."
- Frap **stays**.

---

## 2. Sections, top to bottom

### Section 1 — Header (existing)

- `.page-header-section` (existing CSS). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- `<h1 class="page-title">Talks</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede — existing copy kept.

### Section 2 — Row list (REPLACES the existing `<CollectionGrid>`)

- Replace the current `<CollectionGrid cols={2}>` of `<GardenCard type="talk">` with a row list — pattern after `/patterns/index.astro`.
- Container: `.container-phx`, padding-block `var(--spacing-6)`.
- `<ul class="talk-list">` of `.talk-row` items. Each row is `<a href={talk.data.link ?? '#'} class="talk-link">` wrapping:
  - **Left column (flex-grow 1):**
    - `<h2 class="talk-title">{title}</h2>` — Inter 600, `--text-h1`, `--color-starbucks-green`. Hover: `--color-green-accent`.
    - `<p class="talk-description">{description}</p>` — Lora (NEW), `--text-body`, `--color-text-black-soft`, `line-height: 1.6`, `max-width: 65ch`. (Was sans in current implementation; switch to Lora to match the proposal's editorial register.)
  - **Right column (width 10rem):**
    - `<span class="talk-event">{event}</span>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-micro`.
    - `<time class="talk-date">{formattedDate}</time>` — Inter, `--text-small`, `--color-text-black-soft`. Format with `Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })`.
    - **External-link chevron `↗`:** `<span class="talk-external" aria-hidden="true">↗</span>` — Inter, `--text-small`, `--color-starbucks-green`. **Reveals on hover only:** `opacity: 0` by default; `.talk-link:hover .talk-external { opacity: 1 }`.
- **Row dividers:** 1px `--color-hairline` between rows (existing pattern from `/patterns/index.astro`).
- **Grid layout:** `grid-template-columns: 1fr` mobile; `1fr 10rem` at ≥768px.
- **Alignment:** on desktop, right column is right-aligned (`align-items: start; text-align: right;`).

### Section 3 — Closing line

- `<p class="talks-closing">For workshop enquiries: <a href="/contact">contact me</a>.</p>` — Lora, `--text-body`, `--color-text-black-soft`. Margin-block-start: `var(--spacing-6)`. The closing line is a single sentence, no extra CTA.

### Frap

- Stays. Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Modified | New 7-item navLinks (Talks still NOT in top nav per proposal; the page exists for direct URLs). |
| `Footer.astro` | Modified | Three-cluster restructure (Talks IS in the footer center-cluster link list). |
| `Frap.astro` | Modified | Default label change. |

No new components.

---

## 4. Content additions needed

- **No new content collections.**
- **No new frontmatter fields.**
- The `talks` collection already has `link?: string.url()`. If a talk lacks `link`, render the row as a non-anchor `<div>` (still styled the same but with no chevron). **Implementer decision: if no `link`, render `<div class="talk-row talk-row-nolink">` (no `<a>` wrapper, no chevron).**

---

## 5. Edge cases / decisions left to the implementer

- **Current implementation uses `<GardenCard>`** — this is being REPLACED by a row list per proposal. The existing `GardenCard` for talks becomes unused on this page but is still used by `/garden` and `/about` (talks preview). **Decision: do NOT remove `type="talk"` from `GardenCard`** — it's still rendered inside the `/garden` grid and on `/about`. The `/talks` page simply stops using it.
- **Description font** — switch from Inter (current) to **Lora `--text-body`** for the description on each talk row. This is a deliberate typography move per the proposal's "talk row list" pattern (mirrors `/patterns/index.astro` style, but with Lora body to match the editorial register).
- **External chevron `↗`** — implementation:
  ```css
  .talk-external {
    opacity: 0;
    transition: opacity var(--duration-button) ease;
  }
  .talk-link:hover .talk-external,
  .talk-link:focus-visible .talk-external {
    opacity: 1;
  }
  ```
- **No external link** — for talks without `link`, render a `<div>` not an `<a>`. Style the title without hover. **Verify the row still respects the same flex/grid layout.**
- **Empty talks case** — if the collection has zero entries, render: `No talks to show — yet.` (Lora italic, `--text-body`, `--color-text-black-soft`).

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/talks/index.html`.
- Visiting `/talks` shows: header (green jumbo h1 "Talks"), a list of talks as rows (title + Lora description left, event + date right, external chevron revealed on hover), closing line about workshop enquiries.
- Talks with `link` are anchors; talks without are `<div>`s.
- The external `↗` glyph appears ONLY on hover/focus.
- The page contains NO `<GardenCard>` for talks.
- The page is NOT in the top nav (Talks still does NOT appear in the 7-item nav).
- The page IS in the footer center-cluster link list.
- Frap visible with label "Email me".
- `:focus-visible` visible on every row link.