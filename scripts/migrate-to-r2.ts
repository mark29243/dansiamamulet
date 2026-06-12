/**
 * Migrate product images from Supabase Storage to Cloudflare R2,
 * resizing to max 1600px WebP along the way.
 *
 * Reads products via the public REST API (anon key, read-only) and writes the
 * resulting UPDATE statements to scripts/migrate-output.sql for review/apply.
 *
 * R2 credentials come from .env.local — never hardcode them here.
 * Run: npx tsx scripts/migrate-to-r2.ts
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { writeFileSync } from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const need = (n: string): string => {
  const v = process.env[n];
  if (!v) { console.error(`Missing env: ${n}`); process.exit(1); }
  return v!;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://woieynotnkdgjsopknwz.supabase.co';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.MIGRATE_ANON_KEY || '';

const s3 = new S3Client({
  region: 'auto',
  endpoint: need('R2_ENDPOINT'),
  credentials: { accessKeyId: need('R2_ACCESS_KEY_ID'), secretAccessKey: need('R2_SECRET_ACCESS_KEY') },
});
const BUCKET = need('R2_BUCKET');
const PUBLIC_BASE = need('R2_PUBLIC_URL');

async function migrateImage(url: string): Promise<string> {
  if (url.includes('r2.dev')) return url; // already on R2

  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${res.status}: ${url}`);
  const input = Buffer.from(await res.arrayBuffer());

  const optimized = await sharp(input, { failOn: 'none' })
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const key = `m-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: optimized, ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  console.log(`    ${(input.length / 1024).toFixed(0)}KB -> ${(optimized.length / 1024).toFixed(0)}KB`);
  return `${PUBLIC_BASE}/${key}`;
}

async function main() {
  if (!ANON_KEY) { console.error('Missing anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY or MIGRATE_ANON_KEY)'); process.exit(1); }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id,images&order=id`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  });
  if (!res.ok) { console.error(`Fetch products failed: ${res.status} ${await res.text()}`); process.exit(1); }
  const all = (await res.json()) as { id: number; images: string[] }[];

  const list = all.filter(p => JSON.stringify(p.images ?? []).includes('supabase'));
  console.log(`Migrating ${list.length} products...\n`);

  const updates: string[] = [];
  let ok = 0, failed = 0;

  for (const p of list) {
    const images: string[] = Array.isArray(p.images) ? p.images : [];
    console.log(`#${p.id} (${images.length} images)`);
    try {
      const newImages: string[] = [];
      for (const u of images) newImages.push(await migrateImage(u));
      updates.push(`update products set images = '${JSON.stringify(newImages)}'::jsonb where id = ${p.id};`);
      ok++;
    } catch (e: any) {
      console.error(`  FAILED: ${e.message}`);
      failed++;
    }
  }

  writeFileSync('scripts/migrate-output.sql', updates.join('\n') + '\n');
  console.log(`\nDone. ok=${ok} failed=${failed}`);
  console.log('SQL written to scripts/migrate-output.sql — apply it to finish the migration.');
}

main();
