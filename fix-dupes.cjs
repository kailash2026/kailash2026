const fs = require('fs');
const path = 'C:/Users/Administrator/.openclaw/workspace/kailash2026/src/pages/routes.astro';
let c = fs.readFileSync(path, 'utf8');
let changed = false;

// Replace duplicate suppliesHi + suppliesJa pairs that follow each other
// Pattern: suppliesHi line, suppliesJa line, then immediately another suppliesHi + suppliesJa pair
c = c.replace(
  /(suppliesHi: \[[^\]]*\]),\r?\n(\s+suppliesJa: \[[^\]]*\]),\r?\n(\s+suppliesHi: \[[^\]]*\]),\r?\n(\s+suppliesJa: \[[^\]]*\])/g,
  (match, h1, ja1, h2, ja2) => {
    if (h1 === h2 && ja1 === ja2) {
      changed = true;
      return `${h1},\n${ja1}`;
    }
    return match;
  }
);

if (changed) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Fixed duplicate suppliesHi/suppliesJa keys');
} else {
  console.log('No duplicates found or already fixed');
}
