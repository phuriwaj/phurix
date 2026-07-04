# Brief — Blogroll Data Module

**Route:** N/A — the blogroll is a footer surface, not its own URL.
**File:** `src/data/blogroll.ts`
**One-line job:** A hand-curated list of 20-30 sites the author reads, surfaced inside the footer as a `<details>` collapse (per Kottke §8 and proposal §8).

> **Read first:** `_shared-moves.md`.

---

## 1. Page-specific decisions

From `design-proposal.md` §8 (footer cluster 2b) and proposal §10 rejected ideas:

- Blogroll lives **in the footer**, not as its own page (per Kottke §8, per proposal §8 explicitly: "Blogroll lives in the footer (per Kottke §8), not as its own page — 20-30 hand-picked sites in a `<details>` collapse so it doesn't overwhelm the page.").
- **DO NOT create `src/pages/blogroll.mdx` or `src/pages/blogroll.astro`.** The blogroll is a data module rendered into the footer.
- The footer Cluster 2 link list includes an inline link labeled `Blogroll` that is actually a `<details><summary>Blogroll</summary>...</details>` element. Clicking the summary expands the inline list of sites.
- 20-30 hand-picked sites seeded by the implementer.

---

## 2. Sections (the data module)

`src/data/blogroll.ts`:

```ts
/**
 * Blogroll — 20-30 hand-picked sites the author reads.
 * Rendered inside the footer as a <details> collapse (per Kottke §8).
 * Cite as: DESIGN.md §8 (footer — blogroll).
 */
export interface BlogrollEntry {
  /** Display name. */
  name: string;
  /** URL (external). */
  url: string;
  /** Optional one-line description. */
  blurb?: string;
}

export const blogroll: BlogrollEntry[] = [
  // 20-30 entries follow. Implementer seeds; author curates post-build.
];
```

### Seed entries (suggested starting set)

Implementer pre-fills with 20 entries drawn from the author's likely reading list. **Decision: use a known-curated set of personal sites that align with the proposal's design × writing × technology × anthropology positioning.** Examples (implementer may adjust):

```ts
{ name: 'Robin Sloan', url: 'https://www.robinsloan.com', blurb: 'Lab notes from the author of Mr. Penumbra.' },
{ name: 'Maggie Appleton', url: 'https://maggieappleton.com', blurb: 'Digital garden; invented the patterns genre.' },
{ name: 'Craig Mod', url: 'https://www.craigmod.com', blurb: 'Books, essays, photo-essays. A walking library.' },
{ name: 'Andy Matuschak', url: 'https://notes.andymatuschak.org', blurb: 'Evergreen notes. The canonical working-out-loud site.' },
{ name: 'Paul Graham', url: 'https://paulgraham.com', blurb: 'Essays since 1998. The ur-stream.' },
{ name: 'Stratechery', url: 'https://stratechery.com', blurb: 'Tech strategy newsletter; pays for itself.' },
{ name: 'Kottke.org', url: 'https://kottke.org', blurb: 'Home of fine hypertext products since 1998.' },
{ name: 'Frank Chimero', url: 'https://frankchimero.com', blurb: 'The Shape of Design; the web\'s grain.' },
{ name: 'Andrew Sullivan', url: 'https://andrewsullivan.substack.com', blurb: 'The Weekly Dish. Long-form essays and linkblog.' },
{ name: 'Derek Sivers', url: 'https://sive.rs', blurb: 'Personal database of short posts. Hell yeah or no.' },
{ name: 'The Marginalian', url: 'https://themarginalian.org', blurb: 'Maria Popova on culture, books, art.' },
{ name: 'Manuel Moreale', url: 'https://manuelmoreale.com', blurb: 'People and Blogs interview series.' },
{ name: 'Tom Critchlow', url: 'https://tomcritchlow.com', blurb: 'Move. Think. Create.' },
{ name: 'Austin Kleon', url: 'https://austinkleon.com', blurb: 'Steal like an artist. Newspaper-blackout poetry.' },
{ name: 'Gwern.net', url: 'https://www.gwern.net', blurb: 'Encyclopedic essays. The dark-mode standard.' },
{ name: 'Quinn Tonkin', url: 'https://tonesandtones.com', blurb: 'Writing on design, semiotics, and being a generalist.' },
{ name: 'Simone Cicero', url: 'https://boundaryless.io', blurb: 'Platform thinking; communities of practice.' },
{ name: 'Erika Hall', url: 'https://conversationaldesign.com', blurb: 'Conversational design; Just Enough Research.' },
{ name: 'Adrian Hon', url: 'https://adrianhon.substack.com', blurb: 'Games, narrative, design history.' },
{ name: 'Michael Caillou', url: 'https://michaelcaillou.com', blurb: 'Design and product writing.' },
```

(20 entries seeded; author can add/remove post-build. Mark with TODO comment.)

---

## 3. Rendering contract (footer integration)

The blogroll is rendered by `Footer.astro` Cluster 2 as a `<details>` block. The summary is the visible "Blogroll" text (replacing the inline link in the cluster's link list). On open, render a `<ul>` of `{ name → url }` entries, optionally with a 1-line blurb.

**CSS treatment (in Footer.astro's `<style>`):**

```css
.blogroll-details {
  margin-block-start: var(--spacing-3);
}
.blogroll-details summary {
  cursor: pointer;
  list-style: none;
  color: var(--color-text-white-soft);
  font-size: var(--text-small);
}
.blogroll-details summary:hover {
  color: var(--color-text-white);
}
.blogroll-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-2) 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-1);
}
@media (min-width: 768px) {
  .blogroll-list { grid-template-columns: repeat(2, 1fr); }
}
.blogroll-list a {
  color: var(--color-text-white-soft);
  font-size: var(--text-small);
  text-decoration: none;
  transition: color var(--duration-button) ease;
}
.blogroll-list a:hover { color: var(--color-text-white); }
.blogroll-blurb {
  color: var(--color-text-white-soft);
  opacity: 0.7;
  font-size: var(--text-micro);
  margin-inline-start: var(--spacing-1);
}
```

**HTML in Footer.astro Cluster 2 (replaces the inline `Blogroll` link):**

```astro
<details class="blogroll-details">
  <summary>Blogroll</summary>
  <ul class="blogroll-list">
    {blogroll.map((entry) => (
      <li>
        <a href={entry.url} target="_blank" rel="noopener noreferrer">
          {entry.name}
        </a>
        {entry.blurb && <span class="blogroll-blurb"> — {entry.blurb}</span>}
      </li>
    ))}
  </ul>
</details>
```

---

## 4. New or modified components required by this brief

| File | Status | Notes |
|---|---|---|
| `src/data/blogroll.ts` | **NEW** | The data module. |
| `Footer.astro` | Modified | Renders the `<details>` from the blogroll data. |

No new components.

---

## 5. Edge cases / decisions left to the implementer

- **Placement within Cluster 2** — proposal says the Blogroll entry goes between `Concepts` and `RSS` in the link list. **Decision: REPLACE the inline `Blogroll` link with the `<details><summary>Blogroll</summary>...</details>` element.** The other 12 inline links (Garden, Essays, ..., Concepts, RSS) remain unchanged. The summary becomes the 13th item, but it expands to reveal the list of sites.
- **External links** — every blogroll entry is `target="_blank" rel="noopener noreferrer"`.
- **No internal blurb required** — the `blurb` field is optional. If the implementer doesn't want to write blurbs, set `blurb` on every entry as `undefined` and the rendering skips it.
- **Sort order** — alphabetical by `name.toLowerCase()`. Implementer ships entries already alphabetical.
- **Update cadence** — the author updates `src/data/blogroll.ts` directly when they want to add/remove entries. No CMS, no UI.

---

## 6. Acceptance checks

- `npm run check` exits 0.
- `npm run build` succeeds.
- Visiting any page (e.g. `/`) shows the footer with three clusters. Cluster 2 includes a `Blogroll` item that is a `<details>` element. Clicking it expands to show 20 inline links to external sites.
- Each blogroll link opens in a new tab.
- On desktop ≥768px, the blogroll list renders as 2 columns.
- On mobile, the list renders as 1 column.
- The summary element has the same typography as the other Cluster 2 inline links (Inter, `--text-small`, `--color-text-white-soft`).
- The list is sorted alphabetically (verify by visual inspection).
- `:focus-visible` visible on every blogroll link and the summary.