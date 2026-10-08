import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  let testResult: any = null;
  let testError: any = null;

  try {
    if (url && anonKey) {
      const s = createClient(url, anonKey);
      const res = await s.from('products').select('id, name, published', { count: 'exact' }).limit(3);
      testResult = {
        count: res.count,
        sample: res.data,
      };
      testError = res.error;
    } else {
      testError = 'Missing URL or ANON KEY in environment variables';
    }
  } catch (e: any) {
    testError = e.message;
  }

  return NextResponse.json({
    urlHost: url ? new URL(url).host : 'MISSING',
    hasAnon: Boolean(anonKey),
    hasService: Boolean(serviceKey),
    testResult,
    testError,
  });
}
