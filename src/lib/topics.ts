/**
 * Topic utilities — pick a photo topic from an entry's topics[].
 *
 * The first topic is treated as the primary art key. Falls back to 'design'
 * if the topic isn't in the recognized photo keys.
 */

/**
 * Topics that have a photographic illustration in src/assets/photos/.
 * Single source of truth — both the Zod enum in src/content.config.ts and
 * the PHOTOS map in src/components/TopicPhoto.astro must use this list.
 * If you add a topic here, also add a JPG to src/assets/photos/<key>.jpg
 * and a PHOTOS entry in TopicPhoto.astro — the build-time assert below
 * will fail otherwise.
 */
export const TOPICS_WITH_PHOTOS_TUPLE = [
  'design',
  'writing',
  'tools',
  'systems',
  'web-development',
  'anthropology',
  'ai',
  'attention',
  'focus',
  'money',
] as const;

export const RECOGNIZED_TOPICS_TUPLE = TOPICS_WITH_PHOTOS_TUPLE;

export type TopicKey = (typeof RECOGNIZED_TOPICS_TUPLE)[number];

export const RECOGNIZED_TOPICS: readonly TopicKey[] = RECOGNIZED_TOPICS_TUPLE;

/**
 * Module-load assertion: every recognized topic must have a photo. Failing
 * here surfaces a missing-art asset at build time rather than silently
 * mis-attributing a credit in production. The actual photo registry lives
 * in src/components/TopicPhoto.astro (it owns the imports); this check
 * re-runs the registry's key set at startup and compares.
 */
import { TOPIC_PHOTO_KEYS } from '@/lib/topicPhotoKeys';
assertTopicPhotoCoverage(TOPIC_PHOTO_KEYS);

function assertTopicPhotoCoverage(photoKeys: readonly string[]): void {
  const missing = RECOGNIZED_TOPICS_TUPLE.filter(
    (t) => !photoKeys.includes(t),
  );
  if (missing.length > 0) {
    throw new Error(
      `[topics] RECOGNIZED_TOPICS_TUPLE references topics with no photo: ` +
        `${missing.join(', ')}. Add a JPG to src/assets/photos/ and an ` +
        `entry in src/components/TopicPhoto.astro#PHOTOS.`,
    );
  }
}

export function pickArtTopic(topics: string[] | undefined | null): TopicKey {
  if (!topics || topics.length === 0) return 'design';
  const first = topics[0];
  return (RECOGNIZED_TOPICS as readonly string[]).includes(first)
    ? (first as TopicKey)
    : 'design';
}