import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return admin;
}

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'json';

  const { data: products } = await admin
    .from('products')
    .select('id, name_th, name, short, description, description_th, description_zh, category, published')
    .order('id', { ascending: true });

  if (!products) return NextResponse.json({ error: 'No data' }, { status: 500 });

  if (format === 'csv') {
    const escape = (s: string) => `"${(s ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    const header = ['ID', 'ชื่อไทย', 'ชื่ออังกฤษ', 'หมวดหมู่', 'short (chars)', 'short preview', 'description (chars)', 'description preview', 'description_th (chars)', 'description_zh (chars)', 'published'];
    const rows = products.map(p => [
      p.id,
      escape(p.name_th || ''),
      escape(p.name || ''),
      escape(p.category || ''),
      (p.short || '').length,
      escape((p.short || '').slice(0, 80)),
      (p.description || '').length,
      escape((p.description || '').slice(0, 100)),
      (p.description_th || '').length,
      (p.description_zh || '').length,
      p.published ? 'YES' : 'NO',
    ]);
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    return new Response('﻿' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="seo-status.csv"',
      },
    });
  }

  // JSON summary
  const summary = products.map(p => ({
    id: p.id,
    name_th: p.name_th,
    name: p.name,
    category: p.category,
    published: p.published,
    short_len: (p.short || '').length,
    short_preview: (p.short || '').slice(0, 100),
    desc_len: (p.description || '').length,
    desc_preview: (p.description || '').slice(0, 120),
    desc_th_len: (p.description_th || '').length,
    desc_zh_len: (p.description_zh || '').length,
  }));

  return NextResponse.json({ total: products.length, products: summary });
}
