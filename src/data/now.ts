/**
 * Now page data — a snapshot of life right now.
 * Cite as: DESIGN.md §4 (Layout — /now page structure).
 *
 * `value` items render as a single Lora paragraph; `list` items render as a
 * dash-prefixed `<ul>` (used for the Reading section, matching the prior
 * em-dash micro-detail).
 */

export type NowItem =
  | { label: string; value: string }
  | { label: string; list: string[] };

export const nowItems: NowItem[] = [
  {
    label: 'Location',
    value: 'Bangkok, Thailand.',
  },
  {
    label: 'Working on',
    value:
      'A design system for a client; a long essay on typography hierarchy; exploring edge-rendering patterns more seriously.',
  },
  {
    label: 'Reading',
    list: [
      'The Design of Everyday Things — Don Norman.',
      'Staff Engineer — Will Larson.',
      'Thinking in Systems — Donella Meadows.',
    ],
  },
  {
    label: 'Thinking about',
    value:
      'The gap between component-level design and system-level design. How context windows change the way we prompt AI tools.',
  },
  {
    label: 'Writing',
    value:
      'Two essays in progress: one on typography hierarchy, one on the anthropology of code review.',
  },
];

/** ISO date string for the "Last updated" footer line. */
export const lastUpdated = '2026-07-04';