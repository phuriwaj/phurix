/**
 * Backlink resolution — scans content entries for `[[slug]]` / `[[slug|alias]]`
 * wikilinks pointing at a target entry.
 *
 * Backlinks are computed at build time. The scanner accepts any mix of entries
 * from notes/essays/patterns and returns the subset whose body text contains
 * a wikilink matching `targetSlug`. The collection parameter is informational —
 * the wikilink form `[[collection:slug]]` is captured by the regex below only
 * if `targetSlug` already includes the `collection:` prefix; callers should
 * pass the bare slug for default-collection entries and the prefixed slug for
 * cross-collection targets.
 */

import type { CollectionEntry } from 'astro:content';

export type BacklinkCollection = 'notes' | 'essays' | 'patterns';
export type BacklinkEntry = CollectionEntry<'notes' | 'essays' | 'patterns'>;

export interface MatchingEntry {
  entry: BacklinkEntry;
  collection: BacklinkCollection;
}

/**
 * Detect `[[slug]]` and `[[slug|alias]]` with an optional `collection:` prefix.
 * The leading character class restricts the slug to typical id characters so
 * link text inside markdown like `[text](url)` is not matched.
 */
const WIKILINK_RE = (slug: string) =>
  new RegExp(`\\[\\[${slug}(\\|[^\\]]+)?\\]\\]`);

export function findBacklinks(
  targetSlug: string,
  _targetCollection: BacklinkCollection,
  allEntries: BacklinkEntry[]
): MatchingEntry[] {
  const re = WIKILINK_RE(targetSlug);
  const matches: MatchingEntry[] = [];
  for (const entry of allEntries) {
    // `body` is the raw MDX string for glob-loaded content collections.
    // Pre-render scanning runs on the source text — at build time the
    // body has not yet been compiled, which is what we want for matching
    // raw `[[...]]` syntax.
    const body = entry.body ?? '';
    if (re.test(body)) {
      matches.push({
        entry,
        collection: entry.collection as BacklinkCollection,
      });
    }
  }
  return matches;
}
