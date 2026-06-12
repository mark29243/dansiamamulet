import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/csrf';

export const runtime = 'nodejs';

function genCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = 'RVW-';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

async function sendDiscountEmail(to: string, code: string, expiresAt: Date, lang: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const expStr = expiresAt.toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const subject = lang === 'th' ? 'ขอบคุณสำหรับรีวิว — โค้ดส่วนลด 5% ของคุณ'
    : lang === 'zh' ? '感谢您的评价 — 您的5%折扣码'
    : 'Thank you for your review — Your 5% discount code';
  const html = lang === 'th'
    ? `<p>ขอบคุณที่รีวิวสินค้าของเราครับ</p><p>โค้ดส่วนลด 5% สำหรับคำสั่งซื้อถัดไปของคุณ:</p><h2 style="font-family:monospace;letter-spacing:4px;color:#B8860B">${code}</h2><p>ใช้ได้ถึง: ${expStr}</p><p>ใช้ได้ครั้งเดียว · ไม่รวมค่าจัดส่ง</p>`
    : lang === 'zh'
    ? `<p>感谢您的评价！</p><p>您的5%折扣码（适用于下一笔订单）：</p><h2 style="font-family:monospace;letter-spacing:4px;color:#B8860B">${code}</h2><p>有效期至：${expStr}</p><p>仅限一次使用 · 不含运费</p>`
    : `<p>Thank you for your review!</p><p>Your 5% discount code for your next order:</p><h2 style="font-family:monospace;letter-spacing:4px;color:#B8860B">${code}</h2><p>Valid until: ${expStr}</p><p>Single use · Excludes shipping</p>`;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.RESEND_FROM || 'Dan Siam Amulets <orders@dansiam.com>', to, subject, html }),
  });
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!(await rateLimit(`reviews:${getIp(req)}`, 3, 60_000))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const body = await req.json();
  const { order_id, rating, body: reviewBody, lang = 'th' } = body;

  if (!order_id || !rating || !reviewBody) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
  if (typeof reviewBody !== 'string' || reviewBody.trim().length < 10 || reviewBody.trim().length > 1000) {
    return NextResponse.json({ error: 'Review must be 10–1000 characters' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Verify order belongs to this user and is paid
  const { data: order } = await admin
    .from('orders')
    .select('id, status, customer_email, user_id')
    .eq('id', order_id)
    .single();

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  if (order.user_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!['paid', 'shipped', 'delivered'].includes(order.status)) {
    return NextResponse.json({ error: 'Can only review paid orders' }, { status: 400 });
  }

  // Check no existing review for this order
  const { data: existing } = await admin.from('reviews').select('id').eq('order_id', order_id).single();
  if (existing) return NextResponse.json({ error: 'Already reviewed this order' }, { status: 409 });

  // Insert review (pending approval)
  const { data: review, error: reviewErr } = await admin
    .from('reviews')
    .insert({ order_id, user_email: order.customer_email, rating, body: reviewBody.trim(), approved: false })
    .select('id')
    .single();

  if (reviewErr || !review) return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });

  // Generate discount code (single-use, 14 days)
  let code = genCode();
  let attempts = 0;
  while (attempts < 5) {
    const { error: codeErr } = await admin.from('discount_codes').insert({
      code, email: order.customer_email, percent: 5,
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      review_id: review.id,
    });
    if (!codeErr) break;
    code = genCode();
    attempts++;
  }

  // Send email (non-blocking)
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  sendDiscountEmail(order.customer_email, code, expiresAt, lang).catch(() => {});

  return NextResponse.json({ ok: true, code });
}
