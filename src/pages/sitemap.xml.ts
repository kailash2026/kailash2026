import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const siteUrl = 'https://kailash2026.com';

const routeNames = ['', 'culture', 'guide', 'routes', 'stories', 'gallery', 'faq', 'about', 'contact', 'ali'];
const extraPages = ['blog', 'codex', 'messages'];

const routeMeta: Record<string, { priority: number; changefreq: string }> = {
  '':          { priority: 1.0, changefreq: 'weekly' },
  'culture':   { priority: 0.9, changefreq: 'monthly' },
  'guide':     { priority: 0.9, changefreq: 'monthly' },
  'routes':    { priority: 0.9, changefreq: 'monthly' },
  'ali':       { priority: 0.85, changefreq: 'monthly' },
  'stories':   { priority: 0.8, changefreq: 'monthly' },
  'gallery':   { priority: 0.7, changefreq: 'monthly' },
  'faq':       { priority: 0.7, changefreq: 'monthly' },
  'about':     { priority: 0.6, changefreq: 'monthly' },
  'contact':   { priority: 0.6, changefreq: 'monthly' },
  'blog':      { priority: 0.9, changefreq: 'weekly' },
  'codex':     { priority: 0.8, changefreq: 'weekly' },
  'messages':  { priority: 0.5, changefreq: 'monthly' },
};

const languages = [
  { hreflang: 'zh-CN', prefix: '' },
  { hreflang: 'en',    prefix: '/en' },
  { hreflang: 'ja',    prefix: '/ja' },
  { hreflang: 'hi',    prefix: '/hi' },
];

function buildUrl(prefix: string, route: string): string {
  if (route === '') return prefix || '/';
  return `${prefix}/${route}`;
}

function urlEscape(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderUrl(loc: string, lastmod: string, changefreq: string, priority: number, alternates: string): string {
  return `  <url>
    <loc>${urlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
}

function renderAlternates(route: string): string {
  return languages.map(l =>
    `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${siteUrl}${buildUrl(l.prefix, route)}" />`
  ).join('\n');
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const urls: string[] = [];

  // 1) Static pages (9 routes × 4 languages)
  for (const lang of languages) {
    for (const route of routeNames) {
      const meta = routeMeta[route];
      urls.push(renderUrl(
        `${siteUrl}${buildUrl(lang.prefix, route)}`,
        today,
        meta.changefreq,
        meta.priority,
        renderAlternates(route),
      ));
    }
  }

  // 2) Extra pages (blog index, codex index, messages) — only for default lang since blog/codex have language-specific routes
  for (const page of extraPages) {
    const meta = routeMeta[page] || { priority: 0.5, changefreq: 'monthly' };
    for (const lang of languages) {
      urls.push(renderUrl(
        `${siteUrl}${buildUrl(lang.prefix, page)}`,
        today,
        meta.changefreq,
        meta.priority,
        renderAlternates(page),
      ));
    }
  }

  // 3) Blog posts — each language has its own blog post slug
  const blogLangMap: Record<string, string> = { zh: '', en: '/en', ja: '/ja', hi: '/hi' };
  const allBlogPosts = await getCollection('blog');
  for (const post of allBlogPosts) {
    const slugParts = post.id.split('/');
    const cleanSlug = slugParts.length > 1 ? slugParts.slice(1).join('/').replace(/\.md$/, '') : slugParts[0].replace(/\.md$/, '');
    const prefix = blogLangMap[post.data.lang] ?? '';
    const url = `${prefix}/blog/${cleanSlug}`;
    const lastmod = post.data.date.toISOString().split('T')[0];
    urls.push(renderUrl(
      `${siteUrl}${url}`,
      lastmod,
      'monthly',
      0.8,
      renderAlternates(`blog/${cleanSlug}`),
    ));
  }

  // 4) Codex entries
  const allCodexEntries = await getCollection('codex');
  const codexLangMap: Record<string, string> = { zh: '', en: '/en', ja: '/ja', hi: '/hi' };
  for (const entry of allCodexEntries) {
    const slugParts = entry.id.split('/');
    const cleanSlug = slugParts.length > 1 ? slugParts.slice(1).join('/').replace(/\.md$/, '') : slugParts[0].replace(/\.md$/, '');
    const prefix = codexLangMap[entry.data.lang] ?? '';
    const url = `${prefix}/codex/${cleanSlug}`;
    urls.push(renderUrl(
      `${siteUrl}${url}`,
      today,
      'monthly',
      0.75,
      `    <!-- codex entry: ${entry.data.lang} -->`,
    ));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
