import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('staff_token');
  cookieStore.delete('staff_auth');

  const response = NextResponse.json({ ok: true });
  response.cookies.delete('staff_token');
  response.cookies.delete('staff_auth');
  return response;
}
