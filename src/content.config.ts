import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { RECOGNIZED_TOPICS_TUPLE } from '@/lib/topics';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topics: z.array(z.enum(RECOGNIZED_TOPICS_TUPLE)).default([]),
    growthStage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    excerpt: z.string().optional(),
    related: z.array(reference('notes')).optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topics: z.array(z.enum(RECOGNIZED_TOPICS_TUPLE)).default([]),
    lede: z.string(),
    related: z.array(reference('essays')).optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    link: z.string().url().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Expected #RRGGBB hex'),
    year: z.number().optional(),
    currentlyReading: z.boolean().default(false),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/patterns' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topics: z.array(z.enum(RECOGNIZED_TOPICS_TUPLE)).default([]),
    lede: z.string(),
    related: z.array(reference('patterns')).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    tags: z.array(z.string()).default([]),
    year: z.number().int().optional(),
    url: z.string().url().optional(),
  }),
});

export const collections = { notes, essays, talks, books, patterns, projects };
