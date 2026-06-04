import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Guard /admin routes — redirect unauthenticated users to sign-in
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const signIn = new URL('/signin', request.url);
      signIn.searchParams.set('next', pathname);
      return NextResponse.redirect(signIn);
    }
    // Admin authorisation is checked inside the layout (DB lookup),
    // so we only need to confirm the user is signed in here.
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all paths except static assets
    '/((?!_next/static|_next/image|favicon.ico|icon\\.svg|.*\\.(?:png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
