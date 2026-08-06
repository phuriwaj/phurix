# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` — Astro dev server on 0.0.0.0
- `npm run build` — static site build (`output: "static"` in astro.config.mjs)
- `npm run check` — `astro check && tsc --noEmit` (typecheck; no separate lint)
- Node ≥ 22.12 required (see `engines` in package.json)
- `graphify` is available project-wide; `graph.json` and `GRAPH_REPORT.md` exist in `graphify-out/` and include both code and content collections

## Architecture
- **Astro 7 static site** (`output: "static"`), Tailwind 4 via Vite, MDX content, React integration mounted for islands only
- **Path alias**: `@/*` → `src/*` (declared in both `tsconfig.json` and `astro.config.mjs` vite.alias)
- **5 content collections** defined in `src/content.config.ts`: `books`, `essays`, `notes`, `patterns`, `talks` (all MDX, glob-loaded from `src/content/<name>/`). Each has a Zod schema; field shapes vary per collection (e.g. `notes` has `growthStage`, `books` has `coverColor`).
- **Page model**: every page in `src/pages/` imports `@/layouts/Layout.astro` (the universal chrome — nav/footer/global styles). Pages render content via components in `src/components/`.
- **Topic system**: `src/lib/topics.ts` is the single source of truth for recognized topics. The `RECOGNIZED_TOPICS` list there is the contract for `topics: z.array(z.string())` in content schemas — adding a topic means updating this file *and* adding a corresponding photo in `src/assets/photos/` (imported via `astro:assets`; build-time WebP, hashed, responsive).

## Design system coupling
- **Two source-of-truth docs**:
  - `DESIGN.md` — design rationale, theory, history (the "why")
  - `DESIGN_GUIDE.md` — developer-facing token/component table (the "how")
- **Tokens are CSS variables** in `src/styles/theme.css`; Tailwind 4 utilities surface them automatically. To change a token, edit `theme.css` and the `DESIGN_GUIDE.md` table.
- **Component headers cite DESIGN.md by section number** (e.g. `Button.astro` opens with `"Variants (mapped 1:1 to DESIGN.md §4)"`, `FeatureBand.astro` references §5, `theme.css` references DESIGN.md as authoritative). When a design change lands, search for these citations and update the implementation to match.
- The graphify graph has a community (`graphify-out/GRAPH_REPORT.md`, "Design System ↔ Implementation Bridge", C9 in deep mode) that explicitly maps `implements` edges from components to DESIGN.md concepts — useful for verifying a design change propagated correctly.

## Conventions
- Comments are load-bearing: the file-header JSDoc-style block on every component documents variants, sizes, and the design-doc section it implements. Don't strip these.
- `astro:content` and `astro/loaders` (glob loader) are the only `astro:` imports used. New collections should follow the pattern in `src/content.config.ts`.
- The repo is a single-author site (no tests, no CI config, no `.env` files, no `README.md`).
