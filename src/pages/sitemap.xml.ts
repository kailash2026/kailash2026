import type { APIRoute } from 'astro';

const siteUrl = 'https://kailash2026.com';

const pages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/culture', priority: 0.8, changefreq: 'monthly' },
  { url: '/guide', priority: 0.8, changefreq: 'monthly' },
  { url: '/routes', priority: 0.9, changefreq: 'monthly' },
  { url: '/booking', priority: 0.9, changefreq: 'weekly' },
  { url: '/404', priority: 0.1, changefreq: 'never' },
];

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};