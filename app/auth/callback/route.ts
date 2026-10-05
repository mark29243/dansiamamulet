import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';

function getSafeRedirect(next: string | null, origin: string): URL {
  if (next && next.startsWith('/') && !next.startsWith('//') && !next.includes('\\')) {
    return new URL(next, origin);
  }
  return new URL('/orders', origin);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next');

  if (code) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

    // If caller didn't specify next, decide based on whether the user is an admin
    if (!next && user?.id) {
      const admin = createAdminClient();
      const { data } = await admin.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
      const destination = data ? '/admin' : '/orders';
      return NextResponse.redirect(new URL(destination, url.origin));
    }
  }

  return NextResponse.redirect(getSafeRedirect(next, url.origin));
}
