import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { sendAdminOrderNotification } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const mockOrder = {
    id: 'test-1234-5678-abcd',
    customer_name: 'ลูกค้าทดสอบ',
    customer_email: 'test@example.com',
    customer_phone: '0812345678',
    shipping_address: { line1: '123 ถนนสุขุมวิท', line2: '', city: 'กรุงเทพฯ', postal_code: '10110', country: 'TH' },
    items: [{ product_id: 1, name: 'เหรียญหลวงปู่ทวด วัดช้างให้', price: 165000, image: '', qty: 1 }],
    subtotal: 165000,
    shipping_cost: 10000,
    total: 175000,
    currency: 'thb',
    status: 'paid',
  } as any;

  const result = await sendAdminOrderNotification(mockOrder);
  return NextResponse.json(result);
}
