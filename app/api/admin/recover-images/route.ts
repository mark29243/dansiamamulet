import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';
export const maxDuration = 300;

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

    const { data: products, error } = await admin.from('products').select('id, name, images');
    if (error) return NextResponse.json({ error: error.message });

    const brokenProducts = products.filter(p => 
      p.images && p.images.some((img: string) => img.includes('supabase.co'))
    );

    if (brokenProducts.length === 0) {
      return NextResponse.json({ message: "No broken images found!" });
    }

    // Fetch all R2 objects to match timestamps
    let r2Files: string[] = [];
    let isTruncated = true;
    let continuationToken = undefined;

    while (isTruncated) {
      const res = await s3.send(new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET!,
        ContinuationToken: continuationToken,
      }));
      if (res.Contents) {
        r2Files.push(...res.Contents.map(c => c.Key!).filter(k => k.match(/^\d+-/)));
      }
      isTruncated = res.IsTruncated ?? false;
      continuationToken = res.NextContinuationToken;
    }

    const r2PublicUrl = process.env.R2_PUBLIC_URL!;
    const results = [];

    for (const p of brokenProducts) {
      let updatedImages = [];
      let changed = false;

      for (const imgUrl of p.images) {
        if (imgUrl.includes('supabase.co')) {
          // Extract timestamp from filename e.g. "1786251625294-1g7rttsk0wm.webp" -> 1786251625294
          const match = imgUrl.match(/(\d{13})-/);
          if (match) {
            const sbTime = parseInt(match[1]);
            // Find closest R2 file within 10 seconds
            let closestFile = null;
            let minDiff = 10000;

            for (const r2Key of r2Files) {
              const r2Match = r2Key.match(/^(\d{13})-/);
              if (r2Match) {
                const r2Time = parseInt(r2Match[1]);
                const diff = Math.abs(r2Time - sbTime);
                if (diff < minDiff) {
                  minDiff = diff;
                  closestFile = r2Key;
                }
              }
            }

            if (closestFile && minDiff < 10000) {
              updatedImages.push(`${r2PublicUrl}/${closestFile}`);
              changed = true;
              continue;
            }
          }
        }
        updatedImages.push(imgUrl);
      }

      if (changed) {
        await admin.from('products').update({ images: updatedImages }).eq('id', p.id);
        results.push({ id: p.id, name: p.name, recovered: updatedImages.length });
      }
    }

    return NextResponse.json({ 
      recovered_count: results.length,
      details: results 
    });

  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
