# Phase 3 Brief — SEO, Meta & View Transitions

This is PHASE 3 of the implementation plan at `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

**Read that plan first.** It is your single source of requirements.

## Phase Goal
Biggest user-visible win. Soft-navigate internal links, surface RSS, add canonical/OG/Twitter meta, noindex the 404.

## Tasks (Phase 3 of the plan)
3.1 Add `<ClientRouter />` to `Layout.astro`
3.2 Add canonical, OG, Twitter meta to `Layout.astro`
3.3 Create RSS feed endpoint at `src/pages/rss.xml.ts`
3.4 Add `<link rel="alternate" type="application/rss+xml">` to `Layout.astro`
3.5 Add `<meta name="robots" content="noindex">` to `src/pages/404.astro`
3.6 Commit phase 3

## Context

- `@astrojs/rss` is in `package.json` (Phase 1 verified it). Use it directly.
- `src/layouts/Layout.astro` has frontmatter that derives `title`/`description` from `Astro.props` — read the file to confirm exact field names.
- `site: 'https://phurix.dev'` is in `astro.config.mjs:9`. Use `Astro.site` in `Layout.astro` for OG URLs.
- `garden.astro:268` (or thereabouts) uses `astro:after-swap` already — adding `<ClientRouter />` activates it.
- `trailingSlash: 'always'` is set, so RSS feed link should end with `/`.

## Verification (binding)

- After each task: `npm run check` exits 0.
- After Task 3.1 (ClientRouter): `npm run build` succeeds.
- After Task 3.3 (RSS feed): `dist/rss.xml` exists and is valid XML.
- After Task 3.4 (RSS alternate link): build succeeds.
- After Task 3.5 (404 noindex): build succeeds.
- Final commit: `phase-3: client router, canonical/og/twitter meta, rss feed, 404 noindex`

## Approach notes

- For OG type: `Astro.url.pathname === '/'` → `'website'`; otherwise → `'article'`.
- For canonical/og:url, use `new URL(Astro.url.pathname, Astro.site).href`.
- The `description` field in Layout is `Astro.props.description` — when it's `undefined`, fall back to a site-default. Consider making `description` non-optional in Props with a default.
- RSS feed: include all essays, sorted by date desc. Use `e.data.lede` as the description. `/essays/${e.id}/` for link.

## Report Contract
Write to `/home/phurix/projects/phurix/.superpowers/sdd/phase-3-report.md`. Return: status, commit hash, summary, `dist/rss.xml` snippet showing one item.

## Project root
`/home/phurix/projects/phurix`
