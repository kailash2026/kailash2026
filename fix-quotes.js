const fs = require('fs');
let f = fs.readFileSync('src/pages/culture.astro', 'utf8');
// Replace curly double quotes with straight single quotes
f = f.replace(/\u201c/g, "'").replace(/\u201d/g, "'");
fs.writeFileSync('src/pages/culture.astro', f);
console.log('Quotes fixed');
