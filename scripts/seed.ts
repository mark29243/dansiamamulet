/**
 * Seed Supabase with products from WooCommerce CSV export.
 *
 * Usage:
 *   1. Place CSV at scripts/products.csv
 *   2. Set SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   3. Run: npm run seed
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'scripts', 'products.csv');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found at ${CSV_PATH}`);
    console.error('Place your WooCommerce export at scripts/products.csv');
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows: Record<string, string>[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`Parsed ${rows.length} rows from CSV`);

  const products = rows
    .filter((r) => r['Name'] && r['Regular price'])
    .map((r) => {
      const name = r['Name'].trim();
      const images = (r['Images'] || '')
        .split(',')
        .map((u) => u.trim())
        .filter((u) => u && u !== 'nan');
      // dedupe images
      const uniqueImages = Array.from(new Set(images));

      const priceTHB = parseFloat(r['Regular price']);
      const salePriceTHB = r['Sale price'] ? parseFloat(r['Sale price']) : null;

      let cat = (r['Categories'] || 'General').split(',')[0].trim();
      if (!cat || cat === 'Uncategorized') {
        // Auto-categorize from name
        const n = name.toLowerCase();
        if (n.includes('coin')) cat = 'Coin';
        else if (n.includes('takrud') || n.includes('takrut')) cat = 'Takrut';
        else if (n.includes('somdej') || n.includes('sangkachai')) cat = 'Somdej';
        else if (n.includes('pendant') || n.includes('namo')) cat = 'Pendant';
        else if (n.includes('rahu') || n.includes('hun payont') || n.includes('hunpayont') || n.includes('ruesi') || n.includes('ganesha') || n.includes('kumarn'))
          cat = 'Talisman';
        else cat = 'Collectible';
      }

      return {
        legacy_id: parseInt(r['ID']),
        slug: `${slugify(name)}-${r['ID']}`,
        name,
        category: cat,
        price: Math.round(priceTHB * 100),
        sale_price: salePriceTHB ? Math.round(salePriceTHB * 100) : null,
        stock: r['Stock'] ? parseInt(r['Stock']) : 0,
        description: stripHtml(r['Description'] || '').slice(0, 2000),
        short: stripHtml(r['Short description'] || '').slice(0, 400),
        images: uniqueImages,
        is_featured: r['Is featured?'] === '1',
        published: r['Published'] === '1' || r['Published'] === undefined,
      };
    });

  console.log(`Prepared ${products.length} products for insert`);

  // Upsert by legacy_id
  const { data, error } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'legacy_id' })
    .select('id, legacy_id, name');

  if (error) {
    console.error('Upsert error:', error);
    process.exit(1);
  }

  console.log(`✓ Seeded ${data?.length ?? 0} products`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
