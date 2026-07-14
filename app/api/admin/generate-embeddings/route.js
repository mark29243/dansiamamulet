import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { pipeline, env, RawImage } from '@xenova/transformers';

env.cacheDir = '/tmp';
env.allowLocalModels = false;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

let extractorPromise = null;

export async function GET(request) {
  try {
    // Only allow admin (or just temporary open for this one-time task)
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== 'dansiam-embed') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!extractorPromise) {
      extractorPromise = pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
    }
    const extractor = await extractorPromise;

    // Fetch up to 10 products missing embeddings
    const { data: products, error } = await supabase
      .from('products')
      .select('id, thumbnail_url, images')
      .is('image_embedding', null)
      .limit(10);

    if (error) throw error;
    
    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No more products to embed.' });
    }

    const results = [];
    for (const p of products) {
      let imageUrl = p.thumbnail_url;
      if (!imageUrl && p.images && p.images.length > 0) imageUrl = p.images[0];
      
      if (!imageUrl) {
        results.push({ id: p.id, status: 'skipped (no image)' });
        continue;
      }
      
      let finalUrl = imageUrl;
      if (finalUrl.startsWith('/')) finalUrl = 'https://dansiamamulets.com' + finalUrl;

      try {
        const output = await extractor(finalUrl);
        const embedding = Array.from(output.data);
        
        await supabase.from('products').update({ image_embedding: embedding }).eq('id', p.id);
        results.push({ id: p.id, status: 'success' });
      } catch (err) {
        results.push({ id: p.id, status: 'error', error: err.message });
      }
    }

    return NextResponse.json({ processed: products.length, results });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
