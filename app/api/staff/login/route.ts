import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { signStaffSession } from '@/lib/staff-auth';

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const allowed = await rateLimit(`staff-login:${ip}`, 5, 5 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again in 5 minutes.' }, { status: 429 });
    }

    const { password } = await req.json();
    const correctPassword = process.env.STAFF_PASSWORD;

    if (!correctPassword) {
      console.error('[staff-login] STAFF_PASSWORD environment variable is not configured');
      return NextResponse.json({ error: 'Staff authentication is not configured on server' }, { status: 500 });
    }

    if (password === correctPassword) {
      const token = signStaffSession();
      // Set signed token and legacy indicator
      cookies().set('staff_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      cookies().set('staff_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
