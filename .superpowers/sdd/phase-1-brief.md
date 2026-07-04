# Phase 1 Brief — Foundation & Correctness

This is PHASE 1 of the implementation plan at `docs/superpowers/plans/2026-07-04-phurix-improvements.md`.

**Read that plan file first.** It is your single source of requirements.

## Phase Goal
Eliminate the P0 deprecation warning and apply the safest one-off cleanups. Lowest risk; nothing here touches runtime behavior.

## Tasks (all in Phase 1 of the plan)
1.1 Fix Zod import path (P0) — `src/content.config.ts:1`
1.2 Fix FeatureBand DESIGN.md citation (P1) — `src/components/FeatureBand.astro:82`
1.3 Add Mastodon to Footer (P1) — `src/components/Footer.astro:7-28`
1.4 Prune stale DESIGN_GUIDE.md component map (P1) — `DESIGN_GUIDE.md:234-244`
1.5 Delete unused `tailwind.config.mjs` (P2)
1.6 Declare `trailingSlash` policy (P2) — `astro.config.mjs`
1.7 Commit phase 1

## Project Context
- Astro 7 static site, Tailwind 4 via Vite, MDX content
- Path alias: `@/*` → `src/*`
- Node ≥ 22.12, `npm run check` = `astro check && tsc --noEmit`
- No tests, no CI — verification is `npm run check && npm run build`
- Repo on `master`. Single author.
- IMPORTANT: First-read file states are current in this conversation; re-Read any file before editing per harness rules.

## Global Constraints (binding)
- `npm run check` must pass with zero errors after every task
- `npm run build` must succeed after every task
- Do NOT touch files outside Phase 1 scope unless strictly required
- Commit message format: `phase-1: <short summary>` (single commit at end per skill convention)
- If a task can't be done as specified, STOP and report why — don't improvise

## Report Contract
Write your full report to `/home/phurix/projects/phurix/.superpowers/sdd/phase-1-report.md`. Return only:
- Status: DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED
- Commit hash(es)
- One-line summary of what changed
- Any concerns (briefly)

The report file should contain for each task:
- File(s) touched
- Brief diff summary
- Verification command run + result
