# Phase 1 Cleanup Report

## Status: SUCCESS

`npm run check` now exits **0** with **0 errors**. `npm run build` succeeds (36 pages built).

## Commit

`24150baaa6f5bcd3809f7b0b3185fd506688d01e`

```
phase-1-cleanup: minimal type fixes to make npm run check meaningful
```

## Summary of changes (4 files, +13 / -9 lines)

### `/home/phurix/projects/phurix/src/pages/garden.astro`
- **Line 38** (`topics` union error): cast to any inside `flatMap`: `(e as any).data.topics ?? []`
- **Line 88** (`id` not in CollectionGrid Props): wrapped with `<div id="entries-grid">…</div>` rather than touching `CollectionGrid.astro` (minimal — no prop surface change). The `getElementById('entries-grid')` script still resolves.
- **Line 102** (`topics` on union): `(entry as any).data.topics ?? []`
- **Line 110** (`topics` on union): `(entry as any).data.topics` — used in `<GardenCard topics=…>`
- **Line 212** (`grid is possibly null` after guard): used `grid!.querySelectorAll(…)` — non-null assertion since `if (!grid) return;` already narrows at runtime.
- **Lines 234-243** (`btn.dataset` errors — `btn` typed `Element | null`): cast `closest(...) as HTMLElement | null`, guard retained.

### `/home/phurix/projects/phurix/src/pages/essays/[slug].astro`
- **Line 57** (`entry.body possibly undefined`): `(entry.body ?? '').split(/\s+/).length / 220`. Nullish coalesce preserves existing read-time math (essay with no body → 0 words → "1 min read").

### `/home/phurix/projects/phurix/src/layouts/Layout.astro`
- **Line 3** (`@fontsource-variable/inter` has no .d.ts): added `// @ts-expect-error — @fontsource-variable/inter ships JS-only with no types` above the import line. The `@ts-expect-error` is targeted exactly at the JS-only-no-types issue described in the brief.

### `/home/phurix/projects/phurix/tsconfig.json`
- Added `"ignoreDeprecations": "6.0"` to `compilerOptions`. This silences the pre-existing `TS5101` warning (about `baseUrl` being deprecated in TS 7.0) that surfaced once the 13 real errors were cleared. Without this, `tsc --noEmit` was exiting non-zero and `npm run check` was still failing — which would defeat the "meaningful verification gate" goal of this phase.
- No `paths` change; the `@/*` alias still resolves to `src/*`.

## Verification

```
$ npm run check
…
Result (35 files):
- 0 errors
- 0 warnings
- 6 hints      (pre-existing unused-import / unused-var hints; not in scope)
EXIT: 0

$ npm run build
…
[build] 36 page(s) built in 2.66s
[build] Complete!
EXIT: 0
```

The 6 hints are pre-existing unused-variable warnings (`titleWords`, `Props`, `color`, `i`, `TopicChip`, `allTalks`) and are out of scope for this phase. They are *hints* (not errors or warnings) and don't fail the check.

## Brief compliance

- **MINIMAL scope:** every patch is the smallest possible touch. No discriminated-union refactor for `allEntries` (Phase 5.2 territory). `(e as any)` style matches existing `(entry as any)` patterns already in the file.
- **No files touched outside the three listed in the brief** plus `tsconfig.json` for the unavoidable `TS5101` issue that only became visible once the original 13 errors were fixed.
- **`// @ts-expect-error`** used exactly as the brief instructed for `@fontsource-variable/inter`.

## Notes for downstream phases

- Phase 5.2 (discriminated union for garden entries) will eliminate the remaining `(e as any).data.topics` casts on lines 38, 102, 110.
- The 6 unused-variable hints in `BookTile.astro`, `Card.astro`, `GrowthBadge.astro`, `Timeline.astro`, `garden.astro`, and `index.astro` could be cleaned up in a follow-up phase (each is a one-line removal) but are not blockers for `npm run check` today.
