import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';
import { type EmailOtpType } from '@supabase/supabase-js';

function getSafeRedirect(next: string | null, origin: string): URL {
  if (next && next.startsWith('/') && !next.startsWith('//') && !next.includes('\\')) {
    return new URL(next, origin);
  }
  return new URL('/orders', origin);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const token_hash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const next = url.searchParams.get('next');

  const supabase = createClient();
  let user = null;

  if (code) {
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    user = data.user;
  } else if (token_hash && type) {
    const { data } = await supabase.auth.verifyOtp({ type, token_hash });
    user = data.user;
  }

  if (user?.id) {
    if (!next) {
      const admin = createAdminClient();
      const { data } = await admin.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
      const destination = data ? '/admin' : '/orders';
      return NextResponse.redirect(new URL(destination, url.origin));
    }
  }

  return NextResponse.redirect(getSafeRedirect(next, url.origin));
}

