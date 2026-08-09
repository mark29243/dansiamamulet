import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

async function uploadToR2(s3: S3Client, key: string, body: Buffer | Uint8Array, contentType: string): Promise<string> {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  return `${process.env.R2_PUBLIC_URL!}/${key}`;
}

async function downloadAndUploadToR2(s3: S3Client, shopeeUrl: string): Promise<string | null> {
  try {
    const res = await fetch(shopeeUrl, {
      headers: { 'Referer': 'https://shopee.co.th/', 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
    const key = `products/recovered-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    return await uploadToR2(s3, key, buffer, contentType);
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    const { data: products, error } = await admin.from('products').select('id, name, name_th, images');
    if (error) return NextResponse.json({ error: error.message });

    const brokenProducts = products.filter(p => 
      p.images && p.images.some((img: string) => img.includes('supabase.co'))
    );

    if (brokenProducts.length === 0) {
      return NextResponse.json({ message: "No broken images found! Everything is fixed." });
    }

    const { data: shopeeProducts } = await admin.from('shopee_products').select('name, name_th, shopee_images, images');
    const { data: juneProducts } = await admin.from('june_products').select('name, name_th, shopee_images, images');
    
    const allStock = [...(shopeeProducts || []), ...(juneProducts || [])];
    const results = [];

    for (const p of brokenProducts) {
      // Match by name_th because the English name might have been changed by Claude SEO
      const stockItem = allStock.find(s => s.name_th === p.name_th || s.name === p.name_th);
      if (stockItem && stockItem.shopee_images && stockItem.shopee_images.length > 0) {
        
        let newImages = [];
        // if stockItem already has R2 images in 'images' array, we can just use them!
        if (stockItem.images && stockItem.images.length > 0 && !stockItem.images.some((img: string) => img.includes('supabase.co'))) {
          newImages = stockItem.images;
        } else {
          // Otherwise download from Shopee and upload to R2
          for (const url of stockItem.shopee_images) {
             const r2Url = await downloadAndUploadToR2(s3, url);
             if (r2Url) newImages.push(r2Url);
          }
        }

        if (newImages.length > 0) {
          await admin.from('products').update({ images: newImages }).eq('id', p.id);
          results.push({ id: p.id, name: p.name, recovered: newImages.length });
        }
      }
    }

    return NextResponse.json({ 
      recovered_count: results.length,
      still_broken: brokenProducts.length - results.length,
      details: results 
    });

  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
