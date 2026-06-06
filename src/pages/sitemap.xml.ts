import type { APIRoute } from 'astro';

const siteUrl = 'https://kailash2026.com';

const routeNames = ['', 'culture', 'guide', 'routes', 'stories', 'gallery', 'faq', 'about', 'contact'];

const routeMeta: Record<string, { priority: number; changefreq: string }> = {
  '':          { priority: 1.0, changefreq: 'weekly' },
  'culture':   { priority: 0.9, changefreq: 'monthly' },
  'guide':     { priority: 0.9, changefreq: 'monthly' },
  'routes':    { priority: 0.9, changefreq: 'monthly' },
  'stories':   { priority: 0.8, changefreq: 'monthly' },
  'gallery':   { priority: 0.7, changefreq: 'monthly' },
  'faq':       { priority: 0.7, changefreq: 'monthly' },
  'about':     { priority: 0.6, changefreq: 'monthly' },
  'contact':   { priority: 0.6, changefreq: 'monthly' },
};

const languages = [
  { hreflang: 'zh-CN', prefix: '' },
  { hreflang: 'en',    prefix: '/en' },
  { hreflang: 'ja',    prefix: '/ja' },
  { hreflang: 'hi',    prefix: '/hi' },
];

function buildUrl(prefix: string, route: string): string {
  if (route === '') {
    return prefix || '/';
  }
  return `${prefix}/${route}`;
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];

  // Generate all pages: 4 languages × 9 routes = 36 URLs
  const allPages: { url: string; lang: string; route: string }[] = [];
  for (const lang of languages) {
    for (const route of routeNames) {
      allPages.push({
        url: buildUrl(lang.prefix, route),
        lang: lang.hreflang,
        route,
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => {
    const meta = routeMeta[page.route];
    const alternates = languages.map(l =>
      `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${siteUrl}${buildUrl(l.prefix, page.route)}" />`
    ).join('\n');

    return `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
${alternates}
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
