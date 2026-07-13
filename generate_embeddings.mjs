import { createClient } from '@supabase/supabase-js';
import { pipeline, env, RawImage } from '@xenova/transformers';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import sharp from 'sharp';

dotenv.config({ path: '.env.local' });

// Configure transformers to not look for local models, but fetch from Hugging Face
env.allowLocalModels = false;
env.useBrowserCache = false;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("=== Generate Image Embeddings Bot ===");
  console.log("Loading AI Model (CLIP)... This might take a minute on the first run...");
  
  // Use a lightweight, quantized CLIP model for vision
  const extractor = await pipeline('feature-extraction', 'Xenova/clip-vit-base-patch32');
  console.log("AI Model loaded successfully!");

  console.log("Fetching products that need embeddings...");
  // Query products without embeddings
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name_th, images')
    .is('image_embedding', null)
    .not('images', 'is', null)
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  console.log(`Found ${products.length} products to process.`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Processing: ${product.name_th}`);
    
    try {
      if (!product.images || product.images.length === 0) {
         console.log("No images found, skipping.");
         continue;
      }
      // Fetch the image
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
      const buffer = await res.buffer();
      
      // Use sharp to convert webp/any image to raw RGB pixel data
      const { data, info } = await sharp(buffer)
        .resize(224, 224, { fit: 'inside' }) // resize to speed up and fit model
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
        
      // Create RawImage for transformers.js
      const rawImage = new RawImage(new Uint8ClampedArray(data), info.width, info.height, info.channels);
      
      const output = await extractor(rawImage);
      
      // The output is a tensor, we convert it to a normal array of floats
      const embeddingArray = Array.from(output.data);
      
      // Save back to database
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_embedding: embeddingArray })
        .eq('id', product.id);
        
      if (updateError) {
         console.error("Failed to save embedding:", updateError.message);
      } else {
         console.log("Saved successfully!");
      }
      
    } catch (err) {
      console.error(`Error processing product ${product.id}:`, err.message);
    }
  }

  console.log("All done!");
}

run().catch(console.error);
