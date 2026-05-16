import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/csrf';

export const runtime = 'nodejs';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (!rateLimit(getIp(req), 5, 60_000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const form = await req.formData();
    const orderId = form.get('orderId') as string;
    const email = (form.get('email') as string | null)?.toLowerCase().trim();
    const file = form.get('file') as File;

    if (!orderId || !file) {
      return NextResponse.json({ error: 'Missing orderId or file' }, { status: 400 });
    }

    // Whitelist MIME types — reject non-image files
    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json({ error: 'Only image files are allowed (JPG, PNG, WEBP)' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const admin = createAdminClient();

    const { data: order } = await admin
      .from('orders')
      .select('id, status, customer_email')
      .eq('id', orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (!['pending_alipay', 'pending'].includes(order.status)) {
      return NextResponse.json({ error: 'Order is not awaiting payment' }, { status: 400 });
    }
    // Verify requester knows the email on the order
    if (email && order.customer_email && email !== order.customer_email.toLowerCase()) {
      return NextResponse.json({ error: 'Email does not match order' }, { status: 403 });
    }

    const ext = file.type.split('/')[1] || 'jpg';
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
