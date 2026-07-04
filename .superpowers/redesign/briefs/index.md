# Brief — `/` (Home)

**Route:** `/`
**File:** `src/pages/index.astro`
**One-line job (from proposal §4):** Introduce the author and surface the four newest pieces of writing, with one curated hand-pick per type.

> **Read first:** `_shared-moves.md` (every page brief assumes it).

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (Home) and §9 (Tension Log):

- The home page is an **identity page**, not a feed. It is allowed to *not* show the latest essay by date — it shows what is most representative.
- The four "latest" strips are stacked in single-column rhythm with a 1px `--color-hairline` separator, NOT boxed (per "*don't make every section card-based; use unframed rows*").
- The Frap stays on the home page.
- **No** Library section appearing twice (it's a strip at the bottom, not a grid).
- **One** subscribe cluster on the whole page, in the closing band.
- **Curated picks block** (NEW) appears as section #2, between hero and the four latest strips.

---

## 2. Sections, top to bottom

### Section 1 — Hero band

- **Container:** full-bleed `.hero-section` background `var(--color-neutral-warm)`, inner content in `.container-phx`.
- **Padding-block:** `var(--spacing-7) var(--spacing-6)` (matches existing).
- **Layout:** 2-col grid on ≥1024px (content left, art right), 1-col stacked on mobile.
- **Components:**
  - Eyebrow (`<p class="hero-eyebrow">`): `Phuriwaj Ruengnaowaroj`. Inter 600, `--text-small`, uppercase, `--tracking-loose`, color `var(--color-starbucks-green)`. **Existing CSS — keep.**
  - `<h1>`: Inter 600, fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`, color `var(--color-starbucks-green)`, `max-width: 22ch`. **Use `--text-jumbo` on desktop.** The h1 copy: `Writing about web craft, design systems, and the occasional rabbit hole.` (existing).
  - Lede (`<p class="hero-lede">`): Lora, `--text-body-lg` (19px), `line-height: 1.6`, `color: var(--color-text-black-soft)`, `max-width: 60ch`. Existing copy kept.
  - CTAs (`<div class="hero-actions">`): TWO `Button` components. Primary copy/links update from proposal §4:
    - `Button variant="primary" href="/garden"` label: `Open the Garden`
    - `Button variant="outline" href="/essays"` label: `Read the latest essay`
  - Art (`<div class="hero-art">`): wraps `<TopicPhoto topic="design" scale="lg" showCredit={true} />`. Aspect 16:9 (verify — `tp-lg` is 16:9 in `TopicPhoto.astro`). `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-card)`. **Order `-1` on mobile so art sits above copy.**
- **Hard rule:** Hero is full-bleed warm cream; copy sits in `.container-phx`; art uses the right half of the grid on desktop.

### Section 2 — "If you only read three things"

- **Container:** `.container-phx`, `padding-block: var(--spacing-6)`.
- **Top hairline:** `border-top: 1px solid var(--color-hairline)` to separate from hero.
- **Optional eyebrow above (or no heading at all):** Per proposal, no heading — just the three lines. If the implementer wants a heading, use `<p class="section-eyebrow">If you only read three things</p>`.
- **Content:** use `<CuratedPicks>` (NEW, see `_shared-moves.md` §8). Pass `items` = three hand-picked entries, each `{ title, href }`. The implementer pre-fills with three concrete picks (the proposal does not specify; pick the three most-representative published pieces by their frontmatter — author can override after implementation).
- **Style:** the three lines are Lora italic (already inside `CuratedPicks`), each line separated by a 1px `--color-hairline` `<hr>`. Item color `--color-text-black`; hover → `--color-starbucks-green`. Each line is preceded by a `<CuratedMark size="sm" />`.

### Section 3 — Essays — recent 3

- **Container:** `.container-phx`, padding-block `var(--spacing-6)`.
- **Top hairline:** yes.
- **Header row:** flex space-between baseline; left `<h2>Essays</h2>` (Inter 600, `--text-h1`, `--color-text-black`), right `<Button variant="outline-dark" href="/essays">All essays →</Button>`. Use the arrow glyph in the button label, not a separate icon — keep consistent with the proposal's "All essays →" wording.
- **Body:** `<CollectionGrid cols={3} gap="md">` of three most-recent essays via `<GardenCard type="essay" />`. Existing logic for fetching `recentEssays` — keep.
- **Hover/transform:** existing `card-lifted` translateY(-2px) — keep.

### Section 4 — Notes — recent 3

- Same shape as Section 3 with `<h2>Notes</h2>`, right CTA `<Button variant="outline-dark" href="/notes">All notes →</Button>`, three `<GardenCard type="note" growthStage={...} />`.
- Existing `recentNotes` logic — keep.

### Section 5 — Patterns — recent 3

- Same shape as Section 3 with `<h2>Patterns</h2>`, right CTA `<Button variant="outline-dark" href="/patterns">All patterns →</Button>`, three `<GardenCard type="pattern" />`.
- Existing `recentPatterns` logic — keep. **Important: pass `excerpt={pattern.data.lede}` so the lede becomes the card body** (existing pattern in `index.astro` — preserve).

### Section 6 — Library strip

- **Container:** `.container-phx`, padding-block `var(--spacing-6)`.
- **Top hairline:** yes.
- **Header row:** `<h2>Library</h2>` left, `<Button variant="outline-dark" href="/library">Browse the library →</Button>` right.
- **Body:** horizontally-scrolling strip of 6 most-recent books via `<BookTile>` (existing). On desktop: 6-column grid (1 row); on mobile: 2-column grid that wraps to 3 rows. **NEW: a `.library-strip` grid using:**
  ```css
  .library-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-4);
  }
  @media (min-width: 640px) {
    .library-strip { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 1024px) {
    .library-strip { grid-template-columns: repeat(6, 1fr); gap: var(--spacing-3); }
  }
  ```
- **Data:** fetch `getCollection('books')`, sort by `year` desc, slice 6. (Existing `library.astro` has the same logic — copy it.) Pass `coverColor`, `title`, `author`, `year` to `BookTile`.
- **No "currently reading" treatment on home** (that lives only on `/library`).

### Section 7 — Closing band: Subscribe

- **NEW component:** `<NewsletterBand />` (see `_shared-moves.md` §12).
- Rendered as a full-width dark-green band wrapping a `.container-phx` inner with `<NewsletterBand headline="..." subhead="..." />` (defaults are correct — no overrides needed).
- The band's outer wrapper sets `background: var(--color-house-green); color: var(--color-text-white); padding-block: var(--spacing-7); margin-block-start: var(--spacing-7)`.
- **Inside `NewsletterBand`:** headline (Lora 500, `--text-hero-large` / 2.8rem), subhead (Inter, `--text-body`, `--color-text-white-soft`), email input (white pill, `--color-text-black` placeholder), CTA `Button variant="on-green"` label `Subscribe`.

### Frap

- **Stays.** Existing `<Frap />` placed in the `frap` slot of `<Layout>`. (Existing layout — keep.)
- **Pending:** `label` default is `'Quick order'`. Per `_shared-moves.md` §12 and proposal Open Question #6, **change the default `label` to `'Email me'`** (proposal §9 #7 says relabel to "Say hi" or "Email me"). Use `'Email me'` as the default — author can override later.

---

## 3. New or modified components required by this page

| Component | Status | Where | Notes |
|---|---|---|---|
| `CuratedPicks.astro` | **NEW** | `src/components/CuratedPicks.astro` | See `_shared-moves.md` §8 for full signature. |
| `CuratedMark.astro` | **NEW** | `src/components/CuratedMark.astro` | See `_shared-moves.md` §7. |
| `NewsletterBand.astro` | **NEW** | `src/components/NewsletterBand.astro` | See `_shared-moves.md` §12. |
| `TopicPhoto.astro` | Modified | — | Add `showCredit?: boolean` prop. Home passes `true`. |
| `Frap.astro` | Modified | — | Default label `'Quick order'` → `'Email me'`. |
| `Nav.astro` | Modified | — | Use new 7-item navLinks list (Home/Garden/Essays/Notes/Patterns/Now/Random). |
| `Footer.astro` | Modified | — | Restructure to three clusters. |

---

## 4. Content additions needed

- **No new frontmatter fields.**
- **Seed three curated picks** for the "If you only read three things" block. Implementer picks from existing `essays`/`notes`/`patterns` content. Hardcode the picks in `index.astro` for now (no frontmatter curation yet — keep it cheap). Example placeholder:
  ```ts
  const curatedPicks = [
    { title: 'On Typography, and the Trust It Quietly Asks For', href: '/essays/on-typography-and-trust' },
    { title: 'Design Tokens at Scale', href: '/essays/design-tokens-at-scale' },
    { title: 'Token as Grammar', href: '/patterns/token-as-grammar' },
  ];
  ```

---

## 5. Edge cases / decisions left to the implementer

- **Curated picks choice** — proposal does not specify which three entries. **Implementer picks three representative entries (one essay, one pattern, one notes or essay) — author reviews post-build.** Document the choice in a comment so the author can override.
- **Hero art topic** — currently hardcoded `topic="design"`. **Keep as `'design'`** (it's a stable, photographic default).
- **Library strip on mobile** — the proposal says "horizontally-scrolling strip OR 6-column grid on desktop." Decision above is grid (no horizontal scroll). If the author prefers the strip, swap `.library-strip` to `display: flex; overflow-x: auto; scroll-snap-type: x mandatory;` — but the grid is the safer default and matches the 6-tile visual the proposal implies.
- **Section heading color** — proposal says "h1 in Inter 600 (jumbo), color `--color-starbucks-green`." Section-level h2s (Essays/Notes/Patterns/Library) are NOT jumbo — they are `--text-h1` (2.4rem), and per `global.css` baseline h2 is `--color-text-black`. **Decision: section h2s on the home page are `--color-text-black` (text-black), NOT green.** Only the page h1 in the hero is green. (Existing `global.css` already enforces this; the implementer does not need to override.)
- **The section-header CTAs ("All essays →")** are `outline-dark` (Text Black border). Confirm against existing visual treatment.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/index.html`.
- Visiting `/` in dev shows: hero, "if you only read three things" with three italic Lora lines each prefixed by ✦, three section strips (Essays/Notes/Patterns) each with 3 cards and a right-aligned CTA, a Library strip of 6 BookTiles, and a dark-green closing band with the Subscribe form.
- Lora is the body face inside `.prose`; Inter is the body face everywhere else.
- `CuratedMark` ✦ appears ONLY at the start of each curated-pick line and nowhere else.
- Newsletter band is full-width dark-green; the form input is white-pill; the CTA is white pill with green text.
- Frap appears bottom-right with label "Email me" (not "Quick order").
- Nav has 7 links in the new order: Home / Garden / Essays / Notes / Patterns / Now / Random. No `About` or `Projects` in nav.
- Footer has three clusters: subscribe form, link list, social icons + ©.
- `:focus-visible` is visible on every nav link, button, chip, and form input.
- Section h1 (`Phurix...`) is green Inter 600 at `--text-jumbo` size; section h2s (`Essays`, `Notes`, ...) are Inter 600 at `--text-h1` color `--color-text-black`.
- No parallax, no animated cursors, no glassmorphism, no gradient mesh.
- No emoji-as-decoration; existing 🌱/🌿/🌳 badges remain only on notes.
- Page is noindexed only if it's a 404 (it isn't).
- JSON-LD present only on detail pages, not the home.