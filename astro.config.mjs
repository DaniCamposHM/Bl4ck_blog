// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bl4ckjackhm.netlify.app',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const noindex = [
          'https://bl4ckjackhm.netlify.app/games/',
          'https://bl4ckjackhm.netlify.app/linux/',
          'https://bl4ckjackhm.netlify.app/projects/',
          'https://bl4ckjackhm.netlify.app/research/',
          'https://bl4ckjackhm.netlify.app/writeups/',
          'https://bl4ckjackhm.netlify.app/curriculum/',
        ];
        return !noindex.includes(page);
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
