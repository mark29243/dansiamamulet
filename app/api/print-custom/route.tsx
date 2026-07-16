import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { LabelPDF, registerSarabunFont } from '@/app/api/print/[id]/LabelPDF';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansiamamulets.com';
registerSarabunFont(SITE + '/fonts');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNo, senderName, senderPhone, senderAddress, receiverText } = body;

    let text = receiverText || '';
    
    // Extract phone number (support international + and no-prefix numbers)
    let customer_phone = '';
    
    const explicitPhoneRegex = /(?:โทร\.?|tel\.?|เบอร์|phone)[:\s]*(\+?[\d\s-]{8,16})/i;
    const plusOrZeroRegex = /(?:\b|^|\s)(\+(?:\d\s*){8,15}|0(?:\d\s*-?\s*){8,11})(?:\b|$|\n)/;
    const anyLongDigitRegex = /(?:\b|^|\n)(?!\d{5}-\d{4}\b)((?:\d\s*){8,15})(?:\b|$|\n)/;

    const explicitMatch = text.match(explicitPhoneRegex);
    if (explicitMatch) {
      customer_phone = explicitMatch[1].trim();
      text = text.replace(explicitMatch[0], '');
    } else {
      const pzMatch = text.match(plusOrZeroRegex);
      if (pzMatch) {
        customer_phone = pzMatch[1].trim();
        text = text.replace(pzMatch[0], '');
      } else {
        const anyMatch = text.match(anyLongDigitRegex);
        if (anyMatch) {
          customer_phone = anyMatch[1].trim();
          text = text.replace(anyMatch[0], '');
        }
      }
    }

    // Add natural spaces before common Thai address keywords to fix PDF word-wrap cutoffs
    text = text.replace(/([^\s])(ตำบล|แขวง|อำเภอ|เขต|จังหวัด|ต\.|อ\.|จ\.|รหัส)/g, '$1 $2');
    // Add space before 5-digit postal code if missing
    text = text.replace(/([^\s])(\d{5})(?!\d)/g, '$1 $2');

    const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean);
    const customer_name = lines.length > 0 ? lines[0] : 'Unknown';
    const addressLines = lines.slice(1).join(' ');

    const mockOrder = {
      id: orderNo || 'CUSTOM00',
      customer_name,
      customer_phone,
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
      createElement(LabelPDF as any, { order: mockOrder, lang: 'th', sender })
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
