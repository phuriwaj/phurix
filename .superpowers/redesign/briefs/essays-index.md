# Brief — `/essays` (Index)

**Route:** `/essays`
**File:** `src/pages/essays/index.astro`
**One-line job (from proposal §4):** The catalogue of long-form pieces.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/essays` index) and §9:

- Stays as its own index; not merged into `/garden`.
- The home page points here for "all essays."
- Add a hand-pick block above the grid (per Paul Graham §6 — "if you only read three things").
- 2-column `CollectionGrid` of `GardenCard type="essay"` with hero image.

---

## 2. Sections, top to bottom

### Section 1 — Page header

- `.page-header-section` (existing CSS pattern, modeled after `/patterns/index.astro`). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- Eyebrow `<p class="section-eyebrow">Collection</p>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-small`. (Existing copy kept.)
- `<h1 class="page-title">Essays</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-h1` (existing) to `--text-jumbo` fluid.**
- Lede — existing copy kept (the proposal does not mandate a rewrite).

### Section 2 — "If you only read three" hand-pick block (NEW)

- Container: `.container-phx`, padding-block `var(--spacing-6) var(--spacing-5)`.
- Optional heading: `<p class="section-eyebrow">If you only read three</p>` (the proposal's wording — same eyebrow style as Section 1).
- Below the heading, render `<CuratedPicks items={...} />` (NEW component, see `_shared-moves.md` §8). Pass `items` = three hand-picked essays, each `{ title, href: '/essays/{slug}' }`.
- The implementer pre-fills with three concrete picks from existing essays content. Mark with a TODO comment.

### Section 3 — Card grid

- Container: `.container-phx`, padding-block `var(--spacing-6)`.
- Top hairline: yes.
- `<CollectionGrid cols={2} gap="md">` (existing).
- Each entry: `<GardenCard type="essay" lede={essay.data.lede} date={...} topics={...} href={/essays/{id}} />` — existing pattern kept. Existing fetch + sort by date desc.

### Frap

- **Stays.** Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `CuratedPicks.astro` | **NEW** | Used in Section 2. |
| `CuratedMark.astro` | **NEW** | Used inside `CuratedPicks`. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |
| `Frap.astro` | Modified | Default label change. |

No modifications to existing components (other than nav/footer/frap).

---

## 4. Content additions needed

- **No new frontmatter fields.**
- **Seed three curated essay picks** for the hand-pick block. Implementer picks three representative essays. Hardcode in the page. Example:
  ```ts
  const curatedEssays = [
    { title: 'On Typography, and the Trust It Quietly Asks For', href: '/essays/on-typography-and-trust' },
    { title: 'Design Tokens at Scale', href: '/essays/design-tokens-at-scale' },
    { title: 'The Case for Boring Technology', href: '/essays/the-case-for-boring-technology' },
  ];
  ```

---

## 5. Edge cases / decisions left to the implementer

- **Eyebrow above curated picks** — proposal says "three italic Lora lines, each a single-link." It does NOT specify a heading. **Decision: include the eyebrow `If you only read three`** as a quiet label above the three lines, so the section reads as a deliberate editorial block, not orphan lines. If the author wants to remove it, that's a one-line removal post-build.
- **Curated picks choice** — implementer picks three. Mark with TODO.
- **Grid columns** — proposal says 2-column. Keep `<CollectionGrid cols={2} gap="md">`. On mobile, the grid collapses to 1 column (existing behavior).
- **Hero image on cards** — `GardenCard` renders `TopicPhoto` at `scale="sm"` (16:9) by default; pass `showCredit={false}` so the credit chip doesn't appear at thumb scale (per `_shared-moves.md` §6).

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/essays/index.html`.
- Visiting `/essays` shows: header (green jumbo h1 "Essays"), curated picks block with 3 italic Lora lines each prefixed by ✦, 2-column grid of `<GardenCard type="essay">` for all essays.
- The "If you only read three" block sits ABOVE the grid.
- All essay cards render with hero photos (no missing-image fallback).
- No GardenCard shows the photographer credit chip on hover (since `showCredit={false}`).
- Frap visible with label "Email me".
- `:focus-visible` visible on every card link and curated pick link.