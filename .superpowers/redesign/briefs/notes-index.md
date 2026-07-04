# Brief — `/notes` (Index)

**Route:** `/notes`
**File:** `src/pages/notes/index.astro`
**One-line job (from proposal §4):** The garden of short observations.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/notes` index) and §9:

- 3-column `CollectionGrid` of `<GardenCard type="note">`. Growth badge visible on each card (existing).
- Add the "On this day" line above the grid (same as `/garden`).

---

## 2. Sections, top to bottom

### Section 1 — Page header (existing)

- `.page-header-section` (existing CSS, with the small header — header background should be `var(--color-neutral-warm)` with bottom hairline).
- Eyebrow `<p class="section-eyebrow">Garden</p>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-small`. (Eyebrow word is "Garden" per existing; the proposal does not mandate a change. KEEP existing copy.)
- `<h1 class="page-title">Notes</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-h1` to `--text-jumbo` fluid.**
- Lede — existing copy kept.

### Section 2 — On this day (NEW — same as `/garden`)

- Container: `.container-phx`, sits ABOVE the grid.
- Same conditional render as `/garden`: find any note published on today's MM-DD in any prior year. If multiple, take the most recent.
- Single line: `On this day in 2023 — <a href="/notes/{slug}">{title}</a>` (year dynamic).
- Style: Lora italic at `--text-body`, color `--color-text-black`. Link hover → `--color-starbucks-green`. Margin-block: `var(--spacing-4) var(--spacing-2)`.
- **Implementer decision: extract this "On this day" computation into a shared helper** at `src/lib/onThisDay.ts` exporting `findOnThisDay(entries, today): Entry | null`. Both `/garden` and `/notes` (and `/essays` if it ever wants to) call it. **The garden brief assumes this helper exists** — the implementer of the notes-index brief should CREATE the helper. The garden brief then imports it.

### Section 3 — Card grid (existing)

- `<CollectionGrid cols={3} gap="md">` — existing. 1 col mobile, 2 col tablet, 3 col desktop.
- Each entry: `<GardenCard type="note" excerpt={note.data.excerpt} date={...} topics={...} growthStage={note.data.growthStage} href={/notes/{id}} />` — existing pattern kept.
- **The CuratedMark** prefix: per proposal §7, "✦ at the start of any one entry marked 'newly added' in the past 30 days on /garden." **Decision: render the CuratedMark prefix on `/notes` cards too** if the note was published in the last 30 days. Pass `newSince={note.data.date}` to `GardenCard`. (`GardenCard` checks if `newSince >= now - 30 days` and renders the mark in front of the title h3.)

### Frap

- **Stays.** Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `src/lib/onThisDay.ts` | **NEW** | Shared helper used by `/garden` and `/notes` (and `/essays`). |
| `CuratedMark.astro` | **NEW** | Used via `GardenCard` props. |
| `GardenCard.astro` | Modified | Add `newSince?: Date` prop; render CuratedMark if `newSince >= now - 30 days`. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |
| `Frap.astro` | Modified | Default label change. |

---

## 4. Content additions needed

- **NEW `src/lib/onThisDay.ts`**:
  ```ts
  import type { CollectionEntry } from 'astro:content';
  type Entry = { data: { date: Date } };
  export function findOnThisDay<T extends Entry>(
    entries: T[],
    today: Date = new Date()
  ): T | null {
    const matches = entries.filter(e => {
      const d = new Date(e.data.date);
      return d.getMonth() === today.getMonth()
        && d.getDate() === today.getDate()
        && d.getFullYear() !== today.getFullYear();
    });
    if (matches.length === 0) return null;
    return matches.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
  }
  ```
- **No new frontmatter fields.**

---

## 5. Edge cases / decisions left to the implementer

- **"On this day" reuse** — this brief creates the helper; `/garden` and `/essays` import from `src/lib/onThisDay.ts`. Keep the helper generic (takes any entry with `{ data: { date: Date } }`) so it works across collections.
- **CuratedMark on cards** — implementer decision: add `newSince?: Date` to `GardenCard`. If `newSince >= (today - 30 days)`, render `<CuratedMark size="sm" />` inside `.garden-card-title` (before the h3 text). This is a small change to `GardenCard.astro` that benefits `/`, `/garden`, `/notes`, `/essays` index pages.
- **Eyebrow copy** — existing page uses "Garden" as the eyebrow. The proposal says "Header — eyebrow ('Garden') + h1 'Notes' + lede." So existing is correct. **KEEP "Garden" as the eyebrow.**

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/notes/index.html`.
- Visiting `/notes` shows: header (green jumbo h1 "Notes"), optional "On this day" line (rendered only if a note matches today's MM-DD), 3-column grid of note cards with growth badges.
- A note published in the last 30 days shows the ✦ CuratedMark in front of its title in the card.
- A note with `growthStage: 'evergreen'` shows 🌳 in the meta row.
- Frap visible with label "Email me".
- `:focus-visible` visible on every card link.