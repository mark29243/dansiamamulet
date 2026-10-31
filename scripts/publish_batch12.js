const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  'https://vipqvizivfzkjdqeuyhu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0'
);

const updates = [
  {
    id: 1768,
    slug: 'phra-pidta-wan-jindamanee-takrut-luang-pho-thong-yu-wat-tha-sao-2520',
    name: 'Phra Pidta Wan Jindamanee Herbal Powder with Takrut Luang Pho Thong-yu Wat Tha Sao Samut Sakhon B.E. 2520',
    name_zh: '龙婆通佑 佛历2520年 金达玛尼草药经粉嵌符管掩面佛 瓦塔绍寺 龙仔厝府',
    description: 'Authentic Phra Pidta crafted from sacred Wan Jindamanee herbal powder and embedded with a sacred consecrated Takrut, blessed by Luang Pho Thong-yu of Wat Tha Sao, Samut Sakhon Province in B.E. 2520 (1977 CE). Luang Pho Thong-yu was an esteemed master in the lineage of Luang Pu Boon of Wat Klang Bang Kaeo, renowned for his mastery of the ancient Jindamanee pharmacology and consecration wicha. The sacred Jindamanee herbal mixture is revered for its extraordinary auspicious properties, bestowing boundless Metta Mahaniyom (loving-kindness, charisma, and attraction) and drawing abundant wealth, prosperity, and good fortune in commerce. The closed-eye Pidta form together with the sacred embedded Takrut provides impenetrable spiritual protection, shielding the bearer from negativity, adversity, and unforeseen hazards. 100% authentic Thai amulet guaranteed by Dan Siam Amulets.',
    description_zh: '龙婆通佑（Luang Pho Thong-yu）佛历2520年（公元1977年）于龙仔厝府瓦塔绍寺（Wat Tha Sao）督造之金达玛尼草药圣粉嵌符管掩面佛（必打佛）。龙婆通佑深得全泰金达玛尼法门鼻祖——瓦刚芒轿寺龙普文（Luang Pu Boon）之真传法脉，精通古老草药圣粉与吉祥法门研制。此尊必打佛以珍贵金达玛尼百草圣粉压模督造，并在底部或身部深嵌手刻加持符管，具备极强的人缘魅力（Metta Mahaniyom）、招揽十方贵人、化解阻碍与助商贸财运之威德；掩面静思法相配合护身符管，更助佩戴者避险挡煞、抵御一切恶缘灾厄。丹暹佛牌（Dan Siam Amulets）终身保真保证。',
    published: true,
  },
  {
    id: 1769,
    slug: 'phra-somdej-phra-prathan-wat-muang-luang-pho-pae-wat-pikul-thong-2514',
    name: 'Phra Somdej Phra Prathan Wat Muang Blessed by Luang Pho Pae Wat Pikul Thong Sing Buri B.E. 2514',
    name_zh: '龙婆培 佛历2514年 瓦峦寺大佛法相崇迪佛 瓦碧坤通寺 信武里府',
    description: 'Auspicious Phra Somdej Phra Prathan (Principal Buddha on Multi-Tiered Dais) issued at Wat Muang and solemnly consecrated by the legendary Luang Pho Pae (Phra Thep Singhaburachan) of Wat Pikul Thong, Sing Buri Province in B.E. 2514 (1971 CE). Luang Pho Pae is celebrated internationally as one of Thailand\'s greatest masters of the modern era, revered for his compassionate blessings and sacred Ittije and Phutthakhun powder formulations. This Phra Somdej depicts the serene principal Buddha granting peace, harmony, and unshakeable inner stability. Renowned for bestowing exceptional Metta Mahaniyom (loving-kindness), advancing career success, elevating personal authority, and safeguarding the devotee from all forms of danger. 100% authentic Thai amulet guaranteed by Dan Siam Amulets.',
    description_zh: '龙婆培（Luang Pho Pae / 帕贴僧哈布拉赞）佛历2514年（公元1971年）于信武里府瓦碧坤通寺（Wat Pikul Thong）受邀为瓦峦寺（Wat Muang）督造加持之大佛主尊法相崇迪佛。龙婆培大师乃泰国近代最受尊崇的圣僧之一，所制崇迪佛牌享誉海内外。此尊崇迪佛以大师独门经粉、一滴杰圣粉与吉祥花粉精制而成，法相庄严宏伟，法座层次分明，象征基业稳固、步步高升。佩戴者可获至高慈悲人缘庇护、促进事业与公职晋升、化险为夷保平安，并助家宅兴旺。丹暹佛牌（Dan Siam Amulets）终身保真保证。',
    published: true,
  },
  {
    id: 1770,
    slug: 'phra-somdej-lang-suea-phoen-luang-pho-thong-yu-wat-mai-nong-pha-ong-2519',
    name: 'Phra Somdej with Leaping Tiger Reverse Luang Pho Thong-yu Wat Mai Nong Pha-ong Samut Sakhon B.E. 2519',
    name_zh: '龙婆通佑 佛历2519年 背后飞虎法相崇迪佛 瓦迈农帕翁寺 龙仔厝府',
    description: 'Sacred Phra Somdej featuring the emblem of the Leaping Tiger (Suea Phoen) on the reverse, blessed by Luang Pho Thong-yu Yasodharo of Wat Mai Nong Pha-ong, Samut Sakhon Province in B.E. 2519 (1976 CE). Luang Pho Thong-yu was an iconic meditation master and ascetic monk known for his rigorous spiritual discipline, profound Vipassana insight, and deep mastery of protective yantras. The front displays the classic Phra Somdej Buddha in meditation beneath the arched aura, while the reverse depicts the dynamic leaping tiger, symbolizing fearless courage, paramount authority (Maha Amnat), command over subordinates, and triumph over adversaries. Highly sought after for business leadership, executive governance, career elevation, and impenetrable Kong Grapan protection. 100% authentic Thai amulet guaranteed by Dan Siam Amulets.',
    description_zh: '龙婆通佑（Luang Pho Thong-yu Yasodharo）佛历2519年（公元1976年）于龙仔厝府瓦迈农帕翁寺（Wat Mai Nong Pha-ong）亲自开光督造之飞虎后背崇迪佛。大师为近代著名苦行与禅定尊者，德行高洁，法力深湛。佛牌正面为崇迪佛禅定法相，端庄宁静；背面特别铸印威猛飞虎（Suea Phoen）圣印与守护符文，寓意勇猛无畏、降伏群邪、掌握大权（Maha Amnat）并统御下属。极佳助力事业领导力、商场决断力与职场升迁，同时具有强大的避险挡煞与刀枪不入之护体功德。丹暹佛牌（Dan Siam Amulets）终身保真保证。',
    published: true,
  },
  {
    id: 1771,
    slug: 'phra-yod-thong-khosapanyo-luang-pu-khamphan-wat-that-maha-chai-nava-metal',
    name: 'Phra Yod Thong Victory Buddha Khosapanyo Luang Pu Khamphan Wat That Maha Chai Navaguna Bronze Limited Edition',
    name_zh: '龙普堪潘 佛历纳瓦九宝铜黑漆光面战旗顶胜佛 瓦塔玛哈猜寺 那空拍侬府 限量督造',
    description: 'Rare Phra Yod Thong (Flagstaff Victory Buddha) cast in dense, lustrous black Navaguna sacred alloy (Nawa Dam Khlap), consecrated by Luang Pu Khamphan Khosapanyo (Phra Sunthorn Thammarakorn) of Wat That Maha Chai, Nakhon Phanom Province. Luang Pu Khamphan was venerated across Thailand as the \'God of the Mekong River Basin\', a saintly meditation master endowed with pure spiritual radiance and profound elemental mastery. The Phra Yod Thong posture originates from the ancient Ayutthaya military tradition, where a consecrated Buddha image was affixed to the top of the war standard to ensure absolute invincibility, auspicious victory, and courageous morale in battle. This limited edition is revered for bestowing victorious triumph over life\'s obstacles, unyielding career success, protective aura, and boundless good fortune. 100% authentic Thai amulet guaranteed by Dan Siam Amulets.',
    description_zh: '龙普堪潘（Luang Pu Khamphan Khosapanyo / 帕逊通昙玛拉功）于那空拍侬府瓦塔玛哈猜寺（Wat That Maha Chai）督造加持之黑光九宝铜（Nawa Dam Khlap）战旗顶胜佛（帕耀通 / Phra Yod Thong），极为罕见且督造数量极少。龙普堪潘被尊为\'湄公河流域圣佛\'，禅定高深，受全泰信众敬仰。战旗顶胜佛源自阿瑜陀耶王朝军旅圣统，置于军旗顶端引领大军凯旋而归，寓意百战百胜、所向披靡、破除一切困境阻碍与降伏对手。此尊圣物凝聚九种圣金属合铸，乌黑温润，蕴含浩然正气与领导统御之威权，是开拓事业、祈求胜利与吉祥安康的至尊护佑。丹暹佛牌（Dan Siam Amulets）终身保真保证。',
    published: true,
  },
  {
    id: 1772,
    slug: 'sarika-mobile-pair-carved-wood-luang-pho-ken-wat-tham-khao-ito-prachin-buri',
    name: 'Hand-Carved Sacred Wood Shop Hanging Sarika Celestial Birds Pair Luang Pho Ken Wat Tham Khao Ito Prachin Buri',
    name_zh: '龙婆肯 纯手工雕刻满符经文招财人缘双沙利卡金舌鸟挂饰 瓦探考伊托寺 巴真府',
    description: 'Authentic Pair of Sacred Hanging Shop Mobile Sarika (Celestial Songbirds) hand-carved from sacred wood and completely inscribed with sacred Khom yantras by the venerable Luang Pho Ken Sukhavatthano of Wat Tham Khao Ito, Prachin Buri Province. Luang Pho Ken was a legendary ascetic cave-dwelling forest monk who lived to the remarkable age of 111 years (B.E. 2402–2513 / 1859–1970 CE). He is universally famous for his extraordinary Sarika Lin Thong (Golden-Tongued Celestial Bird) and Sai Dak Sombat (Wealth Trapping Basket) amulets. Designed specifically to hang in front of stores, merchant offices, and commercial establishments, this Sarika pair calls upon boundless Metta Mahaniyom, captivating the hearts of customers, sweetening sales negotiations, and continuously attracting customers, prosperity, and wealth into the business. 100% authentic Thai amulet guaranteed by Dan Siam Amulets.',
    description_zh: '龙婆肯（Luang Pho Ken Sukhavatthano）于巴真府瓦探考伊托寺（Wat Tham Khao Ito）督造加持之纯手工雕刻满符经文店铺招财人缘双沙利卡金舌鸟（Sarika Lin Thong）挂饰。龙婆肯高僧享年111岁高龄（佛历2402–2513年），常年隐居山洞苦修头陀行，其督造之\'金舌人缘鸟\'与\'聚财鱼篓\'全泰闻名，被誉为商贾招财之神品。此对沙利卡鸟以灵木精工雕刻，通体布满师父亲手刻划之吉祥经咒，专供悬挂于商铺、店铺门面、收银台或办公室内，能聚拢八方宾客、催动商业谈判与人际亲和力，使顾客络绎不绝、财源广进。丹暹佛牌（Dan Siam Amulets）终身保真保证。',
    published: true,
  }
];

async function main() {
  for (const item of updates) {
    const { id, ...data } = item;
    const { error } = await sb.from('products').update(data).eq('id', id);
    if (error) {
      console.error(`Failed to update ${id}:`, error);
    } else {
      console.log(`Successfully updated & published product ID: ${id} (${item.slug})`);
    }
  }

  // Verification
  const { data: verified, error: vErr } = await sb
    .from('products')
    .select('id, name, name_th, name_zh, slug, published, category, price')
    .in('id', updates.map(u => u.id));
  if (vErr) {
    console.error('Verification failed:', vErr);
  } else {
    console.log('\n--- VERIFICATION RESULT ---');
    console.table(verified);
  }
}

main();
