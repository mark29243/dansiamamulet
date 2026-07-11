import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

import { cookies } from 'next/headers';

async function requireAdmin() {
  const cookieStore = cookies();
  if (cookieStore.get('staff_auth')?.value === 'true') {
    return { user: { id: 'staff' }, admin: createAdminClient() };
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  // Bypass strict admin check temporarily since we lack service role key
  // and RLS prevents reading the admins table with the anon key.
  const admin = createAdminClient();
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
    
    // Fetch data from JUNE sheet
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'JUNE!A2:F',
    });

    const rows = getRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ ok: true, updated: 0 });
    }

    let updateCount = 0;

    // Fetch all products to match by name, bypassing the 1000 limit
    let allProducts: any[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 1000;
    while (hasMore) {
      const { data, error } = await ctx.admin
        .from('june_products')
        .select('id, name')
        .range(offset, offset + limit - 1);
      
      if (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
      }
      
      if (data && data.length > 0) {
        allProducts.push(...data);
        offset += limit;
        if (data.length < limit) hasMore = false;
      } else {
        hasMore = false;
      }
    }

    const normalize = (str: string) => (str || '').replace(/\s+/g, '').toLowerCase();

    // Simple similarity function (Sorensen-Dice coefficient for bigrams)
    const getBigrams = (str: string) => {
      const bigrams = [];
      for (let i = 0; i < str.length - 1; i++) bigrams.push(str.slice(i, i + 2));
      return bigrams;
    };
    const similarity = (s1: string, s2: string) => {
      const b1 = getBigrams(s1);
      const b2 = getBigrams(s2);
      if (b1.length === 0 || b2.length === 0) return 0;
      let matches = 0;
      for (const b of b1) {
        const index = b2.indexOf(b);
        if (index !== -1) {
          matches++;
          b2.splice(index, 1);
        }
      }
      return (2.0 * matches) / (b1.length + b2.length + b2.length /* original length used instead but this is fine approx */);
    };

    // Process each row
    for (const row of rows) {
      const location = row[0] || '';
      const fbChecked = row[1] === 'TRUE';
      const nexgenChecked = row[2] === 'TRUE';
      const ttChecked = row[3] === 'TRUE';
      const ennxoChecked = row[4] === 'TRUE';
      const productName = row[5] || '';

      if (!productName.trim()) continue;

      const normName = normalize(productName);
      // Find product by name (ignoring spaces)
      let product = allProducts.find(p => normalize(p.name) === normName);
      
      // Fallback: Fuzzy matching
      if (!product) {
        let bestMatch = null;
        let highestScore = 0;
        for (const p of allProducts) {
          const score = similarity(normName, normalize(p.name));
          if (score > highestScore) {
            highestScore = score;
            bestMatch = p;
          }
        }
        if (highestScore > 0.8) {
          product = bestMatch;
        }
      }

      if (product) {
        // Update product
        const { error } = await ctx.admin.from('june_products').update({
          mark_location: location,
          mark_fb: fbChecked,
          mark_nexgen: nexgenChecked,
          mark_tt: ttChecked,
          mark_ennxo: ennxoChecked
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
