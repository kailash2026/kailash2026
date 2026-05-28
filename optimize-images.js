import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imagesDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images', 'optimized');

// Create output directory if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  'kailash-aerial.jpg',
  'kailash-birds.jpg',
  'kailash-golden.jpg',
  'kailash-lake.jpg',
  'kailash-prairie.jpg',
  'kailash-sunrise.jpg',
  'kailash-yaks.jpg',
  'og-image.jpg'
];

async function optimizeImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  const outputPath = path.join(outputDir, filename.replace('.jpg', '.webp'));
  const outputPathJpg = path.join(outputDir, filename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping ${filename} - not found`);
    return;
  }
  
  try {
    // Create WebP version
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath);
    
    // Create optimized JPEG fallback
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPathJpg);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const jpgSize = fs.statSync(outputPathJpg).size;
    
    console.log(`${filename}:`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
    console.log(`  Optimized JPG: ${(jpgSize / 1024).toFixed(2)} KB (${((1 - jpgSize/originalSize) * 100).toFixed(1)}% smaller)`);
    
  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

async function main() {
  console.log('Optimizing images...\n');
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('\nDone!');
}

main();
