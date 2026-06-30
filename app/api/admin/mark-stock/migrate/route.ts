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
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let key = process.env.GOOGLE_PRIVATE_KEY;

    if (!email || !key) {
      return NextResponse.json({ error: 'Google credentials not configured' }, { status: 500 });
    }

    key = key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: email, private_key: key },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1-Ir2GIIszELvRvDlRgj6uK0triZjU9OuL1_1J-ryVkA';
    
    // Fetch data from MARK sheet
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'MARK!A2:H',
    });

    const rows = getRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ ok: true, updated: 0 });
    }

    let updateCount = 0;

    // Fetch all products to match by name
    const { data: allProducts } = await ctx.admin.from('shopee_products').select('id, name');
    if (!allProducts) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    // Process each row
    for (const row of rows) {
      const location = row[0] || '';
      const shopee2Checked = row[3] === 'TRUE';
      const fbChecked = row[4] === 'TRUE';
      const ttChecked = row[5] === 'TRUE';
      const igChecked = row[6] === 'TRUE';
      const productName = row[7] || '';

      if (!productName.trim()) continue;

      // Find product by name
      const product = allProducts.find(p => p.name.trim() === productName.trim());
      if (product) {
        // Update product
        const { error } = await ctx.admin.from('shopee_products').update({
          mark_location: location,
          mark_shopee2: shopee2Checked,
          mark_fb: fbChecked,
          mark_tt: ttChecked,
          mark_ig: igChecked
        }).eq('id', product.id);

        if (!error) {
          updateCount++;
        } else {
          console.error(`Failed to update ${product.name}:`, error);
        }
      }
    }

    return NextResponse.json({ ok: true, updated: updateCount });

  } catch (error: any) {
    console.error('Error migrating from Google Sheets:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
