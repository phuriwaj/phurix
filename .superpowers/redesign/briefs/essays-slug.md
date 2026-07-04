# Brief — `/essays/[slug]` (Detail)

**Route:** `/essays/{slug}`
**File:** `src/pages/essays/[slug].astro`
**One-line job (from proposal §4):** Read the essay.

> **Read first:** `_shared-moves.md`. This brief inherits the **shared prose surface** from `_shared-moves.md` §1.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (essays detail) and §9:

- **Body font switches to Lora 18px / 1.7** here — this is the single most impactful typographic change in the proposal.
- Drop the 22px-padded hero card; the photo can be **full-column-width but stay within the prose measure** (so 65ch-wide hero, not 22rem).
- Blockquote: serif italic with a 3px green accent border (already implemented in current page).
- Code blocks: dark-green `house-green` (already implemented).
- Frap **DOES NOT appear** on this page (per proposal §4).
- JSON-LD for `BlogPosting` already in the page — keep.

---

## 2. Sections, top to bottom

### Section 1 — Back link (existing)

- `<a href="/essays" class="back-link">← Essays</a>` — keep.

### Section 2 — Hero image

- `<TopicPhoto topic={artTopic} scale="lg" showCredit={true} />` — 16:9.
- Container: same wrapper as the article, `max-width: 65ch`, `margin-inline: auto`.
- **DROP the 22rem padding clamp on `.essay-art`** (currently `max-width: 36rem` was on `.note-art`, NOT `.essay-art` — verify in the current file). For the essay hero, the photo fills the 65ch column. No extra padding wrapper.
- `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-card)`.

### Section 3 — Title block

- `<h1 class="essay-title">{title}</h1>` — **Lora weight 600 at `--text-h1` (~2.4rem)**. (Existing uses Inter; **switch to Lora weight 600, color `--color-starbucks-green`.** This is the proposal's "h1 in Lora" treatment for prose-heavy pages. Note: this is the body-page h1, distinct from the chrome-page h1.)
- Lede `<p class="essay-lede">{lede}</p>` — **Lora italic**, `--text-body-lg`, `line-height: 1.65`, color `--color-text-black-soft`. Existing copy kept. (Existing already italic — keep.)

### Section 4 — Meta row

- Date + reading time + topics.
- Date: `<time>{formattedDate}</time>` — existing format (en-US, month: 'long', day: 'numeric').
- Reading time: `<span class="essay-read-time">{minutes} min read</span>` — existing logic kept.
- Topics: `<TopicChip label={t} />` for each. (Existing uses `<TopicChip label={t} />` but never passes a `href` — fix this so each chip links to `/garden?topic={t}`. **This is a small but proposal-aligned upgrade.**)

### Section 5 — Prose body

- `<div class="prose"><Content /></div>` — the shared `.prose` utility from `global.css`.
- All the existing per-element rules (`.prose :global(h2)`, `.prose :global(p)`, etc.) are MOVED into `global.css` under `.prose` and applied via `:global()` so every prose surface shares them. **Implementer decision: do this consolidation in this page's brief** (since this is the canonical long-form detail page). The notes-slug and patterns-slug pages then drop their inline `.prose` rules and inherit from the shared utility.

### Section 6 — Prev / Next (existing)

- Hairline row at the bottom, prev left + next right.
- Existing logic kept.

### JSON-LD

- Existing `<script type="application/ld+json">` block — keep. Adds `BlogPosting` schema.

### Frap

- **DOES NOT appear.** Use `<Layout hideFrap>` to suppress.

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `global.css` | **MODIFIED** | Add the shared `.prose` block + all per-element rules (h2, h3, p, ul, ol, li, blockquote, code, pre, a, strong). |
| `theme.css` | **MODIFIED** | Add `--text-prose: 1.8rem`. |
| `Layout.astro` | Unchanged | Existing `hideFrap` prop used. |
| `TopicPhoto.astro` | Modified | `showCredit?` prop — this page passes `true`. |
| `TopicChip.astro` | Unchanged | Pass `href` from the page to enable the `/garden?topic=` link. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |

No new components.

---

## 4. Content additions needed

- **No new frontmatter fields.**
- **No new content files.**

---

## 5. Edge cases / decisions left to the implementer

- **The prose style consolidation is a one-time refactor** — implementer moves rules from `src/pages/essays/[slug].astro` (lines ~200-273), `src/pages/notes/[slug].astro` (lines ~180-256), and `src/pages/patterns/[slug].astro` (lines ~160-200) into `src/styles/global.css` under a single `.prose :global(...)` block. Per-page styles only override if a page TRULY differs.
- **Title font swap** — the h1 on essay detail is Lora 600, NOT Inter 600. This is an intentional departure from the chrome-page h1 rule. **Verify the visual** — the title sits at 2.4rem Lora 600, color green; below it is Lora italic lede; below that is Inter meta row. The transition should feel like "the page starts in Inter, then drops into Lora for the prose body."
- **Code blocks already house-green** — keep.
- **Blockquote already styled** — keep.
- **JSON-LD** — keep; verify it validates (BlogPosting schema, headline, datePublished, description, keywords, mainEntityOfPage).
- **Photo credit chip** — visible on hover (showCredit={true}); this is the proposal-aligned behavior.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/essays/{slug}/index.html` for every essay entry.
- Visiting `/essays/{any-slug}` shows: back-link, 16:9 hero photo (full 65ch column width, not clamped to 36rem), Lora 600 h1 at `--text-h1`, italic Lora lede, meta row (date · reading time · topic chips as links), `<div class="prose">` with Lora 18px / 1.7 / 65ch body, hairline prev/next row.
- The body text is Lora, NOT Inter. Verify with dev tools.
- Topic chips link to `/garden?topic={t}` (verify by clicking).
- Hover on the hero photo reveals the photographer credit chip.
- JSON-LD validates (paste into Google's Rich Results Test).
- The Frap is NOT visible.
- `:focus-visible` visible on every link, chip, and back-link.
- No new console warnings.