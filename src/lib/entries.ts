/**
 * Entry normalization — single source of truth for cross-collection metadata.
 * garden.astro (and any future unified stream) consumes normalized entries
 * instead of repeating per-collection ternaries.
 *
 * Responsibilities:
 *   - Map collection key (`essays`) to card type (`essay`)
 *   - Resolve href per collection (talks → external link, projects → external,
 *     books → /library#<id>, rest → /<collection>/<id>)
 *   - Pick excerpt field (essay/pattern → lede, note/practice → excerpt,
 *     talk → description, project → desc, book → empty)
 *   - Surface growthStage only for collections that carry it
 *   - Surface topics (talks/projects pull from `topics`/`tags`)
 *   - Fall back to `year` (Jan 1) when `date` is absent (books, projects)
 */
import type { CollectionEntry } from 'astro:content';

export type EntryCollectionKey =
  | 'essays'
  | 'notes'
  | 'talks'
  | 'patterns'
  | 'practices'
  | 'projects'
  | 'books';

export type EntryType =
  | 'essay'
  | 'note'
  | 'talk'
  | 'pattern'
  | 'practice'
  | 'project'
  | 'book';

export type AnyEntry =
  | CollectionEntry<'essays'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'talks'>
  | CollectionEntry<'patterns'>
  | CollectionEntry<'practices'>
  | CollectionEntry<'projects'>
  | CollectionEntry<'books'>;

export interface NormalizedEntry {
  type: EntryType;
  title: string;
  href: string;
  topics: string[];
  excerpt: string;
  date: Date;
  growthStage?: 'seedling' | 'growing' | 'evergreen';
}

const COLLECTION_TO_TYPE: Record<EntryCollectionKey, EntryType> = {
  essays: 'essay',
  notes: 'note',
  talks: 'talk',
  patterns: 'pattern',
  practices: 'practice',
  projects: 'project',
  books: 'book',
};

export function hrefFor(entry: AnyEntry): string {
  switch (entry.collection) {
    case 'essays':
      return `/essays/${entry.id}`;
    case 'notes':
      return `/notes/${entry.id}`;
    case 'patterns':
      return `/patterns/${entry.id}`;
    case 'practices':
      return `/practices/${entry.id}`;
    case 'talks':
      return entry.data.link ?? '#';
    case 'projects':
      return entry.data.url ?? '/projects';
    case 'books':
      return `/library#${entry.id}`;
  }
}

export function excerptFor(entry: AnyEntry): string {
  switch (entry.collection) {
    case 'essays':
    case 'patterns':
      return entry.data.lede;
    case 'notes':
    case 'practices':
      return entry.data.excerpt ?? '';
    case 'talks':
      return entry.data.description;
    case 'projects':
      return entry.data.desc;
    case 'books':
      return '';
  }
}

export function topicsFor(entry: AnyEntry): string[] {
  switch (entry.collection) {
    case 'projects':
      return entry.data.tags ?? [];
    case 'books':
      return [];
    default:
      return entry.data.topics ?? [];
  }
}

export function growthStageFor(
  entry: AnyEntry,
): NormalizedEntry['growthStage'] {
  if (entry.collection === 'notes' || entry.collection === 'practices') {
    return entry.data.growthStage;
  }
  return undefined;
}

/** Fall back to Jan 1 of `year` when `date` is missing (books, projects). */
export function dateFor(entry: AnyEntry): Date {
  const explicit = entry.data.date as Date | undefined;
  if (explicit) return explicit;
  const year = (entry.data as { year?: number }).year;
  if (typeof year === 'number') return new Date(year, 0, 1);
  return new Date(0);
}

export function normalize(entry: AnyEntry): NormalizedEntry {
  return {
    type: COLLECTION_TO_TYPE[entry.collection],
    title: entry.data.title,
    href: hrefFor(entry),
    topics: topicsFor(entry),
    excerpt: excerptFor(entry),
    date: dateFor(entry),
    growthStage: growthStageFor(entry),
  };
}
