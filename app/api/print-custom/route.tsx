import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { LabelPDF, registerSarabunFont } from '@/app/api/print/[id]/LabelPDF';
import { requireAdmin } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansiamamulets.com';
registerSarabunFont(SITE + '/fonts');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidPasscode(req: NextRequest): boolean {
  const passcode = req.headers.get('x-label-passcode');
  const expected = process.env.LABEL_TOOL_PASSCODE || '454545';
  if (!passcode) return false;
  const bufA = Buffer.from(passcode);
  const bufB = Buffer.from(expected);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  try {
    if (!(await rateLimit(`print-custom:${getIp(req)}`, 20, 60_000))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    if (!isValidPasscode(req)) {
      const adminCtx = await requireAdmin();
      if (!adminCtx) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const { orderNo, senderName, senderPhone, senderAddress, receiverText, isCod } = body;

    let text = receiverText || '';
    
    // Add natural spaces before common Thai address keywords to fix PDF word-wrap cutoffs
    text = text.replace(/([^\s])(ตำบล|แขวง|อำเภอ|เขต|จังหวัด|ต\.|อ\.|จ\.|รหัส|กรุงเทพ|กทม)/g, '$1 $2');

    const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean);
    const customer_name = lines.length > 0 ? lines[0] : 'Unknown';
    let addressLines = lines.slice(1).join('\n'); // Preserve original newlines if any

    if ((addressLines.match(/\n/g) || []).length < 1) {
      if (/(ตำบล|แขวง|ต\.|อำเภอ|เขต|อ\.|จังหวัด|จ\.|กรุงเทพ|กทม)/.test(addressLines)) {
        addressLines = addressLines.replace(/\s+(ตำบล|แขวง|ต\.)/g, '\n$1');
        addressLines = addressLines.replace(/\s+(อำเภอ|เขต|อ\.)/g, '\n$1');
        addressLines = addressLines.replace(/\s+(จังหวัด|จ\.|กรุงเทพ|กทม)/g, '\n$1');
      }
    }
    // Clean up empty lines
    addressLines = addressLines.replace(/\n{2,}/g, '\n');

    const mockOrder = {
      id: orderNo || 'CUSTOM00',
      customer_name,
      customer_phone: '',
      shipping_address: {
        line1: addressLines,
        line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      }
    };

    const sender = {
      name: senderName || 'Dansiamamulets',
      phone: senderPhone || '+66898157535',
      address: senderAddress || '105/1 M.2, NONGPHO, PHOTHARAM,\nRATCHABURI, THAILAND 70120'
    };

    const buffer = await (renderToBuffer as any)(
      createElement(LabelPDF as any, { order: mockOrder, lang: 'th', sender, isCod: !!isCod })
    );

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="label-custom.pdf"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (e: any) {
    console.error('Custom PDF error:', e?.message ?? e);
    return new NextResponse(`PDF error: ${e?.message ?? String(e)}`, { status: 500 });
  }
}
