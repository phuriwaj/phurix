/**
 * Topic photo registry — single source of truth for which topics have an
 * accompanying photo. Both src/components/TopicPhoto.astro (the consumer)
 * and src/lib/topics.ts (the build-time coverage check) import from here.
 *
 * Adding a topic with a photo:
 *   1. Drop a JPG at src/assets/photos/<key>.jpg
 *   2. Add `<key>` to TOPIC_PHOTO_KEYS below
 *   3. Add a matching entry in src/components/TopicPhoto.astro#PHOTOS
 *      (image import + alt + photographer credit)
 *   4. Add `<key>` to RECOGNIZED_TOPICS_TUPLE in src/lib/topics.ts
 *
 * Steps 1-3 supply the asset. Step 4 wires it into the content schema.
 * If 2 and 4 drift, src/lib/topics.ts will throw at module load.
 */
export const TOPIC_PHOTO_KEYS = [
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
