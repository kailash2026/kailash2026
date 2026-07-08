import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kailash2026.com',
  integrations: [tailwind(), react()],
  output: 'static',
  image: {
    domains: ['kailash2026.com']
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'hi', 'ja'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});