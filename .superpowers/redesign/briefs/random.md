# Brief — `/random`

**Route:** `/random`
**File:** `src/pages/random.astro` (see §5 — NOT `.ts`)
**One-line job:** One endpoint that picks a random essay/note/pattern on each request (per Sivers §11). The smallest, most reader-valued feature you can ship.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §3 (surfaces to add) and §8 (nav):

- Pure JS in `/pages/random.ts` that 302s to `/[type]/[slug]`.
- Since `output: 'static'` is set in `astro.config.mjs`, **a server-side 302 redirect is NOT possible**. The endpoint must be implemented as a static HTML page with an inline `<script>` that does `window.location.replace(...)` on page load.
- Lives in the top nav (item 7: "Random").

---

## 2. Sections, top to bottom

This is a single-page redirect. The page renders a brief interstitial then the JS replaces the URL.

### Section 1 — Interstitial

- A minimal page with:
  - `<title>Random — phurix</title>`
  - A centered single line: `Picking a random post…` (Lora, `--text-body-lg`, color `--color-text-black-soft`).
  - `<noscript>` fallback: a list of links to all entries (so non-JS users get the same outcome minus the randomness).

### Inline script (the redirect logic)

```html
<script is:inline>
  // Build-time manifest of { type, slug } pairs for every essay/note/pattern.
  const manifest = [/* injected at build time */];
  const entry = manifest[Math.floor(Math.random() * manifest.length)];
  if (entry) {
    window.location.replace(`/${entry.type}/${entry.slug}`);
  }
</script>
```

### Manifest injection

The Astro page generates `manifest` at build time. Implementation:

```ts
// src/pages/random.astro
---
import { getCollection } from 'astro:content';

const essays = await getCollection('essays');
const notes = await getCollection('notes');
const patterns = await getCollection('patterns');

const manifest = [
  ...essays.map(e => ({ type: 'essays', slug: e.id })),
  ...notes.map(n => ({ type: 'notes', slug: n.id })),
  ...patterns.map(p => ({ type: 'patterns', slug: p.id })),
];
---
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Random — phurix</title>
</head>
<body>
  <main class="random-interstitial">
    <p>Picking a random post…</p>
    <noscript>
      <p>This page requires JavaScript. <a href="/garden">Browse the Garden</a> instead.</p>
    </noscript>
  </main>
  <script is:inline define:vars={{ manifest }}>
    if (manifest.length > 0) {
      const entry = manifest[Math.floor(Math.random() * manifest.length)];
      window.location.replace(`/${entry.type}/${entry.slug}`);
    } else {
      window.location.replace('/garden');
    }
  </script>
</body>
</html>
```

### Frap / Nav / Footer

- **Skip all chrome.** The page is a redirect; no nav, no footer, no Frap. Implement as a bare `<html>` with no `<Layout>` wrapper. This is the only page that does NOT use `Layout.astro`.

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Modified | Random IS in the new 7-item navLinks list. |

No other components modified.

---

## 4. Content additions needed

- **NEW `src/pages/random.astro`** — see §2 above.
- Talks and books are **excluded** from the manifest (talks are external-link-heavy; books are not "posts"). Essays + notes + patterns only.

---

## 5. Edge cases / decisions left to the implementer

- **Why `.astro` not `.ts`** — Astro's `output: 'static'` does not support server endpoints (`.ts` files in `src/pages/` that return `Response`). A `.ts` file would need `output: 'server'` or `output: 'hybrid'`, which would change the deployment model for the entire site. The static-HTML-with-inline-script pattern is the right solution for this constraint.
- **Manifest size** — currently 4 essays + 19 notes + 11 patterns = 34 entries. The JSON manifest is ~1-2 KB inlined. No build-time concern.
- **No-JS fallback** — the `<noscript>` content should at minimum link to `/garden`. Optional: render the full manifest as a `<ul>` so non-JS users can manually pick.
- **noscript UX** — `<noscript>` is hidden by default; only renders when JS is disabled. Keep it brief.
- **Caching** — the inline script runs on every page load. Static HTML is served from cache, but the script always re-runs. Each visit picks a fresh random entry.
- **`/random` in sitemap** — should be excluded from the sitemap (it's a redirect surface, not real content). Astro's sitemap integration auto-excludes pages with `<meta name="robots" content="noindex">` — verify in `dist/sitemap-0.xml` post-build.
- **`noindex` meta** — keep. Random surfaces don't need to be indexed.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/random/index.html`.
- Visiting `/random` in a browser immediately redirects to `/essays/{slug}` OR `/notes/{slug}` OR `/patterns/{slug}` (verify by visiting 3-5 times and confirming different destinations).
- The redirect happens within ~50ms of page load (the interstitial is essentially invisible).
- Disabling JavaScript and visiting `/random` shows the noscript fallback with a link to `/garden`.
- The `/random` link in the top nav is visible on every page.
- `dist/sitemap-0.xml` does NOT contain `/random/`.
- The Frap is NOT visible on `/random` (no Layout wrapper).
- The Nav and Footer are NOT visible on `/random` (no Layout wrapper).