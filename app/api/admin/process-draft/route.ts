import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { processDraft } from '@/lib/seo';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return admin;
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { data: draft, error } = await admin
    .from('products')
    .select('id, name_th, description_th, category')
    .eq('id', id)
    .single();

  if (error || !draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  }

  const { data: existingSlugs } = await admin.from('products').select('slug').neq('id', id);
  const usedSlugs = new Set((existingSlugs ?? []).map((p) => p.slug));

  try {
    const result = await processDraft(admin, draft, usedSlugs);
    await admin.from('products').update({ published: true }).eq('id', result.id);
    return NextResponse.json({ id: result.id, slug: result.slug, name: result.name, short: result.short });
  } catch (e: any) {
    console.error('[process-draft] failed', { id, error: e.message, stack: e.stack });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
