const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const baseDownloadDir = path.resolve('C:/Users/mark2/Downloads/Carousell_Listings');

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
}

// 5 Curated Top Amulets for Singapore / Malaysia Market
const CURATED_IDS = [38, 42, 49, 1737, 37];

async function main() {
  console.log('Fetching curated products from Supabase...');
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('id', CURATED_IDS);

  if (error || !products) {
    console.error('Error fetching products:', error);
    return;
  }

  // Sort according to CURATED_IDS order
  products.sort((a, b) => CURATED_IDS.indexOf(a.id) - CURATED_IDS.indexOf(b.id));

  const exportData = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const folderName = `${String(i + 1).padStart(2, '0')}_${p.slug.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 45)}`;
    const folderPath = path.join(baseDownloadDir, folderName);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    console.log(`\n[${i + 1}/${products.length}] Processing #${p.id}: ${p.name_th || p.name}...`);

    // Download photos
    const localImages = [];
    const images = p.images || [];
    for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
      const imgUrl = images[imgIdx];
      const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
      const fileName = `photo_${imgIdx + 1}${ext}`;
      const destPath = path.join(folderPath, fileName);
      try {
        await downloadFile(imgUrl, destPath);
        localImages.push(destPath);
        console.log(`  ✓ Saved ${fileName}`);
      } catch (err) {
        console.error(`  ✗ Failed to download ${imgUrl}:`, err.message);
      }
    }

    // SGD Price (1 SGD ~ 26 THB, rounded attractively)
    const priceThb = (p.sale_price || p.price) / 100;
    const priceSgd = Math.round(priceThb / 26);

    // Specific titles & rich lore customized for SG/MY buyers
    const customMetadata = {
      38: {
        title: 'Authentic Luang Phu Tuad Wat Chang Hai Coin 2502 Block Mai Malay',
        descIntro: 'Historic 2nd edition Luang Phu Tuad amulet consecrated in B.E. 2502 (1959) by Phra Ajahn Tim at Wat Chang Hai, Pattani. Cast in special Pinto Aluminium with vintage Gold Plating. Highly revered across Singapore, Malaysia, and Thailand as the paramount amulet for ultimate life protection (Klaew Klad) and safe travels.'
      },
      42: {
        title: 'Rare Phra Khun Phaen Sedet Klab 2511 Wat Tham Khao Ngen Sacred Powder',
        descIntro: 'Famous Khun Phaen Sedet Klab blessed in B.E. 2511 at Wat Tham Khao Ngen by the greatest southern Thai masters, including Arjan Chum Chaikiri and Arjan Nam (Wat Don Sala). Crafted from sacred herbs and mystical Saboo Luead (blood soapberry) powder for extraordinary Metta Mahaniyom (charm, charisma, business negotiation) and invulnerability.'
      },
      49: {
        title: 'Phra Somdej Thaan Kha To LP Nak Wat Rakang B.E. 2495 (Vintage Holy Powder)',
        descIntro: 'Consecrated in B.E. 2495 (1952) by Luang Pu Nak, Abbot of the legendary Wat Rakang Kositaram. Made with an abundant concentration of genuine broken Somdej powders from Somdej Phra Buddhacharn (Toh Promrangsi). Renowned as "The King of Amulets" for auspicious blessing, career advancement, high status, and prosperity.'
      },
      1737: {
        title: 'Sacred Guman Thong 7 Cemeteries Earth LP Pin Wat Ubon 2500 Rare Powerful',
        descIntro: 'Sacred vintage Guman Thong hand-pressed from 7 Sacred Cemeteries Earth (Din Chet Pacha) consecrated in B.E. 2500 by Luang Pho Pin of Wat Ubonwannaram (Ratchaburi), chief disciple of Luang Pho Khong (Wat Bang Kaphom). Famously revered for bringing wealth, booming retail sales, calling customers, and spiritual home protection.'
      },
      37: {
        title: 'LP Tuad Pim Phra Rod 5 Kings 2542 Consecrated by LP Moon Wat Ban Jan',
        descIntro: 'Sacred Luang Phu Tuad Pim Phra Rod (5 Kings Edition) blessed in B.E. 2542 by the miraculous centenarian monk Luang Pu Moon Thitasilo of Wat Ban Jan. Famous for turning around life fortunes, bringing unexpected windfalls, and supreme bodily protection.'
      }
    };

    const custom = customMetadata[p.id] || {};
    const carousellTitle = custom.title || `Authentic Thai Amulet: ${p.name}`.slice(0, 80);

    // Carousell Optimized Description
    const carousellDescription = `${carousellTitle}
Thai Name: ${p.name_th || p.name}
DAN SIAM REF: #${p.id}

✦ SACRED PROVENANCE & HISTORICAL SIGNIFICANCE ✦
${custom.descIntro || p.description || p.short || ''}

✦ 100% AUTHENTICITY GUARANTEE ✦
• Guaranteed 100% authentic consecrated sacred amulet from Dan Siam Amulets (Thailand).
• Direct temple consecration & genuine collector preservation.
• Full lifetime money-back guarantee of authenticity.

✦ SPECIFICATIONS ✦
• Temple / Origin: Thailand
• Era: Vintage Consecrated
• Condition: Excellent Sacred Vintage / Collector Preserved (As shown in actual studio photos)
• Category: ${p.category || 'Sacred Thai Amulet'}

✦ SECURE INTERNATIONAL SHIPPING TO SINGAPORE & MALAYSIA ✦
• Shipped directly from Bangkok, Thailand via Thailand Post ePacket / Tracked Priority Airmail.
• Full international tracking number provided within 24 hours of dispatch.
• Standard delivery timeframe: 3 to 5 business days to your doorstep in SG / MY.
• Carefully packaged with multi-layer protective bubble wrap inside a rigid export parcel box.

✦ VERIFIED OFFICIAL STORE ✦
View full studio photos, 360° closeups, and certificate details on our official website:
https://dansiamamulets.com/product/${p.slug}

Direct inquiry, bundling discounts, and offers via Carousell chat welcome! 🙏`;

    // Save listing_info.txt
    const infoText = `============================================================
CAROUSELL LISTING DETAILS FOR: #${p.id}
============================================================

[1] LISTING TITLE (Copy & Paste):
${carousellTitle}

[2] PRICE (SGD):
${priceSgd}

[3] CATEGORY:
Antiques & Vintage > Religious Items (or Collectibles)

[4] CONDITION:
Like New / Lightly Used

[5] PHOTOS IN THIS FOLDER:
${localImages.map(f => path.basename(f)).join(', ')}

[6] FULL DESCRIPTION (Copy & Paste):
${carousellDescription}
============================================================
Web Link: https://dansiamamulets.com/product/${p.slug}
`;

    fs.writeFileSync(path.join(folderPath, 'listing_info.txt'), infoText, 'utf8');

    exportData.push({
      id: p.id,
      name_th: p.name_th,
      title: carousellTitle,
      price_sgd: priceSgd,
      price_thb: priceThb,
      category: 'Antiques & Vintage > Religious Items',
      condition: 'Like New',
      folderPath,
      localImages,
      webUrl: `https://dansiamamulets.com/product/${p.slug}`,
      description: carousellDescription
    });
  }

  // Save json in base directory
  fs.writeFileSync(path.join(baseDownloadDir, 'curated_listings.json'), JSON.stringify(exportData, null, 2), 'utf8');
  console.log(`\nAll 5 curated amulets downloaded and packaged into: ${baseDownloadDir}`);
}

main().catch(console.error);
