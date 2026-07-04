# Phase 2 Brief — Schema Tightening & Type Safety

This is PHASE 2 of the implementation plan at `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

**Read that plan first.** It is your single source of requirements.

## Phase Goal
Make the schema the contract. Bad frontmatter should fail at `npm run check`, not at runtime.

## Tasks (Phase 2 of the plan)
2.1 Topics enum (P1) — derive `z.enum` from `RECOGNIZED_TOPICS_TUPLE` in `src/lib/topics.ts` and use it in `notes`, `essays`, `patterns` schemas
2.2 Tighten `coverColor` regex and `link.url()` (P2) — in `books` and `talks` schemas
2.3 Consolidate `TopicKey` type (P2) — delete local declaration in `TopicPhoto.astro:13`, import from `@/lib/topics`
2.4 Remove unused `slug` field (P2) — from `notes`, `essays`, `patterns` schemas (if any frontmatter has `slug:`, either wire `[slug].astro` to use it OR remove from MDX)
2.5 Commit phase 2

## Context

- Phase 1 already split Zod imports: `import { z } from 'astro/zod'`. Use that.
- Phase 1 cleanup touched garden.astro with `(e as any).data.topics`. After Phase 2.1 sets Topics enum, re-check garden.astro still builds.
- `src/lib/topics.ts:17-25` already has `RECOGNIZED_TOPICS` as `TopicKey[]`. **Refactor it to a `RECOGNIZED_TOPICS_TUPLE` const-asserted array** that Zod's `enum` accepts, then derive the rest from it.
- Project root: `/home/phurix/projects/phurix`.

## Verification (binding)

- **After every task**: `npm run check` must exit 0.
- **After Phase 2.1**: search `src/content/` for any MDX that has an unrecognized topic; if any exist, **fix them or report**. Don't leave a known broken state.
- **After every task**: `npm run build` must succeed.
- **Final commit message**: `phase-2: topic enum, coverColor hex, link url, TopicKey consolidation, dead slug removal`

## Risk note
Topic enum tightening will surface typos as build errors. **Do not improvise content changes** — if a topic is unrecognized, report it; the human reviewer decides whether to add the topic or rename.

## Report Contract
Write to `/home/phurix/projects/phurix/.superpowers/sdd/phase-2-report.md`. Return: status, commit hash, brief summary, any unrecognized topics found.
