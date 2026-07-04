# Brief — `/patterns/[slug]` (Detail)

**Route:** `/patterns/{slug}`
**File:** `src/pages/patterns/[slug].astro`
**One-line job (from proposal §4):** Read the pattern.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (patterns detail) and §9:

- **Same reading-frame as essays** (back link + hero image + title + meta row + prose + prev/next).
- Body font: Lora 18px / 1.7 (matches essay body).
- Hero image: 4:3, `max-width: 32rem` (existing).
- **NEW**: A small "Used in:" footer line linking to notes/essays that reference this pattern (optional, requires `related[]` frontmatter — already in schema).

---

## 2. Sections, top to bottom

### Section 1 — Back link (existing)

- `<a href="/patterns">← Patterns</a>` — existing CSS kept.

### Section 2 — Hero image (existing)

- `<TopicPhoto topic={artTopic} scale="md" showCredit={true} />` — 4:3, `max-width: 32rem`.
- Existing CSS kept.

### Section 3 — Title block (existing)

- `<h1 class="pattern-h1">{title}</h1>` — **Lora weight 600 at `--text-h1` (~2.4rem)**, color `var(--color-starbucks-green`. **Switch from Inter (existing) to Lora.**

### Section 4 — Meta row (existing)

- Date + topics. Existing CSS kept (the inline `<li>` topic chips).

### Section 5 — Prose body

- `<div class="prose"><Content /></div>` — shared `.prose` utility.
- **Drop the inline `.pattern-body` rules** (lines ~160-200 of `patterns/[slug].astro`) and rely on the shared utility. The only pattern-specific override might be the body type — but since the shared utility already sets Lora 18px / 1.7 / 65ch, no override needed.

### Section 6 — "Used in:" footer line (NEW)

- Below the prose, before the closing back-link.
- Render only if `pattern.data.related && pattern.data.related.length > 0`.
- Layout: a single hairline-dividered block, label "Used in:" (Inter 600, uppercase, `--tracking-loose`, `--text-micro`, color `--color-starbucks-green`) followed by a list of inline links.
- The links: `pattern.data.related` is an array of references (`reference('patterns')` in the schema). The implementer needs to resolve these references to actual entries and render `{entry.collection} → {entry.data.title} → /{entry.collection}/{entry.id}`.
- **Implementer decision: since the schema currently defines `related: z.array(reference('patterns')).optional()`, this only links to OTHER patterns.** The proposal says "linking to notes/essays that reference this pattern" — but the schema doesn't support that. **Decision: keep the existing schema (`reference('patterns')` only).** If the author wants cross-collection references, that's a future schema upgrade. For v1, the "Used in:" line links to other patterns that have this pattern in their `related[]`.
- **If `related[]` is empty or undefined, the entire section is omitted.** Don't render a dangling "Used in:" label with nothing after it.

### Section 7 — Back link (existing)

- `<a href="/patterns">← Back to all patterns</a>` — existing CSS kept.

### Frap

- **DOES NOT appear.** `<Layout hideFrap>`.

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `global.css` | Modified (already) | Shared `.prose` block. |
| `Layout.astro` | Unchanged | `hideFrap` prop used. |
| `TopicPhoto.astro` | Modified | `showCredit?` prop. |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |

No new components.

---

## 4. Content additions needed

- **No new frontmatter fields.**
- **No new content files.**
- **Optional**: add `related: [other-pattern-slug]` to some pattern MDX files to populate the "Used in:" line. **Implementer decision: leave this for the author to fill in post-build.** No MDX edits required for v1.

---

## 5. Edge cases / decisions left to the implementer

- **Title font** — Lora 600 at `--text-h1`. Same as essay and note detail.
- **Prose style consolidation** — drop inline `.pattern-body :global(...)` rules (lines ~160-200) and rely on the shared `.prose` utility.
- **"Used in:" reference resolution** — `getEntry('patterns', entry.id)` per reference. Render each as `<a href={`/patterns/${entry.id}`}>{entry.data.title}</a>` separated by ` · `.
- **JSON-LD** — the current implementation does NOT have JSON-LD on patterns detail. **Decision: do NOT add JSON-LD to patterns detail in v1.** The pattern is a reference entry, not a BlogPosting. If the author wants it added later, it's a small addition.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/patterns/{slug}/index.html` for every pattern entry.
- Visiting `/patterns/{any-slug}` shows: back-link, 4:3 hero photo at max-width 32rem, Lora 600 h1, meta row (date + topics), `<div class="prose">` with Lora 18px / 1.7 / 65ch body, optional "Used in:" footer line (if the pattern has `related[]` populated), back-link at the bottom.
- The body text is Lora, NOT Inter.
- The Frap is NOT visible.
- `:focus-visible` visible on every link.