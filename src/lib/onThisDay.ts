/**
 * onThisDay — find garden entries whose month+day matches today's.
 * Used by /garden and /notes index to surface anniversary content.
 * Cite as: DESIGN.md §7 (Component — on-this-day strip).
 */

import type { CollectionEntry } from 'astro:content';

/** Same discriminated union as `src/pages/garden.astro`. */
export type MergedEntry =
  | (CollectionEntry<'essays'> & { entryType: 'essay'; displayDate: Date })
  | (CollectionEntry<'notes'> & { entryType: 'note'; displayDate: Date })
  | (CollectionEntry<'talks'> & { entryType: 'talk'; displayDate: Date })
  | (CollectionEntry<'patterns'> & { entryType: 'pattern'; displayDate: Date })
  | (CollectionEntry<'practices'> & { entryType: 'practice'; displayDate: Date });

/**
 * Returns entries whose `pubDate` (displayDate) shares the month and day
 * with `today`, sorted by year descending (newest first).
 */
export function findOnThisDay(
  entries: MergedEntry[],
  today: Date
): MergedEntry[] {
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  return entries
    .filter((entry) => {
      const d = entry.displayDate;
      return d.getMonth() === todayMonth && d.getDate() === todayDay;
    })
    .sort((a, b) => b.displayDate.getTime() - a.displayDate.getTime());
}
