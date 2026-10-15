import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json(
    { error: 'ระบบรหัสผ่าน PIN ถูกยกเลิกเพื่อความปลอดภัย กรุณาเข้าสู่ระบบด้วย Google' },
    { status: 400 }
  );
}
