# Design Guide — Developer Token Reference

This file is the developer-facing companion to `DESIGN.md` (the "why" — design rationale, theory, history). It maps every token in `src/styles/theme.css` to its role, default value, and intended use. When you change a token, change it here and in `theme.css` together.

For rationale and history, see `DESIGN.md`.

---

## Font families

| Token | Value | Use |
|-------|-------|-----|
| `--font-sans` | `"Inter Variable", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif` | UI chrome, card titles ≤ 32px, list rows, body copy. |
| `--font-display` | `"Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif` | All h1/h2 headlines (≥ 48px), CuratedPicks links, h2 inside `.prose`. Weight 400. |
| `--font-serif` | `"Lora", "Iowan Old Style", Georgia, serif` | Long-form prose ledes (about, colophon), on-this-day lines, lead text. |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "SFMono-Regular", "Menlo", "Consolas", monospace` | Uppercase mono labels, eyebrows, metadata dates. |

Weights: Sans 400/500/600, Display 300/400/500, Serif 400/500/600, Mono 400/500.

## Brand & accent colors

| Token | Value | Use |
|-------|-------|-----|
| `--color-cohere-black` | `#000000` | Highest-emphasis text. h1/h2 default color. Logo / wordmark. |
| `--color-near-black` | `#17171c` | Primary CTA fill. Footer / dark feature bands. |
| `--color-deep-green` | `#003c33` | Deep-green feature band tone. |
| `--color-dark-navy` | `#071829` | Alternate feature band tone. |
| `--color-action-blue` | `#1863dc` light / `#6b9bf5` dark | Nav hover, inline links, CuratedPicks link color, Accordion chevron, GrowthBadge `seedling` text. Text/icon-only — never a fill — so it is safely lightened in dark mode (light value is 3.54:1 on the dark canvas, fails AA). |
| `--color-coral` | `#ff7759` | Bright fill/border accent: TopicChip outline + active fill, currently-reading pill border, CuratedMark ✦, and mono eyebrows on the **fixed near-black** footer/newsletter surfaces. Do **not** use for text on the canvas — use `--color-coral-text`. |
| `--color-coral-text` | `#b83a15` light / `#ff7759` dark | Coral used as **text** on the canvas: TopicChip default label, GrowthBadge `growing`, page mono eyebrows, garden/search type labels, curated-picks heading. Darkened in light mode to clear 4.5:1 (5.75:1 on white); reverts to base coral in dark mode (7.38:1). |
| `--color-evergreen-text` | `#003c33` light / `#5fd0a8` dark | Deep-green used as **text** in GrowthBadge `evergreen`. Separate from `--color-deep-green` (a band fill that can't theme-flip); dark value clears 8.99:1 on the dark green wash. |
| `--color-soft-coral` | `#ffad9b` | Hover state for on-dark buttons, hover state for active TopicChip. |

## Surface & background

| Token | Value | Use |
|-------|-------|-----|
| `--color-canvas` | `#ffffff` | Default body background. |
| `--color-soft-stone` | `#eeece7` | Library / about / page-header secondary surfaces. |
| `--color-pale-green-wash` | `#edfce9` | Evergreen pillar surfaces (practices page). GrowthBadge `evergreen` background. |
| `--color-pale-blue-wash` | `#f1f5ff` | Home hero background. GrowthBadge `seedling` background. |
| `--color-card-border` | `#f2f2f2` | Reserved for future card borders. |

## Text & rules

| Token | Value (light) | Value (dark) | Use |
|-------|-------|-------|-----|
| `--color-heading` | `#000000` | `#ffffff` | h1–h6, nav wordmark/active-link, hamburger icon bars, `.prose a:hover`, back-link hovers, graph node fill/stroke. Theme-adaptive — flips to white in dark mode so headings stay legible on `--color-canvas`. **Added in the July 2026 accessibility audit**: previously all of this text used `--color-cohere-black` directly, which is not theme-adaptive and rendered at 1.09:1 contrast (fail) on the dark canvas. Use this token for any new foreground text/icon drawn directly on `--color-canvas`. |
| `--color-ink` | `#212121` | `#e5e5e5` | Default body text. |
| `--color-muted-slate` | `#68687a` | `#9a9aa8` | Metadata dates, captions, footer links (light), secondary prose. Darkened (light) / lightened (dark) in the July 2026 audit from the extracted `#93939f`/`#75758a` pair, which failed AA (3.04:1 light, 4.29:1 dark) for the small text this token carries. Now 5.45:1 on white, 4.62:1 on Soft Stone (light); 6.94:1 on canvas, 6.25:1 on dark Soft Stone (dark). |
| `--color-slate` | `#75758a` | `#93939f` | Reserved. |
| `--color-hairline` | `#d9d9dd` | `#2a2a30` | All 1px dividers, borders, focus ring default. Decorative divider use only — do not use as an input/interactive-control border (1.4:1, fails the 3:1 non-text UI minimum). |
| `--color-border-light` | `#e5e7eb` | `#2a2a30` | Hover border for bordered cards. |

### `--color-heading` vs `--color-cohere-black`

Two different roles that look identical in light mode but must not be
merged:

- **`--color-heading`** — foreground text/icon color drawn on `--color-canvas`. Theme-adaptive (black in light mode, white in dark mode).
- **`--color-cohere-black`** — a fixed, non-adaptive near-total-black **fill**, used only where the surface itself is meant to stay dark regardless of theme: `AnnouncementBar` background, `Button` `.btn-primary:hover`/`.btn-announcement` backgrounds, `TopicChip` `.topic-chip-active` text (sits on a coral fill, not canvas). Do not add new theme-flipping behavior to this token — introduce a new semantic token instead if a similar canvas-text case appears.

## Semantic

| Token | Value | Use |
|-------|-------|-----|
| `--color-focus-blue` | `#4c6ee6` | Universal `:focus-visible` outline. |
| `--color-form-violet` | `#9b60aa` | Form input focus state. |
| `--color-error-red` | `#b30000` | Reserved for future error states. |

## On-dark surface text overrides

| Token | Value | Use |
|-------|-------|-----|
| `--color-on-dark` | `#ffffff` | Headlines and body on dark surfaces. |
| `--color-on-dark-muted` | `rgba(255, 255, 255, 0.72)` | Subhead and secondary copy on dark surfaces. |

## Spacing scale (rem, 1rem = 10px)

| Token | Value | px |
|-------|-------|----|
| `--spacing-0` | `0` | 0 |
| `--spacing-1` | `0.2rem` | 2 |
| `--spacing-2` | `0.4rem` | 4 |
| `--spacing-3` | `0.6rem` | 6 |
| `--spacing-4` | `0.8rem` | 8 |
| `--spacing-5` | `1rem` | 10 |
| `--spacing-6` | `1.2rem` | 12 |
| `--spacing-7` | `1.6rem` | 16 |
| `--spacing-8` | `2rem` | 20 |
| `--spacing-9` | `2.2rem` | 22 |
| `--spacing-10` | `2.4rem` | 24 |
| `--spacing-11` | `2.8rem` | 28 |
| `--spacing-12` | `3.2rem` | 32 |
| `--spacing-13` | `3.6rem` | 36 |
| `--spacing-14` | `4rem` | 40 |
| `--spacing-15` | `5.6rem` | 56 |
| `--spacing-16` | `6rem` | 60 |
| `--spacing-17` | `6.4rem` | 64 |
| `--spacing-18` | `8rem` | 80 |

| Token | Value | Use |
|-------|-------|-----|
| `--spacing-gutter` | `1.6rem` | Outer container padding (mobile). |
| `--spacing-gutter-md` | `2.4rem` | Outer container padding (≥ 768px). |
| `--spacing-gutter-lg` | `4rem` | Outer container padding (≥ 1024px). |

## Border radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-xs` | `0.4rem` | Form inputs, search inputs. |
| `--radius-sm` | `0.8rem` | Smaller media (book covers, secondary tiles). |
| `--radius-md` | `1.6rem` | Default cards. |
| `--radius-lg` | `2.2rem` | Hero media (TopicPhoto, essay hero, section media). |
| `--radius-xl` | `3rem` | Large chip (TopicChip `lg`). |
| `--radius-pill` | `3.2rem` | All buttons, TopicChip `sm`/`md`, badges, form fields. |
| `--radius-full` | `9999px` | Round icons, dots, anything circular. |

## Letter spacing

| Token | Value | Use |
|-------|-------|-----|
| `--tracking-display-tight` | `-0.02em` | All h1/h2/h3 display headlines. |
| `--tracking-tight` | `-0.01em` | Body text. |
| `--tracking-mono` | `0.02em` | All uppercase mono labels (eyebrows, TopicChip, mono buttons). |

## Line height

| Token | Value | Use |
|-------|-------|-----|
| `--leading-body` | `1.5` | Body copy and lists. |
| `--leading-display` | `1.2` | Display headlines. |
| `--leading-feature` | `1.3` | Feature headings (h3). |

## Type scale (rem, 1rem = 10px)

| Token | Value | px | Use |
|-------|-------|----|-----|
| `--text-hero-display` | `9.6rem` | 96 | Home hero (clamp 4rem → 9.6rem). 404 page. |
| `--text-product-display` | `7.2rem` | 72 | Reserved for product pages. |
| `--text-section-display` | `6rem` | 60 | Feature band headline (clamp 3.2rem → 6rem). |
| `--text-section-heading` | `4.8rem` | 48 | Page h1 (clamp 3.2rem → 4.8rem). |
| `--text-card-heading` | `3.2rem` | 32 | h2 in `.prose`, essay/note/pattern title. |
| `--text-feature-heading` | `2.4rem` | 24 | Garden card title, project title, concept term. |
| `--text-body-lg` | `1.8rem` | 18 | Page ledes, prose body, CuratedPicks links. |
| `--text-body` | `1.6rem` | 16 | Default body. |
| `--text-button` | `1.4rem` | 14 | Button labels. |
| `--text-caption` | `1.4rem` | 14 | Captions, nav links, footer links, search results. |
| `--text-mono-label` | `1.4rem` | 14 | Mono labels, eyebrows. |
| `--text-micro` | `1.2rem` | 12 | Date stamps, superscript details, very small metadata. |

## Elevation

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-card` | `0 0 0.5px rgba(17,17,28,0.08), 0 1px 1px rgba(17,17,28,0.06)` | Default card lift. |
| `--shadow-nav` | `0 1px 0 var(--color-hairline)` | Nav bottom hairline. |
| `--shadow-focus-ring` | `0 0 0 2px var(--color-focus-blue)` | Search input focus, key interactive focus. |
| `--shadow-form-focus` | `0 0 0 1px var(--color-form-violet)` | Form input focus. |

## Motion

| Token | Value | Use |
|-------|-------|-----|
| `--ease-out-soft` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | All transitions. |
| `--duration-button` | `0.2s` | Hover/active feedback. |
| `--duration-image` | `0.3s` | Image fade-in. |
| `--duration-expander` | `300ms` | Accordion chevron rotation. |

## Container widths

| Token | Value | Use |
|-------|-------|-----|
| `--container-sm` | `343px` | Narrow content (small forms). |
| `--container-md` | `500px` | Medium. |
| `--container-lg` | `720px` | Long-form prose. |
| `--container-xl` | `1440px` | Default site container. |

## Nav heights

| Token | Value | Use |
|-------|-------|-----|
| `--nav-h` | `7.2rem` | Desktop nav (≥ 768px). |
| `--nav-h-mobile` | `5.6rem` | Mobile nav (< 768px). |

---

## Component token cheatsheet

| Component | Tokens used |
|-----------|-------------|
| **Button** | `--font-sans`, `--radius-pill`, `--duration-button`, `--ease-out-soft`, `--color-near-black`/`--color-cohere-black` (primary), `--color-on-dark` (on-dark). |
| **Card** | `--radius-md`, `--color-canvas`, `--color-hairline`, `--color-border-light`, `--color-near-black`, `--color-on-dark`. |
| **Footer** | `--color-near-black`, `--color-on-dark`, `--color-on-dark-muted`, `--color-coral`, `--color-soft-coral`, `--font-mono`. |
| **Nav** | `--font-display`, `--font-sans`, `--color-canvas`, `--color-cohere-black`, `--color-hairline`, `--color-action-blue`, `--color-ink`. |
| **FeatureBand** | `--color-deep-green` / `--color-dark-navy`, `--font-display`, `--color-on-dark`, `--color-on-dark-muted`, `--radius-lg`. |
| **NewsletterBand** | `--color-near-black`, `--color-coral`, `--color-on-dark`, `--color-on-dark-muted`, `--font-display`, `--font-mono`. |
| **GardenCard** | `--color-hairline`, `--color-soft-stone`, `--color-coral-text` (type label), `--color-ink`, `--color-muted-slate`, `--font-display`, `--font-mono`. |
| **BookTile** | `--radius-sm`, `--color-coral`, `--color-ink`, `--font-display`, `--font-mono`, `--color-on-dark`. |
| **GrowthBadge** | `--font-mono`, `--tracking-mono`, `--color-action-blue`/`--color-pale-blue-wash` (seedling), `--color-coral-text` (growing), `--color-evergreen-text`/`--color-pale-green-wash` (evergreen). |
| **Timeline** | `--color-hairline`, `--color-ink`, `--color-muted-slate`, `--font-display`, `--font-mono`. |
| **TopicChip** | `--font-mono`, `--color-coral-text` (default label), `--color-coral` (border + active fill), `--color-cohere-black` (active label), `--radius-pill` (sm/md) / `--radius-xl` (lg), `--tracking-mono`. |
| **TopicPhoto** | `--color-soft-stone`, `--color-on-dark`. |
| **CuratedPicks** | `--color-coral-text` (heading), `--color-action-blue`, `--color-hairline`, `--font-display` (italic). |
| **CuratedMark** | `--color-coral-text`, `--font-display`. |
| **Accordion** | `--color-hairline`, `--color-action-blue`, `--color-ink`, `--font-display`, `--duration-expander`. |
| **CollectionGrid** | `--spacing-7` / `--spacing-10` / `--spacing-12` (gap scale), `--color-pale-green-wash` / `--color-pale-blue-wash` (tone). |
| **AnnouncementBar** | `--color-cohere-black`, `--color-on-dark`, `--color-on-dark-muted`, `--color-soft-coral`, `--font-sans`, `--text-micro`. |

---

## Anti-patterns

The following should never appear in new code:

- `transform: scale(0.95)` on any interactive — color/background only.
- Emoji as primary iconography in `GrowthBadge`.
- Drop shadows with blur > 4px on cards.
- `display: scale(0.95)` for press feedback.
- `font-weight: 700` on any display headline.
- Hard borders between footer / newsletter clusters.
- Hero media radius below `--radius-sm` (8px).
- A generic sans-serif for both display AND body — always pair display and body.
- Saturated gradients as UI backgrounds.

---

## Migration helpers (old → new)

| Old token | New token |
|-----------|-----------|
| `--color-starbucks-green` | `--color-cohere-black` (text) / `--color-near-black` (CTA) |
| `--color-green-accent` | `--color-action-blue` |
| `--color-house-green` | `--color-near-black` |
| `--color-green-light` | `--color-pale-green-wash` |
| `--color-gold` | `--color-coral` (mono labels) |
| `--color-neutral-warm` | `--color-soft-stone` (page-header) / `--color-canvas` (default) |
| `--color-ceramic` | `--color-soft-stone` |
| `--color-text-black` | `--color-ink` |
| `--color-text-black-soft` | `--color-muted-slate` |
| `--color-text-white` | `--color-on-dark` |
| `--color-text-white-soft` | `--color-on-dark-muted` |
| `--color-input-border` | `--color-hairline` |
| `--font-script` | `--font-mono` (technical) or `--font-display` (display) |
| `--radius-card` | `--radius-md` |
| `--radius-button` | `--radius-pill` |
| `--radius-input` | `--radius-xs` |
| `--radius-circle` | `--radius-full` |
| `--text-h1` | `--text-card-heading` (32) or `clamp(...)` for page h1 |
| `--text-jumbo` | `clamp(3.2rem, 6vw, 4.8rem)` |
| `--text-prose` | `--text-body-lg` |
| `--text-small` | `--text-caption` |
| `--text-hero-large` | `clamp(3.2rem, 6vw, 4.8rem)` (page h1) |
| `--tracking-loose` / `--tracking-looser` | `--tracking-mono` (for mono eyebrows) |
| `--tracking-display` | `--tracking-display-tight` |
| `--tracking-pill` | `--tracking-mono` |
| `--shadow-frap-*` | REMOVED — no replacement. Floating CTA is gone. |
| `--shadow-gift-card` | `--shadow-card` |
| `--shadow-svc` | REMOVED — no replacement. |
| `--button-active-scale` | REMOVED — no `transform: scale()` press feedback. |
| `--ease-spring` | `--ease-out-soft` |

---

## Accessibility — computed contrast (July 2026 audit)

WCAG 2.2 AA minimums: 4.5:1 normal text, 3:1 large text (≥24px, or ≥18.66px
bold) and non-text UI (borders, focus rings). Ratios below are computed via
the WCAG relative-luminance formula, not eyeballed.

All values below are post-fix (July 2026 audit). Every declared text pair
now clears its AA minimum in both schemes.

| Pair | Light | Dark | Status |
|---|---:|---:|---|
| `--color-heading` text on `--color-canvas` | 21.00:1 | 19.28:1 | Pass |
| `--color-ink` text on `--color-canvas` | 16.10:1 | 15.31:1 | Pass |
| `--color-muted-slate` on `--color-canvas` (12–14px) | 5.45:1 | 6.94:1 | Pass (was 3.04 / 4.29 — fixed) |
| `--color-muted-slate` on `--color-soft-stone` | 4.62:1 | 6.25:1 | Pass |
| `--color-action-blue` text on `--color-canvas` | 5.44:1 | 7.01:1 | Pass (dark was 3.54 — fixed) |
| `--color-coral-text` (TopicChip default, GrowthBadge `growing`, eyebrows) on `--color-canvas` | 5.75:1 | 7.38:1 | Pass (light was 2.61 — fixed) |
| `--color-coral-text` on GrowthBadge `growing` wash (coral 14% mix) | 5.04:1 | 6.10:1 | Pass |
| `--color-coral` eyebrow on fixed `--color-near-black` (footer/newsletter) | 6.83:1 | 6.83:1 | Pass (kept bright coral) |
| `--color-form-violet` focus border on `--color-canvas` | 4.52:1 | 4.27:1 | Pass (3:1 non-text minimum) |
| `--color-focus-blue` focus ring on `--color-canvas` | 4.49:1 | 4.30:1 | Pass |
| GrowthBadge `seedling` text (`--color-action-blue`) on `--color-pale-blue-wash` | 4.99:1 | 6.47:1 | Pass (dark was 3.27 — fixed via action-blue dark override) |
| GrowthBadge `evergreen` text (`--color-evergreen-text`) on `--color-pale-green-wash` | 11.63:1 | 8.99:1 | Pass (dark was 1.38 — fixed via dedicated token) |
| `--color-hairline` divider on `--color-canvas` | 1.41:1 | 1.35:1 | N/A — decorative divider only, never use as an interactive-control border |
| `--color-on-dark` text on `--color-near-black` / `--color-deep-green` / `--color-dark-navy` | 17.86:1 / 12.40:1 / 17.92:1 | same (fixed fills) | Pass |

### Resolved accessibility decisions (July 2026 audit)

The three open questions previously logged here are now **DECIDED and
implemented**. Recorded for audit trail:

- **DECIDED — coral as text.** Chose option (a): added `--color-coral-text`
  (`#b83a15` light / `#ff7759` dark). Coral stays the bright fill/border
  accent (`--color-coral`); text-on-canvas coral roles now use the darkened
  text token. Coral on the fixed near-black footer/newsletter keeps bright
  coral (the dark text value is only 3.11:1 there). TopicChip's coral
  *border* (2.61:1) is retained as a decorative reinforcement — the chip is
  identified by its now-AA-passing text label, not the border alone.
- **DECIDED — GrowthBadge dark-mode text.** `evergreen` gets a dedicated
  `--color-evergreen-text` token (deep-green can't theme-flip globally — it's
  also a band fill); `seedling` is fixed by lightening `--color-action-blue`
  in dark mode (it is text/icon-only everywhere, so one override fixes
  seedling and all editorial links/eyebrows at once).
- **DECIDED — muted-slate.** Darkened the light value to `#68687a` and
  lightened the dark value to `#9a9aa8` rather than restricting usage
  (least-disruptive: the token is used sitewide for small text). Both schemes
  now clear 4.5:1 on canvas and Soft Stone.
