import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://kailash2026.com',
  integrations: [tailwind(), react()],
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  image: {
    domains: ['kailash2026.com']
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'bo'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});