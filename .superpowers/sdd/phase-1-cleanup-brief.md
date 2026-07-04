# Phase 1 Cleanup — Pre-existing TypeScript errors that block `npm run check`

## Goal
`npm run check` is the project's declared verification gate (per `package.json` and the implementation plan). It has been failing because:
1. `@astrojs/check` and `typescript` were not installed (now installed via `npm install --save-dev`)
2. Once installed, 13 pre-existing type errors surface that `npm run build` masks

This cleanup fixes the pre-existing errors with **minimal scope-creep**: we are NOT refactoring garden.astro into a discriminated union (that's Phase 5.2). We ARE adding the smallest touches that make `npm run check` produce a meaningful result.

## Scope: minimal type-safety patches

The errors and their minimal fixes:

### File 1: `src/pages/garden.astro`
- **Lines 38, 102, 110**: `Property 'topics' does not exist on type ...` — the merged entry's `data.topics` is on a union. Add `(e as any).data?.topics` consistent with surrounding patterns OR type each entry with `as any`. Pick one approach and apply consistently.
- **Line 212**: `'grid' is possibly 'null'` — `grid` is from `getElementById` which returns `HTMLElement | null`. The `if (!grid) return;` two lines up narrows it. Use `grid!` (non-null assertion) since the null check is already done.
- **Lines 234, 238, 239, 242, 243**: `btn.dataset` — `btn` is `Element | null`. After the `if (!btn) return;` guard, it's still typed as `Element`, not `HTMLElement`. Change `const btn = ...` to `const btn = (...).closest(...) as HTMLElement | null;` and the guard to `if (!btn) return;`.
- **Line 88** (potential): `CollectionGrid cols={3} gap="md"` — check the component's prop types; if `gap` should be a union, use a valid value. If types disallow `id`, cast or remove.

### File 2: `src/pages/essays/[slug].astro`
- **Line 57**: `entry.body is possibly 'undefined'` — wrap in `entry.body?.split(/\s+/)?.length ?? 0` or use optional chain.

### File 3: `src/layouts/Layout.astro`
- **Line 3**: `Cannot find module or type declarations for side-effect import of '@fontsource-variable/inter'` — this package ships JS only, no types. Wrap with `// @ts-expect-error` or use a `declare module` shim. Pick the cleanest.

## Constraints
- **MINIMAL scope.** Don't refactor garden.astro into a discriminated union (Phase 5.2). Don't restructure components. Just add the smallest touches.
- **DO** preserve existing patterns (the file already uses `(entry as any)` liberally — match that style).
- **Verify:** `npm run check` returns 0 errors. `npm run build` still succeeds.

## Report Contract
Write to `/home/phurix/projects/phurix/.superpowers/sdd/phase-1-cleanup-report.md`. Return status, commit hash, brief summary.

## Commit message
`phase-1-cleanup: minimal type fixes to make npm run check meaningful`
