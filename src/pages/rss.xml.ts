import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  const essays = await getCollection('essays');
  return rss({
    title: 'phurix',
    description: 'Essays on web craft, design systems, and rabbit holes.',
    site: context.site!,
    items: essays
      .sort((a, b) => +b.data.date - +a.data.date)
      .map((e) => ({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.lede,
        link: `/essays/${e.id}/`,
      })),
    customData: '<language>en-us</language>',
  });
}