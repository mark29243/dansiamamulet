import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
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
  const errorParam = url.searchParams.get('error_description') || url.searchParams.get('error');

  if (errorParam) {
    console.error('[auth/callback] OAuth error from provider:', errorParam);
    const dest = next?.includes('staff') ? '/staff/login' : '/signin';
    return NextResponse.redirect(new URL(`${dest}?error=${encodeURIComponent(errorParam)}`, url.origin));
  }

  const defaultDest = next && next.startsWith('/') && !next.startsWith('//') ? next : '/orders';
  const cookieStore = cookies();
  const cookiesToSetOnResponse: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {}
            cookiesToSetOnResponse.push({ name, value, options });
          });
        },
      },
    }
  );

  let user = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('[auth/callback] exchangeCodeForSession failed:', error);
      const dest = next?.includes('staff') ? '/staff/login' : '/signin';
      return NextResponse.redirect(new URL(`${dest}?error=${encodeURIComponent(error.message)}`, url.origin));
    }
    user = data?.user;
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (error) {
      console.error('[auth/callback] verifyOtp failed:', error);
      return NextResponse.redirect(new URL(`/signin?error=${encodeURIComponent(error.message)}`, url.origin));
    }
    user = data?.user;
  }

  let finalDestination = defaultDest;
  let isStaffOrAdmin = false;

  if (user?.id) {
    const admin = createAdminClient();
    const cleanEmail = user.email ? user.email.toLowerCase().trim() : '';

    const { data: adminRow } = cleanEmail
      ? await admin.from('admins').select('*').or(`user_id.eq.${user.id},email.ilike.${cleanEmail}`).maybeSingle()
      : await admin.from('admins').select('*').eq('user_id', user.id).maybeSingle();

    if (adminRow) {
      isStaffOrAdmin = true;
      if (adminRow.user_id !== user.id && cleanEmail) {
        await admin
          .from('admins')
          .update({ user_id: user.id })
          .eq('email', cleanEmail);
      }
      finalDestination = next && next.startsWith('/') && !next.startsWith('//') ? next : '/admin';
    }
  }

  const response = NextResponse.redirect(new URL(finalDestination, url.origin));

  // 1. Explicitly write all Supabase session cookies to the redirect response
  cookiesToSetOnResponse.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  // 2. Set staff cookies if admin/staff
  if (isStaffOrAdmin) {
    try {
      const { signStaffSession } = await import('@/lib/staff-auth');
      const staffToken = signStaffSession();
      response.cookies.set('staff_token', staffToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      response.cookies.set('staff_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (err) {
      console.error('Failed to set staff session cookies:', err);
    }
  }

  return response;
}
