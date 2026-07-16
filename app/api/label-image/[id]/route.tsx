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

  const font = `font-family="'Sarabun', 'Noto Sans Thai', sans-serif"`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="130mm" height="76mm" viewBox="0 0 130 76">
  <defs>
    <style>${css}</style>
  </defs>

  <!-- Background -->
  <rect width="130" height="76" fill="white"/>

  <!-- From Box -->
  <g transform="translate(2, 2)">
    <text x="2" y="6.5" ${font} font-size="3" fill="#000" font-weight="700">From : Dansiamamulets (+66898157535)</text>
    <text x="2" y="11" ${font} font-size="2.7" fill="#000">105/1 M.2, NONGPHO, PHOTHARAM,</text>
    <text x="2" y="15.5" ${font} font-size="2.7" fill="#000">RATCHABURI, THAILAND 70120</text>
  </g>

  <!-- Right Box -->
  <g transform="translate(73, 2)">
    <!-- Reserved empty space for sticker -->
  </g>

  <!-- To Section -->
  <g transform="translate(2, 42)">
    <!-- To Label -->
    <text x="0" y="7.5" ${font} font-size="3" font-weight="700" fill="#000">To :</text>
    <g transform="translate(10, 0)">
      <text x="0" y="7.5" ${font} font-size="3" fill="#000">
        <tspan x="0" dy="0" font-weight="700" font-size="3.5">${esc(data.customer_name)} ${data.customer_phone ? esc(data.customer_phone) : ''}</tspan>
        <tspan x="0" dy="5" font-weight="400">${esc(addr.line1)} ${esc(addr.line2 || '')} ${esc(addrCity)}</tspan>
        <tspan x="0" dy="5" font-weight="400">${esc(addr.country)}</tspan>
      </text>
    </g>
  </g>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-cache, must-revalidate',
    },
  });
}
