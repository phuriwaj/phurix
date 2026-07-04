# Brief — `/colophon`

**Route:** `/colophon`
**File:** `src/pages/colophon.astro`
**One-line job:** The design statement as a page (per Sloan §1, Chimero §9). The single MDX-flavored page that documents stack, fonts, host, RSS, privacy, and how to cite.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §3 (surfaces to add) and §8 (nav):

- Per Sloan §1 the colophon is a design statement as a page, not a footer link.
- Single MDX page, ~10 paragraphs: stack, fonts, host, RSS, privacy, "how to cite."
- Link in the footer (per proposal §8 — "Colophon lives in the footer, not as a route"). Wait — re-reading §3 carefully: "/colophon — yes. Per §1 of site-references (Sloan, Chimero) the colophon is the design statement as a page, not a footer link. Single page, ~10 paragraphs." So `/colophon` IS its own page. §8 places it in the footer link list. **Both — it has its own URL AND is linked from the footer.**
- Subscribe surface: **single line**, NOT a band — "RSS / Email / GitHub" with three inline links (per proposal §7).

---

## 2. Sections, top to bottom

### Section 1 — Page header

- `.page-header-section` (modeled after `/patterns/index.astro`). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- Eyebrow `<p class="section-eyebrow">Site</p>` (or "Colophon" — implementer choice; pick one and be consistent).
- `<h1 class="page-title">Colophon</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. (Standard page h1.)
- Lede: `Notes on how this site is built, hosted, and licensed.` (Lora, `--text-body-lg`, `max-width: 60ch`.)

### Section 2 — Long-form prose body (NEW — uses `.prose`)

- Container: `.container-phx`, padding-block `var(--spacing-6)`.
- Body: `<div class="prose">` wrapping ~10 paragraphs. **Implementer writes the seed prose**. Suggested sections (each ~1 paragraph):
  1. **Stack.** Astro 7 (static, `output: 'static'`), Tailwind 4 (via Vite plugin), MDX content collections, TypeScript, React (islands only, no pages).
  2. **Host.** `phurix.dev`. Deployed via... (implementer fills in actual host — pending verification of `astro.config.mjs` `site` field).
  3. **Fonts.** Lora (serif, long-form), Inter (chrome), Kalam (script — loaded but unused).
  4. **Type.** All type is hand-set. The body face is Lora at 18px / 1.7 on long-form pages.
  5. **Palette.** Warm cream page canvas (`#f2f0eb`), house green for dark bands (`#1e3932`), starbucks green for the single accent (`#006241`). One accent. One job: signal where the author is talking.
  6. **Imagery.** Topic photos via Unsplash, processed at build time via `astro:assets` to WebP with responsive widths.
  7. **RSS.** Available at `/rss.xml`. Per-post feeds are not generated.
  8. **Privacy.** No tracking. No analytics. No cookies. No third-party scripts. The only network request beyond static assets is the font CDN.
  9. **How to cite.** Suggested format: `Author, "Title," phurix, DATE, URL.` Licensed CC BY-NC 4.0 unless otherwise noted. Quotes welcome with attribution.
  10. **Acknowledgements.** (Optional.) With thanks to the libraries and tools that make this site possible.
- Each paragraph is Lora at `--text-prose` / 1.7 / 65ch.

### Section 3 — Subscribe line (single line, not a band)

- Below the prose, a single hairline-divided line:
  ```html
  <p class="colophon-subscribe">
    Subscribe via <a href="/rss.xml">RSS</a>, <a href="#newsletter">email</a>, or <a href="https://github.com/phurix" target="_blank" rel="noopener noreferrer">GitHub</a>.
  </p>
  ```
- Style: Lora, `--text-body`, color `--color-text-black-soft`. Margin-block-start: `var(--spacing-6)`. Links color `--color-starbucks-green`.

### Frap

- Stays. Label "Email me".

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure (Colophon IS in the center-cluster link list). |
| `Frap.astro` | Modified | Default label change. |

No new components. **No new content collections** — `/colophon` is a single `.astro` page with inline JSX (the prose is hardcoded).

---

## 4. Content additions needed

- **NEW `src/pages/colophon.astro`** — single Astro page with the structure above.
- **The 10 paragraphs** — implementer writes a seed draft. Each paragraph 2-4 sentences. Mark with TODO comments so the author can revise.

---

## 5. Edge cases / decisions left to the implementer

- **Eyebrow word** — "Site" or "Colophon"? Implementer decision. Default: "Colophon" for self-consistency with the h1.
- **MDX vs Astro** — proposal §3 says "lives in markdown, not a collection — keep it cheap." Two options:
  1. Inline prose as JSX in `src/pages/colophon.astro` — simple, no MDX file.
  2. Separate `src/content/colophon/colophon.mdx` rendered via `<Content />`.

  **Decision: option 1 (inline JSX).** The colophon is one page; the content is small. Adding a new MDX collection for one page is overkill.
- **Privacy claim** — "No tracking. No analytics. No cookies." Verify this is true. The site has no third-party scripts in the repo (no analytics, no Plausible, no Fathom). The `<Font>` from Astro Fonts loads from the configured font provider — that's a third-party request. **Adjust the privacy paragraph to be honest**: "No third-party analytics or tracking. The only network requests beyond this domain are font files (Google Fonts via Astro Fonts) and optional Unsplash photo CDN."
- **No JSON-LD on this page** — the colophon is a meta-page, not a BlogPosting.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/colophon/index.html`.
- Visiting `/colophon` shows: page header (Colophon h1), ~10 Lora prose paragraphs in `.prose`, subscribe line with three inline links (RSS / email / GitHub).
- The page is reachable from the footer center-cluster link list.
- The page is NOT in the top nav (per proposal §8).
- Frap visible with label "Email me".
- `:focus-visible` visible on every link.