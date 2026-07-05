// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkWikilink } from './src/lib/wikilink-remark.mjs';

export default defineConfig({
  site: 'https://phurix.dev',
  output: 'static',
  trailingSlash: 'always',
  server: {
    host: '0.0.0.0',
  },
  markdown: {
    // Use the unified processor so `remarkPlugins` are honoured by both
    // `.md` and `.mdx` rendering (Satteri, the new default, drops them).
    processor: unified({
      remarkPlugins: [remarkWikilink],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkWikilink],
    }),
    sitemap({
      filter: (page) => !/\/random\/?$/.test(page),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Lora',
      cssVariable: '--font-serif',
      fallbacks: ['Iowan Old Style', 'Georgia', 'serif'],
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-display',
      fallbacks: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});