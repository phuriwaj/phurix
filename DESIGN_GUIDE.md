# Phurix Design System — Developer Guide

> A warm, confident retail-flagship design language inspired by Starbucks.
> Every token in this guide is defined in [`src/styles/theme.css`](./src/styles/theme.css)
> and surfaces automatically as Tailwind 4 utilities.

---

## TL;DR

| You want to… | Use this |
|---|---|
| Set the page background | `bg-neutral-warm` (default canvas — never pure white) |
| Render a CTA | `<Button variant="primary">` |
| Make a content card | `<Card>` |
| Make a dark-green hero strip | `<FeatureBand>` |
| Add the floating order button | `<Frap>` |
| Show a rewards redeemable count | `<RewardsPill stars={200} />` |
| Show a gift-card tile | `<GiftCardTile imageSrc=… title=… />` |
| Show a size selector | `<SizeOptionRow sizes={[…]} />` |
| Show a FAQ block | `<Accordion items={[…]} />` |

> **Source of truth:** [`DESIGN.md`](./DESIGN.md) describes the system in plain
> English. Treat it as authoritative; this guide is a mapping onto code.

---

## 1. The Four Greens (load-bearing)

Never pick "one brand green." Each tier has a role:

| Token | Hex | Role | Example |
|---|---|---|---|
| `starbucks-green` | `#006241` | Headings, dominant brand moment | `h1`, hero headlines |
| `green-accent` | `#00754A` | Filled CTAs, active state, focus ring | `<Button variant="primary">`, `:focus-visible` |
| `house-green` | `#1E3932` | Footer, feature bands, dark panels | `<FeatureBand>`, `<Footer>` |
| `green-uplift` | `#2B5148` | Decorative mid-dark | Background washes |
| `green-light` | `#D4E9E2` | Form-valid tints, light utility | Valid-field background |

```astro
<h1 class="text-starbucks-green">Hello</h1>
<div class="bg-house-green text-text-white">Feature band</div>
<button class="bg-green-accent text-white">CTA</button>
```

---

## 2. Gold is Reserved

`gold` / `gold-light` / `gold-lightest` exist **only** for Rewards-status
ceremony. Never as a general accent.

```astro
<!-- OK: rewards cost pill -->
<RewardsPill stars={200} />

<!-- NOT OK: generic button or heading -->
<button class="bg-gold">Buy</button>  <!-- forbidden -->
```

---

## 3. The Warm Canvas

The page background is **always** a warm cream. Never pure white.

```css
/* body uses this automatically via global.css */
background-color: var(--color-neutral-warm);  /* #f2f0eb */
```

White is reserved for cards and modals layered on top of the canvas.

---

## 4. Buttons — Universal Rules

| Rule | Why |
|---|---|
| `border-radius: 50px` (full pill) | Universal across the system |
| `transform: scale(0.95)` on `:active` | Signature micro-interaction |
| `transition: 200ms ease` | Feel, not spectacle |
| One font weight: 600 | Hierarchy comes from color/size, not weight |

```astro
<Button variant="primary" href="/projects">View Work</Button>
<Button variant="outline" href="/contact">Contact</Button>
<Button variant="on-dark" href="/x">Learn more</Button>  <!-- on feature band -->
<Button variant="sm" href="/x">Small</Button>
```

See [`Button.astro`](./src/components/Button.astro) for all 7 variants.

---

## 5. Type System

| Token | Size | Use |
|---|---|---|
| `text-display` | 5.0rem / 80px | Display (Rewards hero) |
| `text-jumbo` | 3.6rem / 58px | Secondary hero |
| `text-hero-large` | 2.8rem / 45px | Section headlines |
| `text-h1` | 2.4rem / 24px | h1, h2 (weight + color separate them) |
| `text-body-lg` | 1.9rem / 19px | Hero intro copy |
| `text-body` | 1.6rem / 16px | Default body |
| `text-small` | 1.4rem / 14px | Button label, metadata |
| `text-micro` | 1.3rem / 13px | Caption micro-copy |

Three typeface contexts:

- **Sans (Inter Variable):** nearly everything
- **Serif (Lora):** Rewards ceremony headlines only — use `.serif-headline`
- **Script (Kalam):** Careers cup-name touches only — use `.script-mark`

> **Substitution:** SoDoSans → Inter; Lander Tall → Lora; both are open-source.

Tracking is tight by default: `letter-spacing: -0.01em` is applied to `body`
globally. Don't override unless you mean it.

---

## 6. Spacing

Rem-based, anchored `1rem = 10px`:

```
--spacing-1   0.4rem  ( 4px)
--spacing-2   0.8rem  ( 8px)
--spacing-3   1.6rem  (16px)  ← universal default
--spacing-4   2.4rem  (24px)
--spacing-5   3.2rem  (32px)
--spacing-6   4.0rem  (40px)
--spacing-7   4.8rem  (48px)
--spacing-8   5.6rem  (56px)  ← Frap height
--spacing-9   6.4rem  (64px)
```

Use `<div class="p-{n}">` or `mt-{n}` etc. as Tailwind utilities.

```astro
<section class="p-7">…</section>          <!-- 48px padding -->
<div class="gap-4">…</div>                <!-- 24px gap -->
```

---

## 7. Depth — Layered Whisper-Soft Shadows

Never one heavy drop shadow. Layer 2–3 low-alpha shadows:

| Level | Token | Use |
|---|---|---|
| Card | `--shadow-card` | Default content card |
| Nav | `--shadow-nav` | Fixed top bar (3 layers) |
| Frap base | `--shadow-frap-base` | Halo around Frap |
| Frap ambient | `--shadow-frap-ambient` | Directional lift |
| Gift card | `--shadow-gift-card` | Physical card feel |
| SVC | `--shadow-svc` | Starbucks Card SVG drop shadow |

```astro
<article class="shadow-card rounded-card">…</article>
```

---

## 8. Color-Block Page Rhythm

The home page bands work like espresso-dark bookends around bright body:

```
Cream hero (Neutral Warm)
  → White content section
    → Dark-green (House Green) feature band
      → White content section
        → Cream utility zone
          → Dark-green (House Green) footer
```

```astro
<Layout>
  <section class="bg-neutral-warm">…</section>      <!-- cream hero -->
  <section class="container-phx section">…</section> <!-- white body -->
  <FeatureBand />                                    <!-- dark-green band -->
  <Footer />                                         <!-- dark-green footer -->
</Layout>
```

---

## 9. Frap — Persistent Floating CTA

The 56px circular button is **the** signature elevation element. It floats
bottom-right on every scrolled surface. Persist it via the layout's
`frap` slot.

```astro
<Layout>
  <slot />   <!-- your page content -->

  <Frap slot="frap" href="/contact" label="Quick contact" />
</Layout>
```

Set `hideFrap` on `<Layout>` for confirmation pages.

---

## 10. Don'ts (from DESIGN.md §7)

- ❌ Don't use pure white as page canvas — `bg-white` is for cards only.
- ❌ Don't pick "one brand green" — use the four-tier system.
- ❌ Don't use gold outside Rewards ceremony.
- ❌ Don't square button corners — full pill is universal.
- ❌ Don't use gradients — system is color-block.
- ❌ Don't differentiate h1/h2 by size — same 24px, separate by weight + color.
- ❌ Don't use `color: #000` for body — use `text-text-black` (`rgba(0,0,0,0.87)`).
- ❌ Don't skip `scale(0.95)` on button active state.
- ❌ Don't stack single heavy shadows — layer 2–3 low-alpha ones.
- ❌ Don't introduce serif/script into the main shopping flow.

---

## 11. File Map

```
src/
├── styles/
│   ├── theme.css       ← all design tokens (Tailwind 4 @theme)
│   └── global.css      ← canvas, resets, focus, utilities
├── layouts/
│   └── Layout.astro    ← <html>, fonts, Nav, Footer, Frap slot
├── components/
│   ├── Nav.astro       ← global top bar (progressive height)
│   ├── Footer.astro    ← dark-green footer with columns
│   ├── Button.astro    ← 7 variants × 3 sizes
│   ├── Card.astro      ← content card (light / dark)
│   ├── FeatureBand.astro ← 40/60 dark-green hero strip
│   ├── Frap.astro      ← floating circular CTA
│   ├── GiftCardTile.astro ← illustrated gift-card grid item
│   ├── SizeOptionRow.astro ← PDP size selector
│   ├── RewardsPill.astro ← gold cost pill
│   └── Accordion.astro ← FAQ list (no JS, details/summary)
└── pages/
    └── index.astro     ← demo: hero, cards, band, gifts, PDP, FAQ
```

---

## 12. Adding a New Token

1. Open `src/styles/theme.css`.
2. Add the `--your-token: value;` line in the right category block.
3. Tailwind 4 auto-generates the utility class.
4. Use it: `bg-your-token` / `text-your-token` / `p-your-token`.
5. If it's a new color, add it to the **Color Palette & Roles** table in
   `DESIGN.md` so the system stays documented.

---

## 13. Substituted Fonts

| Original (proprietary) | We use | Loaded from |
|---|---|---|
| SoDoSans | Inter Variable | `@fontsource-variable/inter` (installed) |
| Lander Tall (Rewards serif) | Lora | Google Fonts |
| Proxima Nova (legacy) | Inter | same as above |
| Kalam (Careers script) | Kalam | Google Fonts |

If a font needs the tight `-0.01em` tracking adjustment, override locally —
some open-source faces need `-0.005em` instead.
