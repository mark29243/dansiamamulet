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

    // 1. Fetch all products to find the broken ones and the used R2 images
    const { data: allProducts, error } = await admin.from('products').select('id, name, created_at, images').order('created_at', { ascending: true });
    if (error) return NextResponse.json({ error: error.message });

    const brokenProducts = allProducts.filter(p => p.images && p.images.some((img: string) => img.includes('supabase.co')));
    if (brokenProducts.length === 0) {
      return NextResponse.json({ message: "No broken images found!" });
    }

    // 2. Fetch used images from all tables
    const usedImages = new Set<string>();
    const extractR2Key = (url: string) => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    };

    allProducts.forEach(p => {
      if (p.images) p.images.forEach((url: string) => {
        if (!url.includes('supabase.co')) usedImages.add(extractR2Key(url));
      });
    });

    const { data: shopeeProducts } = await admin.from('shopee_products').select('images');
    if (shopeeProducts) {
      shopeeProducts.forEach(p => {
        if (p.images) p.images.forEach((url: string) => usedImages.add(extractR2Key(url)));
      });
    }

    const { data: juneProducts } = await admin.from('june_products').select('images');
    if (juneProducts) {
      juneProducts.forEach(p => {
        if (p.images) p.images.forEach((url: string) => usedImages.add(extractR2Key(url)));
      });
    }

    // 3. Fetch all R2 files
    let r2Files: { key: string, time: number }[] = [];
    let isTruncated = true;
    let continuationToken = undefined;
    while (isTruncated) {
      const res: any = await s3.send(new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET!,
        ContinuationToken: continuationToken,
      }));
      if (res.Contents) {
        for (const c of res.Contents) {
          const match = c.Key.match(/^(\d{13})-/);
          if (match) {
            r2Files.push({ key: c.Key, time: parseInt(match[1]) });
          }
        }
      }
      isTruncated = res.IsTruncated ?? false;
      continuationToken = res.NextContinuationToken;
    }

    // 4. Find orphaned R2 files (those uploaded from the phone but discarded by the bug)
    const orphanedFiles = r2Files.filter(f => !usedImages.has(f.key));
    orphanedFiles.sort((a, b) => a.time - b.time); // chronological

    // 5. Match orphaned files to broken products based on chronological order
    const r2PublicUrl = process.env.R2_PUBLIC_URL!;
    const results = [];
    let orphanIdx = 0;

    for (let i = 0; i < brokenProducts.length; i++) {
      const p = brokenProducts[i];
      const pTime = new Date(p.created_at).getTime();
      
      const prevPTime = i > 0 ? new Date(brokenProducts[i-1].created_at).getTime() : 0;
      
      let matchedUrls = [];
      // Assign orphaned images that were uploaded BEFORE this product was saved, 
      // but AFTER the previous broken product was saved.
      // (Added a 24-hour buffer in case they left the browser open for a long time)
      const minTimeLimit = Math.max(prevPTime, pTime - 24 * 60 * 60 * 1000);

      while (orphanIdx < orphanedFiles.length && orphanedFiles[orphanIdx].time <= pTime + 60000) {
        if (orphanedFiles[orphanIdx].time > minTimeLimit) {
          matchedUrls.push(`${r2PublicUrl}/${orphanedFiles[orphanIdx].key}`);
        }
        orphanIdx++;
      }

      if (matchedUrls.length > 0) {
        // Update product in database
        await admin.from('products').update({ images: matchedUrls }).eq('id', p.id);
        results.push({ id: p.id, name: p.name, recovered: matchedUrls.length });
      }
    }

    return NextResponse.json({ 
      orphaned_count: orphanedFiles.length,
      recovered_products: results.length,
      still_broken: brokenProducts.length - results.length,
      details: results 
    });

  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
