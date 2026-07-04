# Phase 4 Brief — Performance Refactors

This is PHASE 4 of the implementation plan at `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

**Read the plan first.** It is your single source of requirements.

## Phase Goal
Largest measurable wins. Image migration to `astro:assets` for AVIF/WebP and responsive `srcset`. Fonts API to drop Google Fonts CDN runtime DNS.

## Tasks (Phase 4 of the plan)
4.1 Migrate topic photos (and any other JPEG usage) from `<img src="/photos/...">` to `<Image />` from `astro:assets` with `format="webp"` and responsive `widths`
4.2 Migrate Lora + Kalam from Google Fonts CDN to Astro Fonts API (build-time download)
4.3 Commit phase 4

## Context

- **Image locations** to migrate:
  - `src/components/TopicPhoto.astro` lines ~90-95 (every garden entry's art)
  - `src/components/GardenCard.astro` line 55 (entry art)
  - `src/components/Card.astro` line 41 (optional image)
  - `src/components/FeatureBand.astro` line 57 (band media)
  - Any other `<img src="/photos/...">` found via `grep -rn 'src="/photos' src/`
- **Image inventory**: 7 topic JPEGs in `public/photos/` (design, writing, tools, systems, web-development, anthropology, ai; ~847KB total).
- **Font sources**:
  - Currently `src/layouts/Layout.astro:32-37` loads Lora + Kalam from `fonts.googleapis.com`.
  - Inter is via `@fontsource-variable/inter` (kept as-is).
  - `DESIGN_GUIDE.md` line ~264 mentions Inter as `@fontsource-variable/inter`. Lora and Kalam are not in DESIGN_GUIDE.

## Implementation specifics

### Task 4.1 — Image migration

1. **Inventory first**: `ls public/photos/` and `grep -rn '/photos' src/ --include="*.astro"`.
2. **Move images**: `mkdir -p src/assets/photos && mv public/photos/*.jpg src/assets/photos/`.
3. **Update components** to use `<Image />`:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import designJpg from '@/assets/photos/design.jpg';
   // etc., one import per topic key
   ---

   <Image
     src={designJpg}
     alt={alt ?? ''}
     loading="lazy"
     decoding="async"
     format="webp"
     widths={[400, 800, 1200]}
     sizes="(min-width: 1024px) 800px, 100vw"
   />
   ```
4. For the **topic photos used in TopicPhoto**, the lookup is by `topic` key — preserve that logic while replacing the rendering.
5. For **Card.astro:41** (optional image) and **FeatureBand.astro:57** (band media) — these may use different photo paths. Investigate and migrate if they're `/photos/...` JPEGs.
6. **For decorative images**: add `alt=""`.
7. **Verify**: `npm run build` produces `.webp` (and maybe `.avif`) variants in `dist/_astro/`. Compare sizes pre/post if possible.

### Task 4.2 — Fonts API migration

**IMPORTANT**: Before implementing, **verify the current Astro 7 Fonts API syntax** by reading the project's Astro version and checking docs (the plan has example code but it's untested). The Astro Fonts API has evolved — use `astro:assets` font system per the actual installed Astro version.

1. Read `node_modules/astro/package.json` to confirm Astro 7.x version.
2. Check the available APIs: `grep -rn 'fontProviders\|export.*Font' node_modules/astro/dist/ 2>/dev/null | head -20` to see what's exported.
3. **If the Astro Fonts API exists in this version**:
   - Add `fonts` config to `astro.config.mjs`.
   - Replace Layout's Google Fonts `<link>` with `<Font />` components.
4. **If the API is unavailable** (e.g., behind `experimental` flag or absent in v7.0.3):
   - **Report and stop** — the implementation will need to wait for API confirmation. **DO NOT** improvise a non-existent API.
   - Leave Lora + Kalam on Google Fonts CDN; don't regress.

## Verification (binding)

- After Task 4.1: `npm run check` exits 0, `npm run build` succeeds, `dist/_astro/` contains `.webp` files, and the topic photos render in `dist/` HTML with `srcset`/`.webp` URLs.
- After Task 4.2: Same, AND Layout HTML should reference local font files (NOT `fonts.googleapis.com`).
- Final commit: `phase-4: image migration to astro:assets, fonts api`

## Risk
Task 4.2 may fail because the Astro Fonts API syntax is uncertain for v7.0.3. **Report and stop** rather than improvise.

## Report Contract
Write to `/home/phurix/projects/phurix/.superpowers/sdd/phase-4-report.md`. Return: status, commit hash, summary, **whether Task 4.2 was completed or blocked**, and the size diff of `dist/_astro/` before/after images.

## Project root
`/home/phurix/projects/phurix`
