import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyLabelToken } from '@/lib/label-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansiamamulets.com';

// Cache font base64 in memory so we only fetch once per cold start
let fontCss: string | null = null;
async function getSarabunCss(): Promise<string> {
  if (fontCss) return fontCss;
  const [reg, bold] = await Promise.all([
    fetch(`${SITE}/fonts/Sarabun-Regular.ttf`).then(r => r.arrayBuffer()),
    fetch(`${SITE}/fonts/Sarabun-Bold.ttf`).then(r => r.arrayBuffer()),
  ]);
  const r64 = Buffer.from(reg).toString('base64');
  const b64 = Buffer.from(bold).toString('base64');
  fontCss = `@font-face{font-family:'Sarabun';font-weight:400;src:url('data:font/truetype;base64,${r64}') format('truetype');}` +
            `@font-face{font-family:'Sarabun';font-weight:700;src:url('data:font/truetype;base64,${b64}') format('truetype');}`;
  return fontCss;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyLabelToken(params.id, req.nextUrl.searchParams.get('k'))) {
    return new NextResponse('Not found', { status: 404 });
  }
  const admin = createAdminClient();
  const [{ data, error }, css] = await Promise.all([
    admin
      .from('orders')
      .select('id, customer_name, customer_phone, shipping_address')
      .eq('id', params.id)
      .single(),
    getSarabunCss(),
  ]);

  if (error || !data) return new NextResponse('Not found', { status: 404 });

  const lang = (req.nextUrl.searchParams.get('lang') ?? 'th') as 'th' | 'en';
  const orderNo = data.id.slice(0, 8).toUpperCase();
  const addr = data.shipping_address as any;
  const addrCity = [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ');

  const sender = lang === 'th'
    ? { name: 'พระเครื่องแดนสยาม', addr1: '105/1 ม.2 ต.หนองโพ', addr2: 'อ.โพธาราม จ.ราชบุรี 70120', phone: '063-240-5335' }
    : { name: 'Dan Siam Amulets', addr1: '105/1 M.2, Nongpho', addr2: 'Photharam, Ratchaburi 70120 TH', phone: '+66 63 240 5335' };

  const toLines = [addr.line1, addr.line2, addrCity, addr.country].filter(Boolean) as string[];

  const W = 449;
  const font = `font-family="'Sarabun', 'Noto Sans Thai', sans-serif"`;

  const fromLabelY = 84;
  const fromNameY = 105;
  const fromAddr1Y = 125;
  const fromAddr2Y = 144;
  const fromPhoneY = 163;
  const dividerY = 190;
  const toLabelY = 222;
  const toNameY = 248;

  let toLineY = toNameY + 30;
  const toAddrLines = toLines.map(line => {
    const y = toLineY;
    toLineY += 25;
    return `<text x="${W - 20}" y="${y}" text-anchor="end" ${font} font-size="17" fill="#444">${esc(line)}</text>`;
  }).join('\n');

  const toPhoneY = toLineY + 8;
  const contentBottom = data.customer_phone ? toPhoneY + 28 : toLineY + 12;
  const footerH = 38;
  const H = contentBottom + 20 + footerH;
  const footerY = H - footerH;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>${css}</style>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="white"/>

  <!-- Header -->
  <rect width="${W}" height="56" fill="#1A1208"/>
  <text x="18" y="36" ${font} font-size="17" fill="#C9A84C">${lang === 'th' ? 'พระเครื่อง · แดนสยาม' : 'DAN SIAM AMULETS'}</text>
  <text x="${W - 18}" y="36" text-anchor="end" font-family="monospace" font-size="20" font-weight="bold" fill="white">#${orderNo}</text>

  <!-- FROM label -->
  <text x="18" y="${fromLabelY}" ${font} font-size="12" fill="#999">${lang === 'th' ? 'ผู้ส่ง' : 'FROM'}</text>
  <text x="18" y="${fromNameY}" ${font} font-size="18" font-weight="700" fill="#1A1208">${esc(sender.name)}</text>
  <text x="18" y="${fromAddr1Y}" ${font} font-size="15" fill="#555">${esc(sender.addr1)}</text>
  <text x="18" y="${fromAddr2Y}" ${font} font-size="15" fill="#555">${esc(sender.addr2)}</text>
  <text x="18" y="${fromPhoneY}" ${font} font-size="15" fill="#777">Tel: ${esc(sender.phone)}</text>

  <!-- Divider -->
  <line x1="18" y1="${dividerY}" x2="${W * 0.45}" y2="${dividerY}" stroke="#EDE0C4" stroke-width="1"/>
  <text x="${W / 2}" y="${dividerY + 5}" text-anchor="middle" font-size="14" fill="#C9A84C">— o —</text>
  <line x1="${W * 0.55}" y1="${dividerY}" x2="${W - 18}" y2="${dividerY}" stroke="#EDE0C4" stroke-width="1"/>

  <!-- TO label -->
  <text x="${W - 18}" y="${toLabelY}" text-anchor="end" ${font} font-size="12" fill="#999">${lang === 'th' ? 'ผู้รับ' : 'TO'}</text>
  <text x="${W - 18}" y="${toNameY}" text-anchor="end" ${font} font-size="28" font-weight="700" fill="#1A1208">${esc(data.customer_name)}</text>
  ${toAddrLines}
  ${data.customer_phone ? `<text x="${W - 18}" y="${toPhoneY}" text-anchor="end" ${font} font-size="20" font-weight="700" fill="#222">Tel: ${esc(data.customer_phone)}</text>` : ''}

  <!-- Footer -->
  <rect y="${footerY - 8}" width="${W}" height="${footerH + 8}" fill="#F7F0E3"/>
  <line x1="0" y1="${footerY - 8}" x2="${W}" y2="${footerY - 8}" stroke="#EDE0C4" stroke-width="0.8"/>
  <text x="${W / 2}" y="${footerY + 15}" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#555" letter-spacing="2">||| ${orderNo} |||</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-cache, must-revalidate',
    },
  });
}
