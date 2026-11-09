import { NextResponse } from 'next/server';

/**
 * Image Embedding Endpoint
 * Note: Running Xenova/CLIP ONNX in Serverless Function is disabled to protect
 * Vercel Fluid Active CPU quota (4 hours/month limit). Image embeddings are precomputed
 * offline via scripts/embed-products.ts.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'AI image embedding inference on Serverless is disabled to conserve Vercel CPU quota. Please use text search or run scripts/embed-products.ts offline.',
    },
    { status: 503 }
  );
}
