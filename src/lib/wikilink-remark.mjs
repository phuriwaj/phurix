/**
 * Wikilink remark plugin — transforms `[[slug]]`, `[[slug|alias]]`, and
 * `[[collection:slug]]` syntax in MDX bodies into standard `<a>` HTML
 * anchors at build time.
 *
 * Default collection is `notes` (so `[[foo]]` → `/notes/foo`). The explicit
 * `collection:slug` form supports cross-collection links. Unknown collections
 * fall back to `notes` to keep the build total — bad links still render,
 * they just point to a 404 path.
 *
 * Wired via `astro.config.mjs` through `mdx({ remarkPlugins: [...] })`.
 */

const WIKILINK_PATTERN = /\[\[([a-z0-9_-]+)(?::([a-z0-9_-]+))?(?:\|([^\]]+))?\]\]/gi;

function escapeHtml(s) {
  return s.replace(/[<>&"]/g, (c) =>
    c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : '&quot;'
  );
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;

  // Recurse first (post-order) so leaves are rebuilt before parents.
  for (const child of node.children) {
    if (
      child &&
      typeof child === 'object' &&
      Array.isArray(child.children)
    ) {
      walk(child);
    }
  }

  const next = [];
  for (const child of node.children) {
    if (!child || typeof child !== 'object') {
      next.push(child);
      continue;
    }
    if (child.type !== 'text' || typeof child.value !== 'string') {
      next.push(child);
      continue;
    }
    const value = child.value;
    if (!value.includes('[[')) {
      next.push(child);
      continue;
    }

    let lastIndex = 0;
    let match;
    WIKILINK_PATTERN.lastIndex = 0;
    let matched = false;
    while ((match = WIKILINK_PATTERN.exec(value)) !== null) {
      matched = true;
      const [full, a, b, alias] = match;
      const matchStart = match.index;

      // [[collection:slug]] — when `b` group is present, `a` is collection,
      // `b` is slug; otherwise `a` is the bare slug.
      let collection = 'notes';
      let slug;
      let label;
      if (b) {
        if (a === 'notes' || a === 'essays' || a === 'patterns') {
          collection = a;
          slug = b;
        } else {
          slug = a; // unknown prefix → default collection
        }
        label = alias ?? b;
      } else {
        slug = a;
        label = alias ?? a;
      }

      if (matchStart > lastIndex) {
        next.push({ type: 'text', value: value.slice(lastIndex, matchStart) });
      }

      const href = `/${collection}/${slug}/`;
      next.push({
        type: 'html',
        value: `<a href="${href}">${escapeHtml(label)}</a>`,
      });

      lastIndex = matchStart + full.length;
    }

    if (!matched) {
      next.push(child);
      continue;
    }
    if (lastIndex < value.length) {
      next.push({ type: 'text', value: value.slice(lastIndex) });
    }
  }

  if (
    node.children.length !== next.length ||
    node.children.some((c, i) => c !== next[i])
  ) {
    node.children = next;
  }
}

export function remarkWikilink() {
  return (tree) => {
    walk(tree);
  };
}

export default remarkWikilink;
