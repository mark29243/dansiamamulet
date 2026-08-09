import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const admin = createAdminClient();
    const { data: adminCheck } = await admin.from('admins').select('role').eq('user_id', user.id).single();
    if (!adminCheck) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    let query = admin
      .from('products')
      .select('id, name, images, created_at')
      .order('created_at', { ascending: false });

    if (q) {
      // search by ID or name
      if (!isNaN(Number(q))) {
        query = query.eq('id', Number(q));
      } else {
        query = query.ilike('name', `%${q}%`);
      }
    } else {
      query = query.limit(200); // default limit if no search
    }

    const { data: products, error } = await query;

    if (error) throw error;
    
    return NextResponse.json({ products });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const admin = createAdminClient();
    const { data: adminCheck } = await admin.from('admins').select('role').eq('user_id', user.id).single();
    if (!adminCheck) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id, images } = await req.json();
    if (!id || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { error } = await admin.from('products').update({ images }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
