import type { APIRoute } from 'astro';

const siteUrl = 'https://kailash2026.com';

const pages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/culture', priority: 0.9, changefreq: 'monthly' },
  { url: '/guide', priority: 0.9, changefreq: 'monthly' },
  { url: '/routes', priority: 0.9, changefreq: 'monthly' },
  { url: '/stories', priority: 0.8, changefreq: 'monthly' },
  { url: '/gallery', priority: 0.7, changefreq: 'monthly' },
  { url: '/faq', priority: 0.7, changefreq: 'monthly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact', priority: 0.6, changefreq: 'monthly' },
  { url: '/booking', priority: 0.8, changefreq: 'weekly' },
];

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page.url}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
