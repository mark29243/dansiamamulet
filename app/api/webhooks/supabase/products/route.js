import { NextResponse } from 'next/server';

/**
 * Supabase Products Webhook Endpoint
 * Note: Heavy AI CLIP Vision embedding inference has been offloaded to offline 
 * batch scripts (scripts/embed-products.ts) to prevent depleting Vercel Serverless 
 * Fluid Active CPU quota.
 */
export async function POST(request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const recordId = payload?.record?.id;
    
    return NextResponse.json({
      ok: true,
      message: 'Product webhook received. AI embeddings are processed via offline batch jobs to preserve serverless compute.',
      id: recordId || null,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
