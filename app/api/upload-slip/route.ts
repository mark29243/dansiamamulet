import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const orderId = form.get('orderId') as string;
    const file = form.get('file') as File;

    if (!orderId || !file) {
      return NextResponse.json({ error: 'Missing orderId or file' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const admin = createAdminClient();

    // Verify order exists and is pending_alipay
    const { data: order } = await admin
      .from('orders')
      .select('id, status')
      .eq('id', orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Upload to Supabase Storage
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${orderId}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadErr } = await admin.storage
      .from('slips')
      .upload(path, bytes, { contentType: file.type, upsert: true });

    if (uploadErr) {
      console.error('Upload error:', uploadErr);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const { data: { publicUrl } } = admin.storage.from('slips').getPublicUrl(path);

    // Update order with slip URL and change status to pending_review
    await admin
      .from('orders')
      .update({
        payment_slip_url: publicUrl,
        payment_slip_uploaded_at: new Date().toISOString(),
        status: 'pending_review',
      })
      .eq('id', orderId);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Upload slip error:', e);
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
