/**
 * Entry normalization — single source of truth for cross-collection metadata.
 * garden.astro (and any future unified stream) consumes normalized entries
 * instead of repeating per-collection ternaries.
 *
 * Responsibilities:
 *   - Map collection key (`essays`) to card type (`essay`)
 *   - Resolve href per collection (talks → external link, rest → /<collection>/<id>)
 *   - Pick excerpt field (essay/pattern → lede, note/practice → excerpt, talk → description)
 *   - Surface growthStage only for collections that carry it
 */
import type { CollectionEntry } from 'astro:content';

export type EntryCollectionKey =
  | 'essays'
  | 'notes'
  | 'talks'
  | 'patterns'
  | 'practices';

export type EntryType = 'essay' | 'note' | 'talk' | 'pattern' | 'practice';

export type AnyGardenEntry =
  | CollectionEntry<'essays'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'talks'>
  | CollectionEntry<'patterns'>
  | CollectionEntry<'practices'>;

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
};

export function hrefFor(entry: AnyGardenEntry): string {
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
  }
}

export function excerptFor(entry: AnyGardenEntry): string {
  switch (entry.collection) {
    case 'essays':
    case 'patterns':
      return entry.data.lede;
    case 'notes':
    case 'practices':
      return entry.data.excerpt ?? '';
    case 'talks':
      return entry.data.description;
  }
}

export function topicsFor(entry: AnyGardenEntry): string[] {
  return entry.data.topics ?? [];
}

export function growthStageFor(
  entry: AnyGardenEntry,
): NormalizedEntry['growthStage'] {
  if (entry.collection === 'notes' || entry.collection === 'practices') {
    return entry.data.growthStage;
  }
  return undefined;
}

export function normalize(entry: AnyGardenEntry): NormalizedEntry {
  return {
    type: COLLECTION_TO_TYPE[entry.collection],
    title: entry.data.title,
    href: hrefFor(entry),
    topics: topicsFor(entry),
    excerpt: excerptFor(entry),
    date: entry.data.date,
    growthStage: growthStageFor(entry),
  };
}
