import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyLabelToken } from '@/lib/label-token';
import { LabelPDF, registerSarabunFont } from '@/app/api/print/[id]/LabelPDF';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansiamamulets.com';
registerSarabunFont(SITE + '/fonts');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyLabelToken(params.id, req.nextUrl.searchParams.get('k'))) {
    return new NextResponse('Not found', { status: 404 });
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .select('id, customer_name, customer_phone, shipping_address')
    .eq('id', params.id)
    .single();

  if (error || !data) return new NextResponse('Not found', { status: 404 });

  const lang = (req.nextUrl.searchParams.get('lang') ?? 'th') as 'th' | 'en';
  const orderNo = data.id.slice(0, 8).toUpperCase();

  let buffer: any;
  try {
    buffer = await (renderToBuffer as any)(
      createElement(LabelPDF as any, { order: data, lang })
    );
  } catch (e: any) {
    console.error('PDF render error:', e?.message ?? e);
    return new NextResponse(`PDF error: ${e?.message ?? String(e)}`, { status: 500 });
  }

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="label-${orderNo}.pdf"`,
      'Cache-Control': 'no-cache',
    },
  });
}
