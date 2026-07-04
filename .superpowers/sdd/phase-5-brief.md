# Phase 5 Brief — Cleanup, Accessibility & Polish

This is PHASE 5 of the implementation plan at `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

**Read that plan first.** It is your single source of requirements.

## Phase Goal
Dead-code removal, accessibility wins, and remaining type-safety refactor. Final polish pass.

## Tasks (Phase 5 of the plan)
5.1 Remove unused React integration + deps (P1) — drop `@astrojs/react`, `react`, `react-dom`, `@types/react*` from `astro.config.mjs` and `package.json`
5.2 Discriminated union for garden's merged entries (P2) — replace `(entry as any)` casts in `garden.astro:38, 102, 103, 108, 110, 111` with type-safe access
5.3 Remove or wire `FeatureBand` (P2) — if unused in pages, delete
5.4 Inline `NowPage` (P2) — replace each `<NowPage>` in `now.astro` with plain `<section>` + gap utility, then delete component
5.5 Wire or remove Nav hamburger (P2) — if no click handler exists, remove the button (cleanest)
5.6 Add `aria-pressed` to garden filter buttons (P2)
5.7 JSON-LD structured data on essays (P2) — `BlogPosting` schema in `src/pages/essays/[slug].astro`
5.8 Cross-collection `related` references (P2) — add `related: z.array(reference('...')).optional()` to notes/essays/patterns schemas
5.9 Commit phase 5

## Context carry-over

- Phase 1 cleanup added `(e as any).data.topics` casts in `garden.astro` as a TEMPORARY fix. Phase 5.2 makes those casts unnecessary by introducing a proper discriminated union — apply aggressively, remove ALL `(as any)` casts in `garden.astro`, including the existing ones from line 103, 108, 111.
- Phase 2 already added topic typed tuple. Phase 5.2 should use it.
- After Phase 5.1 (React removal), the site's React packages are gone. Verify no remaining imports: `grep -rn "from 'react'" src/` and `grep -rn "client:" src/`.
- The `FeatureBand.astro` component file was modified by Phase 1.2 (citation fix). Phase 5.3 deletes it (or wires it — check pages first).
- `NowPage.astro` adds only `gap` styling. Inline = use a plain `<section>` with that styling on it (Tailwind utility or inline style).

## Implementation specifics

### Task 5.1 — React removal

1. Confirm zero consumers: `grep -rn "client:" src/ --include="*.astro"` and `grep -rn "from 'react'" src/`. Both must return nothing.
2. Edit `astro.config.mjs`: remove `import react from '@astrojs/react';` and `react(),` from integrations.
3. `npm uninstall @astrojs/react react react-dom @types/react @types/react-dom`.
4. Verify `npm run check && npm run build` clean.

### Task 5.2 — Discriminated union

In `src/pages/garden.astro`:

1. At the top, add:
   ```ts
   import type { CollectionEntry } from 'astro:content';

   type EntryType = 'note' | 'essay' | 'talk' | 'pattern';
   type MergedEntry =
     | (CollectionEntry<'note'> & { entryType: 'note'; displayDate: Date })
     | (CollectionEntry<'essay'> & { entryType: 'essay'; displayDate: Date })
     | (CollectionEntry<'talk'> & { entryType: 'talk'; displayDate: Date })
     | (CollectionEntry<'pattern'> & { entryType: 'pattern'; displayDate: Date });
   ```
2. When merging collections, attach `entryType` and `displayDate`:
   ```ts
   const allEntries: MergedEntry[] = [
     ...(await getCollection('notes')).map((e) => ({ ...e, entryType: 'note' as const, displayDate: e.data.date })),
     ...(await getCollection('essays')).map((e) => ({ ...e, entryType: 'essay' as const, displayDate: e.data.date })),
     ...(await getCollection('talks')).map((e) => ({ ...e, entryType: 'talk' as const, displayDate: e.data.date })),
     ...(await getCollection('patterns')).map((e) => ({ ...e, entryType: 'pattern' as const, displayDate: e.data.date })),
   ].sort((a, b) => b.displayDate.getTime() - a.displayDate.getTime());
   ```
3. In the rendering block, **remove all `(entry as any)` casts**. Use TypeScript narrowing via `entry.entryType`:
   - `topics`: now safely accessible via `entry.data.topics ?? []` once union is typed (Zod default is `[]` so should always exist).
   - `lede`, `excerpt`, `description`, `growthStage`: use `entry.entryType === 'note' ? entry.data.growthStage : ...` pattern with explicit branches for each type's actual shape.

   The discriminated union may still need a tiny `if (entry.entryType === '...')` narrowing at use-sites — that's correct TypeScript, not a cast.

### Tasks 5.3–5.7

Follow the plan verbatim. For 5.5 (hamburger removal), prefer the cleanest option: delete the button entirely.

### Task 5.7 — JSON-LD

In `src/pages/essays/[slug].astro`, inject inside `<Layout>`:

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

### Task 5.8 — `related` references

In `src/content.config.ts`, add `related: z.array(reference('notes')).optional()` (or appropriate collection) to notes, essays, patterns schemas. Don't add `related:` frontmatter to any MDX — leave that for a future content pass. Just define the schema.

## Verification (binding)

- After each task: `npm run check` exits 0.
- After Task 5.1 (React removal): zero `from 'react'` references and zero `client:*` directives in `src/`.
- After Task 5.2: ALL `(as any)` casts removed from `garden.astro` (the pre-existing 6 plus the 3 added by Phase 1 cleanup at lines 38, 102, 110).
- After Task 5.5: Nav burger button removed or wired.
- After Task 5.7: `dist/essays/*/index.html` contains the `application/ld+json` script with `BlogPosting`.
- After Task 5.8: schemas accept `related:` without build failure.
- Final commit: `phase-5: dead code removal, a11y fixes, json-ld, related references`

## Risk

- **Task 5.1 (React removal)**: if any consumer is found, STOP and report. Don't uninstall.
- **Task 5.2 (discriminated union)**: Some `as any` casts may need to stay if schemas have genuinely different shapes that aren't discriminating cleanly. Use narrowing instead of casts where possible. Document any that must stay.

## Report Contract
Write to `/home/phurix/projects/phurix/.superpowers/sdd/phase-5-report.md`. Return: status, commit hash, summary, count of remaining `(as any)` casts in `src/pages/garden.astro`, any tasks that were skipped with reason.

## Project root
`/home/phurix/projects/phurix`
