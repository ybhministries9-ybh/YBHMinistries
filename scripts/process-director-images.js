/**
 * Process director images into WebP variants at multiple sizes.
 *
 * Usage:
 *   node scripts/process-director-images.js
 *
 * Steps:
 *   1. Place your new source images (JPG or PNG) in public/images/directors/
 *      using lowercase first-name filenames, e.g. augustine.jpg, vijaya.png
 *   2. Run this script.
 *   3. It will generate:
 *        name.webp       – full-size WebP (max 1200px wide)
 *        name@400.webp   – 400px wide
 *        name@800.webp   – 800px wide
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const DIRECTORS_DIR = path.join(__dirname, '..', 'public', 'images', 'directors');

const SIZES = [
  { suffix: '@400', width: 400, quality: 70 },
  { suffix: '@800', width: 800, quality: 75 },
  { suffix: '',     width: 1200, quality: 80 },  // full-size capped at 1200px
];

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);

  console.log(`\nProcessing: ${baseName}${ext}`);

  for (const { suffix, width, quality } of SIZES) {
    const outputName = `${baseName}${suffix}.webp`;
    const outputPath = path.join(DIRECTORS_DIR, outputName);

    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const kb = (stats.size / 1024).toFixed(1);
    console.log(`  ✓ ${outputName}  (${kb} KB)`);
  }
}

async function main() {
  const files = fs.readdirSync(DIRECTORS_DIR)
    .filter(f => /\.(jpe?g|png)$/i.test(f))
    .map(f => path.join(DIRECTORS_DIR, f));

  if (files.length === 0) {
    console.log('No JPG/PNG source images found in', DIRECTORS_DIR);
    console.log('Place your new director photos there and re-run.');
    return;
  }

  console.log(`Found ${files.length} source image(s) in ${DIRECTORS_DIR}`);

  for (const file of files) {
    await processImage(file);
  }

  console.log('\nDone! All WebP variants generated.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
