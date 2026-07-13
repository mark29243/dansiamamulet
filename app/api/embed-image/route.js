import { NextResponse } from 'next/server';
import { pipeline, env, RawImage } from '@xenova/transformers';
import { Jimp } from 'jimp';

// Configure transformers cache directory to /tmp which is writable in Vercel Serverless
env.cacheDir = '/tmp';
// Disable local models since we are running in a serverless environment
env.allowLocalModels = false;

// We use a singleton pattern for the pipeline to avoid loading the model multiple times during warm starts
let extractorPromise = null;

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    let inputImage = url;
    
    // If it's a base64 data URL, process it with Jimp first
    if (url.startsWith('data:image/')) {
       const base64Data = url.split(',')[1];
       const buffer = Buffer.from(base64Data, 'base64');
       const jimpImage = await Jimp.read(buffer);
       inputImage = new RawImage(jimpImage.bitmap.data, jimpImage.bitmap.width, jimpImage.bitmap.height, 4);
    }
    
    if (!extractorPromise) {
       // Load the feature extraction pipeline
       extractorPromise = pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
    }
    
    const extractor = await extractorPromise;
    
    // Perform feature extraction
    const output = await extractor(inputImage);
    const embedding = Array.from(output.data);
    
    return NextResponse.json({ embedding });
  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
