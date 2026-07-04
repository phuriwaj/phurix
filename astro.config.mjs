// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phurix.dev',
  output: 'static',
  trailingSlash: 'always',
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
      name: 'Kalam',
      cssVariable: '--font-script',
      fallbacks: ['Comic Sans MS', 'cursive'],
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});