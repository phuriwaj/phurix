# Implementation Brief — Cohere-Inspired Design System Migration

Source of truth: `/home/phurix/projects/phurix/DESIGN.md` (Cohere-inspired, ~255 lines)
Target codebase: `/home/phurix/projects/phurix/` (currently Starbucks-inspired)
Goal: Replace every Starbucks green token with the Cohere palette, retire `Frap.astro`, drop `Kalam`, realign typography, radius, spacing, and elevation, and rewrite the per-page chrome to match the new system.

---

## 1. Token Mapping (`src/styles/theme.css`)

### 1a. Tokens to REMOVE (delete these declarations entirely)

- `--color-starbucks-green`
- `--color-green-accent`
- `--color-house-green`
- `--color-green-uplift`
- `--color-green-light`
- `--color-gold`, `--color-gold-light`, `--color-gold-lightest`
- `--color-neutral-cool`, `--color-neutral-warm`
- `--color-ceramic`
- `--color-text-black`, `--color-text-black-soft`, `--color-text-white`, `--color-text-white-soft`
- `--color-rewards-green`
- `--color-red`, `--color-red-tint`, `--color-yellow`, `--color-valid-tint`
- `--color-input-border` (`--color-hairline` re-added below as `#d9d9dd`)
- `--font-script: "Kalam", …`
- `--shadow-frap-base`, `--shadow-frap-ambient`, `--shadow-frap-ambient-pressed`, `--shadow-gift-card`, `--shadow-svc`
- `--button-active-scale`
- `--ease-spring`
- Old radius names: `--radius-card`, `--radius-button`, `--radius-input`, `--radius-circle`

### 1b. New token block to ADD in `@theme` (replace old tokens wholesale)

```css
@theme {
  /* --- Font families ----------------------------------------------- */
  --font-sans: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Lora", "Iowan Old Style", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", "Menlo",
               "Consolas", monospace;

  /* --- Brand & accent colors --------------------------------------- */
  --color-cohere-black:    #000000;
  --color-near-black:      #17171c;
  --color-deep-green:      #003c33;
  --color-dark-navy:       #071829;
  --color-action-blue:     #1863dc;
  --color-coral:           #ff7759;
  --color-soft-coral:      #ffad9b;

  /* --- Surface & background ---------------------------------------- */
  --color-canvas:          #ffffff;
  --color-soft-stone:      #eeece7;
  --color-pale-green-wash: #edfce9;
  --color-pale-blue-wash:  #f1f5ff;
  --color-card-border:     #f2f2f2;

  /* --- Text & rules ------------------------------------------------ */
  --color-ink:             #212121;
  --color-muted-slate:     #93939f;
  --color-slate:           #75758a;
  --color-hairline:        #d9d9dd;
  --color-border-light:    #e5e7eb;

  /* --- Semantic ---------------------------------------------------- */
  --color-focus-blue:      #4c6ee6;
  --color-form-violet:     #9b60aa;
  --color-error-red:       #b30000;

  /* --- On-dark surface text overrides ------------------------------ */
  --color-on-dark:         #ffffff;
  --color-on-dark-muted:   rgba(255,255,255,0.72);

  /* --- Spacing (8px base) ----------------------------------------- */
  --spacing-0:  0;
  --spacing-1:  0.2rem;
  --spacing-2:  0.4rem;
  --spacing-3:  0.6rem;
  --spacing-4:  0.8rem;
  --spacing-5:  1rem;
  --spacing-6:  1.2rem;
  --spacing-7:  1.6rem;
  --spacing-8:  2rem;
  --spacing-9:  2.2rem;
  --spacing-10: 2.4rem;
  --spacing-11: 2.8rem;
  --spacing-12: 3.2rem;
  --spacing-13: 3.6rem;
  --spacing-14: 4rem;
  --spacing-15: 5.6rem;
  --spacing-16: 6rem;
  --spacing-17: 6.4rem;
  --spacing-18: 8rem;

  --spacing-gutter:     1.6rem;
  --spacing-gutter-md:  2.4rem;
  --spacing-gutter-lg:  4rem;

  /* --- Border radius scale ---------------------------------------- */
  --radius-xs:    0.4rem;
  --radius-sm:    0.8rem;
  --radius-md:    1.6rem;
  --radius-lg:    2.2rem;
  --radius-xl:    3rem;
  --radius-pill:  3.2rem;
  --radius-full:  9999px;

  /* --- Letter spacing ---------------------------------------------- */
  --tracking-display-tight: -0.02em;
  --tracking-tight:         -0.01em;
  --tracking-mono:           0.02em;

  /* --- Line height ------------------------------------------------- */
  --leading-body:    1.5;
  --leading-display: 1.2;
  --leading-feature: 1.3;

  /* --- Type scale (rem, 1rem = 10px) ------------------------------ */
  --text-hero-display:    9.6rem;
  --text-product-display: 7.2rem;
  --text-section-display: 6rem;
  --text-section-heading: 4.8rem;
  --text-card-heading:    3.2rem;
  --text-feature-heading: 2.4rem;
  --text-body-lg:         1.8rem;
  --text-body:            1.6rem;
  --text-button:          1.4rem;
  --text-caption:         1.4rem;
  --text-mono-label:      1.4rem;
  --text-micro:           1.2rem;

  /* --- Elevation --------------------------------------------------- */
  --shadow-card:        0 0 0.5px rgba(17,17,28,0.08), 0 1px 1px rgba(17,17,28,0.06);
  --shadow-nav:         0 1px 0 var(--color-hairline);
  --shadow-focus-ring:  0 0 0 2px var(--color-focus-blue);
  --shadow-form-focus:  0 0 0 1px var(--color-form-violet);

  /* --- Motion ------------------------------------------------------ */
  --ease-out-soft:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-button:    0.2s;
  --duration-image:     0.3s;
  --duration-expander:  300ms;

  /* --- Container widths ------------------------------------------- */
  --container-sm: 343px;
  --container-md: 500px;
  --container-lg: 720px;
  --container-xl: 1440px;

  /* --- Nav heights ------------------------------------------------ */
  --nav-h:        7.2rem;
  --nav-h-mobile: 5.6rem;
}
```

---

## 2. Typography — Font Fallbacks (`astro.config.mjs`)

- Drop the `Kalam` block entirely.
- Add `Space Grotesk` → cssVariable `--font-display`, weights `[300, 400, 500]`.
- Add `JetBrains Mono` → cssVariable `--font-mono`, weights `[400, 500]`.
- Keep `Lora` (serif).
- Keep `Inter` (sans, via `@fontsource-variable/inter`).

### Component-level font usage rules

- `var(--font-display)` for h1/h2 hero and product display sizes (≥ 48px) and CuratedPicks links.
- `var(--font-sans)` for UI chrome, card titles ≤ 32px, list rows, body copy.
- `var(--font-mono)` for uppercase mono labels.
- `var(--font-serif)` for long-form prose ledes (about, colophon).
- Display headlines stay `weight: 400`, NOT 700.

---

## 3. Type Scale → rem + clamp mapping

| Page | h1 target | Suggested clamp |
|------|-----------|-----------------|
| Home hero | up to 96px | `clamp(4rem, 8vw, 9.6rem)` |
| `/about`, `/colophon`, `/concepts`, `/contact`, `/now`, `/garden`, `/library`, `/projects`, `/talks` | 48px | `clamp(3.2rem, 6vw, 4.8rem)` |
| Section h2 | 32–48px | `clamp(2.4rem, 4vw, 3.2rem)` |
| `/404` | up to 96px | `clamp(4.8rem, 12vw, 9.6rem)` |

`--text-jumbo` is gone — every reference must go. Replace `var(--text-hero-large)` with `clamp(...)` driving off `--text-section-heading`.

---

## 4. Spacing & Radius

### Spacing mapping

| Old `--spacing-N` | New `--spacing-N` |
|---|---|
| `--spacing-1` (0.4) | `--spacing-4` (0.8) |
| `--spacing-2` (0.8) | `--spacing-4` (0.8) |
| `--spacing-3` (1.6) | `--spacing-7` (1.6) |
| `--spacing-4` (2.4) | `--spacing-10` (2.4) |
| `--spacing-5` (3.2) | `--spacing-12` (3.2) |
| `--spacing-6` (4) | `--spacing-14` (4) |
| `--spacing-7` (4.8) | `clamp(--spacing-12, 6vw, 4.8rem)` |
| `--spacing-8` (5.6) | `--spacing-15` (5.6) |
| `--spacing-9` (6.4) | `--spacing-17` (6.4) |

### Radius mapping

`--radius-card` → `var(--radius-md)` (16) for general cards or `var(--radius-lg)` (22) for hero media.
`--radius-button` → `var(--radius-pill)` (32) for buttons, `var(--radius-full)` for round icons.
`--radius-input` → `var(--radius-xs)` (4) for form inputs.
`--radius-circle` → `var(--radius-full)`.

---

## 5. Components — Per-Component Decisions

Rewrite each component's `<style>` block wholesale.

### `Button.astro`

| Old variant | New variant | Treatment |
|-------------|-------------|-----------|
| `primary` (green filled) | `primary` | `--color-near-black` fill, white text, 14px Inter, 32px pill radius. Hover `--color-cohere-black` fill. |
| `outline` (green outline) | `outline` | `--color-near-black` border, near-black text. Transparent fill. |
| `black` | `announcement` | Near-black filled, white text, small uppercase. |
| `outline-dark` | DELETE | (subsumed by new `outline`) |
| `on-green` | DELETE | |
| (NEW from on-green semantically) | `on-dark` | White fill, near-black text — for primary CTAs on dark feature bands. |
| `on-dark` | `on-dark-outline` | Transparent fill, white border, white text. |
| `consent` | DELETE | |

Sizes: keep `sm`, `md`, `lg`. `sm` 12px×16px/14px label · `md` 12px×24px/14px · `lg` 14px×32px/16px.
Active state: NO `transform: scale(0.95)`. Color/background only.

### `Card.astro`

Two emphasis: `flat` (no border, white) and `bordered` (1px `var(--color-hairline)`). Dark variant (`tone='dark'`): `--color-near-black` background, `--color-on-dark` text. Drop `translateY(-2px)` hover. Image-wrap radius 22px hero media, 8px smaller.

### `Footer.astro`

- Background `--color-near-black`.
- Newsletter cluster: coral uppercase mono eyebrow "AI MOVES FAST" (`--color-coral`, `--font-mono`, `--tracking-mono`). Subhead `--color-on-dark-muted`.
- Pill form, white input on near-black, white submit glyph.
- "Find more" links `--color-on-dark-muted`, hover `--color-on-dark`. `--font-sans` 14px.
- Social/brand right on desktop. Copyright `--text-micro` `--color-on-dark-muted`.
- Flat dark sections — NO hard borders between clusters.

### `Nav.astro`

- Background `--color-canvas`, no soft shadow. Bottom hairline 1px `var(--color-hairline)`.
- Height single `--nav-h: 7.2rem` desktop, `--nav-h-mobile: 5.6rem` mobile. Drop four-tier.
- Wordmark: `--font-display` weight 500, `--color-cohere-black`, 18px.
- Links: `--font-sans` 14px medium, `--color-ink`. Hover `--color-action-blue`. Active underline 2px tall.
- Mobile hamburger recolored to `--color-cohere-black`.

### `FeatureBand.astro` (`dark-feature-band`)

- Outer `var(--color-deep-green)`. Add `tone` prop: `'deep-green'` (default) and `'dark-navy'`.
- Headline `--font-display` weight 400, `--text-section-display` 60px on desktop via clamp.
- Body subhead `--color-on-dark-muted`, `--font-sans` 16px, 1.5.
- Primary CTA uses `variant="on-dark"` (white fill, near-black text).
- Drop `serif` boolean prop.
- Media `--radius-lg` (22px).

### `NewsletterBand.astro`

Same as footer's newsletter cluster — near-black surface, coral mono eyebrow, white display headline (32px), white input, white submit pill.

### `Frap.astro` — REMOVE entirely

Remove from `Layout.astro`: the import line and the `{!hideFrap && <Frap />}` render. `hideFrap` prop becomes no-op (may stay or be removed).

### `GardenCard.astro`

- `Card emphasis="bordered"` (1px hairline), not `lifted`.
- Art `--radius-md` (16) at top corners only.
- Type label: `--color-coral`, uppercase mono (`--font-mono`, `--tracking-mono`).
- Title: `--font-display` 24px (`--text-feature-heading`), weight 400, `--color-ink`.
- Excerpt: `--font-sans` 14px, `--color-muted-slate`.

### `BookTile.astro`

- Remove gold "currently reading" border. Replace with small coral pill (`--color-coral` outline, `--color-ink` text) "Reading" in mono uppercase. NO gold anywhere.
- Cover radius 8px (`--radius-sm`).
- Drop `linear-gradient` overlay — flat `--book-color` surface.
- Hover: no `translateY(-4px) rotate(-1deg)`. Use border-color shift.

### `GrowthBadge.astro`

- seedling: text `--color-action-blue`, background `--color-pale-blue-wash`.
- growing: text `--color-coral`, background `color-mix(in srgb, var(--color-coral) 14%, var(--color-canvas))`.
- evergreen: text `--color-deep-green`, background `--color-pale-green-wash`.
- Replace emoji with thin-line geometric SVG glyphs.
- `font-family: var(--font-mono)` 12px uppercase, `--tracking-mono`.

### `Timeline.astro`

- Vertical line `--color-hairline` (was `--color-green-light`).
- Dot: white interior, `--color-ink` 1px border.
- Role title: `--font-display` 16px weight 500, `--color-ink`.
- Org name: `--color-ink`, em-dash separator.
- Dates: `--font-mono` 12px, `--color-muted-slate`.

### `TopicChip.astro`

Three sizes: `sm` (12px×8px / 12px label), `md` (default, 14px×8px / 14px label), `lg` (22px×14px / 18px label).

Outline pill, transparent fill, 1px border `--color-coral`, text `--color-coral`. Radius `--radius-pill` or `--radius-xl` (30) for `lg`. Active inverts to `--color-coral` fill, `--color-cohere-black` text.

`font-family: var(--font-mono)`, weight 400, `--tracking-mono`, uppercase.

### `TopicPhoto.astro`

- Background `--color-soft-stone`.
- Credit chip: `--color-on-dark` text on `rgba(0,0,0,0.45)`.

### `CuratedPicks.astro`

- Eyebrow: mono uppercase coral, "FEATURED" or "PICKS" label, `--font-mono` 12px, `--color-coral`.
- Link style: `--font-display` italic 18px weight 400, `--color-action-blue`. Hover underline 2px text-underline-offset.
- Item dividers: 1px `--color-hairline`.

### `CuratedMark.astro`

Color `--color-coral`. Keep ✦ glyph or swap to small SVG star.

### `Accordion.astro`

- Summary: `--font-display` 18px weight 400, `--color-ink`.
- Chevron rotates 45deg on open, color `--color-action-blue`.
- Borders `--color-hairline`. Padding `var(--spacing-5) 0`.
- Answer: `--font-sans` 16px, `--color-ink`, line-height 1.5.

### `CollectionGrid.astro`

Gap tokens: `--spacing-3` → `var(--spacing-7)`, `--spacing-4` → `var(--spacing-10)`, `--spacing-5` → `var(--spacing-12)`. Add `tone` prop so gallery items can sit on `--color-pale-green-wash` or `--color-pale-blue-wash`.

---

## 6. Pages — Per-Page Concerns

Every page's `.page-title`, `.section-eyebrow`, `.page-lede`, `.page-header-section` block must be rewritten. Each header uses the same eyebrow + h1 + lede shape but a tone background.

| Route | Header tone | h1 size | Special concerns |
|-------|-------------|---------|------------------|
| `/` | white canvas + `TopicPhoto` art card right on desktop | `clamp(4rem, 7vw, 6rem)` `--text-section-display`, weight 400, `--color-cohere-black`, `--font-display`. Lede 18px `--font-sans` max 60ch `--color-ink`. | Trust strip below hero: single `--font-mono` 12px line "built with — Astro, Tailwind, MDX, Space Grotesk, Inter, JetBrains Mono". Curated picks hairline top divider. Library 6-col desktop. Hero background `--color-canvas` or `--color-pale-blue-wash`. |
| `/about` | `--color-soft-stone` | `--text-section-heading` 48px, `--font-display`, weight 400, `--color-cohere-black`. | Identity grid photo 18rem portrait right, prose left. Skills row → TopicChip small mono outline. Project CTA `variant="outline"`. |
| `/colophon` | `--color-canvas` flat | h1 48px display. | Update prose: "Space Grotesk for display, Inter for UI, JetBrains Mono for technical labels". Replace "Starbucks green" with "near-black primary CTA, deep green for product bands, coral for editorial taxonomy". |
| `/concepts` | `--color-canvas` | h1 48px display. | `concept-term` `--font-display` 24px weight 400, `--color-ink`. Definitions switch from Lora italic to `--font-sans` 16px. |
| `/contact` | `--color-canvas` | h1 48px display. | Channel cards `Card emphasis="bordered"`. Channel value links `button-secondary` text-only underlined. |
| `/library` | `--color-soft-stone` | h1 48px display. | Library-updated label `--font-mono` 12px, `--color-muted-slate`. |
| `/garden` | `--color-canvas` | `clamp(3.2rem, 6vw, 4.8rem)` | Sticky filter bar `--color-canvas` with hairline bottom. TopicChip `md` filter bars use mono-coral outline. |
| `/notes` `/essays` `/patterns` `/talks` | per-collection | h1 48px display. | `/talks` adopts research-table: title left + topic pill center (`justify-content: center`) + date right. Title color `--color-ink`. Date column `--color-muted-slate`. |
| `/projects` | `--color-canvas` | h1 48px display. | Project tiles `Card emphasis="bordered"`. Project title `--font-display` 24px weight 400. Tag row small mono-corner chips. Project URL link `button-secondary` text-only. |
| `/now` | `--color-canvas`, no nested header strip | h1 48px display. | Now items become research-row-like: one row each, hairline above and below, label left mono uppercase, value right `--font-sans` 16px. Drop "Last updated" italic line — replace with `--text-micro` `--color-muted-slate` under h1. |
| `/random` | n/a | n/a | Inline style `--color-canvas` background, `--font-display` for loading text. |
| `/404` | `--color-canvas`, centered display headline | h1 `clamp(4.8rem, 12vw, 9.6rem)`, `--font-display`, weight 400, `--color-cohere-black`. | One of the few pages earning 96px headline. |

---

## 7. Anti-patterns (from DESIGN.md §10 Don'ts)

Remove everywhere:

1. Coral or action-blue as broad decorative surface color.
2. Heavy drop shadows on cards (blur > 4px).
3. Every-section-card-based — `/now`, `/talks`, `/concepts`, `/projects` should use hairline-separated rows.
4. Rounded cards below 8px for major media.
5. Single generic sans-serif for display + body.
6. Undocumented interaction variants.
7. Saturated gradients as UI backgrounds.
8. The floating `Frap` button.
9. The `scale(0.95)` press gesture.
10. Emoji as primary iconography in `GrowthBadge.astro`.

---

## 8. New Components

### `AnnouncementBar.astro` (CREATE)

- Full-width `--color-cohere-black` strip, 36px tall (`--spacing-13`).
- Centered `--text-micro` white copy with underlined "Learn more" link and close control at far right.
- Sits above `<Nav>` in `Layout.astro`.
- Props: `message`, `linkHref`, `linkLabel`.
- Always renders a real `<button>` close control.

### `AgentConsoleCard.astro` (CREATE — optional)

Skip unless a page explicitly consumes it. The migrator can introduce a single placeholder usage to validate the visual language without inventing dashboard data.

---

## 9. Migration Procedure (ordered)

1. `astro.config.mjs` — drop Kalam, add Space Grotesk + JetBrains Mono.
2. `src/styles/theme.css` — full token rewrite per §1.
3. `src/styles/global.css` — body, h1/h2 baseline, focus ring, drop `--color-neutral-warm`, drop `.serif-headline`/`.script-mark`.
4. `src/layouts/Layout.astro` — preload `--font-display` instead of `--font-script`. Remove Frap import + render. Add `<AnnouncementBar />` above `<Nav>`. Update `body { padding-top }` per new nav heights.
5. Components per §5 — each `<style>` rewritten wholesale. Update both imports and usages when variants rename.
6. Pages per §6 — per-page `<style>` rewritten wholesale.
7. `Frap.astro` — delete.
8. Create `AnnouncementBar.astro`.
9. `DESIGN_GUIDE.md` — regenerate developer-facing token table.
10. `npm run check` + `npm run build` — verify clean.

---

## 11. Files this brief touches

**Source of truth:** `/home/phurix/projects/phurix/DESIGN.md`

**Files to modify:**
- `/home/phurix/projects/phurix/astro.config.mjs`
- `/home/phurix/projects/phurix/src/styles/theme.css`
- `/home/phurix/projects/phurix/src/styles/global.css`
- `/home/phurix/projects/phurix/src/layouts/Layout.astro`
- `/home/phurix/projects/phurix/src/components/Button.astro`
- `/home/phurix/projects/phurix/src/components/Card.astro`
- `/home/phurix/projects/phurix/src/components/Footer.astro`
- `/home/phurix/projects/phurix/src/components/Nav.astro`
- `/home/phurix/projects/phurix/src/components/FeatureBand.astro`
- `/home/phurix/projects/phurix/src/components/NewsletterBand.astro`
- `/home/phurix/projects/phurix/src/components/GardenCard.astro`
- `/home/phurix/projects/phurix/src/components/BookTile.astro`
- `/home/phurix/projects/phurix/src/components/GrowthBadge.astro`
- `/home/phurix/projects/phurix/src/components/Timeline.astro`
- `/home/phurix/projects/phurix/src/components/TopicChip.astro`
- `/home/phurix/projects/phurix/src/components/TopicPhoto.astro`
- `/home/phurix/projects/phurix/src/components/CuratedPicks.astro`
- `/home/phurix/projects/phurix/src/components/CuratedMark.astro`
- `/home/phurix/projects/phurix/src/components/Accordion.astro`
- `/home/phurix/projects/phurix/src/components/CollectionGrid.astro`
- `/home/phurix/projects/phurix/src/pages/index.astro`
- `/home/phurix/projects/phurix/src/pages/about.astro`
- `/home/phurix/projects/phurix/src/pages/colophon.astro`
- `/home/phurix/projects/phurix/src/pages/concepts.astro`
- `/home/phurix/projects/phurix/src/pages/contact.astro`
- `/home/phurix/projects/phurix/src/pages/library.astro`
- `/home/phurix/projects/phurix/src/pages/garden.astro`
- `/home/phurix/projects/phurix/src/pages/now.astro`
- `/home/phurix/projects/phurix/src/pages/projects.astro`
- `/home/phurix/projects/phurix/src/pages/talks.astro`
- `/home/phurix/projects/phurix/src/pages/404.astro`
- `/home/phurix/projects/phurix/src/pages/random.astro`
- `/home/phurix/projects/phurix/src/pages/essays/`, `/home/phurix/projects/phurix/src/pages/notes/`, `/home/phurix/projects/phurix/src/pages/patterns/` (collection indexes + content layouts)
- `/home/phurix/projects/phurix/DESIGN_GUIDE.md`

**Files to create:**
- `/home/phurix/projects/phurix/src/components/AnnouncementBar.astro`

**Files to delete:**
- `/home/phurix/projects/phurix/src/components/Frap.astro`
