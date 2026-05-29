import { NextResponse } from 'next/server';
import { getShippingOptions } from '@/lib/shipping';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = (searchParams.get('country') || '').toUpperCase().trim();
  const qty = Math.max(1, parseInt(searchParams.get('qty') || '1', 10));

  if (!country || country.length !== 2) {
    return NextResponse.json({ error: 'Invalid country code' }, { status: 400 });
  }

  const options = getShippingOptions(country, qty);
  return NextResponse.json({ options });
}
