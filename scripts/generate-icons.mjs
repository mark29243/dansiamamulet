// Run: node scripts/generate-icons.mjs
// Requires: npm install sharp

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, '../public/admin-icon.svg');
const svg = readFileSync(svgPath);

await sharp(svg).resize(192, 192).png().toFile(join(__dirname, '../public/admin-icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(join(__dirname, '../public/admin-icon-512.png'));
await sharp(svg).resize(180, 180).png().toFile(join(__dirname, '../public/apple-touch-icon.png'));

console.log('Icons generated!');
