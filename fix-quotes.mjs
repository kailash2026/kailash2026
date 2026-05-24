import fs from 'fs';

const file = 'src/pages/culture.astro';
let content = fs.readFileSync(file, 'utf8');

// Replace all curly/smart quotes with straight single quotes
content = content
  .replace(/\u201c/g, "'")
  .replace(/\u201d/g, "'")
  .replace(/\u2018/g, "'")
  .replace(/\u2019/g, "'");

fs.writeFileSync(file, content);
console.log('Fixed curly quotes');
