import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only authenticate on admin routes.
  // Public storefront & blogs must NEVER invoke Supabase Auth in middleware,
  // allowing Vercel Edge CDN to serve cached pages with 0ms CPU and maximum speed.
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  if (!isAdminRoute) {
    return NextResponse.next({ request: { headers: request.headers } });
  }

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

  // Guard /api/admin routes — reject unauthenticated requests with 401
  if (pathname.startsWith('/api/admin')) {
    const isStaffStockApi = pathname.startsWith('/api/admin/shopee-stock') || 
                             pathname.startsWith('/api/admin/june-stock') || 
                             pathname.startsWith('/api/admin/mark-stock');
    const hasStaffCookie = !!request.cookies.get('staff_token')?.value;

    if (!user && !(isStaffStockApi && hasStaffCookie)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Guard /admin routes — redirect unauthenticated users to sign-in
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const signIn = new URL('/signin', request.url);
      signIn.searchParams.set('next', pathname);
      return NextResponse.redirect(signIn);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all paths except static assets
    '/((?!_next/static|_next/image|favicon.ico|icon\\.svg|.*\\.(?:png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
