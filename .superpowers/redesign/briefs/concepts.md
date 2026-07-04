# Brief — `/concepts`

**Route:** `/concepts`
**File:** `src/pages/concepts.astro`
**One-line job:** A glossary of recurring terms the author uses across essays (per Stratechery §7).

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §3 (surfaces to add) and §8 (nav):

- Author-curated markdown glossary.
- Examples seeded: *affordance, design token, vibe shift, interface grammar, second-order effect, digital garden, type system*.
- Lives in markdown, not a collection — keep it cheap.
- Link in the footer (per proposal §8 — "Concepts is in the footer center-cluster link list").
- Frap **stays**.

---

## 2. Sections, top to bottom

### Section 1 — Page header

- `.page-header-section` (modeled after `/patterns/index.astro`). Padding-block `var(--spacing-7) var(--spacing-5)`. Background `var(--color-neutral-warm)`. Bottom border `1px solid var(--color-hairline)`.
- Eyebrow `<p class="section-eyebrow">Glossary</p>` — Inter 600, uppercase, `--tracking-loose`, `--color-starbucks-green`, `--text-small`.
- `<h1 class="page-title">Concepts</h1>` — Inter 600, **fluid `clamp(3.6rem, 6vw + 1rem, 4.5rem)`**, color `var(--color-starbucks-green)`. Standard page h1.
- Lede: `A short, evolving glossary of terms I use across essays. Definitions are mine — they may not match canonical usage.` (Lora, `--text-body-lg`, `max-width: 60ch`.)

### Section 2 — Glossary list

- Container: `.container-phx`, padding-block `var(--spacing-6)`.
- Render as `<dl class="concept-list">` with each entry a `<div class="concept-item">` wrapping `<dt>` + `<dd>`.
- Each entry:
  - `<dt class="concept-term">{term}</dt>` — Inter 600, `--text-h1`, color `--color-starbucks-green`. (Larger than a regular term — these are the canonical concepts.)
  - `<dd class="concept-definition">{definition}</dd>` — Lora, `--text-prose` (18px), `line-height: 1.65`, color `--color-text-black`, max-width `65ch`.
- Hairline divider between items: `border-bottom: 1px solid var(--color-hairline)` on each `.concept-item`, with the first item also having a top hairline (matches `/now` styling).
- Visual rhythm matches `/now` — same hairline-divided `<dl>` pattern.

### Seed concepts

Implementer pre-fills with 6-8 entries. Each term gets 1-2 sentences. The proposal names seven candidates:

1. **Affordance.** A property of an object that suggests how it can be used. Coined by J. J. Gibson, popularized in design by Don Norman. In interface work, the affordance is the perceived action the element invites — a button that *looks* pressable.
2. **Design token.** A named, reusable value (a color, a spacing, a radius) that captures a design decision in a single variable. Tokens are the smallest unit of a design system. The grammar's vocabulary.
3. **Vibe shift.** A sudden change in the cultural mood — aesthetic, linguistic, attitudinal — that renders the previous register stale. In interface design, this looks like a wholesale replacement of visual conventions over ~3-5 years.
4. **Interface grammar.** The implicit rules a design system uses to compose UI: which components nest inside which, which colors travel together, which spacing scales with which density. Tokens are the alphabet; grammar is the syntax.
5. **Second-order effect.** A consequence of a consequence. The thing that happens *because of* the thing that happens. In systems work, second-order effects are usually where the actual leverage lives — first-order effects are usually the ones the proposer of a change already saw.
6. **Digital garden.** A site that grows in public over time, where pieces are added, revised, and returned to — never removed from the archive. Tended rather than published. The opposite of a feed.
7. **Type system.** The full stack of typographic decisions a publication makes: which faces, which sizes, which weights, which pairings, which tracking rules. The type system is what makes a publication feel like itself across many pages.

(Implementer: these 7 are sufficient for v1. The author can add more later.)

---

## 3. New or modified components required by this page

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Modified | New 7-item navLinks. |
| `Footer.astro` | Modified | Three-cluster restructure (Concepts IS in the center-cluster link list). |
| `Frap.astro` | Modified | Default label change. |

No new components. **No new content collections** — `/concepts` is a single `.astro` page with inline JSX (the glossary is hardcoded in the page).

---

## 4. Content additions needed

- **NEW `src/pages/concepts.astro`** — single Astro page.
- **Inline JSX** with the 7 seed entries (see §2 above). Mark with TODO comments so the author can add or revise.

---

## 5. Edge cases / decisions left to the implementer

- **Markdown vs JSX** — proposal says "lives in markdown, not a collection." Two options:
  1. Inline JSX in `src/pages/concepts.astro` — simple, the 7 entries are visible in the page file.
  2. Separate `src/content/concepts/concepts.mdx` rendered via `<Content />`.

  **Decision: option 1 (inline JSX).** Adding a new MDX collection for one page with 7 entries is overkill. The author can later extract to MDX if the glossary grows past 15-20 entries.
- **Entry count** — proposal says "6-8 terms" seeded. Ship 7. Document the count in a comment.
- **Cross-links** — each definition may reference essays that use the term. **Decision: SKIP cross-links in v1.** Definitions are self-contained. Cross-linking adds complexity (frontmatter per entry pointing to related essays) and the author can add this later.
- **Sort order** — alphabetical (matches the proposal's examples). Sort by `term.toLowerCase()` ascending.
- **No photos, no JSON-LD.**

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` produces `dist/concepts/index.html`.
- Visiting `/concepts` shows: page header (Glossary eyebrow + Concepts h1 + Lora lede), 7 hairline-divided concept entries, each with a green Inter 600 term and a Lora definition.
- The list is sorted alphabetically.
- The page is reachable from the footer center-cluster link list.
- The page is NOT in the top nav.
- Frap visible with label "Email me".
- `:focus-visible` visible on every link.