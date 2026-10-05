import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function requireOwner() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (data?.role !== 'owner') return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireOwner();
  if (!ctx) {
    return NextResponse.json({ error: 'Forbidden: Owner role required' }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== 'CONFIRM_DELETE_ALL') {
      return NextResponse.json({ error: 'Action requires confirmation token: CONFIRM_DELETE_ALL' }, { status: 400 });
    }

    const admin = ctx.admin;
    
    // fetch all ids
    const { data: products, error: fetchError } = await admin.from('shopee_products').select('id');
    
    if (fetchError) {
      return NextResponse.json({ error: 'Fetch Error: ' + fetchError.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ ok: true, message: 'No products to delete.' });
    }

    const ids = products.map((p: any) => p.id);
    const { error: deleteError } = await admin.from('shopee_products').delete().in('id', ids);
    
    if (deleteError) {
      return NextResponse.json({ error: 'Delete Error: ' + deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: `Successfully deleted ${products.length} products.` });
  } catch (error: any) {
    return NextResponse.json({ error: 'System Error: ' + (error.message || String(error)) }, { status: 500 });
  }
}
