import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    topics: z.array(z.string()).default([]),
    growthStage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    excerpt: z.string().optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    topics: z.array(z.string()).default([]),
    lede: z.string(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    link: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverColor: z.string(), // hex color for placeholder cover
    year: z.number().optional(),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/patterns' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    topics: z.array(z.string()).default([]),
    lede: z.string(),
  }),
});

export const collections = { notes, essays, talks, books, patterns };
