# Brief — `/now`

**Route:** `/now`
**File:** `src/pages/now.astro`
**One-line job (from proposal §4):** What the author is up to this month.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/now`) and §9:

- The page is allowed to be short. (Per Mod / Sive.rs — `/now` is one page, one update cadence.)
- **No** subscribe CTA on this page.
- Move from five stacked `.now-section` blocks to a **single ordered list with section labels** (this is the key change from the current implementation).
- Add a "last updated [date]" date at the top in `--text-micro`.
- Frap **DOES NOT appear on `/now`** (per proposal §4 — "stays on every page except those with their own deep-focus surface — `/now`, individual essay/notes/patterns detail").

---

## 2. Sections, top to bottom

### Section 1 — Header

- `.container-phx`, padding-block `var(--spacing-7) var(--spacing-5)`.
- Eyebrow `<p class="section-eyebrow">Now</p>` — existing CSS.
- `<h1 class="page-title">What I'm up to</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede `<p class="page-lede">` — Lora, `--text-body-lg`, color `--color-text-black-soft`, `max-width: 60ch`. Existing copy kept.
- **NEW: "Last updated [date]" line.** Below the lede, `<p class="now-last-updated">Last updated <time datetime={ISO}>{formattedDate}</time></p>`. Style: Inter, `--text-micro`, color `--color-text-black-soft`, `margin-block-start: var(--spacing-2)`.

### Section 2 — Single ordered list

- Container: `.container-phx`, padding-block `var(--spacing-6)`.
- Render as `<dl>` (description list) with each item a `<dt>` + `<dd>` pair. Visual: section label uppercase Inter 600 with `--tracking-loose`, value as Lora prose. **Hairline divider between items** (1px `--color-hairline`).
- **Data source: `src/data/now.ts`** (NEW — see Content additions). `nowItems` is exported as `Array<{ label: string; value: string }>`.
- **Maximum 2 short sentences per item** — proposal cap. The implementer enforces this in the seed data.
- **`<dl>` semantics + visual contract:**
  ```html
  <dl class="now-list">
    {nowItems.map(item => (
      <div class="now-item">
        <dt class="now-label">{item.label}</dt>
        <dd class="now-value">{item.value}</dd>
      </div>
    ))}
  </dl>
  ```
  Style:
  ```css
  .now-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 65ch;
  }
  .now-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding-block: var(--spacing-5);
    border-bottom: 1px solid var(--color-hairline);
  }
  .now-item:first-child {
    border-top: 1px solid var(--color-hairline);
  }
  .now-label {
    font-size: var(--text-small);
    font-weight: 600;
    color: var(--color-starbucks-green);
    text-transform: uppercase;
    letter-spacing: var(--tracking-loose);
    margin: 0;
  }
  .now-value {
    font-family: var(--font-serif);
    font-size: var(--text-prose);
    line-height: 1.65;
    color: var(--color-text-black);
    margin: 0;
  }
  ```

### Section 3 — Optional "more on /now" footer line (skip)

- Proposal does not require this. Skip.

### Frap

- **DOES NOT appear.** Use `<Layout title="Now — phurix" hideFrap>` to suppress it. The `hideFrap` prop on `Layout.astro` already exists — pass it.

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Layout.astro` | Unchanged | Existing `hideFrap` prop used. |
| `Nav.astro` | Modified | New 7-item navLinks (Now becomes an active-route). |
| `Footer.astro` | Modified | Three-cluster restructure. |

### New shared data file

- **`src/data/now.ts`** — exports `nowItems: Array<{ label: string; value: string }>` and a `lastUpdated: Date` constant. The `/about` page slices `.slice(0, 3)` from this same export.

---

## 4. Content additions needed

- **NEW `src/data/now.ts`** with the seed data:
  ```ts
  export const nowItems = [
    { label: 'Location', value: 'Bangkok, Thailand.' },
    { label: 'Working on', value: 'A design system for a client; a long essay on typography hierarchy; exploring edge-rendering patterns more seriously.' },
    { label: 'Reading', value: 'The Design of Everyday Things — Don Norman. Staff Engineer — Will Larson. Thinking in Systems — Donella Meadows.' },
    { label: 'Thinking about', value: 'The gap between component-level design and system-level design. How context windows change the way we prompt AI tools.' },
    { label: 'Writing', value: 'Two essays in progress: one on typography hierarchy, one on the anthropology of code review.' },
  ];
  export const lastUpdated = new Date('2026-07-04');
  ```
- **PROPOSAL OPEN QUESTION #8** asks "Is the 'Bangkok' location in `/now` correct?" Implementer keeps Bangkok pending author confirmation.

---

## 5. Edge cases / decisions left to the implementer

- **`<dl>` semantics** — the proposal says "Rendered as `<dl>`-style label-then-content pairs, divider between." Use real `<dl>`/`<dt>`/`<dd>` elements (not faux `<div>`s with `dt`/`dd` class names) for semantics. Wrap each `<dt>` + `<dd>` pair in a `<div class="now-item">` because the `<dl>` cannot have non-`<dt>`/`<dd>` children between pairs in HTML5 — the `<div>` wrapper is the standard workaround.
- **Reading list rendering** — the current implementation renders the Reading section as a `<ul>` with em-dash bullets. **Decision: keep this micro-detail.** Render Reading as a `<ul>` inside the value, with each item prefixed by an em-dash. (Lora body, color `--color-text-black-soft` for the em-dash, `--color-text-black` for the item.) Update the data shape to support this:
  ```ts
  type NowItem =
    | { label: string; value: string }
    | { label: string; list: string[] };
  ```
  The implementer can use a discriminated union. If Reading is a list, render `<ul>`; otherwise render plain `<p>`.
- **"Last updated" date** — uses `now.lastUpdated` from the data file. Format with `Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })`.
- **No subscribe CTA** — explicit per proposal §4.
- **No photos** — explicit per proposal §6 imagery rule.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/now/index.html`.
- Visiting `/now` shows: header (green jumbo h1), lede, "Last updated [date]" micro-line, single ordered list of items with hairline dividers.
- The page contains NO `<form>` element and NO subscribe band.
- The Frap is NOT visible.
- The list renders as semantic `<dl>`/`<dt>`/`<dd>` (verified in dev tools).
- The Reading item renders as a `<ul>` with em-dash bullets; other items render as `<p>`.
- Lora is the body font for the value text.
- `:focus-visible` visible on nav links.