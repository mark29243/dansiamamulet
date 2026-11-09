import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { verifyStaffSession, signStaffSession, isAllowedStaffEmail } from '@/lib/staff-auth';
import { rateLimit, getIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_RPCS = new Set([
  'get_stock_dashboard_summary',
  'get_products_paginated',
  'quick_mark_sold',
  'quick_restore_stock',
  'quick_update_platform_info',
  'match_products',
]);

// Verified auth.users UUID mapping for authorized DanSiam stock staff
const STAFF_USER_IDS: Record<string, string> = {
  'mark.29243@gmail.com': '1f3e6fe8-d75f-4510-8614-284241d0d71f',
  'phatsara7962@gmail.com': 'efa2fc85-2f75-4597-b40a-811d4781dffe',
  'jarun240119@gmail.com': 'b02bf757-555d-42c1-b3fc-a9f352a43126',
};

async function verifyStaffCaller(req: Request): Promise<{ authorized: boolean; issueNewToken: boolean }> {
  // 1. Check HttpOnly staff_token cookie
  try {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('staff_token')?.value;
    if (verifyStaffSession(cookieToken)) {
      return { authorized: true, issueNewToken: false };
    }
  } catch {}

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();

    // 2a. HMAC-signed staff session token
    if (verifyStaffSession(token)) {
      return { authorized: true, issueNewToken: false };
    }

    // 2b. Supabase OAuth JWT token
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const admin = createAdminClient();
        const { data: { user } } = await admin.auth.getUser(token);
        if (user?.email && isAllowedStaffEmail(user.email)) {
          return { authorized: true, issueNewToken: true };
        }
      } catch {}

      // 2c. Seamless upgrade for existing staff mobile sessions whose 1h OAuth access_token expired
      try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        const email = (payload?.email || '').toLowerCase().trim();
        const sub = payload?.sub || '';
        const iss = payload?.iss || '';
        if (
          iss.includes('vipqvizivfzkjdqeuyhu.supabase.co/auth/v1') &&
          isAllowedStaffEmail(email) &&
          STAFF_USER_IDS[email] &&
          STAFF_USER_IDS[email] === sub
        ) {
          return { authorized: true, issueNewToken: true };
        }
      } catch {}
    }
  }

  // 3. Check standard Supabase SSR cookie session
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email && isAllowedStaffEmail(user.email)) {
      return { authorized: true, issueNewToken: true };
    }
    if (user) {
      const admin = createAdminClient();
      const { data: adminRow } = await admin
        .from('admins')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      if (adminRow) {
        return { authorized: true, issueNewToken: true };
      }
    }
  } catch {}

  return { authorized: false, issueNewToken: false };
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    if (!(await rateLimit(`staff-stock-rpc:${ip}`, 120, 60_000))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { authorized, issueNewToken } = await verifyStaffCaller(req);
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const fnName = (body?.fnName || '').toString().trim();
    const params = body?.params && typeof body.params === 'object' ? body.params : {};

    if (!ALLOWED_RPCS.has(fnName)) {
      return NextResponse.json({ error: 'Disallowed RPC function' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin.rpc(fnName, params);

    if (error) {
      console.error(`[staff/stock-rpc] ${fnName} error:`, error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const res = NextResponse.json({ data });
    if (issueNewToken) {
      const signed = signStaffSession();
      res.cookies.set('staff_token', signed, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
    }
    return res;
  } catch (err: any) {
    console.error('[staff/stock-rpc] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
