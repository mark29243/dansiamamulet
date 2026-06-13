import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';
import HomeShop from '../../HomeShop';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

// Slug → category meta
const CAT_META: Record<string, {
  th: string; en: string; zh: string;
  desc_en: string; desc_th: string;
  keywords: string[];
}> = {
  'phra-somdej': {
    th: 'พระสมเด็จ', en: 'Phra Somdej', zh: '颂德佛牌',
    desc_en: 'Authentic Phra Somdej amulets from Thailand\'s most revered monks. Phra Somdej is the most popular Thai Buddhist amulet, known for protection, good fortune, and metta (loving-kindness). Every piece certified genuine with worldwide shipping.',
    desc_th: 'พระสมเด็จแท้จากเกจิดังทั่วประเทศไทย มีพุทธคุณด้านเมตตามหานิยม แคล้วคลาด และโชคลาภ ทุกองค์รับประกันความแท้ พร้อมจัดส่งทั่วโลก',
    keywords: ['Phra Somdej amulet', 'พระสมเด็จแท้', 'Somdej authentic', 'buy Phra Somdej', '颂德佛牌真品', 'Thai Buddhist amulet', 'Somdej Wat Rakhang'],
  },
  'luang-pu-tuad': {
    th: 'หลวงพ่อทวด', en: 'Luang Pu Tuad', zh: '龙普托',
    desc_en: 'Luang Pu Tuad amulets — Thailand\'s most revered monk known for miraculous powers of protection, survival, and turning seawater into freshwater. Highly sought by collectors worldwide.',
    desc_th: 'พระหลวงพ่อทวดแท้ พระเกจิดังที่สุดแห่งภาคใต้ มีพุทธคุณด้านแคล้วคลาด คุ้มครองภัย และมหาอุด ทุกองค์รับประกันแท้',
    keywords: ['Luang Pu Tuad amulet', 'หลวงพ่อทวดแท้', 'Luang Pho Tuad', 'Wat Chang Hai', '龙普托佛牌', 'LP Tuad amulet'],
  },
  'rian': {
    th: 'เหรียญ', en: 'Coin Amulets', zh: '圣币',
    desc_en: 'Rare and authentic Thai monk coin amulets (Rian). Coin amulets are among the most collectible Thai sacred objects, featuring revered monks from temples across Thailand.',
    desc_th: 'เหรียญพระหลวงพ่อแท้จากวัดดังทั่วประเทศ เหรียญพระเครื่องนิยมสะสม มีพุทธคุณครบทุกด้าน ของหายากคัดสรรโดยผู้เชี่ยวชาญ',
    keywords: ['Thai coin amulet', 'Rian amulet', 'เหรียญพระแท้', 'Buddhist coin', '泰国圣币', 'monk coin Thailand', 'rare amulet coin'],
  },
  'phra-pidta': {
    th: 'พระปิดตา', en: 'Phra Pidta', zh: '闭眼佛',
    desc_en: 'Authentic Phra Pidta (closed-eyes Buddha) amulets — known for wealth attraction, protection from danger, and blocking bad luck. A favourite among Thai amulet collectors.',
    desc_th: 'พระปิดตาแท้ พุทธคุณเด่นด้านมหาลาภ เงินทองไหลมาเทมา และป้องกันอันตราย นิยมสะสมในหมู่นักเลงพระ',
    keywords: ['Phra Pidta amulet', 'พระปิดตาแท้', 'closed eyes Buddha', 'Pidta amulet Thailand', '闭眼佛牌', 'wealth amulet'],
  },
  'rup-lor': {
    th: 'รูปหล่อ', en: 'Cast Metal Images', zh: '铸造佛像',
    desc_en: 'Authentic cast metal monk images (Rup Lor) — handcrafted bronze and brass figures of revered Thai monks. Each piece is blessed and comes with certificate of authenticity.',
    desc_th: 'รูปหล่อพระเกจิดังแท้ หล่อด้วยโลหะมวลสาร ผ่านพิธีปลุกเสก มีพุทธคุณครบทุกด้าน',
    keywords: ['Rup Lor amulet', 'รูปหล่อแท้', 'cast monk image', 'Thai monk figurine', '铸造高僧像', 'metal amulet Thailand'],
  },
  'phra-kring': {
    th: 'พระกริ่ง', en: 'Phra Kring', zh: '铃铛佛牌',
    desc_en: 'Authentic Phra Kring amulets — hollow Buddha images containing a small metal ball that rings when shaken. Associated with healing, longevity, and warding off illness.',
    desc_th: 'พระกริ่งแท้ มีเม็ดโลหะอยู่ภายในกริ่งได้เสียง มีพุทธคุณด้านรักษาโรค อายุยืน และเมตตามหานิยม',
    keywords: ['Phra Kring amulet', 'พระกริ่งแท้', 'bell amulet Thailand', 'Kring Buddha', '铃铛佛牌真品', 'healing amulet'],
  },
  'khruang-rang': {
    th: 'เครื่องราง', en: 'Talismans & Charms', zh: '护身符',
    desc_en: 'Authentic Thai talismans and protective charms — handcrafted sacred objects blessed by monks for protection, luck, and prosperity. Includes takrut, yantra, and rare amulets.',
    desc_th: 'เครื่องรางของขลังแท้ ผ่านพิธีปลุกเสกโดยพระเกจิอาจารย์ชื่อดัง มีพุทธคุณด้านคงกระพัน แคล้วคลาด และเสริมดวง',
    keywords: ['Thai talisman', 'เครื่องรางแท้', 'sacred charm Thailand', 'Buddhist talisman', '泰国护身符', 'protective amulet'],
  },
  'phra-phong': {
    th: 'พระผง', en: 'Powder Amulets', zh: '粉末佛牌',
    desc_en: 'Authentic Thai powder amulets (Phra Phong) — made from sacred powders, herbs, and blessed materials. Among the most ancient and revered forms of Thai amulet.',
    desc_th: 'พระผงแท้ ทำจากมวลสารศักดิ์สิทธิ์ ว่านยา และเกสรดอกไม้ เป็นพระเครื่องประเภทเก่าแก่และศักดิ์สิทธิ์ที่สุดประเภทหนึ่ง',
    keywords: ['Phra Phong amulet', 'พระผงแท้', 'powder amulet Thailand', 'Thai sacred powder', '粉末佛牌真品', 'pong amulet'],
  },
  'nang-phaya': {
    th: 'พระนางพญา', en: 'Nang Phaya', zh: '南帕雅',
    desc_en: 'Authentic Phra Nang Phaya amulets — one of Thailand\'s five most sacred amulets (benjaphakee). Known for metta (loving-kindness), charm, and attraction. Highly prized by collectors.',
    desc_th: 'พระนางพญาแท้ หนึ่งในเบญจภาคีพระเครื่องที่ทรงคุณค่าที่สุด มีพุทธคุณด้านเมตตามหานิยม เสน่ห์ และมหาเสน่ห์',
    keywords: ['Phra Nang Phaya', 'พระนางพญาแท้', 'Nang Phaya amulet', 'benjaphakee amulet', '南帕雅佛牌', 'rare Thai amulet'],
  },
  'phrakejiaachan': {
    th: 'พระเกจิอาจารย์', en: 'Monk Amulets', zh: '高僧佛牌',
    desc_en: 'Authentic amulets from Thailand\'s most revered monks (Phra Kaji Achan). Each piece is blessed by respected masters known for their spiritual powers and meditation achievements.',
    desc_th: 'พระเกจิอาจารย์ดังแท้จากทั่วประเทศไทย ปลุกเสกโดยพระอาจารย์ที่มีวิทยาคมสูง เหมาะสำหรับผู้ที่ต้องการพระเกจิดังราคาสมเหตุสมผล',
    keywords: ['Thai monk amulet', 'พระเกจิอาจารย์แท้', 'Phra Kaji amulet', 'blessed monk amulet', '高僧佛牌真品', 'Buddhist monk charm'],
  },
  'naga-prok': {
    th: 'พระนาคปรก', en: 'Naga Prok', zh: '那伽佛牌',
    desc_en: 'Authentic Naga Prok amulets — Buddha seated on a coiled naga (serpent). Associated with wealth, protection, and good fortune. A powerful and visually striking Thai amulet.',
    desc_th: 'พระนาคปรกแท้ พระพุทธรูปประทับบนพญานาค มีพุทธคุณด้านมหาลาภ คุ้มครองภัย และเสริมโชค',
    keywords: ['Naga Prok amulet', 'พระนาคปรกแท้', 'naga Buddha amulet', '那伽佛牌', 'snake Buddha Thailand', 'naga prok Thai amulet'],
  },
  'phra-rod': {
    th: 'พระรอด', en: 'Phra Rod', zh: '帕罗德',
    desc_en: 'Authentic Phra Rod amulets — one of Thailand\'s five sacred benjaphakee amulets, originating from Wat Mahawan, Lamphun. Among the most ancient and sought-after Thai amulets.',
    desc_th: 'พระรอดแท้ หนึ่งในเบญจภาคีพระเครื่องที่ทรงคุณค่าที่สุดของไทย มีต้นกำเนิดจากวัดมหาวัน จังหวัดลำพูน',
    keywords: ['Phra Rod amulet', 'พระรอดแท้', 'benjaphakee amulet', 'Wat Mahawan', '帕罗德佛牌', 'Lamphun amulet'],
  },
  'ganesha': {
    th: 'พระพิฆเนศ', en: 'Ganesha', zh: '象头神',
    desc_en: 'Authentic Ganesha amulets and figurines — the Hindu elephant-headed deity widely revered in Thailand for success, removing obstacles, and blessing new ventures.',
    desc_th: 'พระพิฆเนศแท้ เทพเจ้าแห่งความสำเร็จ ขจัดอุปสรรค และเสริมบารมี นิยมบูชาในหมู่นักธุรกิจและผู้ต้องการความก้าวหน้า',
    keywords: ['Ganesha amulet Thailand', 'พระพิฆเนศแท้', 'Ganesh figurine', 'elephant god amulet', '象头神佛牌', 'success amulet'],
  },
  'somdej-toh': {
    th: 'หลวงปู่โต พรหมรังสี', en: 'Somdej Toh', zh: '颂德多',
    desc_en: 'Authentic amulets associated with Somdej Phra Phuttachan (Toh Phromrangsi) of Wat Rakhang, Bangkok — creator of the legendary Phra Somdej amulet and one of Thailand\'s most revered monks.',
    desc_th: 'วัตถุมงคลสมเด็จพระพุฒาจารย์ (โต พรหมรังสี) วัดระฆังโฆสิตาราม กรุงเทพ ผู้สร้างพระสมเด็จที่ลือชื่อที่สุดในประวัติศาสตร์พระเครื่องไทย',
    keywords: ['Somdej Toh amulet', 'หลวงปู่โต', 'Wat Rakhang amulet', 'สมเด็จพระพุฒาจารย์', '颂德多佛牌', 'Phra Somdej Toh'],
  },
  'luang-pu-khun': {
    th: 'หลวงพ่อคูณ', en: 'Luang Pu Khun', zh: '龙普坤',
    desc_en: 'Authentic Luang Pu Khun amulets — one of Thailand\'s most beloved monks from Wat Ban Rai, Nakhon Ratchasima. Famous for miraculous blessings and protection.',
    desc_th: 'พระหลวงพ่อคูณแท้ วัดบ้านไร่ จังหวัดนครราชสีมา พระเกจิที่เป็นที่รักและนับถือมากที่สุดรูปหนึ่งของประเทศไทย',
    keywords: ['Luang Pu Khun amulet', 'หลวงพ่อคูณแท้', 'Wat Ban Rai amulet', 'LP Khun', '龙普坤佛牌', 'Korat monk amulet'],
  },
  'luang-pu-ngern': {
    th: 'หลวงพ่อเงิน', en: 'Luang Pu Ngern', zh: '龙普银',
    desc_en: 'Authentic Luang Pu Ngern amulets — revered monk of Wat Bangklan, Phichit. Known for miraculous powers and wealth attraction. Highly collected across Southeast Asia.',
    desc_th: 'พระหลวงพ่อเงินแท้ วัดบางคลาน จังหวัดพิจิตร พระเกจิดังที่มีพุทธคุณด้านมหาลาภ และได้รับความนิยมอย่างสูงในหมู่นักสะสม',
    keywords: ['Luang Pu Ngern amulet', 'หลวงพ่อเงินแท้', 'Wat Bangklan', 'LP Ngern', '龙普银佛牌', 'Phichit monk amulet'],
  },
  'phra-sangkachai': {
    th: 'พระสังกัจจายน์', en: 'Phra Sangkachai', zh: '圣迦旃延',
    desc_en: 'Authentic Phra Sangkachai amulets — the beloved rotund monk revered for wealth, abundance, and good fortune. One of the most popular amulets among Thai and Chinese devotees.',
    desc_th: 'พระสังกัจจายน์แท้ พระพุทธรูปอ้วนกลมที่เป็นที่นิยมในหมู่ผู้บูชา มีพุทธคุณด้านมหาลาภ ความร่ำรวย และความอุดมสมบูรณ์ นิยมในหมู่ชาวไทยและชาวจีน',
    keywords: ['Phra Sangkachai amulet', 'พระสังกัจจายน์แท้', 'fat monk amulet Thailand', 'wealth amulet', '圣迦旃延佛牌', 'abundance amulet Thai'],
  },
};

// slug → Thai category name used in DB
const SLUG_TO_CAT: Record<string, string> = {
  'phra-somdej':    'พระสมเด็จ',
  'nang-phaya':     'พระนางพญา',
  'phra-pidta':     'พระปิดตา',
  'naga-prok':      'พระนาคปรก',
  'phra-kring':     'พระกริ่ง',
  'phra-phong':     'พระผง',
  'phra-rod':       'พระรอด',
  'rian':           'เหรียญ',
  'rup-lor':        'รูปหล่อ',
  'khruang-rang':   'เครื่องราง',
  'ganesha':        'พระพิฆเนศ',
  'luang-pu-tuad':  'หลวงพ่อทวด',
  'somdej-toh':     'หลวงปู่โต พรหมรังสี',
  'luang-pu-khun':  'หลวงพ่อคูณ',
  'luang-pu-ngern': 'หลวงพ่อเงิน',
  'phrakejiaachan':    'พระเกจิอาจารย์',
  'phra-sangkachai':   'พระสังกัจจายน์',
};

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_CAT).map(category => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const meta = CAT_META[params.category];
  if (!meta) return {};
  const canonicalUrl = `${siteUrl}/shop/${params.category}`;
  return {
    title: `${meta.en} · Thai Amulets | Dan Siam Amulets`,
    description: meta.desc_en,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en': canonicalUrl,
        'th': canonicalUrl,
        'zh-Hans': canonicalUrl,
      },
    },
    openGraph: {
      title: `${meta.en} | Dan Siam Amulets`,
      description: meta.desc_en,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const meta = CAT_META[params.category];
  const catTh = SLUG_TO_CAT[params.category];
  if (!meta || !catTh) notFound();

  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .ilike('category', `%${catTh}%`)
    .order('stock', { ascending: false })
    .order('id', { ascending: true });

  const products = (data ?? []) as Product[];

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${meta.en} — Dan Siam Amulets`,
    description: meta.desc_en,
    url: `${siteUrl}/shop/${params.category}`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/product/${p.slug}`,
      name: p.name,
    })),
  };

  // Get all products for the shop component (it handles its own filter)
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('stock', { ascending: false })
    .order('id', { ascending: true });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, '\\u003c') }}
      />
      <HomeShop
        products={(allProducts ?? []) as Product[]}
        defaultCategory={catTh}
        currentSlug={params.category}
      />
    </>
  );
}
