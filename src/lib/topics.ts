/**
 * Topic utilities — pick a photo topic from an entry's topics[].
 *
 * The first topic is treated as the primary art key. Falls back to 'design'
 * if the topic isn't in the recognized photo keys.
 */

export const RECOGNIZED_TOPICS_TUPLE = [
  'design',
  'writing',
  'tools',
  'systems',
  'web-development',
  'anthropology',
  'ai',
] as const;

export type TopicKey = (typeof RECOGNIZED_TOPICS_TUPLE)[number];

export const RECOGNIZED_TOPICS: readonly TopicKey[] = RECOGNIZED_TOPICS_TUPLE;

export function pickArtTopic(topics: string[] | undefined | null): TopicKey {
  if (!topics || topics.length === 0) return 'design';
  const first = topics[0];
  return (RECOGNIZED_TOPICS as readonly string[]).includes(first)
    ? (first as TopicKey)
    : 'design';
}