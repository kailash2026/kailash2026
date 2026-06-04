const fs = require('fs');
const path = 'C:/Users/Administrator/.openclaw/workspace/kailash2026/src/pages/index.astro';
let c = fs.readFileSync(path, 'utf8');

// Remove Korean content blocks:
// Pattern: <!-- 한국어 -->\n<div data-lang-content="ko" ... </div>
// This is followed by Hindi blocks, so we need to be precise.

// Remove all blocks that start with a Korean comment and end with </div>
// The Korean comment is: <!-- 한국어 -->
let count = 0;
while (c.includes('<!-- 한국어 -->')) {
  const start = c.indexOf('<!-- 한국어 -->');
  // Find the matching <div ... </div>
  // The pattern is:
  // <!-- 한국어 -->\n      <div data-lang-content="ko" ... \n      </div>
  // We need to find the closing </div>
  const divStart = c.indexOf('<div', start);
  if (divStart === -1) break;
  
  // Count div nesting to find the closing tag
  let depth = 1;
  let pos = divStart + 4;
  while (depth > 0 && pos < c.length) {
    const nextOpen = c.indexOf('<div', pos);
    const nextClose = c.indexOf('</div>', pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  const end = pos;
  c = c.slice(0, start) + c.slice(end);
  count++;
}

fs.writeFileSync(path, c, 'utf8');
console.log(`Removed ${count} Korean content blocks`);
