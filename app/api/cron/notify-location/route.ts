import { NextResponse } from 'next/server';
import { createAdminClient, requireAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronSecret(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  const authHeader = req.headers.get('authorization') ?? '';
  const expected = `Bearer ${cronSecret}`;
  const enc = new TextEncoder();
  const a = enc.encode(authHeader.padEnd(expected.length));
  const b = enc.encode(expected.padEnd(authHeader.length));
  let mismatch = a.length !== b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    mismatch = ((a[i] ?? 0) ^ (b[i] ?? 0)) !== 0 || mismatch;
  }
  return !mismatch;
}

export async function GET(req: Request) {
  try {
    // 1. Authenticate cron job via CRON_SECRET or authenticated Admin session
    if (!isValidCronSecret(req)) {
      const adminCtx = await requireAdmin();
      if (!adminCtx) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // 2. Fetch products missing storage location
    const admin = createAdminClient();
    const { data: products, error } = await admin
      .from('products')
      .select('name_th, name, stock, storage_location')
      .eq('published', true) // Only published products
      .gt('stock', 0); // Only active stock

    if (error) {
      console.error('[cron] Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter products where storage_location is null or empty
    const missingLocation = (products || []).filter(
      p => !p.storage_location || p.storage_location.trim() === '' || p.storage_location.trim() === '-'
    );

    // 3. Prepare LINE message
    let message = '';
    if (missingLocation.length === 0) {
      message = '✅ ยอดเยี่ยม! สินค้าบนเว็บหลักอัปเดตที่จัดเก็บครบทุกรายการแล้วครับ';
    } else {
      message = `⚠️ แจ้งเตือน: มีสินค้า ${missingLocation.length} รายการที่ยังไม่มีที่จัดเก็บ\n\n`;
      // Limit to 20 items to prevent huge messages
      const showItems = missingLocation.slice(0, 20);
      showItems.forEach((p, idx) => {
        const title = p.name_th || p.name || 'ไม่มีชื่อ';
        message += `${idx + 1}. ${title} (คงเหลือ: ${p.stock})\n`;
      });

      if (missingLocation.length > 20) {
        message += `...และอื่นๆ อีก ${missingLocation.length - 20} รายการ\n`;
      }
      message += `\nอย่าลืมเข้าไปอัปเดตในระบบหลังบ้านนะครับ!`;
    }

    // 4. Send to LINE Notify
    const lineToken = process.env.LINE_MESSAGING_TOKEN;
    const lineUserId = process.env.LINE_USER_ID;

    if (!lineToken || !lineUserId) {
      console.warn('LINE_MESSAGING_TOKEN or LINE_USER_ID is not configured');
      return NextResponse.json({ 
        success: false, 
        message: 'LINE_MESSAGING_TOKEN or LINE_USER_ID is missing', 
        mockMessage: message 
      });
    }

    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lineToken}`
      },
      body: JSON.stringify({
        to: lineUserId,
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      })
    });

    if (!lineRes.ok) {
      const errText = await lineRes.text();
      console.error('[cron] LINE Notify error:', errText);
      return NextResponse.json({ error: 'LINE Notify failed', details: errText }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: missingLocation.length, sent: true });
    
  } catch (err: any) {
    console.error('[cron] Unexpected error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
