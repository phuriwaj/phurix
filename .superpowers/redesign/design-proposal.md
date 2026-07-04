# Phurix Redesign Proposal

> A design proposal for the next phase of `phurix`, the personal site of Phuriwaj Ruengnaowaroj — a writer/thinker working at the design × writing × technology × anthropology intersection. This document is the input to stage 3a (`design-bridge`) and must remain in dialogue with the existing design system documented in `DESIGN.md` and `src/styles/theme.css`.

---

## 1. Positioning Statement

`phurix` is the personal publication of a designer-developer-writer who thinks out loud about how interfaces communicate — from component APIs to the grammar hiding inside design tokens. It is **not** a portfolio that applies for your job, **not** a marketing funnel for a service business, and **not** a feed-first blog with a calendar attached. It is a quiet, well-built reading room with seven doors: one for each kind of thing the author makes (essays, notes, patterns, talks, books, projects, and a `now` page). The reading experience promises a typographic register borrowed from print (long measure, deliberate spacing, no chrome) and the editorial discipline of a digital garden — pieces are added, revised, returned to; nothing is "removed from the archive."

---

## 2. Theme / Aesthetic Direction

### Concrete choices

- **Background tone.** Default page canvas is `var(--color-neutral-warm)` (`#f2f0eb`, warm cream). The `house-green` (`#1e3932`) is reserved for full-bleed bands and the footer — never a page background. Cards and prose surfaces layer in `white` over cream.
- **Body font family + size + line-height.** Body prose uses the *existing* Lora (already loaded via `<Font cssVariable="--font-serif" preload />` in `Layout.astro`) at **18px / line-height 1.7** on long-form pages (`/essays/[slug]`, `/notes/[slug]`, `/patterns/[slug]`, `/now`, `/about`). Interface chrome (nav, footer, chip labels, meta) stays on Inter (`--font-sans`) at 13–16px.
- **Heading scale.** Page-level `<h1>` use `--text-jumbo` (3.6rem / ~58px mobile → fluid up via clamp to ~72px on desktop) in Inter weight 600, color `--color-starbucks-green`. `<h2>` inside prose stays Lora weight 600 at 1.8rem. **Prose uses Lora; chrome uses Inter.** This matches the dominant pattern across all 12 references (per site-references.md §"Common moves").
- **Accent color rule.** A *single* accent color for the entire site: `var(--color-starbucks-green)` (`#006241`). It shows up in (a) h1/h2 headings on warm surfaces, (b) nav links and active-state underlines, (c) inline links in prose, (d) the timestamp-eyebrow on cards, and (e) the floating glyph (see §7). **One accent. One job: signal where the author is talking.**
- **Imagery rule.** Topic photos from `src/assets/photos/` (already wired via `TopicPhoto.astro` and `astro:assets`) appear on hero cards, essay headers, and card art. Ratio: **16:9 hero / 16:9 card art / 4:3 elsewhere**. No auto-play, no parallax, no decorative pattern overlays on photos. Photo credits already exist (hover-revealed) — keep this.
- **Motion rule.** CSS-only, ≤300ms, `var(--ease-out-soft)`. Three permitted motions: (a) color/tint shift on hover, (b) `translateY(-2px)` on `--card-lifted` hover, (c) the `scale(0.95)` press on buttons and the Frap. **No** parallax, **no** scroll-jacking, **no** animated cursors, **no** reveal-on-scroll.

### What we are explicitly rejecting

- Dark mode by default (the site reads warm + green; a dark variant is out of scope for this proposal).
- Parallax of any kind (hero, photos, decorative).
- Animated cursors or "magnetic" buttons.
- Glassmorphism / blur surfaces.
- Gradient mesh backgrounds.
- Hero videos or auto-playing motion.
- A "tagline carousel" / hero accent that swaps every few seconds.
- Emoji-as-illustration (the existing `🌱🌿🌳` growth badges stay — they are *labels*, not decoration; flagship emoji-as-decoration is rejected).

### Vibe (one paragraph)

**Daring Fireball × Maggie Appleton — warm cream paper, green accents, serif long-form, no chrome.** Restraint is the visible idea. The site should feel like a small magazine you happen to have full-text access to — every page is the inside of a book, not the front of one.

---

## 3. Content Model

The existing collection taxonomy (per `src/content.config.ts`) already maps cleanly onto functionally distinct kinds. The proposal keeps all five collections and surfaces them explicitly on the home page; below is how each functions.

| Type | One sentence | Hub page? | Home-page surface |
|---|---|---|---|
| **Essays** | Long-form, drafted-and-revised pieces on design, web, and the practice of making. | Yes — `/essays`. | Three-card "Essays" block (top of stream). |
| **Notes** | Short, dated observations or working ideas; growth-stage is metadata. | Yes — `/notes`. | Three-card "Notes" block (mid-stream). |
| **Patterns** | Named, reusable design/dev primitives — a small opinionated answer to a recurring question. | Yes — `/patterns`. (Currently a row-list — see §4.) | Three-card "Patterns" block (near bottom of stream). |
| **Talks** | Conference talks and workshop sessions; sparse, external-link-heavy. | Yes — `/talks`. | **Not on home.** Appears as a small "Talks" inset on `/about`. |
| **Books** | Books the author has read and that shaped thinking; visual, low-friction. | Yes — `/library`. | **Not on home.** Six most-recent books as a strip at the bottom of the home stream (see §4). |
| **Projects** | Side projects (often tool-shaped). Currently hardcoded in `projects.astro`, not from a collection. | Yes — `/projects`. | **Not on home.** Two-card "Projects" block on `/about`. |

### Surfaces to add

- **`/colophon`** — yes. Per §1 of site-references (Sloan, Chimero) the colophon is the design statement as a page, not a footer link. Single page, ~10 paragraphs: stack, fonts, host, RSS, privacy, "how to cite."
- **`/concepts`** — yes (per Stratechery §7). A glossary of recurring terms the author uses across essays. Author-curated; examples seeded: *affordance*, *design token*, *vibe shift*, *interface grammar*, *second-order effect*, *digital garden*, *type system*. Lives in markdown, not a collection — keep it cheap.
- **`/random`** — yes (per Sivers §11). One endpoint that picks a random essay/note/pattern on each request. Pure JS in a `/pages/random.ts` that 302s to `/[type]/[slug]`. The smallest, most-valued reader feature you can ship.
- **`/now` tightening** — keep the page. Move from five stacked `.now-section` blocks to a single ordered list with section labels. Add a "last updated" date at the top in `--text-micro`.
- **A `/concepts` link in the nav.** A `/blogroll` footer cluster (per Kottke §8). A `Random` link in the nav (per Sivers §11).

### Surfaces to remove / consolidate

- **Keep** `/essays`, `/notes`, `/patterns`, `/talks` as their own index pages. They surface different objects with different shapes (patterns is a *catalogue* — title + lede + date in a row list; notes is a *garden* with growth badges; essays is a *magazine* with hero images). Collapsing them into `/garden` only would erase the form-distinction. **Recommendation: keep all four index pages, but rebuild `/patterns` and `/essays` so that they read like catalogues, not duplicate copies of `/garden`.**
- **Remove** the hardcoded `projects` array in `src/pages/projects.astro`. Replace with a content collection `projects` (`schema = { title, desc, tags[], year? }`) so projects ship through the same pipeline as essays/notes. This is a *clean-up*, not a feature change.
- **Demote** `/projects` from the top nav. It is a small surface for a small audience; keep the URL, drop the link (per Sloan — the home page IS the directory; projects show on `/about`).

---

## 4. Page-by-Page Layout Proposals

### `/` — Home (index.astro)

**One-line job:** Introduce the author and surface the four newest pieces of writing, with one curated hand-pick per type.

**Section list, top-to-bottom:**

1. **Hero band** — eyebrow ("Phuriwaj Ruengnaowaroj"), h1 in Inter 600 (jumbo), lede in Lora body, two CTAs ("Read the latest essay" + "Open the Garden"), TopicPhoto right at 16:9. Stacked on mobile.
2. **If you only read three things** — three hand-picked links (customizable per author), one line each in Lora italic, separated by hairline rules. (Per Paul Graham §6.)
3. **Essays — recent 3** — `<CollectionGrid cols={3}>` of `GardenCard type="essay"`. Section header with section title + "All essays →" link.
4. **Notes — recent 3** — same shape, with `<GrowthBadge>` where applicable.
5. **Patterns — recent 3** — same shape; the third column is where the typographic patterns vocabulary surfaces.
6. **Library strip** — six most-recent books as a horizontally-scrolling strip of `BookTile` (or 6-column grid on desktop). Title below cover. (Per Craig Mod §2: books as equal product surface.)
7. **Closing band — Subscribe + Now preview** — single dark-green `FeatureBand` with `serif={true}` headline: "Letters from a working library." Two-line subhead, email input, single primary CTA. No repeated subscribe asks elsewhere on the page. (Per Marginalian §12 / Stratechery §7 — *one* CTA, *one* place.)

**Key decisions:**

- The home page is an **identity page**, not a feed (per Chimero §9 + Sloan §1 + Appleton §3). It is allowed to *not* show the latest essay by date — it shows what is most representative.
- The four "latest" strips are stacked in single-column rhythm with a 1px `--color-hairline` separator, not boxed (per "*don't make every section card-based; use unframed rows*" — Cohere pattern).
- The Frap (floating green CTA bottom-right) **stays on every page except those with their own deep-focus surface** (`/now`, individual essay/notes/patterns detail).

### `/about`

**One-line job:** A portrait of the author — work history, current focus, three contact surfaces.

**Section list:**

1. **Header** — eyebrow ("About") + h1 "Phuriwaj Ruengnaowaroj" + lede.
2. **Identity** — first-person paragraph in Lora (3–4 paragraphs). Voice not third-person.
3. **Now** — inline preview of `/now` (top three items only) with a "See the full /now →" link. (Per Marginalian — current state is a feature, not a sidecar.)
4. **Work history** — existing `<Timeline>` component; tighten the dot/line treatment (currently the dot has a green outline that reads as a checkbox).
5. **Projects — recent 2** — two `<Card emphasis="lifted">` blocks with title, desc, tag row, single outline CTA.
6. **Talks — recent 3** — three `<GardenCard type="talk">` in a single row at narrow widths, two rows on tablet. (Pulls talks onto `/about` so the home page doesn't have to.)
7. **Skills** — chip row (existing).
8. **Subscribe band** — single dark-green band, same shape as the home-page closing band. **Crucially, only one subscribe CTA on the whole page** (per Marginalian §12: "three or four repeated asks makes the site feel like a fundraiser").

**Key decisions:**

- Single primary subscribe CTA per page (per Marginalian §12 / Stratechery §7).
- Photo gallery present in current site replaced with a single `<TopicPhoto topic="anthropology" scale="md">` portrait-style block (3:4 / 4:5) anchored right on desktop, stacked on mobile.
- `/now` is *prepended* here, not a separate route (route still exists). The about page is the home of "/now" so updates have one obvious place.

### `/contact`

**One-line job:** Three channels and one direct action.

**Section list:**

1. **Header** — eyebrow ("Contact") + h1 "Get in touch." + lede.
2. **Three channel cards** — existing layout (Email / GitHub / Mastodon). Each `<Card>` shows label + value + click-to-action on hover.
3. **Direct email CTA** — primary button → `mailto:`.

**Key decisions:**

- No contact form. (Per Sloan §1, Mod §2 — email-first for a single-author site.)
- No FAQ accordion on this page (move FAQ-style items to `/colophon` if needed).

### `/garden`

**One-line job:** The single filterable surface where every writing artifact lives.

**Section list:**

1. **Header** — eyebrow ("Garden") + h1 "The Garden" + lede ("Everything I've written, in reverse chronological order. Filter by type or topic.").
2. **Sticky filter bar** — three filter groups (Type / Topic / Growth), each a label + chip row. Sticky beneath the nav. (Per Gwern's "structured filters above" pattern, §5.)
3. **Empty / no-results state** — a small helper sentence: "No matches — clear filters." Lora italic.
4. **Card grid** — `<CollectionGrid cols={3}>` with `<GardenCard>` entries, data-attributes for client-side filtering. Existing implementation is solid.
5. **Footer micro-link** — `Random` link (per Sivers §11).

**Key decisions:**

- The Garden is *not* the home page (per Sloan/Appleton). It is the second thing in the nav.
- Filters are URL-driven (`/garden?type=note&topic=design&growth=seedling`) — linkable from home-page section headers (existing behavior preserved).
- An "On this day" treatment: if any garden entry was published on today's month/day in a prior year, surface one as a single quiet line at the top of the grid. (Per Kleon honorable mention.)

### `/library`

**One-line job:** A visual shelf of books that shaped thinking.

**Section list:**

1. **Header** — eyebrow ("Library") + h1 "Library" + lede.
2. **Filter row** — by topic (topic1/topic2/topic3) and by era ("Currently reading" / "Recently finished" / "Reference" / "Old faithfuls"). If author can't add these facets yet, ship without filters — the grid is the artifact.
3. **Book grid** — 2 / 3 / 4 column responsive. `BookTile` is already strong (cover color as `--book-color`, spine illusion, hover lift). Surface "Currently reading" as the first card with a thin green border.
4. **Closing micro-line** — "Updated quarterly" in `--text-micro` `--text-black-soft`.

**Key decisions:**

- Books are tiles, not prose thumbnails (per Mod §2 — books deserve equal visual weight to essays).
- One special case: a single "currently reading" tile stands visually apart (thin green border + small `Reading` chip).

### `/now`

**One-line job:** What the author is up to this month.

**Section list:**

1. **Header** — eyebrow ("Now") + h1 "What I'm up to" + "Last updated [date]" in micro.
2. **Single ordered list of sections** — Location / Working on / Reading / Thinking about / Writing. Rendered as `<dl>`-style label-then-content pairs, divider between. Maximum body length 2 short sentences per item.

**Key decisions:**

- The page is allowed to be short. (Per Mod / Sive.rs — `/now` is one page, one update cadence.)
- No subscribe CTA on this page (it's not the right surface for it).

### `/projects`

**One-line job:** A short shelf of side projects.

**Section list:**

1. **Header** — eyebrow ("Projects") + h1 "Projects" + lede.
2. **Project grid** — 1 col mobile, 2 col tablet/desktop. `<Card emphasis="lifted">` with title, one-paragraph desc, tag row, optional link.
3. **A "more on github" link** at the bottom.

**Key decisions:**

- Migrate the hardcoded array into a `projects` content collection. Same shape: title, desc, tags[], year, optional url.
- This page is *not* in the top nav (per Sloan — projects accessible via `/about` and the URL).

### `/talks`

**One-line job:** A sparse, external-link-heavy index of public speaking.

**Section list:**

1. **Header** — eyebrow ("Talks") + h1 "Talks" + lede.
2. **Row list (catalogue)** — `<ul>` of talk rows: title left, event + date + external-link-chevron right. Per-row hover state reveals the external link icon (↗ — per Chimero §9).
3. **Closing line** — "For workshop enquiries: [contact link]." (Per Gwern §5: explicit note about engagement model.)

**Key decisions:**

- Talks are a row list, not a card grid (they're small in number, and a row list better mirrors bibliographic form).
- External links are visibly external (↗ glyph on hover) — keeps the boundary legible.

### `/essays`, `/essays/[slug]`

**Index page.**

**One-line job:** The catalogue of long-form pieces.

**Section list:**

1. **Header** — eyebrow ("Collection") + h1 "Essays" + lede.
2. **Optional "If you only read three" hand-pick block** — three italic Lora lines, each a single-link.
3. **Card grid** — 2-column `CollectionGrid` of `GardenCard type="essay"` with hero image (TopicPhoto at 16:9).

**Key decisions:**

- Stays as its own index; not merged into `/garden`. The home page points here for "all essays."

**Detail page (`/essays/[slug]`).**

**One-line job:** Read the essay.

**Section list:**

1. **Back link** — "← Essays".
2. **Hero image** — `<TopicPhoto>` 16:9, full-bleed inside the 65ch column.
3. **Title block** — `<h1>` in Lora weight 600 at ~2.4rem, italic lede below.
4. **Meta row** — date · reading time · topics as `TopicChip`.
5. **Prose body** — single column, 65ch, Lora 18px/1.7.
6. **Prev / Next** — single hairline row at the bottom.

**Key decisions:**

- Body font switches to **Lora at 18px/1.7** here (current is Inter via the default body). This is the single most impactful typographic change in the proposal — per site-references.md "Common moves #2" (body is serif, meta is sans) and per Sloan/Mod/Chimero/Sullivan visually.
- Blockquote becomes serif italic with a 3px green accent border (already implemented).
- Code blocks stay in the dark-green `house-green` (already implemented).
- Drop the 22px-padded hero card; the photo can be full-column-width but stay within the prose measure.

### `/notes`, `/notes/[slug]`

**Index page.**

**One-line job:** The garden of short observations.

**Section list:**

1. **Header** — eyebrow ("Garden") + h1 "Notes" + lede.
2. **Card grid** — 3-column `CollectionGrid` of `GardenCard type="note"`. Growth badge visible on each card.

**Detail page (`/notes/[slug]`).**

**Same reading-frame as essays**, but:

- No hero image by default; first topic photo appears inline only if `growthStage === 'evergreen'`.
- Growth badge sits in the meta row, prominent.
- Body font Lora 18px/1.65 (slightly tighter than essays — notes are shorter).

### `/patterns`, `/patterns/[slug]`

**Index page.** Currently a row list — keep this form.

**One-line job:** The catalogue of named, reusable primitives.

**Section list:**

1. **Header** — eyebrow ("Catalogue") + h1 "Patterns" + lede.
2. **Row list** — title left, type label + relative date right. (Already implemented; pattern list reads correctly. Tighten the column proportion: 1fr / 10rem, not 1fr / 12rem.)

**Detail page (`/patterns/[slug]`).**

**Same reading-frame as essays**, but:

- Body font Lora 18px/1.7.
- A small "Used in:" footer line linking to notes/essays that reference this pattern. (Optional, requires `related[]` frontmatter — already in schema.)

### `/404`

**One-line job:** Recover from a missed link.

**Section list:**

1. **Header** — eyebrow ("Error 404") + h1 (display-size) "Page not found." + lede.
2. **Two CTAs** — Back to Home, Browse the Garden.

**Key decisions:**

- Keep the giant `--text-display` h1 here; this is the one place display-scale is earned (per Cohere: "use massive type sparingly").

---

## 5. Typographic System

### Body

- **Family:** `var(--font-serif)` (Lora). Already loaded via `<Font cssVariable="--font-serif" preload />` in `Layout.astro`. No new font load required.
- **Size:** 18px (1.8rem at the 10px root scale that already exists: `--text-body-lg = 1.9rem`).
- **Line height:** 1.7 on long-form (essay/notes/patterns detail); 1.6 on short pages (`/now`, `/about`).
- **Measure:** 65ch enforced with `max-width: 65ch; margin-inline: auto;` — already used in the essay detail page. Apply the same to notes, patterns detail.

### Headings

- **Family:** Inter (`var(--font-sans)`). Keep all headings sans; the contrast is "serif body, sans chrome."
- **h1 page title:** Inter 600 at `--text-jumbo` (3.6rem / ~58px mobile). Fluid to ~4.5rem (72px) desktop via `clamp(3.6rem, 6vw + 1rem, 4.5rem)`. Color `--color-starbucks-green`.
- **h2 section heading (page chrome):** Inter 600, `--text-h1` (2.4rem).
- **h2 in prose:** **Lora 600**, 1.8rem, color `--text-starbucks-green`.
- **h3 in prose:** Inter 600, 1.45rem, color `--text-black`.
- **h4 in prose:** Inter 600, 1.15rem, color `--text-black`.
- **All heading tracking:** `var(--tracking-tight)` (-0.01em) — already implemented.
- **Display scale:** `--text-display` (5rem / 80px). Used only on `/404`.

### Meta / Nav

- **Family:** Inter.
- **Size:** `--text-small` (1.4rem / 14px) for nav; `--text-micro` (1.3rem / 13px) for meta/timestamps.
- **Letter spacing:** uppercase eyebrow (`var(--tracking-loose)` 0.1em) for labels; default tight for everything else.
- **Color:** `--color-text-black` for nav; `--color-text-black-soft` for meta.

### Accent rule

- **Italics:** Lora italic for (a) the lede under a title, (b) blockquotes, (c) the "if you only read three things" lines on home/essays-index, (d) the empty-state sentence on `/garden`. *Italics is the "the author is speaking" cue.*
- **Small caps:** Inter uppercase + `--tracking-loose` for (a) eyebrow labels above titles, (b) section headers on `/now`, (c) the "type label" on cards. *Small caps is the "this is metadata" cue.*
- **Color:** Green accent is *never* applied to whole sentences of running prose. Green is for headings, links, and chips. *Color is the "where to look next" cue.*
- **Weight shifts:** Inter 600 for headings, 400 for prose, 500 for nav links, 700 reserved for the wordmark and button labels.

---

## 6. Visual Language

### Color palette

**Stay close to the existing palette.** No new tokens. Use these existing CSS variables exactly as documented in `src/styles/theme.css`:

- **Page canvas:** `--color-neutral-warm` (`#f2f0eb`).
- **Long-form prose surface:** `--color-white` (cards, prose columns).
- **Dark bands (footer, feature band, newsletter, code blocks):** `--color-house-green` (`#1e3932`).
- **Primary accent (one accent only):** `--color-starbucks-green` (`#006241`). Used for h1, h2 prose headings, nav active state, links.
- **Filled CTA:** `--color-green-accent` (`#00754a`).
- **Mid-dark for hover/pressed:** `--color-green-uplift` (`#2b5148`).
- **Body text:** `--color-text-black` (rgba 0.87).
- **Meta / muted:** `--color-text-black-soft` (rgba 0.58).
- **Hairlines:** `--color-hairline` (`#e7e7e7`).
- **Ceramic for cards-over-photo backdrops:** `--color-ceramic` (`#edebe9`).
- **Gold (`#cba258`):** off-limits except in the `/library` "currently reading" tile border (rewards-ceremony use, existing semantics).

**Optional addition (only if needed):** `--color-text-on-green-soft` currently maps to `rgba(255,255,255,0.7)`. Define `--color-text-on-warm-soft` as the warm-canvas analog only if a new surface requires it. Otherwise the existing token set is sufficient.

### Imagery rule

- **Source:** `src/assets/photos/` (via `TopicPhoto.astro`).
- **Aspect:** 16:9 for hero and card art; 4:3 for contact/about portraits; 1:1 not used.
- **Treatment:** No filters, no overlays. Existing photo credits already appear on hover (`tp-credit`); keep.
- **Where they appear:** (a) home hero, (b) essay detail hero, (c) `GardenCard` art, (d) `/about` portrait, (e) `/contact` no photo. **Not** in `/now`, `/projects`, `/library`, `/talks` — those read as text.

### Spacing & rhythm

- **Vertical rhythm:** `--spacing-6` (4rem) between major page sections; `--spacing-5` (3.2rem) between subsections inside a page. Use the existing `var(--spacing-*)` tokens; nothing new.
- **Container widths:** `--container-xl` (1440px) for the nav and feature bands. **Prose columns cap at 65ch** (already implemented in essay detail). Index/grid pages use the full container up to 1280px (define `--container-content: 1280px` if needed, or use `--container-xl` with inner padding).
- **Page-header padding-block:** `var(--spacing-7) var(--spacing-5)` (4.8rem / 3.2rem) — already in use across garden/library/talks/patterns. **Standardize this on every collection page.**

### Borders, shadows, rounded corners

- **Borders:** 1px solid `--color-hairline` for (a) page-header bottom, (b) sticky-filter bottom, (c) row dividers in `/patterns` and the `/garden` catalogue lists. No other use of borders.
- **Shadows:** `--shadow-card` (existing) for cards. `--shadow-nav` for the nav. `--shadow-frap-base + --shadow-frap-ambient` for the Frap. No new shadows. No `drop-shadow` gimmicks.
- **Radius:** Three tiers only — `--radius-input` (4px, used on rectangular inputs/buttons), `--radius-card` (12px, on cards and the Frap stays `--radius-circle` 50%), `--radius-button` (50%, on pills). **No new radius tokens.**
- **Borders vs cards: hairline-vs-card test.** If a surface needs to *hold* something (a card of content, a quote, a thumbnail grid), it gets a card. If a surface needs to *separate* things (a section transition, a row in a list), it gets a hairline. The 404 page is the only display-scale exception.

---

## 7. Interaction Patterns

### Hover / active / focus styles

- **Hover on links inside prose:** color shifts to `--color-starbucks-green`, underline remains. Subtle, never animated.
- **Hover on cards (`.card-lifted`):** `translateY(-2px)`, ambient shadow bumps by 1px. Already implemented. Keep.
- **Hover on chips (`.topic-chip`):** background tints to `--color-green-light`. Already implemented. Keep.
- **Hover on book tiles:** `translateY(-4px) rotate(-1deg)`. Already implemented. Keep.
- **Hover on topic photos:** credit chip fades in. Already implemented. Keep.
- **Active on buttons / Frap:** `scale(0.95)`. Already implemented. Keep.
- **Focus:** Always a 2px `--color-green-accent` outline + box-shadow ring; never remove outlines (a11y). Apply to all interactive elements via `:focus-visible`. The newsletter input already does this; standardize.

### The single accent glyph — proposal: ✦

**Glyph:** `✦` (BLACK FOUR POINTED STAR, U+2726). Reasoning: the Sloan ★ is the *very most common* choice and would feel derivative. The ✦ has a slightly more editorial/print register; it also pairs visually with the existing cream/green palette better than a bright yellow ★ would. Gwern uses a smaller version of ★ for the same curation job (per site-references §5).

**Where it appears:**

- One ✦ in the title row of every "if you only read three" item on `/` and `/essays`.
- One ✦ at the start of any one entry marked "newly added" in the past 30 days on `/garden`.
- The Frap icon stays a shopping bag (existing).

**Where it does NOT appear:** Not on cards, not as decoration in headers, not in prose. **One glyph, one job: mark curated picks.**

### Subscribe surface

**Where it lives, how it's worded:**

- **One subscribe cluster per page where it appears**, never repeated within a page. Appears on `/` (closing band), `/about` (between Identity and Work History), `/colophon` (single line: "RSS / Email / GitHub"), and nowhere else.
- **Wording:** "Letters from a working library." headline, subhead "Occasional notes from the studio — essays, experiments, things I'm thinking about. No spam, no marketing. Just a short dispatch when there's something worth sharing." (Existing copy on `/about` is already in this voice — reuse it, lift verbatim.)
- **Form:** single email input + primary CTA. Submit goes to a `/api/subscribe.ts` endpoint (currently a placeholder `#`).

### Random and On-this-day

- **`/random` link lives in the top nav**, after "Garden." (Per Sivers §11.) The Frap stays as a separate contact surface — `/random` is its own affordance.
- **`On this day` treatment:** on `/garden`, if any entry was published on today's month/day in any prior year, surface *one* as a small italic line above the filter bar: "On this day in 2023 — ['Title' → slug]." One entry, one line, no UI chrome.

---

## 8. Navigation Proposal

### Top nav (current + proposed)

**Current:** Home / Garden / Essays / Notes / Patterns / About (6 items).

**Proposed:**

1. **Home** (`/`) — identity page.
2. **Garden** (`/garden`) — filterable hub.
3. **Essays** (`/essays`) — long-form.
4. **Notes** (`/notes`) — short observations.
5. **Patterns** (`/patterns`) — reusable primitives.
6. **Now** (`/now`) — current focus.
7. **Random** (`/random`) — surprise me.

**Rationale for moving Now into nav:** `/now` is canonical (per Sivers §11 /now convention), and the home page only has room for one "what I'm doing now" preview. Visitors who return monthly will visit `/now` directly.

**Remove from top nav:** Projects (still exists at `/projects`, surfaces from `/about` and from footer). About (still exists at `/about`, surfaces as a small "About →" in the closing band of every page and a footer link).

**Active state:** same `nav-link-active` + 2px green underline treatment already in `Nav.astro`. Keep the wordmark left, links right.

### Footer

**Current:** social icons (GitHub, Bluesky, LinkedIn, Mastodon, RSS) + copyright + "Built with care."

**Proposed (same dark-green band, three clusters):**

1. **Left cluster — Subscribe.** A single email input + arrow submit (one line). Headline eyebrow: "Letters from a working library."
2. **Center cluster — Find more.** Inline links: `Garden`, `Essays`, `Notes`, `Patterns`, `Now`, `Projects`, `Library`, `Talks`, `Contact`, `Colophon`, `Concepts`, `Blogroll`, `RSS`.
3. **Right cluster — Social + brand.** Same social icons. Below: `© 2026 Phuriwaj Ruengnaowaroj · Built with care · Colophon`.

**Blogroll lives in the footer** (per Kottke §8), not as its own page — 20-30 hand-picked sites in a `<details>` collapse so it doesn't overwhelm the page.

### New pages that need nav presence

- `/colophon` — link in footer.
- `/concepts` — link in footer.
- `/blogroll` — collapsible details in footer.
- `/random` — link in top nav (item 7).

---

## 9. Tension Log

These are the explicit frictions between this proposal and the existing implementation that the next agent (`design-bridge`) will need to reconcile.

1. **Body font: serif vs sans.** Proposal wants Lora as the long-form body face. The current implementation uses Inter for everything (the `font-serif` token exists but is barely used — only `FeatureBand` accepts a `serif` prop, and `Layout.astro` loads Lora with `<Font cssVariable="--font-serif" preload />` but no page sets `body { font-family: var(--font-serif); }`). **Bridge move:** set the Lora rule in `global.css` (or `theme.css`) scoped to prose surfaces (e.g., `.prose`, `.page-prose`), not globally. Inter remains for chrome. No new font load.
2. **Body size: 18px vs 16px.** Proposal sets prose at 18px (1.8rem) for long-form. `theme.css` only defines `--text-body` (1.6rem / 16px) and `--text-body-lg` (1.9rem / 19px). **Bridge move:** add a `--text-prose: 1.8rem` token to `theme.css` and use it on `.prose`. Do *not* change the global body default (it would shift every button, chip, and nav label).
3. **Measure: 65ch enforced.** Already done in `/essays/[slug]`. Not done in `/notes/[slug]`, `/patterns/[slug]`, `/about` body, `/now`. **Bridge move:** extract a shared `.prose-container` class or a `<Container>` component with `max-width: 65ch; margin-inline: auto;` and use it on every long-form prose surface.
4. **`/essays`, `/notes`, `/patterns` index pages.** All currently exist as duplicate-of-Garden grid pages. Proposal keeps all three but tightens each to its *form* (essays as magazine, notes as garden, patterns as catalogue-row). **Bridge move:** redesign `/patterns/index.astro` to remain a row list (current implementation is close); redesign `/essays/index.astro` to add a hand-pick block above the grid; keep `/notes/index.astro` near current but add the "On this day" line.
5. **Hardcoded `/projects` array.** Proposal wants a `projects` collection. **Bridge move:** add `src/content/projects/` collection with schema `{ title, desc, tags[], year?, url? }`; migrate array values to MDX entries. This is a *clean-up*, low-risk.
6. **`/concepts`, `/blogroll`, `/colophon`, `/random`.** All four are new pages. None exist yet. **Bridge move:** scaffold them in stage 3a — page files, footer wiring, nav wiring (only `/random` lands in top nav). `/concepts` is hand-curated markdown (not a collection); `/blogroll` is a single MDX page; `/colophon` is a single MDX page; `/random` is a `src/pages/random.ts` redirect endpoint.
7. **The Frap.** Currently a fixed-bottom "shopping bag" icon on every page labeled "Quick order → /contact." Reads as a Starbucks remnant, not a writer's site. **Bridge move:** relabel to "Say hi" or "Email me" with the same shopping-bag icon (or swap icon to `?` or `@`). Keep the component, change the label/icon.
8. **Footer.** Currently a thin dark band with five social icons + copyright + "Built with care." Proposal wants it restructured into three clusters. **Bridge move:** rewrite `Footer.astro` with three `<footer-col>` slots; preserve the existing social SVG icons and copyright. Add the center-cluster nav.
9. **The single-glyph proposal (✦).** No existing token. **Bridge move:** add a `<CuratedMark />` component (one-line SVG or text glyph) and a `--color-accent-glyph` rule that resolves to `--color-starbucks-green` so it inherits the existing palette.
10. **Topic photo credit chip.** Already implemented (hover-reveal). Keep on the hero, drop on small `GardenCard` thumbs (the chip is too noisy at 16:9 thumb scale).

---

## 10. Open Questions / Rejected Ideas

### Rejected ideas (one-line reasons)

- **Dark mode.** Out of scope; the site reads warm + green on purpose.
- **Hero parallax / scroll-jacking.** Universally hated; rejects all references' advice.
- **Animated cursors / magnetic buttons.** Distracts from prose.
- **Glassmorphism / blur surfaces.** Clashes with the cream-paper vocabulary.
- **Gradient mesh.** Cohere-style rule: gradients are media-led, not UI-led.
- **A separate `/blog` page.** Would duplicate `/garden` with worse granularity.
- **A homepage blogroll.** Belongs in the footer per Kottke, not the home.
- **A newsletter modal that fires on exit-intent.** Aggressive; one CTA, in one place.
- **Multi-language support (`/th` for Thai).** Out of scope unless author requests.
- **A "subscribe to each collection separately" affordance.** Overkill for a single-author site.
- **Replacing the wordmark "phurix" with a monogram or logo.** The current wordmark is typographic, low-cost, timeless.
- **A custom illustration system like Maggie Appleton's.** Beautiful, but high-cost to maintain; the topic-photo system is already doing the job.

### Open questions for the author

> These need an answer before stage 3a can run.

1. **The single accent glyph — ✦, ★, ◐, or none?** Proposal recommends ✦ (slightly more editorial than Sloan's ★). The author should pick.
2. **Where does "About" live in the nav?** Proposal removes it from the top nav (it surfaces from the home + closing band). If you want it in the top nav instead of "Now" or "Random," confirm which to swap.
3. **Is `/projects` worth keeping as a route?** Proposal keeps it but takes it out of the nav. If you'd rather consolidate into `/about`, that's a one-page merge.
4. **Do you want the "on this day" treatment on `/garden`?** It's an inexpensive build but adds editorial discipline (you'd need to remember why each old post is featured).
5. **Should `/library` get a "Currently reading" tile semantics?** Requires either manual data on each book or a schema change. Confirm before bridge.
6. **Where does Frap go?** Default in proposal: stays everywhere except `/now` and individual essay/notes/patterns detail pages. If you'd rather drop Frap entirely, say so.
7. **Subscribing — what backend?** The form currently posts to `#`. Bridge needs to know: ConvertKit? Buttondown? A static email-collection endpoint? Manual email-only with no form?
8. **Is the "Bangkok" location in `/now` correct?** `/about.astro` says Bangkok; `/now.astro` says Bangkok. Earlier file says London. Reconcile.
9. **The `/concepts` glossary — curated by you, or do you want me to draft an initial set?** Stage 3a can prefill 6-8 terms.
10. **The book-row hover treatment** (current uses `transform: translateY(-4px) rotate(-1deg)`) — looks playful on book tiles but breaks the editorial register. Drop the rotation, keep the lift?

---

## Summary

**Top three design moves** (one paragraph): **(1)** Move long-form prose to **Lora 18px / 1.7 line-height / 65ch** — this is the single highest-impact change and aligns phurix with the dominant typographic register of the twelve reference sites. **(2)** Restructure the home page from "feed of recent posts" into an **identity page** (hero + hand-picks + four latest strips + library shelf + one subscribe band), per the Sloan/Chimero/Appleton/Mod consensus. **(3)** Add four small surfaces — **`/colophon`, `/concepts`, `/random`, and `/blogroll`** — and add **Nav and Now to the top nav**, dropping Projects from the nav. Together these changes move phurix from "well-built portfolio with starbucks greens" toward "quiet publication with one accent, seven doors, and a reading room the author is proud of."
