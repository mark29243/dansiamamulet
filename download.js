const https = require('https');
const fs = require('fs');

const url = 'https://cdn.jsdelivr.net/gh/StellarCN/scp_zh@master/fonts/SimHei.ttf';
const dest = 'public/fonts/SimHei.ttf';

const file = fs.createWriteStream(dest);
https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to get '${url}' (${response.statusCode})`);
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => console.log('Download complete'));
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error(`Error: ${err.message}`);
});
