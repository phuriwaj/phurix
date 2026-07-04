# Brief — `/contact`

**Route:** `/contact`
**File:** `src/pages/contact.astro`
**One-line job (from proposal §4):** Three channels and one direct action.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/contact`) and §9:

- No contact form. Email-first per Sloan §1 and Mod §2.
- No FAQ accordion on this page (move FAQ-style items to `/colophon` if needed).
- Three channel cards in a single row (Email / GitHub / Mastodon — same as today).
- A primary `mailto:` CTA below the cards.
- Existing `channels` array preserved.

---

## 2. Sections, top to bottom

### Section 1 — Header (existing)

- `.container-phx`, padding-block `var(--spacing-7) var(--spacing-5)`.
- Eyebrow `<p class="section-eyebrow">Contact</p>` — existing CSS kept.
- `<h1 class="page-title">Get in touch.</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede `<p class="page-lede">` — Lora at `--text-body-lg` (19px), `line-height: 1.6`, color `var(--color-text-black-soft)`, `max-width: 60ch` (existing max-width was 55ch — bump to 60ch).
- **Update copy slightly:** replace the existing "We reply within two business days. For project briefs, please include scope, timeline, and a link or two to references." with `Three channels below — pick whichever fits. Email is best for anything that needs a back-and-forth.` (Lora, same size).

### Section 2 — Three channel cards (existing)

- `<div class="contact-grid">` — existing CSS kept (1 col mobile, 3 col ≥768px).
- Render `channels` array via existing `<Card>` (existing). Each card shows:
  - `<h2 class="channel-label">{c.label}</h2>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-micro`. Existing.
  - `<a href={c.href} class="channel-value">{c.value}</a>` — Inter 600, `--color-text-black`, `--text-body`, `word-break: break-all`. Hover → `--color-green-accent`. Existing.

### Section 3 — Direct email CTA

- Below the grid, `<div class="cta-row">` with one `<Button variant="primary" href="mailto:hello@phurix.dev">Email me directly</Button>`. (Existing uses label "Send an Email" — update to "Email me directly" to match the Frap relabel.)
- Margin top: `var(--spacing-7)`.

### Frap

- **Stays.** Per proposal §4 — every page except those with deep-focus surfaces. `/contact` is a contact surface, not a deep-focus reading surface. Label: "Email me" (per `_shared-moves.md` §12).

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Card.astro` | Unchanged | Existing component, props match. |
| `Frap.astro` | Modified | Default label change to "Email me". |
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure. |

No new components.

---

## 4. Content additions needed

- **Update the `channels` array only if needed.** Existing:
  ```ts
  const channels = [
    { label: 'Email', value: 'hello@phurix.dev', href: 'mailto:hello@phurix.dev' },
    { label: 'GitHub', value: '@phurix', href: 'https://github.com/phurix' },
    { label: 'Mastodon', value: '@phurix@hachyderm.io', href: 'https://hachyderm.io/@phurix' },
  ];
  ```
  **Keep as-is.**

---

## 5. Edge cases / decisions left to the implementer

- **The "Send an Email" button → "Email me directly" rename.** Trivial label change; do it.
- **The lede paragraph rewrite** is editorial. If the implementer wants to keep the existing reply-time framing, that's fine; the proposal does not mandate a rewrite, just confirms "Three channels and one direct action" as the page's job.
- **No new photo** on this page (per proposal §6 "Imagery rule" — `/contact` no photo).
- **No contact form** — explicit per proposal.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/contact/index.html`.
- Visiting `/contact` shows: header (green jumbo h1, Lora lede), three channel cards in a row (1 col on mobile), one primary "Email me directly" CTA below.
- The Frap is visible with label "Email me".
- No `<form>` element on the page (other than a skip-to-content link).
- No FAQ accordion.
- `:focus-visible` visible on the channel links and CTA button.