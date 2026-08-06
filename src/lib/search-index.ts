/**
 * Site search — build-time index of every content entry.
 *
 * Aggregates entries from all seven collections (notes, essays, talks, books,
 * patterns, projects, practices) into a single flat `SearchableEntry[]` shape
 * suitable for shipping to the client. The client builds a MiniSearch index
 * from this array inside SearchBox.astro's <script> block.
 *
 * No server runtime — `output: 'static'` means this runs at build time only.
 * The resulting JSON is small (<200KB for ~30 entries) and is embedded inline
 * in pages that include SearchBox.astro.
 */
import { getCollection } from 'astro:content';

export interface SearchableEntry {
  collection: string;
  slug: string;
  title: string;
  excerpt: string;
  topics: string[];
  date: string;
  href: string;
}

/**
 * Build the flat searchable index. Pure data — no MiniSearch instance here.
 * MiniSearch runs client-side; this file is the canonical source of the
 * documents it indexes.
 */
export async function getSearchableEntries(): Promise<SearchableEntry[]> {
  const [
    allNotes,
    allEssays,
    allTalks,
    allBooks,
    allPatterns,
    allProjects,
    allPractices,
  ] = await Promise.all([
    getCollection('notes'),
    getCollection('essays'),
    getCollection('talks'),
    getCollection('books'),
    getCollection('patterns'),
    getCollection('projects'),
    getCollection('practices'),
  ]);

  const entries: SearchableEntry[] = [];

  for (const e of allNotes) {
    entries.push({
      collection: 'note',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.excerpt ?? '',
      topics: e.data.topics ?? [],
      date: e.data.date.toISOString(),
      href: `/notes/${e.id}/`,
    });
  }

  for (const e of allEssays) {
    entries.push({
      collection: 'essay',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.lede ?? '',
      topics: e.data.topics ?? [],
      date: e.data.date.toISOString(),
      href: `/essays/${e.id}/`,
    });
  }

  for (const e of allTalks) {
    const talkTopics =
      (e.data as unknown as { topics?: string[] }).topics ?? [];
    entries.push({
      collection: 'talk',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.description ?? '',
      topics: talkTopics,
      date: e.data.date.toISOString(),
      href: (e.data as { link?: string }).link ?? `/talks/`,
    });
  }

  for (const e of allBooks) {
    // Books don't carry frontmatter `date`; use year if present, otherwise
    // omit (1970-01-01 sentinel so they don't dominate date-sorted views).
    const year = e.data.year;
    entries.push({
      collection: 'book',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.author,
      topics: [],
      date: year ? new Date(year, 0, 1).toISOString() : new Date(0).toISOString(),
      href: `/library/`,
    });
  }

  for (const e of allPatterns) {
    entries.push({
      collection: 'pattern',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.lede ?? '',
      topics: e.data.topics ?? [],
      date: e.data.date.toISOString(),
      href: `/patterns/${e.id}/`,
    });
  }

  for (const e of allProjects) {
    entries.push({
      collection: 'project',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.desc ?? '',
      topics: e.data.tags ?? [],
      date: e.data.year ? new Date(e.data.year, 0, 1).toISOString() : new Date(0).toISOString(),
      href: `/projects/`,
    });
  }

  for (const e of allPractices) {
    entries.push({
      collection: 'practice',
      slug: e.id,
      title: e.data.title,
      excerpt: e.data.excerpt ?? '',
      topics: e.data.topics ?? [],
      date: e.data.date.toISOString(),
      href: `/practices/${e.id}/`,
    });
  }

  return entries;
}

/**
 * Lookup a single entry by its canonical href.
 * Used by the /search page to hydrate result rows from the same source of
 * truth as the dropdown.
 */
export async function getEntryByHref(href: string): Promise<SearchableEntry | undefined> {
  const all = await getSearchableEntries();
  return all.find((e) => e.href === href);
}