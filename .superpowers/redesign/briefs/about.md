# Brief — `/about`

**Route:** `/about`
**File:** `src/pages/about.astro`
**One-line job (from proposal §4):** A portrait of the author — work history, current focus, three contact surfaces.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/about`) and §9:

- Single primary subscribe CTA per page (one band).
- Photo gallery present in the current site is replaced by a single `<TopicPhoto topic="anthropology" scale="portrait">` portrait-style block (3:4 / 4:5) anchored right on desktop, stacked on mobile.
- `/now` is *prepended* here, not a separate route — the route still exists, but `/about` is the home of `/now`.
- Timeline dot/line treatment is tightened (current dot "reads as a checkbox").
- Projects — recent 2 (was a Card grid of all 4 on `/projects`; here only 2 most-recent).
- Talks — recent 3 (currently lives only at `/talks`; here surfaced as a small inline block).

---

## 2. Sections, top to bottom

### Section 1 — Header (existing)

- `.container-phx`, `padding-block: var(--spacing-7) var(--spacing-5)` (existing).
- Eyebrow `<p class="section-eyebrow">About</p>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-small`. Existing CSS — keep.
- `<h1 class="page-title">Phuriwaj Ruengnaowaroj</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. (Existing uses `--text-hero-large`; **upgrade to `--text-jumbo` fluid**.)
- Lede `<p class="page-lede">` — **Lora** at `--text-body-lg` (19px), `line-height: 1.6`, color `var(--color-text-black-soft)`, `max-width: 60ch`. Existing copy kept. (Existing CSS says font-family sans — **change to `var(--font-serif)`**.)

### Section 2 — Identity (long-form prose)

- Container: `.prose` (the shared long-form prose utility — see `_shared-moves.md` §1).
- Inside: 3-4 paragraphs of first-person voice (Lora 18px / 1.7 / 65ch).
- Content source: **HARDCODE the prose body in this section** (it is identity copy, not collection content). The implementer writes 3-4 paragraphs drawing on the existing lede as a starting point. Mark with a comment for the author to revise.
- **Author portrait alongside the prose on desktop:** wrap the prose + photo in a two-column grid:
  ```css
  .identity-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    align-items: start;
  }
  @media (min-width: 1024px) {
    .identity-grid { grid-template-columns: 1fr 18rem; gap: var(--spacing-7); }
  }
  ```
  Photo is on the right at desktop, stacked above (or below) on mobile. **Decision: stacked above on mobile (`order: -1` on the photo).**
- Photo component: `<TopicPhoto topic="anthropology" scale="portrait" showCredit={true} />`. The `scale="portrait"` variant is NEW (3:4 aspect). `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-card)`.

### Section 3 — Subscribe band (single dark-green)

- Render `<NewsletterBand />` (NEW). This is the **only** subscribe CTA on the entire `/about` page (proposal §4: "only one subscribe CTA on the whole page").
- Outer wrapper: full-width dark-green band, `padding-block: var(--spacing-7)`, background `var(--color-house-green)`. Inner content in `.container-phx`.

### Section 4 — Now preview (top 3 items from `/now`)

- **Container:** `.container-phx`, padding-block `var(--spacing-6)`.
- **Top hairline:** yes.
- **Header:** `<h2 class="section-heading">Now</h2>` (Inter 600, `--text-h1`, `--color-text-black`). Subhead: `<p class="page-lede">A short preview of what I'm up to. <a href="/now" class="section-link">See the full /now →</a></p>` (Lora, `--text-body`, `--color-text-black-soft`).
- **Body:** inline preview showing TOP THREE items only from the `/now` data. Implementer extracts the first 3 entries from a shared data source — see Content additions (§4).
- Each item: small label (Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-micro`) + value (Lora, `--text-body`, `--color-text-black`). No dividers between the three items.

### Section 5 — Work history (Timeline)

- Existing `<Timeline entries={workHistory} />` — keep.
- **Tighten the dot:** per `_shared-moves.md` §12, modify `Timeline.astro` so the dot reads as a soft bead, not a checkbox. CSS change in `Timeline.astro`'s `.timeline-dot`:
  - Old: `background: var(--color-green-accent); border: 3px solid var(--color-neutral-warm); box-shadow: 0 0 0 2px var(--color-green-accent);` (this is what makes it read as a checkbox — solid filled with a thicker matching ring).
  - New: `background: var(--color-neutral-warm); border: 1px solid var(--color-green-accent); box-shadow: 0 0 0 1px var(--color-green-accent);`
- Otherwise: vertical line via `::before` keeps current treatment (`background: var(--color-green-light)`).
- Work history data: keep the existing `workHistory` array (lines 7-32 of `about.astro`).

### Section 6 — Projects — recent 2

- **Container:** `.container-phx`, padding-block `var(--spacing-6)`.
- **Top hairline:** yes.
- **Header:** `<h2 class="section-heading">Projects</h2>` + right CTA `<Button variant="outline-dark" href="/projects">All projects →</Button>`.
- **Body:** two `<Card emphasis="lifted">` blocks, title + desc + tag row + outline CTA. **Source data from the new `projects` collection** (see `_shared-moves.md` §12). Fetch 2 most-recent by `year` desc.
- If no projects collection exists yet at implementation time, **fall back to the existing hardcoded `projects` array in `src/pages/projects.astro` (lines 6-27)** — copy the array here verbatim. Mark with a TODO comment for migration.

### Section 7 — Talks — recent 3

- **Container:** `.container-phx`, padding-block `var(--spacing-6)`.
- **Top hairline:** yes.
- **Header:** `<h2 class="section-heading">Talks</h2>` + right CTA `<Button variant="outline-dark" href="/talks">All talks →</Button>`.
- **Body:** three `<GardenCard type="talk" />` in a single row at narrow widths, two rows on tablet. Use `<CollectionGrid cols={3} gap="md">`.
- Existing talks data via `getCollection('talks')`, sort by date desc, slice 3.

### Section 8 — Skills chip row (existing)

- Existing `<ul class="skill-grid">` with `skills` array — keep unchanged.
- Color/typography rules: existing `.skill-chip` styles — keep.

### Section 9 — Closing CTA row (existing)

- Existing two CTAs: `<Button variant="primary" href="/garden">See my work</Button>` + `<Button variant="outline" href="/contact">Get in touch</Button>`. **Keep.** (The proposal does not propose removing these; it proposes that this is the contact-surface exit, distinct from the subscribe band.)

### Frap

- Stays. Pending label change to "Email me" (see `_shared-moves.md` §12).

---

## 3. New or modified components required by this page

| Component | Status | Where | Notes |
|---|---|---|---|
| `NewsletterBand.astro` | **NEW** | `src/components/NewsletterBand.astro` | Used in Section 3. |
| `Timeline.astro` | Modified | — | CSS change to `.timeline-dot` (see §2 Section 5). |
| `TopicPhoto.astro` | Modified | — | Add `scale="portrait"` enum + `showCredit?` prop. |
| `Frap.astro` | Modified | — | Default label change. |
| `Nav.astro` | Modified | — | New 7-item navLinks. |
| `Footer.astro` | Modified | — | Three-cluster restructure. |
| `projects` collection | **NEW** | `src/content/projects/` | Required for Section 6. |

---

## 4. Content additions needed

- **`projects` collection** (`src/content/projects/`): create directory + 4 MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`). Each: frontmatter `{ title, desc, tags[], year?, url? }` + a one-paragraph MDX body.
- **Register the collection** in `src/content.config.ts` (see `_shared-moves.md` §12 for schema).
- **Identity prose** (3-4 paragraphs in first person) — HARDCODE in `about.astro` Section 2. Implementer writes a first draft; author replaces post-build.
- **`/now` shared data**: extract the `/now` data into `src/data/now.ts` exporting `nowItems: Array<{ label: string; value: string }>`. Both `src/pages/about.astro` (top 3 items) and `src/pages/now.astro` (all items) import from this file. **The about page slices `.slice(0, 3)`.** This ensures the `/now` preview stays in sync with `/now`.

---

## 5. Edge cases / decisions left to the implementer

- **Identity prose voice** — proposal says "first-person paragraph in Lora." Implementer writes a first draft using the existing one-sentence lede as a seed. Mark with a comment.
- **Portrait photo aspect** — proposal says "3:4 / 4:5." `TopicPhoto` will need a new `scale="portrait"` variant. **Decision: implement 3:4** (it's already a recognized aspect in `TopicPhoto.astro` design notes; matches `tp-md` close enough; matches the photography system's editorial register).
- **Now preview count** — proposal says "top three items only." Implementation confirms 3 (sliced from `nowItems`). If `nowItems.length < 3`, render all available.
- **Order of sections** — the proposal lists (1) Header, (2) Identity, (3) Now, (4) Work history, (5) Projects, (6) Talks, (7) Skills, (8) Subscribe band. **The proposal does NOT put the subscribe band between Identity and Work history in its enumerated list — it puts it AFTER Identity in the narrative.** Reading §4 carefully: "single dark-green band, same shape as the home-page closing band" and "only one subscribe CTA on the whole page." **Implementer decision:** place the subscribe band as **Section 3** (right after Identity, before Now). This is the editorial placement that makes the Subscribe band feel like a "rest point" between Identity and the more functional sections (work history, projects, talks).
- **Projects source-of-truth** — depends on the `projects` collection existing. If the collection + 4 MDX entries are created in this page's implementation, use it. Otherwise fall back to copying the hardcoded array. (Phase order: if projects brief runs in parallel and seeds the collection, this page reads from it.)

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/about/index.html` (trailing slash).
- Visiting `/about` shows: header (h1 in green jumbo, Lora lede), Identity (3-4 Lora paragraphs + portrait photo right on desktop, stacked on mobile), Subscribe band (dark-green, single instance, no other subscribe CTAs), Now preview (3 items + "See the full /now →"), Work history (timeline with tightened dot treatment), Projects (2 cards from collection), Talks (3 GardenCards in a row), Skills chip row, closing CTA row.
- The page contains EXACTLY ONE subscribe band (count dark-green `NewsletterBand` instances on the page — must be 1).
- The Timeline dot reads as a soft green bead, not a green checkbox.
- The photo portrait uses `topic="anthropology"` and renders at 3:4 with the hover-revealed credit chip.
- `nowItems` from `src/data/now.ts` is the single source of truth — `/now` page reads from the same file.
- Frap visible bottom-right with label "Email me".
- `:focus-visible` visible on nav, buttons, chips, links.
- No contact form, no FAQ (per proposal §4: "No contact form"; "No FAQ accordion").
- 1-line bio ("Based in Bangkok") replaced by longer Lora identity prose — does not appear as a separate `<p>`.