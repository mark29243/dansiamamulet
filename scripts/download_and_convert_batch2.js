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
  // 1. Khun Phaen Kuman Sombat (1755)
  { name: 'batch2_khunphaen_1', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792992407811-koxc0edd6gn.webp' },
  { name: 'batch2_khunphaen_2', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792992409009-xafnc260d4s.webp' },
  { name: 'batch2_khunphaen_3', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792992410076-afadm0j9q6w.webp' },

  // 2. Takrut Sarika Oil (1745)
  { name: 'batch2_takrut_1', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792639863314-lghfpizmsx9.webp' },
  { name: 'batch2_takrut_2', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792639864208-gotdspv02f.webp' },
  { name: 'batch2_takrut_3', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792639865549-kmihnf4upld.webp' },

  // 3. Luang Pu Thuat Bang Khun Phrom (1757)
  { name: 'batch2_lpthuat_1', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793168920520-stpfugf8vu.webp' },
  { name: 'batch2_lpthuat_2', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793168921657-4l0wlmwoxfa.webp' },
  { name: 'batch2_lpthuat_3', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793168923002-jpias7mt.webp' },

  // 4. Somdej Leaping Tiger (1770)
  { name: 'batch2_tiger_1', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793373194274-e5l8eemufc.webp' },
  { name: 'batch2_tiger_2', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793373195037-3c362w4rugh.webp' },
  { name: 'batch2_tiger_3', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1793373195730-5vqwdymb3dc.webp' },

  // 5. Palad Khik Luang Pu Mek (1703)
  { name: 'batch2_paladkhik_1', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1790515757876-q80j4v3q75h.webp' },
  { name: 'batch2_paladkhik_2', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1790515759822-yigotprg6z.webp' },
  { name: 'batch2_paladkhik_3', url: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1790515762813-nlxwkdm7h6l.webp' }
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
      console.error('Error on', item.name, e.message);
    }
  }
}
run();
