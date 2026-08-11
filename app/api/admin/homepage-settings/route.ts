import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

async function requireAdminOrStaff() {
  const cookieStore = cookies();
  const isStaff = cookieStore.get('staff_auth')?.value === 'true';
  if (isStaff) return { isStaff: true };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdminOrStaff();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const jsonBuffer = Buffer.from(JSON.stringify(body), 'utf-8');
    const url = await uploadToR2('homepage-settings.json', jsonBuffer, 'application/json');

    return NextResponse.json({ success: true, url });
  } catch (e: any) {
    console.error('[homepage-settings POST error]', e);
    return NextResponse.json({ error: e.message || 'Error saving settings' }, { status: 500 });
  }
}
