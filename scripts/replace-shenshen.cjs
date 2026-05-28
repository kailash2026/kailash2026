const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));

let totalReplaced = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const original = content;
  
  // Replace "神山" with "冈仁波齐"
  content = content.replace(/神山/g, '冈仁波齐');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const count = (original.match(/神山/g) || []).length;
    console.log(`✅ ${file}: replaced ${count} occurrences`);
    totalReplaced += count;
  }
});

console.log(`\nTotal replaced: ${totalReplaced} occurrences in ${files.length} files`);
