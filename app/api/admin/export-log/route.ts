import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { products, platform, exporterName } = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'No products provided' }, { status: 400 });
    }

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let key = process.env.GOOGLE_PRIVATE_KEY;

    if (!email || !key) {
      console.warn('Google Sheets integration is missing credentials');
      // Return 200 so it doesn't break the frontend if credentials are not configured
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Handle escaped newlines in the private key if necessary
    key = key.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT(
      email,
      undefined,
      key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Format rows based on platform:
    // Shopee (MARK sheet): A: WEB, H: Exporter Name
    // Shopee 2 (JUNE sheet): A: WEB, F: Exporter Name
    const rows = products.map((p: any) => {
      if (platform === 'shopee') {
        return ['WEB', '', '', '', '', '', '', exporterName || '']; // A to H
      } else if (platform === 'shopee2') {
        return ['WEB', '', '', '', '', exporterName || '']; // A to F
      }
      return ['WEB'];
    });

    const spreadsheetId = '1-Ir2GIIszELvRvDlRgj6uK0triZjU9OuL1_1J-ryVkA';
    // If it's Shopee, use MARK sheet. If it's Shopee 2, use JUNE sheet.
    const range = platform === 'shopee' ? 'MARK!A:H' : 'JUNE!A:F';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: rows,
      },
    });

    return NextResponse.json({ ok: true, rowsAppended: rows.length });
  } catch (error: any) {
    console.error('Error writing to Google Sheets:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
