import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(req: Request) {
  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: products, error } = await admin.from('products').select('id, name, images');
    if (error) return NextResponse.json({ error: error.message });

    let totalRemoved = 0;
    const results = [];

    for (const p of products) {
      if (!p.images || p.images.length <= 1) continue;

      const uniqueImages = [];
      const seenSizes = new Set<string>();
      let removed = 0;

      for (const url of p.images) {
        try {
          // If it's not a full URL or not R2, just keep it
          if (!url.startsWith('http')) {
            uniqueImages.push(url);
            continue;
          }

          const res = await fetch(url, { method: 'HEAD' });
          if (!res.ok) {
            uniqueImages.push(url); // keep broken ones just in case
            continue;
          }

          const contentLength = res.headers.get('content-length');
          if (contentLength && seenSizes.has(contentLength)) {
            // Duplicate found!
            removed++;
          } else {
            if (contentLength) seenSizes.add(contentLength);
            uniqueImages.push(url);
          }
        } catch (e) {
          uniqueImages.push(url); // keep on error
        }
      }

      if (removed > 0) {
        await admin.from('products').update({ images: uniqueImages }).eq('id', p.id);
        totalRemoved += removed;
        results.push({ id: p.id, name: p.name, removed });
      }
    }

    return NextResponse.json({ 
      message: "Deduplication complete!",
      total_removed: totalRemoved,
      products_affected: results.length,
      details: results 
    });

  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
