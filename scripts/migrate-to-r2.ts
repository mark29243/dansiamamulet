/**
 * Migrate product images from Supabase Storage to Cloudflare R2.
 * Run: npx tsx scripts/migrate-to-r2.ts
 * No .env needed — all data is embedded.
 */
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const R2_BUCKET = 'dansiam-products';
const R2_PUBLIC_BASE = 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev';
const R2_ENDPOINT = 'https://6689a20e2293c64184622111b965b70c.r2.cloudflarestorage.com';
const R2_ACCESS_KEY = 'bc99e07e93b25faa4b402328bc807367';
const R2_SECRET_KEY = 'a3c0d40cdbbcd749688761dc2b8856defdfe3eef704c4c8761a4ee1ead5427d2';

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: R2_ACCESS_KEY, secretAccessKey: R2_SECRET_KEY },
});

// All products with their current Supabase image URLs
const PRODUCTS: { id: number; images: string[] }[] = [
  { id: 32, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/S__28753983_0.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/S__28753984_0.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/S__28753985_0.jpg"] },
  { id: 33, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001684469-zgm983a81u.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001684514-oi85vgwuyk9.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001684485-6pa4cy6zuc.jpg"] },
  { id: 34, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001683983-k8qz97231y9.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001683360-pfolez855g.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779001683330-4meyik14ua.jpg"] },
  { id: 35, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778934935277-r99l55gmj9o.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778934935404-y69rcky7t1j.webp"] },
  { id: 36, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936342125-0d03qusptahj.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778934936444-3pgu3wct8tf.webp"] },
  { id: 37, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936342828-tqzi7b0p1j.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936342832-4oi6hv8anr3.webp"] },
  { id: 38, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936343216-y4sd9xkhevf.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936343201-a6l1lcegw0a.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936343335-q7spkqraygg.webp"] },
  { id: 39, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936343722-hh6cixpond.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936343726-s2ilavavs9a.webp"] },
  { id: 40, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936981648-nn9yv5suhc.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936981678-svbiqcn32ap.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778936981670-r65kwjq3ow.webp"] },
  { id: 41, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778937258566-yqx6fno17h.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778937258459-mp0sll293eg.webp","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1778937258538-yeea4a3jhms.webp"] },
  { id: 42, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779000677830-41cujiibgn.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779000677852-tx8loa2gfbg.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779000677825-zxxkegedkgh.jpg"] },
  { id: 43, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779010318030-a3xe9rxkx7h.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779010318037-25qq6ulc1ib.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779010318057-fcdjzrcwd7p.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779010318046-q7l1gca9bp.jpg"] },
  { id: 44, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779092816192-enj94w3owm.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779092816259-i9r4lhzivbk.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779092816231-cr802wgace.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779092815859-6hd9ao8dlkc.jpg"] },
  { id: 45, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093307979-9is6ktsvvzu.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093307985-n1buogvcb8j.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093307969-r3713e76sal.jpg"] },
  { id: 46, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093581682-5jkkuywtq6c.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093581716-4cw6akrsgf.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779093581724-f2r4mf8ajss.jpg"] },
  { id: 47, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779191798349-0k6ogpoklt7.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779191798351-c0rq9ugg3x.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779191798328-6wcbtdtikmk.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779191798314-ywavaula8bl.jpg"] },
  { id: 48, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247191835-alkg0c1ssym.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247191909-wif8ivbrg5.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247191841-rz9lfg1534f.jpg"] },
  { id: 49, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247507982-2vigmg00fag.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247507971-qcj27xzexa.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247507960-543aqc447i6.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247507969-8b0if4nuqks.jpg"] },
  { id: 50, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247753553-fj2kc440v85.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247753514-4lzgke1mq2k.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247753522-wpx8cwb01mh.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779247753539-5iuy2czjw8r.jpg"] },
  { id: 51, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758727806-gcu57khcap.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758727839-tr48ygdr6na.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758727801-z4elw63anhs.jpg"] },
  { id: 52, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758952870-17ns5wrsm25.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758952874-hbp6kg4btjo.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779758952847-0awnswl9q9fn.jpg"] },
  { id: 53, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779759123109-74lx3q7hbld.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779759123089-9xgnvu2a7u8.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779759123093-h5n56tywnc.jpg"] },
  { id: 54, images: ["https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779848378944-i6qmv0ur3wr.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779848378936-3ggfxh2a259.jpg","https://woieynotnkdgjsopknwz.supabase.co/storage/v1/object/public/products/1779848378745-l0kibm796ga.jpg"] },
];

function getFilename(url: string): string {
  return url.split('/').pop()!;
}

function getContentType(filename: string): string {
  if (filename.endsWith('.webp')) return 'image/webp';
  if (filename.endsWith('.png')) return 'image/png';
  return 'image/jpeg';
}

async function fileExistsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadToR2(url: string): Promise<string> {
  const filename = getFilename(url);
  if (await fileExistsInR2(filename)) {
    console.log(`  ⏭  skip (exists): ${filename}`);
    return `${R2_PUBLIC_BASE}/${filename}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: getContentType(filename),
  }));
  console.log(`  ✓ ${filename}`);
  return `${R2_PUBLIC_BASE}/${filename}`;
}

async function main() {
  console.log(`Migrating ${PRODUCTS.length} products to R2...\n`);

  // Collect SQL updates to print at the end
  const sqlUpdates: string[] = [];
  let total = 0, done = 0;

  for (const p of PRODUCTS) {
    console.log(`Product #${p.id} (${p.images.length} images)`);
    const newImages: string[] = [];
    for (const url of p.images) {
      total++;
      try {
        newImages.push(await uploadToR2(url));
        done++;
      } catch (e: any) {
        console.error(`  ✗ ${e.message}`);
        newImages.push(url);
      }
    }
    const arr = JSON.stringify(newImages).replace(/'/g, "''");
    sqlUpdates.push(`UPDATE products SET images = '${arr}' WHERE id = ${p.id};`);
  }

  console.log(`\nUploaded ${done}/${total} images.\n`);
  console.log('=== SQL to run in Supabase ===');
  console.log(sqlUpdates.join('\n'));
}

main().catch(console.error);
