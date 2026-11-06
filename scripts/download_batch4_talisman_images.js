const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const supabaseUrl = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(supabaseUrl, supabaseKey);

const items = [
  { shortId: 'singha_hom', id: 1778 },
  { shortId: 'hoonpayon_prasut', id: 1775 },
  { shortId: 'tiger_daeng', id: 1774 },
  { shortId: 'takrut_suan', id: 1722 },
  { shortId: 'takrut_chamnian', id: 1721 },
  { shortId: 'takrut_chan', id: 1699 },
  { shortId: 'rahu_khai', id: 1697 },
  { shortId: 'sarika_soi', id: 1695 },
  { shortId: 'ngang_anek', id: 1693 },
  { shortId: 'moo_anek', id: 1690 },
  { shortId: 'paladkhik_pakong', id: 1687 },
  { shortId: 'namtao_paknam', id: 1686 },
  { shortId: 'sarika_chom', id: 1683 },
  { shortId: 'garuda_koon', id: 1679 },
  { shortId: 'chang_thaem', id: 1672 },
  { shortId: 'chuchok_somphong', id: 1667 },
  { shortId: 'turtle_oun', id: 1663 },
  { shortId: 'lookom_yaem', id: 1631 },
  { shortId: 'paladkhik_gan', id: 1619 },
  { shortId: 'hanuman_kruean', id: 1597 }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Follow redirect if needed
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  const targetIds = items.map(i => i.id);
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name_th, name, name_zh, price, images, short, description, description_th')
    .in('id', targetIds);

  if (error) {
    console.error('Error fetching Supabase products:', error);
    return;
  }

  const outDir = path.join(__dirname, '..', 'public', 'amulets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const detailedItems = [];

  for (const item of items) {
    const prod = data.find(p => p.id === item.id);
    if (!prod) {
      console.error(`Product not found for ID: ${item.id}`);
      continue;
    }

    const imgs = Array.isArray(prod.images) ? prod.images : JSON.parse(prod.images || '[]');
    console.log(`\nDownloading images for [${item.shortId}] ID ${prod.id}: ${prod.name_th}...`);

    const downloadedPaths = [];
    for (let i = 0; i < 3; i++) {
      const imgUrl = imgs[i];
      const filename = `talisman_${item.shortId}_${i+1}.jpg`;
      const dest = path.join(outDir, filename);

      try {
        await downloadFile(imgUrl, dest);
        const stats = fs.statSync(dest);
        console.log(`  ✓ Image ${i+1}: ${filename} (${Math.round(stats.size/1024)} KB)`);
        downloadedPaths.push(`/amulets/${filename}`);
      } catch (err) {
        console.error(`  ✗ Failed downloading image ${i+1} from ${imgUrl}:`, err.message);
      }
    }

    detailedItems.push({
      shortId: item.shortId,
      id: prod.id,
      slug: prod.slug,
      name_th: prod.name_th || prod.name,
      name_en: prod.name,
      name_zh: prod.name_zh,
      price: prod.price,
      short: prod.short,
      description: prod.description,
      description_th: prod.description_th,
      localImages: downloadedPaths
    });
  }

  fs.writeFileSync(
    path.join(__dirname, 'batch4_talismans_meta.json'),
    JSON.stringify(detailedItems, null, 2)
  );
  console.log('\nAll done! Saved metadata to scripts/batch4_talismans_meta.json');
}

main();
