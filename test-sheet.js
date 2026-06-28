const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let key = process.env.GOOGLE_PRIVATE_KEY;
    
    if (!email || !key) {
      console.log('Missing credentials');
      return;
    }
    
    key = key.replace(/\\n/g, '\n');
    
    const auth = new google.auth.JWT(
      email,
      undefined,
      key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = '1-Ir2GIIszELvRvDlRgj6uK0triZjU9OuL1_1J-ryVkA';
    const range = 'MARK!A:H';
    
    const rows = [['WEB', '', '', '', '', '', '', 'TEST_PRODUCT']];
    
    console.log('Attempting to write to sheet...');
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: rows,
      },
    });
    console.log('Success!', response.data);
  } catch (error) {
    console.error('Error occurred:');
    console.error(error.message);
    if (error.response) {
      console.error(error.response.data);
    }
  }
}

test();
