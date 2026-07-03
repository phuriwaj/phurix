// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://phurix.dev',
  output: 'static',

  server: {
    host: '0.0.0.0',
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
    mdx(),
    sitemap(),
    react(),
  ],

  adapter: cloudflare(),
});