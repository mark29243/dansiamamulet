const fs = require('fs');
const https = require('https');
const path = require('path');

async function uploadToCatbox(filePath) {
  const fileData = fs.readFileSync(filePath);
  const boundary = '----Boundary' + Date.now();
  
  const header = Buffer.from(
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n' +
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="fileToUpload"; filename="' + path.basename(filePath) + '"\r\n' +
    'Content-Type: image/jpeg\r\n\r\n',
    'utf8'
  );
  
  const footer = Buffer.from('\r\n--' + boundary + '--\r\n', 'utf8');
  const body = Buffer.concat([header, fileData, footer]);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'catbox.moe',
      port: 443,
      path: '/user/api.php',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': body.length,
        'User-Agent': 'curl/8.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data.trim()));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const files = [
    'talisman_sarika_1.jpg',
    'talisman_sarika_2.jpg',
    'talisman_sarika_3.jpg',
    'talisman_namtao_1.jpg',
    'talisman_namtao_2.jpg',
    'talisman_namtao_3.jpg'
  ];
  const artifactDir = 'C:\\Users\\mark2\\.gemini\\antigravity\\brain\\26fd4403-8c83-4e63-b8a2-d8d9edb4520b';
  for (const f of files) {
    const p = path.join(artifactDir, f);
    try {
      const url = await uploadToCatbox(p);
      console.log(f + ' -> ' + url);
    } catch (e) {
      console.error(f, e.message);
    }
  }
}
main();
