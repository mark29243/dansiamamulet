import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyLabelToken } from '@/lib/label-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyLabelToken(params.id, req.nextUrl.searchParams.get('k'))) {
    return new NextResponse('Not found', { status: 404 });
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .select('id, customer_name')
    .eq('id', params.id)
    .single();

  if (error || !data) return new NextResponse('Not found', { status: 404 });

  const lang = req.nextUrl.searchParams.get('lang') ?? 'th';
  const orderNo = data.id.slice(0, 8).toUpperCase();
  const imgSrc = `/api/label-image/${params.id}?lang=${lang}&k=${req.nextUrl.searchParams.get('k')}`;
  const pageTitle = lang === 'th' ? `ใบปะหน้าพัสดุ #${orderNo}` : `Shipping Label #${orderNo}`;
  const tip = lang === 'th'
    ? 'กดค้างที่รูป → "แชร์" → เลือก LINE'
    : 'Long-press image → "Share" → select LINE';

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>${pageTitle}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; background: #F0ECE4; font-family: -apple-system, 'Helvetica Neue', sans-serif; }
  body { display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 24px 16px 40px; }
  .label-img {
    display: block;
    width: 100%;
    max-width: 420px;
    border-radius: 12px;
    box-shadow: 0 6px 32px rgba(0,0,0,0.15);
    -webkit-user-select: none;
    user-select: none;
  }
  .card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    padding: 16px 18px;
    margin-top: 16px;
  }
  .card-title { font-size: 13px; font-weight: 700; color: #1A1208; margin-bottom: 8px; }
  .steps { font-size: 14px; color: #444; line-height: 2; }
  .steps strong { color: #1A1208; }
  .btn-share {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; height: 50px; border-radius: 12px; border: none;
    background: #1A1208; color: white; font-size: 16px; font-weight: 600;
    cursor: pointer; margin-top: 16px; max-width: 420px;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-share:active { background: #2D2010; }
  .order-no { font-family: monospace; font-size: 11px; color: #999; margin-top: 20px; letter-spacing: 1px; }
</style>
</head>
<body>

<img class="label-img" src="${imgSrc}" alt="${pageTitle}" draggable="false">

<button class="btn-share" id="shareBtn">↑ แชร์รูปนี้</button>

<div class="card">
  <div class="card-title">📱 วิธีส่งไป LINE</div>
  <div class="steps">
    1. กดค้างที่ <strong>รูปใบปะหน้า</strong> ด้านบน<br>
    2. เลือก <strong>"แชร์"</strong> หรือ <strong>"บันทึกรูป"</strong><br>
    3. เปิด LINE → ส่งให้ร้านปริ้นต์ได้เลย
  </div>
</div>

<div class="order-no">#${orderNo}</div>

<script>
document.getElementById('shareBtn').addEventListener('click', function() {
  var url = window.location.href;
  var title = '${pageTitle}';
  if (navigator.share) {
    navigator.share({ title: title, url: url });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() {
      document.getElementById('shareBtn').textContent = '✓ คัดลอกลิงก์แล้ว';
    });
  }
});
</script>

</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
