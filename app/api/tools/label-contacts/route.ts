import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { isAllowedStaffEmail } from '@/lib/staff-auth';

export const dynamic = 'force-dynamic';

function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

async function verifyAuth(req: Request): Promise<'ok' | 'rate_limited' | 'unauthorized'> {
  const ip = getIp(req);
  if (!(await rateLimit(`label-contacts:${ip}`, 15, 60_000))) {
    return 'rate_limited';
  }

  // Check header passcode (timing-safe)
  const passcode = req.headers.get('x-label-passcode');
  const expectedPasscode = process.env.LABEL_TOOL_PASSCODE || '454545';
  if (passcode && timingSafeCompare(passcode, expectedPasscode)) {
    return 'ok';
  }

  // Check admin/staff session
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 'unauthorized';
    if (isAllowedStaffEmail(user.email)) return 'ok';
    const admin = createAdminClient();
    const { data } = await admin.from('admins').select('role').eq('user_id', user.id).maybeSingle();
    return data ? 'ok' : 'unauthorized';
  } catch {
    return 'unauthorized';
  }
}

export async function GET(req: Request) {
  const auth = await verifyAuth(req);
  if (auth === 'rate_limited') return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  if (auth !== 'ok') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('label_contacts').select('*').order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const mappedData = (data || []).map(item => {
    if (item.type === 'sender' && item.text) {
      try {
        const parsed = JSON.parse(item.text);
        return { ...item, phone: parsed.phone, address: parsed.address };
      } catch (e) {}
    }
    return item;
  });
  
  return NextResponse.json(mappedData);
}

export async function POST(req: Request) {
  const auth = await verifyAuth(req);
  if (auth === 'rate_limited') return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  if (auth !== 'ok') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const body = await req.json();
  
  const processItem = (item: any) => {
    const id = item.id || `${item.type || 'contact'}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    if (item.type === 'sender' && !item.text) {
      return {
        id,
        type: item.type,
        name: item.name,
        text: JSON.stringify({ phone: item.phone, address: item.address })
      };
    }
    return { ...item, id: item.id || id };
  };

  if (Array.isArray(body)) {
     const payload = body.map(processItem);
     const { data, error } = await supabase.from('label_contacts').insert(payload).select();
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json(data);
  } else {
     const payload = processItem(body);
     const { data, error } = await supabase.from('label_contacts').insert([payload]).select();
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json(data);
  }
}

export async function DELETE(req: Request) {
  const auth = await verifyAuth(req);
  if (auth === 'rate_limited') return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  if (auth !== 'ok') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  
  const { error } = await supabase.from('label_contacts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
