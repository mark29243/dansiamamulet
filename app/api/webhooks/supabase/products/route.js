import { NextResponse } from 'next/server';
import { pipeline, env, RawImage } from '@xenova/transformers';
import { Jimp } from 'jimp';
import { createClient } from '@supabase/supabase-js';

// Configure transformers cache directory to /tmp which is writable in Vercel Serverless
env.cacheDir = '/tmp';
env.allowLocalModels = false;

let extractorPromise = null;


export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  try {
    const payload = await request.json();
    
    // Validate webhook payload (Supabase Database Webhook format)
    if (!payload.type || !payload.record || payload.table !== 'products') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { type, record, old_record } = payload;
    const { id, images } = record;

    // Only process INSERT or UPDATE where images have changed
    if (type === 'UPDATE' && old_record) {
      const oldImagesStr = JSON.stringify(old_record.images || []);
      const newImagesStr = JSON.stringify(images || []);
      if (oldImagesStr === newImagesStr) {
        return NextResponse.json({ message: 'Images not changed, skipping.' });
      }
    }

    // Check if there is an image to embed
    let imageUrl = images && images.length > 0 ? images[0] : null;
    
    if (!imageUrl) {
      // If image is removed, we could optionally clear the embedding.
      // But for now, we just skip it.
      return NextResponse.json({ message: 'No image found, skipping.' });
    }

    // If it's a base64 data URL, process it with Jimp first
    let inputImage = imageUrl;
    if (imageUrl.startsWith('data:image/')) {
       const base64Data = imageUrl.split(',')[1];
       const buffer = Buffer.from(base64Data, 'base64');
       const jimpImage = await Jimp.read(buffer);
       inputImage = new RawImage(jimpImage.bitmap.data, jimpImage.bitmap.width, jimpImage.bitmap.height, 4);
    }
    
    if (!extractorPromise) {
       extractorPromise = pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
    }
    
    const extractor = await extractorPromise;
    const output = await extractor(inputImage);
    const embedding = Array.from(output.data);
    
    // Save to database
    const { error } = await supabase
      .from('products')
      .update({ image_embedding: embedding })
      .eq('id', id);

    if (error) {
      console.error('Error updating embedding in DB:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Embedding generated and saved successfully', id });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
