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
    const admin = createAdminClient();
    // Check if user is an admin by user_id or email
    const query = user.email
      ? admin.from('admins').select('*').or(`user_id.eq.${user.id},email.eq.${user.email}`).maybeSingle()
      : admin.from('admins').select('*').eq('user_id', user.id).maybeSingle();

    const { data: adminRow } = await query;

    if (adminRow) {
      // Sync user_id if changed (e.g. from Google OAuth first login)
      if (adminRow.user_id !== user.id && user.email) {
        await admin
          .from('admins')
          .update({ user_id: user.id })
          .eq('email', user.email);
      }
      const destination = next && next.startsWith('/') && !next.startsWith('//') ? next : '/admin';
      return NextResponse.redirect(new URL(destination, url.origin));
    }
  }

  return NextResponse.redirect(getSafeRedirect(next, url.origin));
}

