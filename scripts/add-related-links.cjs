// Add cross-links between related blog posts
const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

// Map: language -> filename -> [related filenames]
const related = {
  zh: {
    'kailash-best-season-2026.md': [
      { file: 'kailash-kora-guide-2026.md', title: '转山完整指南' },
      { file: 'kailash-equipment-checklist.md', title: '装备清单' },
      { file: 'kailash-cost-budget-2026.md', title: '花费全解析' },
    ],
    'kailash-cost-budget-2026.md': [
      { file: 'kailash-transport-guide.md', title: '交通指南' },
      { file: 'kailash-first-timer-guide.md', title: '新手12问' },
      { file: 'kailash-equipment-checklist.md', title: '装备清单' },
    ],
    'kailash-first-timer-guide.md': [
      { file: 'kailash-best-season-2026.md', title: '最佳季节详解' },
      { file: 'kailash-cost-budget-2026.md', title: '花费全解析' },
      { file: 'kailash-altitude-sickness.md', title: '高原反应指南' },
    ],
    'kailash-equipment-checklist.md': [
      { file: 'kailash-altitude-sickness.md', title: '高原反应指南' },
      { file: 'kailash-transport-guide.md', title: '交通指南' },
      { file: 'kailash-cost-budget-2026.md', title: '花费全解析' },
    ],
  },
  en: {
    'kailash-cost-budget-2026.md': [
      { file: 'kailash-international-pilgrim-guide.md', title: 'International Pilgrim Guide' },
      { file: 'kailash-visa-permit-guide.md', title: 'Visa & Permit Guide' },
      { file: 'kailash-transport-guide.md', title: 'Transport Guide' },
    ],
    'kailash-international-pilgrim-guide.md': [
      { file: 'kailash-cost-budget-2026.md', title: 'Cost & Budget 2026' },
      { file: 'kailash-equipment-checklist.md', title: 'Equipment Checklist' },
      { file: 'kailash-visa-permit-guide.md', title: 'Visa & Permit Guide' },
    ],
  },
  hi: {
    'kailash-best-season-2026.md': [
      { file: 'kailash-indian-pilgrim-guide.md', title: 'भारतीय यात्री गाइड' },
      { file: 'kailash-yatra-cost-2026.md', title: 'यात्रा का खर्च' },
      { file: 'kailash-first-time-yatri-guide.md', title: 'पहली बार गाइड' },
    ],
    'kailash-yatra-cost-2026.md': [
      { file: 'kailash-indian-pilgrim-guide.md', title: 'भारतीय यात्री गाइड' },
      { file: 'kailash-best-season-2026.md', title: 'सबसे अच्छा समय' },
      { file: 'kailash-first-time-yatri-guide.md', title: 'पहली बार गाइड' },
    ],
    'kailash-first-time-yatri-guide.md': [
      { file: 'kailash-best-season-2026.md', title: 'सबसे अच्छा समय' },
      { file: 'kailash-yatra-cost-2026.md', title: 'यात्रा का खर्च' },
      { file: 'kailash-hindu-rituals.md', title: 'हिंदू रीति-रिवाज' },
    ],
    'kailash-mysteries-facts.md': [
      { file: 'kailash-best-season-2026.md', title: 'सबसे अच्छा समय' },
      { file: 'kailash-first-time-yatri-guide.md', title: 'पहली बार गाइड' },
      { file: 'kailash-four-religions.md', title: 'चार धर्म' },
    ],
  },
  ja: {
    'kailash-cost-2026.md': [
      { file: 'kailash-equipment-checklist.md', title: '装備チェックリスト' },
      { file: 'kailash-japanese-pilgrim-guide.md', title: '日本人巡礼ガイド' },
      { file: 'kailash-altitude-sickness-jp.md', title: '高山病対策' },
    ],
    'kailash-first-timer-guide.md': [
      { file: 'kailash-cost-2026.md', title: '巡礼費用ガイド' },
      { file: 'kailash-japanese-pilgrim-guide.md', title: '日本人巡礼ガイド' },
      { file: 'kailash-altitude-sickness-jp.md', title: '高山病対策' },
    ],
  },
};

const sectionLabels = {
  zh: '📖 相关阅读',
  en: '📖 Related Reading',
  hi: '📖 संबंधित लेख',
  ja: '📖 関連記事',
};

let done = 0;
let skipped = 0;

Object.entries(related).forEach(([lang, langMap]) => {
  Object.entries(langMap).forEach(([file, links]) => {
    const filePath = path.join(blogDir, lang, file);
    if (!fs.existsSync(filePath)) {
      console.log('SKIP (not found): ' + lang + '/' + file);
      skipped++;
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has related links
    if (content.includes(sectionLabels[lang])) {
      console.log('SKIP (exists): ' + lang + '/' + file);
      skipped++;
      return;
    }

    // Build the related links line
    const linkItems = links.map(l => {
      const slug = l.file.replace('.md', '');
      return '[' + l.title + '](/blog/' + slug + ')';
    }).join(' · ');

    const section = '\n\n---\n\n**' + sectionLabels[lang] + '：** ' + linkItems + '\n';

    // Remove trailing whitespace before appending
    content = content.replace(/\s+$/, '');
    content += section;

    fs.writeFileSync(filePath, content);
    console.log('DONE: ' + lang + '/' + file);
    done++;
  });
});

console.log('\n✅ ' + done + ' files with links added, ' + skipped + ' skipped');
