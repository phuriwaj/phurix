# Brief — `/projects`

**Route:** `/projects`
**File:** `src/pages/projects.astro`
**One-line job (from proposal §4):** A short shelf of side projects.

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §4 (`/projects`) and §9:

- **Migrate the hardcoded `projects` array** in `src/pages/projects.astro` to a `projects` content collection.
- This page is **NOT in the top nav** (per Sloan — projects accessible via `/about` and the URL).
- Page still exists at `/projects` with a `<h1>`, lede, and project grid.
- A "more on github" link at the bottom.

---

## 2. Sections, top to bottom

### Section 1 — Header

- `.container-phx`, padding-block `var(--spacing-7) var(--spacing-5)`.
- Eyebrow `<p class="section-eyebrow">Projects</p>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-small`.
- `<h1 class="page-title">Projects</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. **Upgrade from `--text-hero-large` to `--text-jumbo` fluid.**
- Lede `<p class="page-lede">` — Lora, `--text-body-lg`, color `--color-text-black-soft`, `max-width: 60ch`. Existing copy kept.

### Section 2 — Project grid

- `<div class="project-grid">` — 1 col mobile, 2 col ≥768px (existing CSS).
- **Source data: `getCollection('projects')`** (NEW collection, see `_shared-moves.md` §12). Sort by `year` desc (null years last).
- For each entry, render a `<Card emphasis="lifted">`:
  - `<h2 class="project-title">{title}</h2>` — Inter 600, `--text-h1`, `--color-starbucks-green`.
  - `<p class="project-desc">{desc}</p>` — Lora (NEW: was sans; switch to Lora `--text-body`, color `--color-text-black-soft`, line-height 1.6, to match the proposal's "one-paragraph desc" register).
  - Tag row: `<div class="tag-row">` of `<span class="tag">` chips. Existing tag chip CSS kept.
  - Optional CTA: if the frontmatter has `url`, render `<Button variant="outline" size="sm" href={url} target="_blank" rel="noopener noreferrer">View project →</Button>`. Otherwise render no CTA (the desc alone is enough).

### Section 3 — "More on GitHub" link

- Below the grid, `<p class="projects-more">More on <a href="https://github.com/phurix" target="_blank" rel="noopener noreferrer">github.com/phurix</a>.</p>` — Lora, `--text-body`, color `--color-text-black-soft`. Margin-block-start: `var(--spacing-6)`, centered or left-aligned (decide visually — implementer default: left-aligned to match the page-lede alignment).

### Frap

- **Stays.** Label "Email me" (per `_shared-moves.md` §12).

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `projects` collection | **NEW** | `src/content/projects/` with 4 MDX entries (`flyed.mdx`, `cafe-console.mdx`, `barista-cli.mdx`, `steam-notes.mdx`). |
| `Nav.astro` | Modified | New 7-item navLinks (Projects still NOT in nav). |
| `Footer.astro` | Modified | Three-cluster restructure (Projects IS in footer's center-cluster link list). |
| `Frap.astro` | Modified | Default label change. |

### Schema (in `src/content.config.ts`)

```ts
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    tags: z.array(z.string()).default([]),
    year: z.number().optional(),
    url: z.string().url().optional(),
  }),
});
// add to exports.collections
```

---

## 4. Content additions needed

- **NEW directory `src/content/projects/`** with 4 MDX files. Each carries the existing hardcoded data:
  - `flyed.mdx` — title "flyed", desc "Educational platform connecting schools with field trip providers. Astro + React, edge-rendered, optimized for slow networks.", tags `['Astro', 'React', 'Cloudflare']`. **No `url` for v1.**
  - `cafe-console.mdx` — title "café console", desc "A static dashboard for indie café owners. Built with Astro and React 19. Calm typography, fast loads.", tags `['Astro', 'Tailwind', 'MDX']`. **No `url` for v1.**
  - `barista-cli.mdx` — title "barista cli", desc "Rust-powered scaffolder for greenfield web projects. One command, opinionated defaults.", tags `['Rust', 'CLI']`. **No `url` for v1.**
  - `steam-notes.mdx` — title "steam notes", desc "A small editor for the things you read while your coffee cools. End-to-end encrypted drafts.", tags `['TypeScript', 'IndexedDB']`. **No `url` for v1.**
- **Register `projects` in `src/content.config.ts`** with the schema above.
- Each MDX body can be empty (the desc lives in frontmatter) OR can be a one-paragraph elaboration of the project. **Decision: keep bodies empty for v1** (the desc in frontmatter is the full project summary; no body needed).

---

## 5. Edge cases / decisions left to the implementer

- **Old hardcoded array removal** — once the collection is wired, remove the `const projects = [...]` array from the page. Verify no other page references it.
- **Empty projects case** — if the collection has zero entries, render a single line: `No projects to show — check back soon.` (Lora italic, `--text-body`, `--color-text-black-soft`).
- **Card emphasis** — `<Card emphasis="lifted">` is what the current implementation uses; keep. The `lifted` class triggers the existing `translateY(-2px)` hover.
- **Year sort** — sort by `year` desc, null years at the end. **Decision: simple comparator that puts `undefined` after defined years**:
  ```ts
  const sortedProjects = allProjects.sort((a, b) => {
    const ay = a.data.year ?? 0;
    const by = b.data.year ?? 0;
    return by - ay;
  });
  ```
  Since all four projects currently lack a `year`, this is effectively unsorted — **the implementer should ALSO add a `year` field to the frontmatter for each project** (the current copy doesn't include years; the implementer should ask the author or use plausible years like 2024/2025). **DECISION: leave `year` undefined for v1** and sort by `title` ascending as a fallback to keep order stable. Document this in a TODO comment.
- **`url` field** — schema accepts it; all four current projects lack it; no CTAs render. The author can add `url` later to specific projects.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/projects/index.html`.
- Visiting `/projects` shows: header (green jumbo h1 "Projects"), project grid with 4 cards (each with title, desc, tag row, no CTA), and the "More on github" footer line.
- The `projects` collection is registered in `src/content.config.ts` and exports correctly.
- The hardcoded `const projects = [...]` array is removed from the page.
- No `<Projects />` import; the page fetches via `getCollection('projects')`.
- The Frap is visible with label "Email me".
- The page is NOT in the top nav (verify by checking `Nav.astro`).
- The page IS in the footer center-cluster (verify `Footer.astro` Cluster 2 link list).
- `:focus-visible` visible on the GitHub link in the "More on" line.