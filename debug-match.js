const { google } = require('googleapis');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) return console.error('No Google credentials');
  
  key = key.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1-Ir2GIIszELvRvDlRgj6uK0triZjU9OuL1_1J-ryVkA';
  
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'MARK!A2:H',
  });

  const rows = getRes.data.values || [];
  console.log(`Fetched ${rows.length} rows from Google Sheets.`);

  // Fetch all products from DB
  let allProducts = [];
  let hasMore = true;
  let offset = 0;
  const limit = 1000;
  while (hasMore) {
    const { data, error } = await supabase
      .from('shopee_products')
      .select('id, name')
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    if (data && data.length > 0) {
      allProducts.push(...data);
      offset += limit;
      if (data.length < limit) hasMore = false;
    } else {
      hasMore = false;
    }
  }
  console.log(`Fetched ${allProducts.length} products from Database.`);

  let matchCount = 0;
  let mismatchCount = 0;
  let missingNames = [];

  for (const row of rows) {
    const productName = row[7] || '';
    if (!productName.trim()) continue;

    const product = allProducts.find(p => p.name.trim() === productName.trim());
    if (product) {
      matchCount++;
    } else {
      mismatchCount++;
      if (mismatchCount <= 10) {
        missingNames.push(productName);
      }
    }
  }

  console.log(`Matched: ${matchCount}, Mismatched: ${mismatchCount}`);
  if (mismatchCount > 0) {
    console.log('Examples of mismatched names (from Sheet but not in DB):');
    missingNames.forEach(n => console.log(`- "${n}"`));
  }
}

debug();
