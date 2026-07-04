# Phurix Site Improvements — Phased Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan phase-by-phase. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 23 prioritized improvements (P0/P1/P2) identified by the astro-coder review on 2026-07-04, in 5 phases ordered to deliver visible wins early and isolate risk.

**Architecture:** Five phases, each ending with `npm run check && npm run build` passing. Phase 1 = isolated correctness fixes. Phase 2 = schema tightening (build-time validation). Phase 3 = SEO/meta (user-visible sharing wins). Phase 4 = perf refactors (image + fonts). Phase 5 = cleanup + a11y + remaining polish.

**Tech Stack:** Astro 7 (static), Tailwind 4 via Vite, MDX content, Zod via `astro/zod`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`.

**Findings source:** comprehensive review by astro-coder subagent on 2026-07-04 (referenced as "the review" below).

## Global Constraints

These apply to every phase:

- **Node ≥ 22.12** (per `package.json` `engines` field).
- **Verify after every task:** `npm run check` (combines `astro check` + `tsc --noEmit`) MUST pass with zero errors. `npm run build` MUST succeed.
- **No tests** exist (CLAUDE.md: single-author site, no CI). Verification = check + build + visual sanity for image/UI changes.
- **Git:** repo is on `master`. Commit per-phase, not per-task, with the message format `phase-N: <short summary>`.
- **DESIGN.md citations** must stay accurate. If a change touches a component that cites DESIGN.md, verify the citation still matches.
- **Topic contract** (CLAUDE.md): `RECOGNIZED_TOPICS` in `src/lib/topics.ts` is the source of truth. Adding a topic requires both updating this list AND `public/photos/<topic>.jpg`.

---

## Phase 1 — Foundation & Correctness

**Goal:** Eliminate the P0 deprecation warning and apply the safest one-off cleanups. Lowest risk; nothing here touches runtime behavior.

**Tasks:**
- 1.1 Fix `zod` import path (P0 #1)
- 1.2 Fix FeatureBand DESIGN.md citation (P1 #6)
- 1.3 Add Mastodon to Footer (P1 #7)
- 1.4 Prune stale `DESIGN_GUIDE.md` component file map (P1 #8)
- 1.5 Delete unused `tailwind.config.mjs` (P2 #17)
- 1.6 Declare `trailingSlash` policy in `astro.config.mjs` (P2 #22)
- 1.7 Commit phase 1

### Task 1.1: Fix Zod import path (P0)

**Files:**
- Modify: `src/content.config.ts:1`

**Context:** The review found that `z` is re-exported from `astro:content` but deprecated in Astro 7. The replacement is `import { z } from 'astro/zod'`. `defineCollection` stays from `astro:content`.

- [ ] **Step 1:** In `src/content.config.ts`, replace line 1:

```ts
// before
import { defineCollection, z } from 'astro:content';

// after
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
```

- [ ] **Step 2:** Run `npm run check`. Expected: zero errors, no deprecation warning about `zod` import.

- [ ] **Step 3:** Run `npm run build`. Expected: build succeeds.

### Task 1.2: Fix FeatureBand DESIGN.md citation (P1)

**Files:**
- Modify: `src/components/FeatureBand.astro:82`

- [ ] **Step 1:** Read `src/components/FeatureBand.astro` around line 82 and the relevant `DESIGN.md` section to confirm the actual section is "§4 / Feature Band" (not "§5 --contentCrateProportion..." as the comment currently says).

- [ ] **Step 2:** Update the comment to read "DESIGN.md §4 / Feature Band".

- [ ] **Step 3:** Run `npm run check`.

### Task 1.3: Add Mastodon to Footer (P1)

**Files:**
- Modify: `src/components/Footer.astro:7-28` (the social-links block)

**Context:** `contact.astro:9` lists Mastodon (`@phurix@hachyderm.io`). Footer omits it. Add Mastodon to the social-links list, matching the visual style of GitHub/Bluesky/LinkedIn.

- [ ] **Step 1:** Read `src/components/Footer.astro` lines 7-28 to understand the existing link markup.

- [ ] **Step 2:** Add a Mastodon link entry after the existing social links. The exact icon SVG is not in the codebase today — use a simple text link (or a minimal generic globe SVG) preserving the layout grid.

```html
<a href="https://hachyderm.io/@phurix" aria-label="Mastodon" rel="me">
  <svg ...>...</svg>
</a>
```

- [ ] **Step 3:** Run `npm run check && npm run build`.

### Task 1.4: Prune stale DESIGN_GUIDE.md component map (P1)

**Files:**
- Modify: `DESIGN_GUIDE.md:234-244` (the "Component file map" or equivalent section)

**Context:** The review found three ghost components referenced: `GiftCardTile.astro`, `SizeOptionRow.astro`, `RewardsPill.astro`. None exist. The real components are: `BookTile`, `TopicPhoto`, `GrowthBadge`, `Accordion`, `GardenCard`, `CollectionGrid`, `Timeline`, `NowPage`, `Frap`, `Nav`, `Footer`, `Card`, `Button`, `FeatureBand`.

- [ ] **Step 1:** Read `DESIGN_GUIDE.md:234-244` and confirm the stale references.

- [ ] **Step 2:** Verify the real component inventory:

```bash
ls src/components/
```

- [ ] **Step 3:** Replace the stale list with the real component inventory, grouped by category (layout chrome, content card, display, layout helpers).

- [ ] **Step 4:** Run `npm run check`.

### Task 1.5: Delete `tailwind.config.mjs` (P2)

**Files:**
- Delete: `tailwind.config.mjs`

**Context:** Tailwind 4 reads tokens from `src/styles/theme.css` via the `@theme` block. The `tailwind.config.mjs` only duplicates `fontFamily.sans` from theme.css.

- [ ] **Step 1:** Read `tailwind.config.mjs` to confirm it only contains `fontFamily.sans`.

- [ ] **Step 2:** Run `npm run check` first to capture baseline. Then delete `tailwind.config.mjs`.

- [ ] **Step 3:** Run `npm run check && npm run build`. Expected: both still pass (Tailwind 4 ignores the file).

- [ ] **Step 4:** If check/build fails with a "missing tailwind config" error, restore the file and report — this means the file IS load-bearing in a way not caught in the review.

### Task 1.6: Declare `trailingSlash` policy (P2)

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1:** Read `astro.config.mjs`.

- [ ] **Step 2:** Read sitemap output (`dist/sitemap*.xml`) after a fresh build to see whether URLs end with `/`.

- [ ] **Step 3:** Add `trailingSlash: 'never'` (or `'always'`, matching the sitemap output) to `defineConfig({...})` in `astro.config.mjs`.

- [ ] **Step 4:** Run `npm run check && npm run build`.

### Task 1.7: Commit phase 1

- [ ] **Step 1:**

```bash
git add -A
git commit -m "phase-1: zod import path, citation fixes, mastodon, design-guide cleanup, tailwind config removal, trailing slash"
```

---

## Phase 2 — Schema Tightening & Type Safety

**Goal:** Make the schema the contract. Bad frontmatter should fail at `npm run check`, not at runtime. **Build-time validation gains.**

**Tasks:**
- 2.1 Topics enum (P1 #2)
- 2.2 Tighten `coverColor` and `link` (P2 #12)
- 2.3 Consolidate `TopicKey` type (P2 #13)
- 2.4 Remove unused `slug` field from schemas (P2 #14)
- 2.5 Commit phase 2

### Task 2.1: Topics enum (P1)

**Files:**
- Modify: `src/content.config.ts` (all `topics` schemas: notes L10, essays L22, patterns L54)
- Create or modify: `src/lib/topics.ts` (may need to add a typed tuple)

**Context:** Today `topics: z.array(z.string()).default([])` accepts any string. CLAUDE.md says RECOGNIZED_TOPICS is the contract. Make Zod enforce it via `z.enum`.

- [ ] **Step 1:** Read `src/lib/topics.ts` to confirm `RECOGNIZED_TOPICS: TopicKey[]`. Add a `RECOGNIZED_TOPICS_TUPLE` export typed as a tuple so Zod's `enum` accepts it:

```ts
export const RECOGNIZED_TOPICS_TUPLE = [
  'design',
  'writing',
  'tools',
  'systems',
  'web-development',
  'anthropology',
  'ai',
] as const;

export type TopicKey = typeof RECOGNIZED_TOPICS_TUPLE[number];
```

And derive `RECOGNIZED_TOPICS: TopicKey[] = [...RECOGNIZED_TOPICS_TUPLE]`.

- [ ] **Step 2:** In `src/content.config.ts`, import `RECOGNIZED_TOPICS_TUPLE` and replace:

```ts
// before (in all three schemas: notes L10, essays L22, patterns L54)
topics: z.array(z.string()).default([]),

// after
topics: z.array(z.enum(RECOGNIZED_TOPICS_TUPLE)).default([]),
```

- [ ] **Step 3:** Run `npm run check`. If a content file has a typo in `topics:`, the build will fail — fix it. Repeat until clean.

- [ ] **Step 4:** Run `npm run build`.

### Task 2.2: Tighten `coverColor` and `link` (P2)

**Files:**
- Modify: `src/content.config.ts:34` (talks.link), `:43` (books.coverColor)

- [ ] **Step 1:** Replace:

```ts
// before
link: z.string().optional(),
coverColor: z.string(),

// after
link: z.string().url().optional(),
coverColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Expected #RRGGBB hex'),
```

- [ ] **Step 2:** Run `npm run check`. Fix any content that doesn't match (likely none).

- [ ] **Step 3:** Run `npm run build`.

### Task 2.3: Consolidate `TopicKey` type (P2)

**Files:**
- Modify: `src/components/TopicPhoto.astro:13`

**Context:** `src/lib/topics.ts` defines `TopicKey`. `TopicPhoto.astro` re-declares it locally.

- [ ] **Step 1:** Read `TopicPhoto.astro` around line 13.

- [ ] **Step 2:** Replace the local declaration with:

```ts
import type { TopicKey } from '@/lib/topics';
```

Delete the local `type Topic = ...` declaration.

- [ ] **Step 3:** Run `npm run check`.

### Task 2.4: Remove unused `slug` field (P2)

**Files:**
- Modify: `src/content.config.ts` (notes L8, essays L20, patterns L52) — remove `slug: z.string().optional()`
- Modify: any frontmatter in `src/content/notes/`, `src/content/essays/`, `src/content/patterns/` that has a `slug` frontmatter field

**Context:** All five schemas have `slug` as optional. Pages use `entry.id` (verified in `src/pages/essays/[slug].astro:13`). The `slug` frontmatter field is dead.

- [ ] **Step 1:** Check whether any MDX file actually uses `slug` in frontmatter:

```bash
grep -r "^slug:" src/content/
```

- [ ] **Step 2:** If frontmatter `slug` exists anywhere, decide: (a) wire the [slug].astro files to use `entry.data.slug` instead of `entry.id`, or (b) remove the frontmatter entries.

- [ ] **Step 3:** Remove `slug: z.string().optional()` from the three schemas.

- [ ] **Step 4:** Run `npm run check && npm run build`.

### Task 2.5: Commit phase 2

```bash
git add -A
git commit -m "phase-2: topic enum, coverColor hex, link url, TopicKey consolidation, dead slug removal"
```

---

## Phase 3 — SEO, Meta & View Transitions

**Goal:** Biggest user-visible win. Make link shares look right; make internal nav feel like a SPA; surface the RSS feed that the footer already links to.

**Tasks:**
- 3.1 Add `<ClientRouter />` to Layout (P1 #3 part 1)
- 3.2 Add canonical, OG, Twitter meta (P1 #3 part 2)
- 3.3 Create RSS feed (P1 #4)
- 3.4 Add `<link rel="alternate">` for RSS (P1 #3 part 3)
- 3.5 Add `noindex` to 404 (P2 #20)
- 3.6 Commit phase 3

### Task 3.1: Add `<ClientRouter />` to Layout

**Files:**
- Modify: `src/layouts/Layout.astro`

**Context:** The review found `garden.astro:268` uses `astro:after-swap`, which only fires when view transitions are enabled. Adding `<ClientRouter />` activates BOTH the transitions AND the existing dead script.

- [ ] **Step 1:** Read `src/layouts/Layout.astro` and locate the `<head>` block.

- [ ] **Step 2:** Add to frontmatter:

```astro
import { ClientRouter } from 'astro:transitions';
```

- [ ] **Step 3:** Inside `<head>`, add `<ClientRouter />` (typically just before `</head>`).

- [ ] **Step 4:** Run `npm run check && npm run build`.

- [ ] **Step 5:** Run `npm run dev` and verify internal links don't full-reload (browser network tab shows no full HTML request on click).

### Task 3.2: Canonical, OG, Twitter meta

**Files:**
- Modify: `src/layouts/Layout.astro`

**Context:** Per the review: today only basic `<title>`, `<meta name="description">`, and `<meta name="viewport">`. Add canonical + OG + Twitter.

- [ ] **Step 1:** In Layout frontmatter, derive the full title and description (today these are passed as `Astro.props.title`/`.description`; verify by reading the file).

- [ ] **Step 2:** Inside `<head>`, add after the existing meta tags:

```astro
<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site).href} />
<meta property="og:type" content={Astro.url.pathname === '/' ? 'website' : 'article'} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={new URL(Astro.url.pathname, Astro.site).href} />
<meta property="og:site_name" content="phurix" />
<meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 3:** Run `npm run check && npm run build`.

### Task 3.3: Create RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`

**Context:** `@astrojs/rss` is in `package.json:18`. Footer links to `/rss.xml` but no endpoint exists — 404 today.

- [ ] **Step 1:** Read `package.json` to confirm `@astrojs/rss` is installed. If not:

```bash
npm install @astrojs/rss
```

- [ ] **Step 2:** Create `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  const essays = await getCollection('essays');
  return rss({
    title: 'phurix',
    description: 'Essays on web craft, design systems, and rabbit holes.',
    site: context.site!,
    items: essays
      .sort((a, b) => +b.data.date - +a.data.date)
      .map((e) => ({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.lede,
        link: `/essays/${e.id}/`,
      })),
    customData: '<language>en-us</language>',
  });
}
```

- [ ] **Step 3:** Run `npm run build` and confirm `dist/rss.xml` exists.

- [ ] **Step 4:** Open `dist/rss.xml` and confirm it's valid XML with at least one essay item.

### Task 3.4: Add RSS alternate link

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1:** Inside `<head>`, add:

```astro
<link rel="alternate" type="application/rss+xml" title="phurix" href={new URL('rss.xml', Astro.site).href} />
```

- [ ] **Step 2:** Run `npm run check && npm run build`. View source of `/` in dev, confirm `<link rel="alternate" ...>` is present.

### Task 3.5: Add `noindex` to 404

**Files:**
- Modify: `src/pages/404.astro`

- [ ] **Step 1:** Read `src/pages/404.astro`.

- [ ] **Step 2:** Inside `<head>`, add:

```astro
<meta name="robots" content="noindex" />
```

- [ ] **Step 3:** Run `npm run check`.

### Task 3.6: Commit phase 3

```bash
git add -A
git commit -m "phase-3: client router, canonical/og/twitter meta, rss feed, 404 noindex"
```

---

## Phase 4 — Performance Refactors

**Goal:** Largest measurable wins. Image migration is the biggest one; Fonts API eliminates Google Fonts CDN runtime DNS.

**Tasks:**
- 4.1 Migrate topic photos to `<Image />` (P2 #10)
- 4.2 Migrate Lora/Kalam from Google Fonts CDN to Astro Fonts API (P2 #11)
- 4.3 Commit phase 4

### Task 4.1: Migrate topic photos to `<Image />`

**Files:**
- Modify: `src/components/TopicPhoto.astro` (line ~90-95 — currently raw `<img>`)
- Modify: `src/components/GardenCard.astro:55`
- Modify: `src/components/Card.astro:41`
- Modify: `src/components/FeatureBand.astro:57`
- Modify: any other component with raw `<img src="/photos/...">`
- Move (or symlink): images from `public/photos/` to `src/assets/photos/` so they can be imported

**Context:** Today `public/photos/*.jpg` (7 files, ~847KB total) ship raw. Migrating to `<Image />` from `astro:assets` with `format="webp"` and responsive `widths` should cut ~70% of bytes.

- [ ] **Step 1:** Inventory the images:

```bash
ls -lh public/photos/
grep -rn '/photos/' src/ --include="*.astro" --include="*.tsx"
```

- [ ] **Step 2:** Move images into the importable location:

```bash
mkdir -p src/assets/photos
mv public/photos/*.jpg src/assets/photos/
```

(Clear the old `public/photos/` directory.)

- [ ] **Step 3:** Read `TopicPhoto.astro` lines 90-95 to understand how images are currently referenced by name (e.g. `photos/${topic}.jpg`).

- [ ] **Step 4:** Replace `<img>` with `<Image />`:

```astro
---
import { Image } from 'astro:assets';
import designJpg from '@/assets/photos/design.jpg';
// etc., one import per topic key
---

<Image
  src={designJpg}
  alt={alt}
  loading="lazy"
  decoding="async"
  format="webp"
  widths={[400, 800, 1200]}
  sizes="(min-width: 1024px) 800px, 100vw"
/>
```

- [ ] **Step 5:** Repeat for `GardenCard.astro:55`, `Card.astro:41`, and `FeatureBand.astro:57`. For any image that's decorative-only, add `alt=""`.

- [ ] **Step 6:** Run `npm run check && npm run build`. The dist should contain `.webp` variants.

- [ ] **Step 7:** Compare `dist/_astro/` sizes before/after to confirm byte reduction (expect ~60-80%).

- [ ] **Step 8:** Run `npm run dev`, open a topic page, confirm images render and the DevTools network panel shows `.webp` or AVIF served.

### Task 4.2: Migrate Lora and Kalam to Astro Fonts API

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/layouts/Layout.astro:32-37`

**Context:** Today Layout pulls Lora and Kalam from `fonts.googleapis.com` via `<link>`. Astro 6+ ships a built-in Fonts API for build-time font download.

- [ ] **Step 1:** Read `src/layouts/Layout.astro:32-37` to understand the current Google Fonts call.

- [ ] **Step 2:** Read `astro.config.mjs`. Add (or modify) the integration:

```js
import { fontProviders } from 'astro/config';

export default defineConfig({
  // ...
  experimental: {
    fonts: ['google'],
  },
  fonts: {
    provider: fontProviders.google(),
    fonts: [
      { family: 'Lora', fallbacks: ['serif'] },
      { family: 'Kalam', fallbacks: ['cursive'] },
    ],
  },
});
```

(Check the current Astro 7 syntax — if `astro/font` doesn't yet exist in your Astro version, use the `astro:assets` font system as documented in your version. Adjust as needed.)

- [ ] **Step 3:** Remove the `<link href="https://fonts.googleapis.com/...">` block from `Layout.astro`. Replace with `<Font />` components from `astro:assets` (or whatever the current API is). Note: this step may need to be adapted based on exact Astro version.

- [ ] **Step 4:** Run `npm run build`. Check `dist/` — there should be no requests to `fonts.googleapis.com`.

- [ ] **Step 5:** Run dev mode, confirm the typeface renders.

### Task 4.3: Commit phase 4

```bash
git add -A
git commit -m "phase-4: image migration to astro:assets, fonts api"
```

---

## Phase 5 — Cleanup, Accessibility & Polish

**Goal:** Dead-code removal, accessibility wins, and remaining type-safety refactors. Nothing here changes visible rendering for the worse; everything either fixes dead UI or adds structure.

**Tasks:**
- 5.1 Remove unused React integration and deps (P1 #5)
- 5.2 Discriminated union for garden's merged entries (P2 #9)
- 5.3 Remove or wire `FeatureBand` (P2 #15)
- 5.4 Inline `NowPage` (P2 #16)
- 5.5 Wire or remove `Nav` hamburger (P2 #18)
- 5.6 Add `aria-pressed` to garden filter buttons (P2 #19)
- 5.7 JSON-LD structured data on essays (P2 #21)
- 5.8 Cross-collection `related` references (P2 #23)
- 5.9 Commit phase 5

### Task 5.1: Remove unused React

**Files:**
- Modify: `astro.config.mjs:6,25` — remove the `react` import and `react()` integration
- Modify: `package.json` — remove `react`, `react-dom`, `@astrojs/react`, `@types/react`, `@types/react-dom`

**Context:** The review verified zero `.tsx`/`.jsx` files and zero `client:*` directives. React is dead weight.

- [ ] **Step 1:** Confirm zero React usage:

```bash
grep -rn "client:" src/ --include="*.astro"
grep -rn "from 'react'" src/ --include="*.tsx" --include="*.jsx" --include="*.astro"
find src/ -name "*.tsx" -o -name "*.jsx"
```

All should return nothing.

- [ ] **Step 2:** Remove from `astro.config.mjs`:

```js
// delete line 6
import react from '@astrojs/react';
// delete `react(),` from the integrations array
```

- [ ] **Step 3:** Remove from `package.json`:

```bash
npm uninstall @astrojs/react react react-dom @types/react @types/react-dom
```

- [ ] **Step 4:** Run `npm run check && npm run build`. Should pass with no changes to output.

### Task 5.2: Discriminated union for garden

**Files:**
- Modify: `src/pages/garden.astro` (lines 103, 108, 111 — four `(entry as any)` casts)

**Context:** The four merged collections have different frontmatter shapes. A discriminated union gives type-safe access via the union tag.

- [ ] **Step 1:** Read `src/pages/garden.astro` to understand the merge logic and where the casts live.

- [ ] **Step 2:** At the top of the file, define:

```ts
import type { CollectionEntry } from 'astro:content';

type EntryType = 'note' | 'essay' | 'talk' | 'pattern';
type MergedEntry =
  | (CollectionEntry<'note'> & { entryType: 'note' })
  | (CollectionEntry<'essay'> & { entryType: 'essay' })
  | (CollectionEntry<'talk'> & { entryType: 'talk' })
  | (CollectionEntry<'pattern'> & { entryType: 'pattern' });
```

- [ ] **Step 3:** When merging collections, attach `entryType`:

```ts
const all: MergedEntry[] = [
  ...(await getCollection('notes')).map(e => ({ ...e, entryType: 'note' as const })),
  ...(await getCollection('essays')).map(e => ({ ...e, entryType: 'essay' as const })),
  ...(await getCollection('talks')).map(e => ({ ...e, entryType: 'talk' as const })),
  ...(await getCollection('patterns')).map(e => ({ ...e, entryType: 'pattern' as const })),
];
```

- [ ] **Step 4:** Replace each `(entry as any)` cast with `(entry as MergedEntry)` (or, after typing the parameter correctly, no cast at all).

- [ ] **Step 5:** Run `npm run check` — it should still pass cleanly with explicit types in place.

### Task 5.3: Remove or wire FeatureBand

**Files:**
- Either delete: `src/components/FeatureBand.astro`
- Or wire it into `src/pages/index.astro`

- [ ] **Step 1:** Confirm `FeatureBand` is unused:

```bash
grep -r FeatureBand src/pages/
```

- [ ] **Step 2:** If unused, delete the file. Run `npm run check && npm run build`. If used somewhere, leave it and skip this task.

### Task 5.4: Inline NowPage

**Files:**
- Modify: `src/pages/now.astro` (replace each `<NowPage>` with the inner section+gutter)
- Delete: `src/components/NowPage.astro`

**Context:** The review found `NowPage.astro` adds only `gap: var(--spacing-5)`. Overhead for one CSS rule.

- [ ] **Step 1:** Read `src/pages/now.astro` to see how `<NowPage>` is used.

- [ ] **Step 2:** Replace each `<NowPage>` with a plain `<section style="display: flex; flex-direction: column; gap: var(--spacing-5);">` (or move the gap to a class).

- [ ] **Step 3:** Delete `src/components/NowPage.astro`.

- [ ] **Step 4:** Run `npm run check && npm run build`.

### Task 5.5: Wire or remove Nav hamburger

**Files:**
- Modify or simplify: `src/components/Nav.astro:44-48`

**Context:** The review found the hamburger button is decorative — no toggle behavior. Either wire a mobile drawer or remove.

- [ ] **Step 1:** Read `Nav.astro` lines 44-48 to confirm the button has no click handler.

- [ ] **Step 2:** Decide: (a) build a minimal mobile drawer with `<details>` / open-state; (b) hide the button at all viewport widths via CSS until a drawer is built; (c) delete the button.

Option (c) is fastest:

```diff
- <button class="nav-burger" aria-label="Open menu">
-   <span></span><span></span><span></span>
- </button>
```

- [ ] **Step 3:** Run `npm run check && npm run build`.

### Task 5.6: aria-pressed on garden filters

**Files:**
- Modify: `src/pages/garden.astro:57, 68, 78`

- [ ] **Step 1:** Read `src/pages/garden.astro` filter buttons.

- [ ] **Step 2:** Add `aria-pressed={activeType === 'All'}` (or whatever the active filter state is named) to each `<button class="topic-chip">`.

- [ ] **Step 3:** Run `npm run check`.

### Task 5.7: JSON-LD on essays

**Files:**
- Modify: `src/pages/essays/[slug].astro`

- [ ] **Step 1:** Read `src/pages/essays/[slug].astro` to find the layout mount and frontmatter.

- [ ] **Step 2:** Inside the essay `<Layout>`, inject JSON-LD:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: entry.data.title,
  datePublished: entry.data.date.toISOString(),
  description: entry.data.lede,
  keywords: entry.data.topics.join(', '),
  mainEntityOfPage: new URL(Astro.url.pathname, Astro.site).href,
})} is:inline />
```

- [ ] **Step 3:** Run `npm run check && npm run build`. Validate JSON-LD via Google's Rich Results test (optional).

### Task 5.8: Cross-collection references

**Files:**
- Modify: `src/content.config.ts` (notes, essays, patterns) — add `related` field
- Optional: add `related: [...]` to a handful of MDX files where natural

**Context:** The graph already shows implicit links (e.g., `design-systems-are-grammar.mdx` ↔ `the-grammar-of-design.mdx`). Make them schema-canonical.

- [ ] **Step 1:** In `src/content.config.ts`, add to each of the three schemas:

```ts
import { reference } from 'astro:content';

// inside schema:
related: z.array(reference('notes')).optional(),
```

(Adjust the collection name to match the parent — `related` on essays can reference essays/notes/patterns/talks; use `reference` per target.)

- [ ] **Step 2:** In a few MDX files where the link is obvious, add `related: ['../talks/the-grammar-of-design']` (full relative path).

- [ ] **Step 3:** Run `npm run check && npm run build`. Use the resolved entries in a `<slot>` or future "See also" footer.

### Task 5.9: Commit phase 5

```bash
git add -A
git commit -m "phase-5: dead code removal, a11y fixes, json-ld, related references"
```

---

## Phase Completion Checklist

After all 5 phases, run:

```bash
npm run check
npm run build
ls -lh dist/
```

Then manually verify:
- Visit `/` in dev mode → check OG tags in `<head>` (view source)
- Click internal nav → confirm soft transition (no full reload)
- Click RSS icon in footer → confirm XML feed renders
- Visit a topic page → confirm WebP/AVIF image served
- Open DevTools → confirm no requests to `fonts.googleapis.com`
- Type a bad topic in a content file → confirm build fails (Phase 2 worked)

## Self-Review Notes

- **Spec coverage:** All 23 review items mapped to a task. P0/P1/P2 distribution preserved.
- **Risk ordering:** Phase 1 is safest, Phase 4 is riskiest. Buildable between phases.
- **Dep ordering:** Phase 1 #1 (Zod import) must precede Phase 2 #1 (Topics enum uses `astro/zod`). Phase 3 #1 (ClientRouter) must precede Phase 5 #6 (aria-pressed on garden, which uses `astro:after-swap`).
- **Gaps:** None identified. Every code change has a verification step (`npm run check` or `npm run build`).

## Execution Handoff

This plan is saved to `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

The plan calls for **subagent-driven execution** (astro-coder per task, review between phases). Proceeding with that approach.
