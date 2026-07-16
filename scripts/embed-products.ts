import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { pipeline, env, RawImage } from '@xenova/transformers';
import { Jimp } from 'jimp';

// Disable local models caching issues
env.allowLocalModels = true;
// Setup supabase admin
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function main() {
  console.log('Loading image-feature-extraction pipeline...');
  const extractor = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
  console.log('Model loaded.');

  console.log('Fetching products missing image_embedding...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name_th, thumbnail_url, images')
    .is('image_embedding', null);

  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  console.log(`Found ${products.length} products to embed.`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    let imageUrl = p.thumbnail_url;
    if (!imageUrl && p.images && p.images.length > 0) {
      imageUrl = p.images[0];
    }

    if (!imageUrl) {
      console.log(`[${i+1}/${products.length}] Skipping ID ${p.id} - No image available.`);
      failCount++;
      continue;
    }

    try {
      console.log(`[${i+1}/${products.length}] Embedding ID ${p.id} (${p.name_th}) - ${imageUrl}`);
      
      // Some images are URLs, some might be paths. Ensure they are absolute URLs
      let finalUrl = imageUrl;
      if (finalUrl.startsWith('/')) {
        finalUrl = 'https://dansiamamulets.com' + finalUrl;
      }

      // Download image directly with fetch or Jimp? 
      // Jimp is better to handle WebP/JPEG conversion in JS if Xenova has issues with node
      // Actually Xenova `RawImage.read(url)` works great for JPEG/PNG, but maybe fails on WebP.
      // So we will use Jimp to parse it first.
      
      const imgBufferRes = await fetch(finalUrl);
      if (!imgBufferRes.ok) throw new Error(`Failed to fetch image: ${imgBufferRes.statusText}`);
      
      const buffer = Buffer.from(await imgBufferRes.arrayBuffer());
      const jimpImage = await Jimp.read(buffer);
      
      // Note Jimp 1.x jimpImage.bitmap is what we need
      const inputImage = new RawImage(jimpImage.bitmap.data, jimpImage.bitmap.width, jimpImage.bitmap.height, 4);

      const output = await extractor(inputImage);
      const embedding = Array.from(output.data);

      const { error: updateError } = await supabase
        .from('products')
        .update({ image_embedding: embedding })
        .eq('id', p.id);

      if (updateError) {
        console.error(`  - Update error for ID ${p.id}:`, updateError);
        failCount++;
      } else {
        successCount++;
      }
    } catch (e) {
      console.error(`  - Failed to embed ID ${p.id}:`, e.message);
      failCount++;
    }
  }

  console.log(`\nFinished! Success: ${successCount}, Failed/Skipped: ${failCount}`);
}

main().catch(console.error);
