# Shared Moves — Cross-cutting Decisions for the 11-Page Redesign

> **Audience:** the per-page briefs in this directory assume everything in this file.
> Read this first. Every page-brief references its sections.

Source: `/home/phurix/projects/phurix/.superpowers/redesign/design-proposal.md` §2, §5, §6, §7, §8.
Authoritative intent: `/home/phurix/projects/phurix/DESIGN.md`. Authoritative tokens: `/home/phurix/projects/phurix/src/styles/theme.css`.

---

## 1. Typography stack

### Families (already loaded — no new fonts)

- **Body / long-form prose:** `var(--font-serif)` = **Lora**, 400 / 500 / 600. Loaded by `<Font cssVariable="--font-serif" preload />` in `src/layouts/Layout.astro`. Source: `astro.config.mjs`.
- **Chrome (nav, footer, headings, chips, meta):** `var(--font-sans)` = **Inter Variable** + Inter fallback. Loaded via `@fontsource-variable/inter` in `Layout.astro`.
- **Display / script (rare):** `var(--font-script)` = **Kalam**. Loaded via `<Font cssVariable="--font-script" preload />` but **not used in any page below**; leave the token unused.
- The `--font-display` token is an alias for `--font-sans` — keep as is.

### Type scale

Use existing tokens verbatim. No new type tokens.

| Role | Token | Value | Family | Weight | Where it lives |
|---|---|---|---|---|---|
| Display (404 only) | `--text-display` | 5rem / 80px | Inter | 600 | `404.astro` h1 only |
| Jumbo (page h1, hero) | `--text-jumbo` | 3.6rem / 58px | Inter | 600 | Page-level h1 across all pages; hero headline. Fluid via `clamp(3.6rem, 6vw + 1rem, 4.5rem)` at ≥1024px. |
| Hero large (current page h1) | `--text-hero-large` | 2.8rem / 45px | Inter | 600 | **DEPRECATED** for new h1s — replace with `--text-jumbo` fluid. Keep token for legacy sizes inside cards. |
| Section heading (chrome) | `--text-h1` | 2.4rem / 24px | Inter | 600 | `<h2>` page section headers, current default h1. |
| Prose h2 (inside `.prose`) | (no token) | 1.8rem / 18px | **Lora** | 600 | Inline `<h2>` inside `.prose` is Lora — color `--color-starbucks-green`. |
| Prose h3 | (no token) | 1.45rem / ~14.5px | Inter | 600 | `.prose h3`. |
| Body default | `--text-body` | 1.6rem / 16px | Inter | 400 | Chrome / nav / chips / form labels. **Do not** apply to long-form prose. |
| Body prose (NEW token) | **`--text-prose: 1.8rem`** | 1.8rem / 18px | **Lora** | 400 | All long-form prose surfaces (essay/notes/patterns detail; `/now`; `/about` body paragraphs). **Add this token to `theme.css`** under the existing type-scale block. |
| Body large | `--text-body-lg` | 1.9rem / 19px | Lora | 400 | Page-level lede paragraphs (the one-line subhead below a page h1). |
| Small / chrome | `--text-small` | 1.4rem / 14px | Inter | 500 | Nav, chip labels, meta dates on cards, back-links. |
| Micro | `--text-micro` | 1.3rem / 13px | Inter | 400 | Timestamps, "last updated" lines, footer copyright. |

**Body rule (load-bearing):**

- Long-form prose → `font-family: var(--font-serif)`, `font-size: var(--text-prose)` (18px), `line-height: 1.7`, `max-width: 65ch`, `margin-inline: auto`.
- Chrome (nav, footer, headings, chips, buttons, form labels, card meta) → keep `font-family: var(--font-sans)`.
- Page-level lede (under page h1) → Lora at `--text-body-lg` (19px), `line-height: 1.6`, `max-width: 60ch`.
- Italics = **Lora italic** for: (a) lede under titles, (b) blockquotes, (c) the "if you only read three things" lines, (d) the empty-state sentence on `/garden`. *Italics is the "the author is speaking" cue.*
- Small caps (uppercase + `--tracking-loose` 0.1em, Inter 600) = eyebrow labels above titles; section labels on `/now`; type labels on cards. *Small caps is the "this is metadata" cue.*

### New CSS to add

In `src/styles/global.css`, after the existing `h1`/`h2`/`h3`/etc. rules, add a `.prose` selector block that:

```css
/* Long-form prose — Lora 18px / 1.7 / 65ch */
.prose {
  font-family: var(--font-serif);
  font-size: var(--text-prose);
  line-height: 1.7;
  color: var(--color-text-black);
  max-width: 65ch;
  margin-inline: auto;
}
```

In `src/styles/theme.css`, under the type-scale block, add:

```css
--text-prose: 1.8rem; /* 18px — long-form prose body */
```

The `.prose` block must continue to expose the existing per-element rules currently inlined in `src/pages/essays/[slug].astro`, `src/pages/notes/[slug].astro`, `src/pages/patterns/[slug].astro`. **Do not duplicate those rules in every page** — the implementation must move all of them into `global.css` under `.prose :global(...)` once. Each page then adds `<div class="prose"><Content /></div>` and inherits all rules. Per-page styles only override when a page truly differs.

---

## 2. Color tokens (use existing — no new tokens)

Copy/paste these from `src/styles/theme.css`. The proposal confirms no new tokens.

| Token | Hex | Role |
|---|---|---|
| `--color-neutral-warm` | `#f2f0eb` | Page canvas. Always. |
| `--color-white` | `#ffffff` | Card surface, prose surface. |
| `--color-house-green` | `#1e3932` | Footer, newsletter band, code blocks. |
| `--color-starbucks-green` | `#006241` | The ONE accent: h1, h2 prose headings, nav active, inline links, chip border emphasis, eyebrow labels. |
| `--color-green-accent` | `#00754a` | Filled CTA fill, focus ring, "on-green" button text. |
| `--color-green-uplift` | `#2b5148` | Hover/active mid-dark green (Frap hover, raised green surfaces). |
| `--color-green-light` | `#d4e9e2` | Hover tint on chips, code chip background, valid form tint. |
| `--color-text-black` | `rgba(0,0,0,0.87)` | Body text. |
| `--color-text-black-soft` | `rgba(0,0,0,0.58)` | Meta / muted / dates. |
| `--color-text-white` | `rgba(255,255,255,1)` | Text on dark bands. |
| `--color-text-white-soft` | `rgba(255,255,255,0.7)` | Muted text on dark bands. |
| `--color-hairline` | `#e7e7e7` | Page header bottom border, sticky filter bottom, row dividers. |
| `--color-ceramic` | `#edebe9` | Photo card art backdrop, inline code background. |
| `--color-gold` | `#cba258` | **Off-limits** except for `/library` "currently reading" tile border. |
| `--color-input-border` | `#d6dbde` | Default form input border. |

### New tokens required

1. **`--text-prose: 1.8rem`** — see §1 above. The only NEW token. Add to `theme.css` under the type-scale block.
2. **No new color tokens.** Even the proposal's "optional `--color-text-on-warm-soft`" is not needed — `--color-text-black-soft` is the right token.

---

## 3. Container widths

- **Nav / dark bands / feature bands / footer:** `class="container-phx"` (which resolves to `max-width: var(--container-xl)` = **1440px**, with responsive gutter). Already defined in `global.css`.
- **Page-level chrome sections (headers, cards, grid sections):** `class="container-phx"`.
- **Long-form prose surfaces (essay / notes / patterns detail, `/now`, `/about` body paragraphs):** `class="prose"` — a NEW global utility whose `max-width: 65ch` is set once and shared. (See §1.)
- **Hero band:** full-bleed warm cream background; inner content in `.container-phx` (no extra max-width).

The proposal mentions defining `--container-content: 1280px` for grids but the existing `--container-xl: 1440px` is fine — leave it. Grids use the full container and let `CollectionGrid` / inline grid rules handle the responsive column count.

---

## 4. Spacing scale

The existing `var(--spacing-N)` tokens (1rem = 10px) cover everything.

| Token | Value | Use |
|---|---|---|
| `--spacing-1` | 4px | Inline gaps between chips, hairline-thick gaps. |
| `--spacing-2` | 8px | Tight gaps between sibling meta items. |
| `--spacing-3` | 16px | Default gap between related siblings; between card body and meta. |
| `--spacing-4` | 24px | Card inner padding (mobile); gap between grid items; between heading and lede. |
| `--spacing-5` | 32px | Card inner padding (desktop); margin-bottom between section headings and first child; page-header bottom padding-block. |
| `--spacing-6` | 40px | `padding-block` of `.section` on mobile (already in `global.css`); margin-top of `.prose` between major blocks. |
| `--spacing-7` | 48px | `padding-block` of `.section` on desktop; `padding-block` start of every page-header band; gap between major page sections (hero → first section, last section → closing band). |
| `--spacing-8` | 56px | (Frap height — not used in pages.) |
| `--spacing-9` | 64px | (Currently used only by 404.) |

**Standardize on every collection page** (per proposal §6):

- **Page-header padding-block:** `var(--spacing-7) var(--spacing-5)`.
- **Page-header bottom border:** `1px solid var(--color-hairline)`.
- **Section padding-block:** `var(--spacing-6)` on mobile, `var(--spacing-7)` on desktop (this is already what `.section` provides).
- **Vertical rhythm between sections inside a page:** `var(--spacing-6)` is implicit via `.section`; do not stack extra `margin-top`.

---

## 5. Link / focus / hover conventions

### Inline links in prose

```css
color: var(--color-green-accent);
text-decoration: underline;
text-underline-offset: 2px;
```
Already used in `.prose :global(a)`. Hover shifts to `var(--color-starbucks-green)`. Standardize in the `.prose` block in `global.css`.

### Inline links in chrome (nav, footer)

- Nav: `color: var(--color-text-black)`, hover/active → `var(--color-starbucks-green)`. Already in `Nav.astro`.
- Footer center-cluster (NEW): same as nav but on a dark band — `color: var(--color-text-white-soft)`, hover → `var(--color-text-white)`.

### Focus

Universal `:focus-visible` rule already exists in `global.css`:

```css
:focus-visible {
  outline: 2px solid var(--color-green-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

Apply to ALL interactive elements (links, buttons, chips, Frap, nav links). Do not override per-component unless the surface is dark — for dark surfaces, use `outline-color: var(--color-text-white)`.

### Hover / active (page-wide rules from `Button.astro`)

- **Color tint shift** (chips, links): `transition: color var(--duration-button) ease, background-color var(--duration-button) ease`.
- **Card lift** (cards with `.card-lifted`): `transform: translateY(-2px)` plus ambient shadow bump 1px — already implemented in `Card.astro`.
- **Button press:** `transform: scale(0.95)` — already in `Button.astro`.
- **Book hover** (existing): `transform: translateY(-4px) rotate(-1deg)`. **PROPOSAL QUESTION 10 asks the author whether to keep the rotation** — pending answer. **Implementer should keep the rotation for now (existing behavior preserved) but place the rotation in a CSS custom prop so it's trivially droppable: `--book-hover-transform: translateY(-4px) rotate(-1deg)`.** Then a one-line change later drops the rotation if the author wants.

---

## 6. Image treatment

### Source

- All topic imagery continues to flow through `src/components/TopicPhoto.astro`, which already imports `src/assets/photos/{topic}.jpg` and uses `astro:assets` `<Image>` with WebP output, responsive `widths={[400, 800, 1200]}`, and the existing `tp-credit` hover-revealed chip.
- **Do not** add photo overlays, parallax, or filters.

### Aspect ratios (per proposal §6)

| Surface | Aspect | Scale prop on `TopicPhoto` |
|---|---|---|
| Home hero | **16:9** | `scale="lg"` — verify `tp-lg` is 16:9 (it is: 16:9 in `TopicPhoto.astro`). |
| Essay detail hero | 16:9 | `scale="lg"`, drop the `max-width` clamp on `.essay-art` (let it fill 65ch column). |
| Notes detail hero | 4:3 | `scale="md"`, optional — only when `growthStage === 'evergreen'`. |
| Patterns detail hero | 4:3 | `scale="md"`, `max-width: 32rem` (existing). |
| Card art | 16:9 | `scale="sm"` inside `GardenCard`. (Currently 16:9 via the `.garden-card-art { aspect-ratio: 16/9 }` wrapper — keep.) |
| About portrait | 4:5 (or 3:4) | **NEW**: a standalone `<figure>` wrapper around `<TopicPhoto>` — `TopicPhoto` only ships `4/3`, `4/3`, `16/9` aspect ratios via `scale`. **Implementer note: add a `scale="portrait"` variant (3/4) to `TopicPhoto` OR wrap `TopicPhoto` in an external aspect-ratio div.** Preferred: add a fourth `scale="portrait"` enum value to `TopicPhoto` (3:4) and route the about-page portrait through it. |

### Treatment rules

- `border-radius: var(--radius-card)` (12px) on the photo container.
- `box-shadow: var(--shadow-card)` for hero photos and the about portrait.
- **No** photo credit chip on `GardenCard` thumbs (per proposal §9 #10 — too noisy at thumb scale). The hover-revealed `tp-credit` already only appears on `TopicPhoto` instances larger than the thumb; verify by inspecting `.tp-credit { opacity: 0 }` + `.topic-photo:hover .tp-credit { opacity: 1 }`. **Card-thumb instances are scale="sm" (4:3) — to drop the credit chip entirely on thumbs, the implementer should add a `showCredit?: boolean` prop to `TopicPhoto` defaulting to `true`, and `GardenCard` passes `showCredit={false}`.**
- No filters, no overlays.

### Alt-text rule

- `TopicPhoto` already supplies per-topic `alt` (e.g. "Vintage letterpress type case filled with metal letterforms"). Keep this. Do not add `alt=""` to override.
- Generic `<img>` tags elsewhere: alt = descriptive sentence, never empty unless the image is purely decorative (none in this site).

---

## 7. The single accent glyph (curated mark)

**Decision: ✦ (BLACK FOUR POINTED STAR, U+2726).** Per proposal §7, with the reasoning that the Sloan ★ is the most common choice and would feel derivative.

- **Where it appears (per proposal):**
  1. In the title row of every "if you only read three" item on `/` and `/essays`.
  2. At the start of any one entry marked "newly added" in the past 30 days on `/garden`.
- **Where it does NOT appear:** not on cards, not as decoration in headers, not in prose.

### Implementation

**NEW component** — `src/components/CuratedMark.astro`:

```astro
---
/**
 * CuratedMark — single accent glyph for curated picks.
 * One glyph, one job: mark "currently featured" or "newly added."
 * Cite as: DESIGN.md §7 (interaction — accent glyph).
 */
interface Props {
  /** Visual size. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}
const { size = 'md', class: className = '' } = Astro.props;
const sizeMap = { sm: '0.9em', md: '1.1em', lg: '1.4em' };
---
<span
  class:list={['curated-mark', `curated-mark-${size}`, className]}
  aria-hidden="true"
  style={`font-size: ${sizeMap[size]}`}
>✦</span>

<style>
.curated-mark {
  display: inline-block;
  color: var(--color-starbucks-green);
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 0;
  vertical-align: 0.05em;
  margin-inline-end: 0.4em;
}
.curated-mark-sm { font-size: 0.9em; }
.curated-mark-md { font-size: 1.1em; }
.curated-mark-lg { font-size: 1.4em; }
</style>
```

The component does NOT take a label prop; it is purely decorative (aria-hidden). Place it inline in front of titles or list items as JSX.

---

## 8. Microcomponents (shared across pages)

### `GrowthBadge` (existing — `src/components/GrowthBadge.astro`)

- Already supports `stage: 'seedling' | 'budding' | 'evergreen'`. No change.
- Used on `GardenCard` (when `growthStage` is set) and on `/notes/[slug]` meta row.
- Keep 🌱/🌿/🌳 emoji (per proposal — emoji-as-label, not decoration).

### `TopicChip` (existing — `src/components/TopicChip.astro`)

- Used on `GardenCard` (topic chips at card bottom), `/essays/[slug]` meta row, `/notes/[slug]` meta row.
- The `/patterns/[slug]` page currently uses inline `<li>` topic chips (not `TopicChip`) — proposal implies this is fine; keep as is.

### Time / date displays

Standardize on `Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })` for full dates and `Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })` for compact dates on cards.

- **`GardenCard`** uses `'en-US' / month: 'short' / day: 'numeric'` — already implemented.
- **`/essays/[slug]`, `/notes/[slug]`, `/patterns/[slug]`** use `'en-US' / month: 'long' / day: 'numeric'` — already implemented.
- **NEW: `/now` "Last updated [date]"** — use `'en-US' / month: 'long' / day: 'numeric'`, color `--color-text-black-soft`, size `--text-micro`. Format: "Last updated October 14, 2025."

### "Reading time" (essay detail)

Already implemented in `/essays/[slug]`: `Math.max(1, Math.round(words / 220))` minutes. Add the same to `/notes/[slug]` and `/patterns/[slug]` detail pages. (Decision: keep the formula identical, since the only thing that varies is word count.)

### Curated picks block (NEW component)

**NEW component** — `src/components/CuratedPicks.astro`:

```ts
interface Props {
  /** Each entry: a title (string) + href (string). The mark is added automatically. */
  items: Array<{ title: string; href: string }>;
  /** Optional heading shown above the block. Default: no heading. */
  heading?: string;
  class?: string;
}
```

Renders an ordered `<ol>` (or `<ul>`) where each item is `✦ <a href=...>{title}</a>` separated by hairline `<hr>`s. Each item's text style is Lora italic. Used on `/` and `/essays`.

Visual contract:

```
✦ <a class="italic serif">Title of the pick</a>
─────────────────────────────────────────────
✦ <a class="italic serif">Second pick</a>
─────────────────────────────────────────────
✦ <a class="italic serif">Third pick</a>
```

Cite as: `DESIGN.md §7` (interaction — curated picks) — extend the existing interactions doc.

---

## 9. Subscribe surface (exact wording, placement)

**One subscribe cluster per page. Wording (verbatim, per proposal §7):**

- **Headline (always):** `Letters from a working library.`
- **Subhead (always):** `Occasional notes from the studio — essays, experiments, things I'm thinking about. No spam, no marketing. Just a short dispatch when there's something worth sharing.`
- **Form:** single email input + one CTA. Submit target placeholder: `action="/api/subscribe"` (currently `action="#"` on `/about`; the new `api/subscribe` endpoint is out of scope for this brief — leave `action="#"` with a TODO comment for the backend agent).
- **CTA label:** `Subscribe`.

**Placement rules:**

- `/` — closing band, AFTER the Library strip. **One band, single instance.**
- `/about` — between Identity section and Work History section. **One band, single instance.**
- `/colophon` — single line, NOT a band: "RSS / Email / GitHub" with three inline links.
- **No** other subscribe CTAs anywhere. The Frap is NOT a subscribe surface (it's a contact surface — see §11).

### Implementation: reuse existing dark-on-green Card

The existing inline dark newsletter card in `src/pages/about.astro` (`Card tone="dark"` with a `.newsletter-card` wrapper) is the correct visual. **Promote it to a reusable component** — see §12 ("new components") for `NewsletterBand.astro`.

---

## 10. Footer (exact items, exact order)

**Three clusters, single dark-green band** (`background: var(--color-house-green)`).

### Cluster 1 — Subscribe (left)

- Eyebrow (Inter 600, uppercase, `--tracking-loose`, `--text-micro`, color `--color-text-white-soft`): `Letters from a working library.`
- One-line form: `<input type="email" />` + `→` submit button.
- Submit target placeholder: `action="/api/subscribe"`.

### Cluster 2 — Find more (center)

Inline text links, separated by a thin hairline (1px, `--color-text-white-soft` at 30% opacity, OR just whitespace — proposal does not specify; use **whitespace + `gap: var(--spacing-3)`**, no dividers). Color `--color-text-white-soft`; hover → `--color-text-white`.

**Exact links in exact order:**

1. `Garden` → `/garden`
2. `Essays` → `/essays`
3. `Notes` → `/notes`
4. `Patterns` → `/patterns`
5. `Now` → `/now`
6. `Projects` → `/projects`
7. `Library` → `/library`
8. `Talks` → `/talks`
9. `Contact` → `/contact`
10. `Colophon` → `/colophon` (NEW)
11. `Concepts` → `/concepts` (NEW)
12. `Blogroll` → `#blogroll` (anchor inside the page; the details/summary lives in this same cluster — see Cluster 2b below)
13. `RSS` → `/rss.xml`

### Cluster 2b — Blogroll (inside Cluster 2, collapsible)

The blogroll itself is a `<details>` block placed inside Cluster 2 (between `Concepts` and `RSS`), with summary text `Blogroll` (the same word as the inline link, OR the inline link is replaced by the `<details><summary>Blogroll</summary>...</details>` — proposal §8 says "collapsible details so it doesn't overwhelm the page").

**Decision (implementer):** Render the inline `Blogroll` link as a `<details>` so the link IS the summary. Inside the `<details>`, render 20-30 hand-picked site links as a single `<ul>` of `{ site name → url }`. Color and type match Cluster 2 inline links.

### Cluster 3 — Social + brand (right)

Same five social icons in same order as today: **GitHub, Bluesky, LinkedIn, Mastodon, RSS** (the existing `socialLinks` array in `Footer.astro`). Below: `© 2026 Phuriwaj Ruengnaowaroj · Built with care · Colophon`. (The "Colophon" inline link here is in addition to the one in Cluster 2 — keeps it doubly findable.)

### Behavior

- Three clusters laid out as a single row on desktop (Cluster 1 / 2 / 3 in three columns), stacked on mobile.
- Padding-block: `var(--spacing-5)` (currently `var(--spacing-5)` — keep).
- Background: `var(--color-house-green)`.
- Social icons inherit Cluster 3 hover treatment (white → soft).

---

## 11. Nav (exact items, exact order)

**Replaces the current 6-item nav.** Per proposal §8.

| # | Label | href | Active-when |
|---|---|---|---|
| 1 | Home | `/` | `pathname === '/'` |
| 2 | Garden | `/garden` | `pathname === '/garden' \|\| pathname.startsWith('/garden/')` |
| 3 | Essays | `/essays` | `pathname.startsWith('/essays')` |
| 4 | Notes | `/notes` | `pathname.startsWith('/notes')` |
| 5 | Patterns | `/patterns` | `pathname.startsWith('/patterns')` |
| 6 | Now | `/now` | `pathname === '/now'` |
| 7 | Random | `/random` | never active (it's a redirect endpoint) |

**Removed from top nav:** `About` (still exists at `/about`, surfaces from home closing band and footer). `Projects` (still exists at `/projects`, surfaces from `/about` and footer).

**Active state:** existing `nav-link-active` + 2px green underline treatment — keep. The existing logic in `Nav.astro` is correct.

**The `Random` link is rendered as a normal nav link**, but its href points to `/random` which is a redirect endpoint (see §12 and the `/random` per-page brief).

### Behavior changes from existing `Nav.astro`

- Existing `navLinks` array has 6 items; replace with the 7-item array above.
- Existing wordmark left, links right layout — keep.
- Existing progressive nav height (`var(--nav-h-xs)` → `nav-h-lg`) — keep.
- Existing shadow stack (`var(--shadow-nav)`) — keep.
- Hamburger menu on mobile — keep (current behavior shows nav links at ≥768px; on smaller screens they collapse. **Verify behavior at <768px and at ≥768px** — the current rule hides links below 768px entirely, so on mobile the user has no nav at all. **Implementer should add a simple disclosure button that toggles a vertical list of nav links below the nav bar on mobile**, per proposal's "Maggie-style: wordmark left, simple text-link nav right, hamburger mobile" — see `Nav.astro` line 8 comment. This is a small but mandatory change. If too large for the page brief, raise it as an open question — but the proposal explicitly demands it.)

---

## 12. New components and tokens to add

Summary of every new artifact that must exist before any page brief can be implemented. **Each per-page brief that uses one of these will say so by name.**

### New tokens (in `src/styles/theme.css`)

1. `--text-prose: 1.8rem` — long-form prose body.

### New utility (in `src/styles/global.css`)

1. `.prose` — the shared long-form prose style block (see §1).

### New components (in `src/components/`)

1. **`CuratedMark.astro`** — the ✦ glyph, see §7.
2. **`CuratedPicks.astro`** — the three-line Lora-italic curated picks block, see §8.
3. **`NewsletterBand.astro`** — the dark-green subscribe band, see §9.
4. **`FooterCol.astro`** — a thin wrapper for one of the three footer columns (optional — see implementation note below).

### Modified components (no rename)

1. **`src/components/TopicPhoto.astro`** — add `scale="portrait"` (3:4) variant; add `showCredit?: boolean` prop defaulting to `true` so `GardenCard` can pass `false`.
2. **`src/components/Nav.astro`** — replace 6-item navLinks with 7-item list (Home / Garden / Essays / Notes / Patterns / Now / Random); add mobile hamburger disclosure.
3. **`src/components/Footer.astro`** — restructure into three clusters (Subscribe / Find more / Social+brand); preserve social icons array verbatim; add Cluster 2 link list; embed blogroll `<details>`.
4. **`src/components/Frap.astro`** — relabel default `label` from "Quick order" to "Email me" (or "Say hi" — author pending; proposal §10 Q6); consider swapping the shopping-bag icon to a `@` glyph (SVG change). **Pending author decision per Open Question #6.**
5. **`src/components/Timeline.astro`** — the proposal says "tighten the dot/line treatment (currently the dot has a green outline that reads as a checkbox)." **Implementer should reduce the green outline ring from 2px to 1px and reduce the dot inner fill from `var(--color-green-accent)` to a softer treatment — try `border: 1px solid var(--color-green-accent); background: var(--color-neutral-warm); box-shadow: 0 0 0 2px var(--color-green-accent);`** (the proposal's diagnosis: "reads as a checkbox"). Verify visually.

### New content collection

1. **`src/content/projects/`** — schema `{ title, desc, tags[], year?, url? }`. Migrate the four existing hardcoded items in `src/pages/projects.astro` to MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`). The MDX body is the project description (one paragraph); the frontmatter carries metadata. **Add to `src/content.config.ts` and export in the `collections` map.**

### New pages

1. **`src/pages/colophon.astro`** — single MDX-flavored page. ~10 paragraphs: stack (Astro 7, Tailwind 4, MDX), fonts (Lora + Inter + Kalam), host (`phurix.dev`), RSS (`/rss.xml`), privacy ("no tracking, no analytics, no cookies"), how to cite (CC BY-NC 4.0). Rendered as a single long-form prose surface (`.prose`).
2. **`src/pages/concepts.astro`** — hand-curated markdown glossary. ~6-8 entries seeded by the implementer: *affordance, design token, vibe shift, interface grammar, second-order effect, digital garden, type system, calm defaults*. Each entry: heading + 2-3 sentence body. Schema-free markdown — implementer writes `.mdx` directly into the page's content via an inline `<Content />`. **Or** as a regular `.astro` page with inline string content. (The proposal says "lives in markdown, not a collection — keep it cheap" — interpret as a single `.mdx` page that the `.astro` route renders.)
3. **`src/pages/random.ts`** — server endpoint that picks a random entry from the union of `essays + notes + patterns` (talks and books excluded — they don't fit a "random post" surface) and returns `Response.redirect(/<type>/<slug>, 302)`. Since `output: 'static'` is set in `astro.config.mjs`, **this endpoint cannot be statically generated** — it must be generated as a static HTML file with a tiny inline `<script>` that does `window.location.replace(...)` on page load, picking randomly from a JSON manifest baked at build time. **Implementation: write `src/pages/random.astro` (NOT `.ts`) that exports a `getStaticPaths` returning `[{ params: {} }]` with props = a `randomEntries` array of `{ type, slug }` for ALL essays/notes/patterns. The page itself renders a tiny "Picking…" interstitial and the inline script does the random pick.** Cite as: `DESIGN.md §7` (interaction — random reader affordance).
4. **`src/pages/blogroll.mdx`** — single MDX page, but the proposal says "in the footer" not its own route. **Re-read proposal §8 carefully: blogroll lives in the footer cluster, not at a standalone URL.** Implementation: write the blogroll content as a JSON or TS module under `src/data/blogroll.ts` exporting `{ name, url }[]`. Import in `Footer.astro`. **Do NOT create a separate `/blogroll` page** — the footer `<details>` IS the blogroll surface.
5. **`src/pages/projects.astro`** — REWRITE to read from the new `projects` collection. Preserve the same visual (Card grid + tag row + outline CTA) but source data from `getCollection('projects')`.

### Implementation note for `NewsletterBand.astro`

The existing dark-newsletter card lives inline in `src/pages/about.astro` lines 63-86. **Extract it to `src/components/NewsletterBand.astro`** with prop signature:

```ts
interface Props {
  /** Override the default headline. */
  headline?: string;
  /** Override the default subhead. */
  subhead?: string;
  /** Form submit target. */
  action?: string;
  /** CTA label. */
  ctaLabel?: string;
  class?: string;
}
```

Defaults: `headline = 'Letters from a working library.'`, `subhead = 'Occasional notes from the studio — essays, experiments, things I'm thinking about. No spam, no marketing. Just a short dispatch when there's something worth sharing.'`, `ctaLabel = 'Subscribe'`, `action = '/api/subscribe'`.

---

## 13. End-to-end verification checklist (apply to every page brief)

Every per-page brief's "Acceptance checks" section ends with this baseline:

- `npm run check` exits 0 (Astro check + tsc).
- `npm run build` succeeds and produces the expected route in `dist/`.
- No new console warnings or hydration errors in dev.
- `:focus-visible` outline visible on every interactive element.
- All text passes a contrast spot-check (body text on `--color-neutral-warm` and `--color-white`).
- Lora is loaded (dev tools network tab shows Lora woff2 from Astro Fonts).
- All anchor links on the page resolve to existing routes (no 404s).