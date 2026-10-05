import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// SSR client — uses cookies, respects RLS as the user
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component, fine to ignore
          }
        },
      },
    }
  );
}

// Admin client — uses service role key, bypasses RLS. SERVER ONLY.
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || (process.env.NODE_ENV !== 'production' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined);
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for createAdminClient');
  }
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

// Server helper to verify admin authentication
export async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).maybeSingle();
  if (!data) return null;
  return { user, admin, role: data.role as string };
}
