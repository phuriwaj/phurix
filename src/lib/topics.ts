/**
 * Topic utilities — pick a photo topic from an entry's topics[].
 *
 * The first topic is treated as the primary art key. Falls back to 'design'
 * if the topic isn't in the recognized photo keys.
 */

export type TopicKey =
  | 'design'
  | 'writing'
  | 'tools'
  | 'systems'
  | 'web-development'
  | 'anthropology'
  | 'ai';

export const RECOGNIZED_TOPICS: TopicKey[] = [
  'design',
  'writing',
  'tools',
  'systems',
  'web-development',
  'anthropology',
  'ai',
];

export function pickArtTopic(topics: string[] | undefined | null): TopicKey {
  if (!topics || topics.length === 0) return 'design';
  const first = topics[0];
  return (RECOGNIZED_TOPICS as string[]).includes(first)
    ? (first as TopicKey)
    : 'design';
}
