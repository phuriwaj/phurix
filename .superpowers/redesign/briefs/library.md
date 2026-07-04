# Brief — `/library`

**Route:** `/library`
**File:** `src/pages/library.astro`
**One-line job (from proposal §4):** A visual shelf of books that shaped thinking.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/library`) and §9:

- Books are tiles, not prose thumbnails (per Mod §2 — books deserve equal visual weight to essays).
- One special case: a single "currently reading" tile stands visually apart (thin green border + small `Reading` chip). **PROPOSAL OPEN QUESTION #5: this requires either manual data on each book OR a schema change.** **Implementer decision: add an optional `currentlyReading?: boolean` field to the `books` collection schema. If `true`, the tile gets the visual treatment.**
- Filter row (by topic1/topic2/topic3 and by era) is **OPTIONAL** — proposal says "If author can't add these facets yet, ship without filters — the grid is the artifact."
- Closing micro-line: "Updated quarterly" in `--text-micro` color `--color-text-black-soft`.
- Frap **stays** (proposal: stays on every page except deep-focus surfaces — `/library` is a hub, not deep-focus).

---

## 2. Sections, top to bottom

### Section 1 — Page header (existing)

- `.page-header-section` (existing CSS). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- `<h1 class="page-title">Library</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede: existing copy kept.

### Section 2 — Filter row (OPTIONAL — see §5)

- **Implementer decision: SKIP the filter row in the first pass.** The proposal says "ship without filters — the grid is the artifact." The filter logic can be added in a later pass; the book grid is the primary visual.
- If the implementer wants to include the era filter anyway, render it as a row of `topic-chip` buttons (matching the garden filter visual). Eras: `All`, `Currently reading`, `Recently finished`, `Reference`, `Old faithfuls`. **Keep it client-side; no URL params for v1.**

### Section 3 — Book grid (existing, with one tile variant)

- Existing `.book-grid` CSS kept: `repeat(2, 1fr)` mobile, `repeat(3, 1fr)` ≥640px, `repeat(4, 1fr)` ≥1024px.
- Data: `getCollection('books')`, sorted by `year` desc.
- For each book:
  - If `currentlyReading === true`: render the tile with `border: 2px solid var(--color-green-accent)` and an additional `<span class="book-reading-chip">Reading</span>` chip overlay.
  - Otherwise: render `<BookTile>` unchanged.
- **Modify `BookTile.astro`** to accept a `currentlyReading?: boolean` prop. When `true`, the tile gets:
  ```css
  border: 2px solid var(--color-green-accent);
  border-radius: 0 4px 4px 0; /* preserve the spine illusion */
  padding: 2px;
  ```
  And the chip is rendered as an absolutely-positioned `<span>` at top-right with `--color-green-accent` background, white text, `--text-micro`, `--radius-button`. Existing `book-tile:hover` transform — keep.

### Section 4 — Closing micro-line

- Below the grid: `<p class="library-updated">Updated quarterly</p>` — Inter, `--text-micro`, color `--color-text-black-soft`, `text-align: center`, `margin-block-start: var(--spacing-6)`.

### Frap

- Stays. Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `BookTile.astro` | Modified | Add `currentlyReading?: boolean` prop; render the green border + Reading chip when true. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |
| `Frap.astro` | Modified | Default label change. |

No new components.

### Schema change (in `src/content.config.ts`)

Add optional `currentlyReading?: z.boolean().default(false)` to the `books` schema. **PROPOSAL OPEN QUESTION #5** — the author needs to confirm whether to add this field. **Implementer decision: add the field with `.default(false)`** so existing book MDX files don't break. Author can then opt-in by adding `currentlyReading: true` to one book's frontmatter.

---

## 4. Content additions needed

- **Schema field:** `currentlyReading?: boolean` on `books` (with default false).
- **One book marked `currentlyReading: true`** — pick whichever book the implementer judges most appropriate from the existing 5 entries. If the author has a preference, they can override the frontmatter post-build.

---

## 5. Edge cases / decisions left to the implementer

- **Filter row** — skipping per proposal guidance. The implementer may include the era filter chips if they have time; if not, the page still ships cleanly.
- **Currently-reading chip color** — proposal says "thin green border + small `Reading` chip." The border uses `--color-green-accent` (the filled CTA green) — this is one of the few places gold is NOT used (gold is reserved for `/library` "currently reading" tile border per proposal §6). **Re-read proposal §6 carefully:**
  > "Gold (`#cba258`): off-limits except in the `/library` "currently reading" tile border (rewards-ceremony use, existing semantics)."

  So the green border proposal in §4 /library conflicts with the §6 palette rule. **Implementer decision: USE GOLD for the currently-reading border.** This is the proposal's own reward-ceremony use case. The border becomes `2px solid var(--color-gold)`. The chip text "Reading" sits on the tile at top-right; chip background `--color-green-accent`, text white (or background `--color-gold-light`, text `--color-text-black` — pick whichever has better contrast). **Default: `--color-gold` background, `--color-text-black` text, white shadow.**
- **`year` is optional** — the existing schema makes it optional. Books without a year render without a year line (existing behavior — keep).
- **Gold-only-when-current** — the gold border should ONLY appear when `currentlyReading === true`. Other books keep the existing tile visual (no border).

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/library/index.html`.
- Visiting `/library` shows: header (green jumbo h1 "Library"), book grid of all books (2/3/4 col responsive), "Updated quarterly" micro-line below.
- If any book has `currentlyReading: true`, that tile has a gold border and a small "Reading" chip overlay.
- Books without `year` render without the year line.
- Frap visible with label "Email me".
- `:focus-visible` visible on every interactive element (none expected on `/library` proper — books are decorative tiles, not links).
- No new photos on `/library` (per proposal §6 — books-only surface).