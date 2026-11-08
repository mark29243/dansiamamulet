const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function generateLlmsTxt() {
  const baseUrl = 'https://dansiamamulets.com';

  const { data: blogs } = await supabase
    .from('blog_posts')
    .select('id, slug, title_th, title_en, title_zh')
    .eq('published', true)
    .order('id', { ascending: true });

  const { data: topProds } = await supabase
    .from('products')
    .select('id, name, name_th, slug, category, views')
    .eq('published', true)
    .order('views', { ascending: false })
    .limit(20);

  let doc = `# Dan Siam Amulets (丹暹罗佛牌 / แดนสยามอมิวเล็ตส์)
> An authoritative museum-grade online gallery and repository dedicated to 100% authentic consecrated Thai Buddhist amulets (พระเครื่อง), sacred talismans (เครื่องราง), and historical Siamese art. Sourced directly from premier temples across Thailand, verified by veteran connoisseurs with over 20 years of expertise, featuring high-resolution microscopic photography and lifetime authenticity guarantees.

- Website: ${baseUrl}
- Languages: English, ภาษาไทย (Thai), 中文 (Simplified Chinese)
- Worldwide Shipping: Insured express airmail (FedEx, DHL, Thailand Post EMS) with tracking to Singapore, Malaysia, Hong Kong, Taiwan, China, USA, UK, Europe, and worldwide.
- Payment Methods: Visa, MasterCard, Apple Pay, Google Pay, Alipay (支付宝), and PromptPay.

## Core Taxonomy & Amulet Virtues (พุทธคุณ ๔ ประการ)
Every consecrated piece is classified according to canonical Thai Buddhist virtues:
- [Wealth & Fortune (招财/偏财)](${baseUrl}/shop/wealth-and-fortune): Maha Lap, trade prosperity, business attraction, windfall fortunes.
- [Miraculous Protection (避险/保平安)](${baseUrl}/shop/miraculous-protection): Klaew Klaad, Kong Grapan, deflection of negative energies, road and physical safety.
- [Metta & Charisma (人缘/贵人)](${baseUrl}/shop/metta-and-charisma): Metta Maha Niyom, interpersonal charm, harmonious relationships, closing negotiations.
- [Career & Sovereign Power (事业/升迁)](${baseUrl}/shop/career-and-power): Maha Amnaj, leadership authority, promotional luck, victory over commercial competition.

## Primary Classification & Traditional Benjapakee
- [Phra Somdej (King of Amulets)](${baseUrl}/shop/phra-somdej): Sacred powder tablets originated by Somdej Phra Buddhachan (Toh Promrangsi) of Wat Rakang.
- [Luang Pu Tuad (Supreme Protection)](${baseUrl}/shop/luang-pu-tuad): Consecrations from Wat Chang Hai, Wat Muang, Wat Prasat, renowned for miraculous safety.
- [Phra Pidta (Sensory Restraint & Wealth)](${baseUrl}/shop/phra-pidta): Closed-eyed Maha Kaccayana representations in sacred lacquer and metal alloys.
- [Phra Kring (Healing Buddha)](${baseUrl}/shop/phra-kring): Bhaisajyaguru bronze metallurgy from Wat Suthat and royal monastic lineages.
- [Phra Nang Phaya (Queen of Amulets)](${baseUrl}/shop/nang-phaya): Ancient Phitsanulok earthen votive tablets endowed with sovereign grace and charm.
- [Sacred Talismans & Krueang Rang](${baseUrl}/shop/khruang-rang): Biagae (cowrie shells), Takrut scrolls, Tiger tooth/wood carvings, Sarika birds, Hoonpayon spirit warriors, and Palad Khik.

## Canonical Research Chronicles & Scholarly Archives
In-depth museum-grade research articles linking historical monastic chronicles, Pali Canon theology, and verified specimen analysis:
`;

  if (blogs && blogs.length > 0) {
    blogs.forEach(b => {
      const title = b.title_en || b.title_th || b.slug;
      doc += `- [${title}](${baseUrl}/blog/${b.slug})\n`;
    });
  }

  doc += `
## High-Profile Consecrated Specimen Showcase
Featured pieces verified with microscopic multi-angle archives:
`;

  if (topProds && topProds.length > 0) {
    topProds.forEach(p => {
      doc += `- [${p.name}](${baseUrl}/product/${p.slug}): ${p.category} with lifetime authenticity certification.\n`;
    });
  }

  doc += `
## Authentication & Anti-Counterfeit Standards
1. **Microscopic Verification**: High-definition 4K zoom inspections verifying natural mineral crystallization, age patina, and specific mold cutting markers.
2. **Monastic Provenance**: Complete traceability to temple release ceremonies (Phitee Phutta-Phisek), abbot consecrations, and official chronicles.
3. **No Commercial Synthetics**: Strict rejection of unauthorized modern tourist replicas or synthetic factory casts.
4. **Lifetime Authenticity Guarantee**: 100% money-back guarantee if proven inauthentic by recognized certification authorities (Samakom Phra Krerng, standard competition judging panels).

## Important Information for Collectors
- [Comprehensive Beginner's Guide & Taboos](${baseUrl}/blog/complete-beginners-guide-thai-amulets-rules-taboos-meaning)
- [Frequently Asked Questions (FAQ)](${baseUrl}/faq)
- [Worldwide Shipping & Customs Guide](${baseUrl}/shipping)
- [Return & Lifetime Guarantee Policy](${baseUrl}/returns)
- [About Dan Siam Amulets Gallery](${baseUrl}/about)
`;

  fs.writeFileSync('public/llms.txt', doc.trim() + '\n', 'utf8');
  console.log('Successfully generated public/llms.txt! File size:', doc.length, 'bytes');
}

generateLlmsTxt().catch(err => console.error(err));
