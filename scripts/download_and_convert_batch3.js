const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const artifactDir = 'C:\\Users\\mark2\\.gemini\\antigravity\\brain\\26fd4403-8c83-4e63-b8a2-d8d9edb4520b';
const publicDir = 'c:\\Users\\mark2\\Downloads\\dansiam-amulets_3\\dansiamamulet\\public\\amulets';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => stream.close(() => resolve(dest)));
    }).on('error', reject);
  });
}

const items = [
  // 1. Phaya Tao Ruean Luang Pu Liu 2535 (1506)
  { name: 'turtle_front', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1785116260216-clg7eo0lqea.webp' },
  { name: 'turtle_back', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1785116261418-jhdmqglkuup.webp' },
  { name: 'turtle_detail', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1785116262529-t6h7qi1i0rq.webp' },

  // 2. Rahu Kala Gaew Luang Pho Pin Wat Srisathong (193)
  { name: 'rahu_front', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1782291134281-8l2ysndshgg.webp' },
  { name: 'rahu_back', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1782291135829-aupkw388d1d.webp' },
  { name: 'rahu_detail', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1782291138809-vhlh5bbnt7k.webp' },

  // 3. Tiger Skin Takrut Luang Pho Thiang 2539 (1489)
  { name: 'tigertakrut_front', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1784518272996-w2e4j4jqcse.webp' },
  { name: 'tigertakrut_back', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1784518274937-dik0d42fvj4.webp' },
  { name: 'tigertakrut_detail', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1784518277227-8uyxe6m1622.webp' },

  // 4. Garuda Luang Pho Warah 2564 (1454)
  { name: 'garuda_front', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1783347178712-rla9ka4swlm.webp' },
  { name: 'garuda_back', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1783347180357-2zg92u8cgjr.webp' },
  { name: 'garuda_detail', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1783347183025-3irngg0nroh.webp' },

  // 5. Bia Gae Luang Pu Kong Wat Klang Bang Kaew 2568 (1565)
  { name: 'biagae_front', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1786350483643-cd9anszb6i8.webp' },
  { name: 'biagae_back', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1786350484880-7tgpk5okl7c.webp' },
  { name: 'biagae_detail', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1786350486253-4tjkxbtauwr.webp' }
];

async function run() {
  for (const item of items) {
    const rawDest = path.join(artifactDir, item.name + '.webp');
    const artJpg = path.join(artifactDir, item.name + '.jpg');
    const pubJpg = path.join(publicDir, item.name + '.jpg');
    try {
      await downloadFile(item.url, rawDest);
      await sharp(rawDest).jpeg({ quality: 95 }).toFile(artJpg);
      fs.copyFileSync(artJpg, pubJpg);
      console.log('Saved JPG:', item.name + '.jpg');
    } catch (e) {
      console.error('Failed on', item.name, e.message);
    }
  }
  console.log('All 15 talisman images downloaded, converted to JPG, and saved to public/amulets/ !');
}

run();
