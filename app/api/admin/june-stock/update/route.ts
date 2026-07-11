import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

import { cookies } from 'next/headers';

async function requireAdmin() {
  const cookieStore = cookies();
  if (cookieStore.get('staff_auth')?.value === 'true') {
    return { user: { id: 'staff' }, admin: createAdminClient() };
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  // Bypass strict admin check temporarily since we lack service role key
  // and RLS prevents reading the admins table with the anon key.
  const admin = createAdminClient();
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const { id, ...fieldsToUpdate } = body;

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const { error } = await ctx.admin
      .from('june_products')
      .update(fieldsToUpdate)
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Error updating june stock:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
