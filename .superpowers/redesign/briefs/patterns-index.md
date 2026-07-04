# Brief — `/patterns` (Index)

**Route:** `/patterns`
**File:** `src/pages/patterns/index.astro`
**One-line job (from proposal §4):** The catalogue of named, reusable primitives.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/patterns` index) and §9:

- Currently a row list — **keep this form** (the proposal explicitly says "Pattern list reads correctly. Tighten the column proportion: 1fr / 10rem, not 1fr / 12rem.").
- Header: eyebrow "Catalogue" + h1 "Patterns" + lede (existing copy kept).

---

## 2. Sections, top to bottom

### Section 1 — Page header (existing)

- `.page-header-section` (existing CSS). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- Eyebrow `<p class="section-eyebrow">Catalogue</p>` — existing copy kept.
- `<h1 class="page-title">Patterns</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede — existing copy kept.

### Section 2 — Row list (existing — TIGHTEN)

- Existing `<ul class="pattern-list">` kept.
- **Tighten the right-column proportion from `1fr 12rem` to `1fr 10rem`** (per proposal §4). Update the CSS:
  ```css
  @media (min-width: 768px) {
    .pattern-link {
      grid-template-columns: 1fr 10rem; /* was 1fr 12rem */
      align-items: start;
      gap: var(--spacing-6);
    }
  }
  ```
- Existing `.pattern-row` divider treatment kept.
- Existing `.pattern-title`, `.pattern-lede`, `.pattern-type`, `.pattern-date` styles kept.
- Existing `relativeTime()` helper kept.

### Frap

- **Stays.** Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |
| `Frap.astro` | Modified | Default label change. |

No new components.

---

## 4. Content additions needed

- **No new content collections.**
- **No new frontmatter fields.**

---

## 5. Edge cases / decisions left to the implementer

- **Row list kept as-is** — the implementer should NOT touch the visual treatment beyond the column proportion tightening.
- **No hand-pick block on `/patterns`** — proposal §4 lists only Header + Row list for this page.
- **No curated picks block** on this page; patterns are too small in number and too functional to curate three.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/patterns/index.html`.
- Visiting `/patterns` shows: header (green jumbo h1 "Patterns"), row list of all patterns with title + lede on the left and "Pattern" type label + relative date on the right.
- The right-column width is 10rem (verify visually — should look slightly more balanced than the previous 12rem).
- Row dividers (hairlines) between every row.
- Frap visible with label "Email me".
- `:focus-visible` visible on every row link.