# Brief — `/notes/[slug]` (Detail)

**Route:** `/notes/{slug}`
**File:** `src/pages/notes/[slug].astro`
**One-line job (from proposal §4):** Read the note.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (notes detail) and §9:

- **Same reading-frame as essays** (back link + title + meta row + prose + prev/next).
- **No hero image by default.** First topic photo appears inline only if `growthStage === 'evergreen'`.
- **Growth badge sits in the meta row, prominent.**
- Body font: Lora 18px / 1.65 (slightly tighter than essays — notes are shorter).
- Frap **DOES NOT appear**.

---

## 2. Sections, top to bottom

### Section 1 — Back link (existing)

- `<a href="/notes" class="back-link">← Notes</a>` — keep.

### Section 2 — Hero image (CONDITIONAL — only for evergreen notes)

- **Only render if `entry.data.growthStage === 'evergreen'`.** Otherwise, skip this section entirely.
- Container: `<figure class="note-art">` wrapping `<TopicPhoto topic={artTopic} scale="md" showCredit={true} />`.
- Aspect: 4:3 (per `tp-md`).
- `max-width: 32rem` (matches essay-hero pattern from `patterns/[slug].astro` — visually not full-column-width because notes are short).
- `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-card)`.

### Section 3 — Title block

- `<h1 class="note-title">{title}</h1>` — **Lora weight 600 at `--text-h1` (~2.4rem)**, color `var(--color-starbucks-green)`. (Same as essay detail title — match the prose-page h1 style.)

### Section 4 — Meta row

- Date + growth badge + topics.
- Date: existing format.
- **Growth badge: prominent.** Render `<GrowthBadge stage={entry.data.growthStage} />` at `--text-small` (not micro). The badge sits BEFORE topics in the meta row.
- Topics: `<TopicChip label={t} href={`/garden?topic=${t}`} />` (each chip is a link).

### Section 5 — Prose body

- `<div class="prose"><Content /></div>` — shared `.prose` utility from `global.css`.
- **Body line-height: 1.65** (proposal: "slightly tighter than essays — notes are shorter"). The shared `.prose` rule is `line-height: 1.7`. **Decision: scope the 1.65 override to this page only** via `.note-article .prose { line-height: 1.65 }`. Don't change the shared utility.

### Section 6 — Prev / Next (existing)

- Same hairline row pattern. Existing logic kept.

### Frap

- **DOES NOT appear.** `<Layout hideFrap>`.

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `global.css` | Modified (already) | Shared `.prose` block; this page drops its inline prose styles. |
| `Layout.astro` | Unchanged | `hideFrap` prop used. |
| `TopicPhoto.astro` | Modified | `showCredit?` prop — this page passes `true`. |
| `GrowthBadge.astro` | Unchanged | Existing component, accepts `stage`. |
| `TopicChip.astro` | Unchanged | Pass `href` from the page. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |

No new components.

---

## 4. Content additions needed

- **No new frontmatter fields.**
- **No new content files.**

---

## 5. Edge cases / decisions left to the implementer

- **Conditional hero image** — only render when `growthStage === 'evergreen'`. Implementation: wrap the `.note-art` block in `{entry.data.growthStage === 'evergreen' && (...)}`.
- **Line-height override** — scope to `.note-article .prose` so other pages aren't affected.
- **Title font** — Lora 600 at `--text-h1`. Same as essay detail.
- **Growth badge size** — bump from `--text-micro` to `--text-small` so it's prominent. **Decision: add an optional `size?: 'sm' | 'md'` prop to `GrowthBadge.astro`** with `md` (default) at `--text-small` and `sm` at `--text-micro`. GardenCard usage stays on `sm` (the default before this prop is added — keep GardenCard behavior unchanged). This note-detail page passes `size="md"`.
- **Topic chips as links** — pass `href={`/garden?topic=${t}`}`.
- **Prose style consolidation** — this page should drop its inline `.prose :global(...)` rules (lines ~180-256 of `notes/[slug].astro`) and rely on the shared `.prose` utility in `global.css`. The notes-detail-specific override is just `line-height: 1.65` scoped to `.note-article .prose`.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/notes/{slug}/index.html` for every note entry.
- Visiting `/notes/{slug-with-evergreen-stage}` shows: back-link, 4:3 hero photo, Lora 600 h1, meta row with prominent growth badge, prose body, prev/next.
- Visiting `/notes/{slug-with-seedling-or-budding-stage}` shows: NO hero photo, Lora 600 h1, meta row with growth badge, prose body, prev/next.
- Body text is Lora at 18px with line-height 1.65 (verify visually).
- Topic chips link to `/garden?topic={t}`.
- The Frap is NOT visible.
- `:focus-visible` visible on every link and chip.