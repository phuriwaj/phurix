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
| `--color-action-blue` | `#1863dc` | Nav hover, inline links, CuratedPicks link color, mono eyebrows. |
| `--color-coral` | `#ff7759` | Mono uppercase eyebrows, TopicChip outline, CuratedMark ✦, currently-reading pill border, GrowthBadge `growing` text. |
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

| Token | Value | Use |
|-------|-------|-----|
| `--color-ink` | `#212121` | Default body text. |
| `--color-muted-slate` | `#93939f` | Metadata dates, captions, footer links (light), secondary prose. |
| `--color-slate` | `#75758a` | Reserved. |
| `--color-hairline` | `#d9d9dd` | All 1px dividers, borders, focus ring default. |
| `--color-border-light` | `#e5e7eb` | Hover border for bordered cards. |

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
| **GardenCard** | `--color-hairline`, `--color-soft-stone`, `--color-coral`, `--color-ink`, `--color-muted-slate`, `--font-display`, `--font-mono`. |
| **BookTile** | `--radius-sm`, `--color-coral`, `--color-ink`, `--font-display`, `--font-mono`, `--color-on-dark`. |
| **GrowthBadge** | `--font-mono`, `--tracking-mono`, `--color-action-blue`/`--color-pale-blue-wash` (seedling), `--color-coral` (growing), `--color-deep-green`/`--color-pale-green-wash` (evergreen). |
| **Timeline** | `--color-hairline`, `--color-ink`, `--color-muted-slate`, `--font-display`, `--font-mono`. |
| **TopicChip** | `--font-mono`, `--color-coral`, `--color-cohere-black`, `--radius-pill` (sm/md) / `--radius-xl` (lg), `--tracking-mono`. |
| **TopicPhoto** | `--color-soft-stone`, `--color-on-dark`. |
| **CuratedPicks** | `--color-coral`, `--color-action-blue`, `--color-hairline`, `--font-display` (italic). |
| **CuratedMark** | `--color-coral`, `--font-display`. |
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
