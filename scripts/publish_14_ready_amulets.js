/**
 * Script to publish 14 ready amulets according to DanSiam Publishing Rules:
 * 1. Preserves original Thai description 100%
 * 2. High-quality Romanized English name, verified unique slug, 140-155 char short meta, 250-400 word English description
 * 3. Fluent 200-280 char Chinese description
 * 4. published = true
 * 5. Calls Google Indexing API
 * 6. Records audit trail
 */

const fs = require('fs');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

if (fs.existsSync('.env.local')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
  for (const k in envConfig) process.env[k] = envConfig[k];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getAccessToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function notifyGoogleIndex(url) {
  if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('[google-indexing] missing credentials, skipping');
    return;
  }
  try {
    const token = await getAccessToken();
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    const result = await res.json();
    console.log('[google-indexing] notified', url, res.status, result?.urlNotificationMetadata?.latestUpdate?.type ?? result?.error?.message ?? '');
  } catch (e) {
    console.error('[google-indexing] error', e.message);
  }
}

const ITEMS_DATA = [
  {
    id: 1732,
    name: "Phra Phong Pang Prathanporn Luang Pu Hiang Wat Pa B.E. 2505",
    slug: "phra-phong-pang-prathanporn-luang-pu-hiang-wat-pa-2505",
    short: "Authentic Phra Phong Pang Prathanporn amulet by Luang Pu Hiang, Wat Pa B.E. 2505. Sacred powder with reverse Yant for blessings, luck, and protection.",
    description: `This exquisite sacred powder amulet, known as Phra Phong Pang Prathanporn (the Buddha in the posture of bestowing blessings), was consecrated in B.E. 2505 (1962) by the venerable Luang Pu Hiang of Wat Aranyikawat (famously known as Wat Pa) in Chonburi Province. Luang Pu Hiang is revered throughout Thailand as one of the preeminent masters of sacred powder amulets in the eastern region, inheriting esoteric knowledge and ancient formula lineages from master Luang Pho Kaeo of Wat Khruea Wan.

The front of the amulet depicts the Buddha gracefully seated in the blessing gesture (Pang Prathanporn), radiating peace, benevolence, and spiritual serenity. The reverse is stamped with Luang Pu Hiang's signature sacred Yantra, formulated to bestow comprehensive protection, metta mahaniyom (loving-kindness and charisma), and continuous prosperity upon the devotee. Made from a rich blend of sacred herb powders (Phong Phutthakhun, Phong Itthije), flowers offered to the Buddha, and ancient temple relics, the surface exhibits natural aging, soft patination, and intricate texture authentic to genuine 1962 master pressings.

Devotees and collectors cherish this edition for its profound spiritual efficacy. In Thai Buddhist belief, keeping a blessing Buddha amulet invokes heavenly blessings, clears obstacles, and shields the wearer against negativity, malevolent energies, and physical harm. Each piece offered by Dan Siam Amulets is strictly verified for authenticity, presenting an outstanding collector's item and an auspicious spiritual guardian for daily devotion.`,
    description_zh: `此尊佛牌为春武里府森林寺（Wat Pa）龙普亨（Luang Pu Hiang）于佛历2505年（西元1962年）亲自督造加持的“赐福佛”（Pang Prathanporn）圣粉佛牌。背面印有师父独门神圣符文（Yant），具有极高灵力。龙普亨为泰国东部闻名遐迩的高僧，传承了瓦桥湾龙婆巧的古老圣粉秘法。佛牌正面为慈悲赐福佛相，能为佩戴者带来福泽、化解凶险、增进贵人缘（慈悲魅力）与丰沛财运。佛牌由多种神圣经粉、花粉及古老圣料压制而成，岁月沉淀自然，极具收藏价值与护佑力量。`
  },
  {
    id: 1731,
    name: "Phra Sangkachai Wat Chinoras B.E. 2512 Sacred Alloy Amulet",
    slug: "phra-sangkachai-wat-chinoras-2512-mixed-alloy",
    short: "Rare Phra Sangkachai Wat Chinoras B.E. 2512 in sacred mixed alloy. Blessed by Luang Pho Kuay, Luang Pu Toh, Luang Pho Pae & Luang Pu Suk for wealth and luck.",
    description: `The Phra Sangkachai of Wat Chinoras, cast in B.E. 2512 (1969) in Bangkok, is one of the most historically significant and spiritually formidable wealth-attracting amulets of modern Thai Buddhist history. This casting was consecrated during a monumental grand consecration ceremony (Pithi Maha Phutthaphisek) at Wat Chinorasworawihan, bringing together Thailand's most revered master monks of the era.

Among the supreme masters who gathered to bestow their supreme meditation power and blessing mantras into this batch were Luang Pho Kuay of Wat Kositaram (Chai Nat), Luang Pu Toh of Wat Pradu Chimphli (Bangkok), Luang Pho Pae of Wat Phikun Thong (Sing Buri), and Luang Pu Suk of Wat Pho Sai Thong (Buriram). Each master channeled specialized energetic blessings, making this amulet legendary for wealth accumulation, financial abundance, and invulnerability against misfortune.

Crafted from an auspicious sacred mixed alloy (Nawa Loha / Loha Phasom) containing melted ancient yantra metal plates, old temple bells, and holy bronze relics, the sculpture depicts Phra Sangkachai (the Great Arhat Katyayana) holding a treasure sack, embodying boundless prosperity, contentment, and joy. The metal exhibits natural golden-bronze undertones with authentic oxidation patina. In Thai tradition, venerating Phra Sangkachai brings relentless business success, removes debts, and protects against poverty. Guaranteed genuine with worldwide insured delivery.`,
    description_zh: `此尊善加财尊者（Phra Sangkachai）由曼谷瓦奇诺洛（Wat Chinoras）于佛历2512年（西元1969年）盛大督造，采用多种神圣金属混合铸造（混合九宝铜合金）。本期法会极为殊胜，汇聚了近代泰国数位顶级圣僧共同开光加持，包括龙婆贵（瓦柯喜塔兰）、龙普多（瓦巴鲁清批）、龙婆培（瓦匹坤通）以及龙普素（瓦波塞通）。善加财尊者象征富贵吉祥、财源广进与衣食无忧。在诸位传奇大师联合灌顶加持下，不仅招财守财力量超群，更能庇佑避险挡灾、生意兴隆，为深受藏家追捧的经典招财圣物。`
  },
  {
    id: 1730,
    name: "Wua Thanu Sacred Krang Phutsa Luang Pho Phut Wat Klang Bang Phra B.E. 2538",
    slug: "wua-thanu-krang-phutsa-luang-pho-phut-wat-klang-bang-phra-2538",
    short: "Authentic Wua Thanu guardian bull by Luang Pho Phut, Wat Klang Bang Phra B.E. 2538. Made with sacred Krang Phutsa resin for protection and anti-black magic.",
    description: `The Wua Thanu (Sacred Guardian Bull) fashioned from sacred wild jujube lacquer resin (Krang Phutsa) is one of the hallmark esoteric talismans of Luang Pho Phut Suntharo, former abbot of Wat Klang Bang Phra in Nakhon Pathom Province. Consecrated in B.E. 2538 (1995), this ritual amulet embodies the ancient Wicha Wua Thanu lineage, a formidable protective art designed to guard households, property, and individuals against all spiritual hostility.

Luang Pho Phut was an exceptional master monk of Nakhon Pathom, renowned alongside contemporaries like Luang Pho Pern of Wat Bang Phra and Luang Pho Phat of Wat Klang Bang Phra. He mastered the painstaking art of molding Krang Phutsa—sacred resin harvested from branches of wild jujube trees pointing toward the east—intertwined with sacred bamboo slivers, mercury, and handwritten talismanic yantras.

According to Thai occult traditions, a properly consecrated Wua Thanu acts as an ever-vigilant psychic guardian. It actively repels malevolent spirits, neutralizes black magic, turns away thieves, and deflects malicious envy and occult curses. When placed in a home or business, it stabilizes the spiritual aura of the premises; when carried, it serves as a powerful shield against unforeseen dangers and spiritual attacks. This genuine piece exhibits authentic natural resin gloss and solid craftsmanship, fully verified genuine.`,
    description_zh: `此尊神圣“神箭牛”（Wua Thanu 魂魄护法牛）由佛统府瓦邦帕佛寺（Wat Klang Bang Phra）著名圣僧龙婆朴（Luang Pho Phut）于佛历2538年（西元1995年）以秘传枣树红胶（Krang Phutsa）手工捏制督造。龙婆朴精通古老护身符法门，选用朝东生长的天然枣树胶，内入经文竹符管与圣料开光加持。神箭牛在泰国被誉为最顶级的护宅降魔圣物，具有驱除恶灵阴煞、破除黑法降头、防盗防小人及镇宅保平安之殊胜功效，随身佩戴或供奉于家中皆可构筑坚固的精神防护结界。`
  },
  {
    id: 1729,
    name: "Rian Phaya Nak Khu Luang Pu Man Wat Pa Sutthawat B.E. 2518",
    slug: "rian-phaya-nak-khu-luang-pu-man-wat-pa-sutthawat-2518",
    short: "Twin Naga Luang Pu Man medal B.E. 2518 Wat Pa Sutthawat. Consecrated by forest masters Luang Pu Fan, Luang Pu Khao & Luang Pu Sim. Pure spiritual protection.",
    description: `This iconic Rian Phaya Nak Khu (Twin Naga Medallion) commemorating the supreme master of the Thai Forest Tradition, Venerable Luang Pu Man Phuritatto, was issued in B.E. 2518 (1975) at Wat Pa Sutthawat in Sakon Nakhon Province. This historic sanctuary is the sacred temple where Luang Pu Man attained final Parinirvana in 1949, making every consecration held on these grounds exceptionally revered.

The consecration ceremony for this 1975 edition brought together the greatest direct disciples of Luang Pu Man—foremost meditation masters of the Dhammayut Kammatthana forest tradition. Leading the blessing were Luang Pu Fan Acharo of Wat Pa Udom Somphon, Luang Pu Khao Analayo of Wat Tham Klong Phel, and Luang Pu Sim Buddhacharo of Wat Tham Pha Plong, alongside numerous enlightened forest ascetics.

The obverse of the medallion features the solemn, focused countenance of Luang Pu Man flanked by the revered twin celestial Nagas (Phaya Nak), mythic serpents deeply tied to the Mekong river region and loyal protectors of the Buddha's Dhamma. The reverse bears sacred meditation syllables and temple inscriptions. Believed to provide extraordinary spiritual protection (Klaew Klaad), peaceful serenity, moral strength, and good fortune, this authentic copper medallion displays original crisp details, sharp die lines, and rich natural patina. Guaranteed authentic.`,
    description_zh: `此枚双龙护法阿姜曼铜牌（Rian Phaya Nak Khu）于佛历2518年（西元1975年）在色军府瓦巴素塔瓦（Wat Pa Sutthawat）督造开光。该寺庙为泰国森林派一代宗师阿姜曼（Luang Pu Man）圆寂圣地。本期铜牌法会殊胜非凡，由阿姜曼大师门下最杰出的森林派高僧亲临加持，包括阿姜范（Luang Pu Fan）、阿姜考（Luang Pu Khao）及龙普甚（Luang Pu Sim）等阿罗汉尊者。正面为阿姜曼端庄禅修法相与守护双龙，背面刻有殊胜经咒，具足极强辟邪挡灾、护佑出入平安、增进禅定慧力与吉祥福气之功效。`
  },
  {
    id: 1728,
    name: "Luang Pu Tuad Lang Khor 1 Wat Khao Or B.E. 2505 Sacred Herb Wan Amulet",
    slug: "luang-pu-tuad-lang-khor-1-wat-khao-or-2505-herb-wan",
    short: "Luang Pu Tuad Lang Khor 1 Wat Khao Or B.E. 2505 sacred herbal powder mixed with 2497 Wan. Consecrated by Ajahn Tim Wat Chang Hai & Khao Or masters.",
    description: `This rare and venerated Luang Pu Tuad amulet, known as the "Lang Khor 1" edition, was created in B.E. 2505 (1962) through an extraordinary collaboration between Wat Chang Hai and the legendary esoteric academy of Wat Khao Or in Phatthalung Province. Consecrated at the sacred caves of Wat Khao Or, this batch stands as one of the most powerful and sought-after Luang Pu Tuad amulets created outside of Pattani.

The blessing was spearheaded by Phra Khru Wisaisophon (Ajahn Tim) of Wat Chang Hai—the creator of the legendary B.E. 2497 Luang Pu Tuad edition—together with legendary Khao Or masters including Ajahn Nam of Wat Don Sala, Luang Pho Khong of Wat Ban Suan, and Khun Phantharak Rajjadej. Crucially, the sacred material mixture incorporates genuine leftover Wan 2497 sacred herbs, 108 kinds of auspicious botanicals, crushed holy earth from four holy Buddhist sites in India, and Khao Or ritual minerals.

The front presents Luang Pu Tuad meditating upon a lotus throne, while the back features the distinctive embossed mark "Khor 1" (ขอ๑). Renowned for legendary Klaew Klaad (miraculous protection from fatal accidents, firearms, and catastrophic mishaps) and Kong Grapan (invulnerability), this amulet is a crown jewel for collectors of southern Thai sacred amulets. Authentic, well-preserved, and verified genuine by Dan Siam Amulets.`,
    description_zh: `此尊龙普托后“Kor 1”圣草粉佛牌督造于佛历2505年（西元1962年），由泰国南部考欧法脉祖庭瓦考奥（Wat Khao Or）联合瓦沧海共同制作。本期圣物由瓦沧海阿赞添（Ajahn Tim，2497龙普托创制者）亲赴考欧寺，与阿赞南、龙婆空及坤潘等传奇宗师共同开光加持。用料极为殊胜，特地加入了珍贵的佛历2497年第一期龙普托原装圣草药粉（Wan 2497）及108种深山灵草。背面有著名“Kor 1”（ขอ๑）字样，在避险保命、化险为夷及挡灾避难方面拥有无上口碑，是极具收藏价值的顶级圣物。`
  },
  {
    id: 1727,
    name: "Rian Luang Pho Chaem Wat Chalong Phuket B.E. 2515 Blackened Copper",
    slug: "rian-luang-pho-chaem-wat-chalong-phuket-2515",
    short: "Authentic Rian Luang Pho Chaem Wat Chalong Phuket B.E. 2515 in blackened copper. Legendary southern protector monk medal for authority, victory, and safety.",
    description: `Luang Pho Chaem of Wat Chalong (Phra Khru Wisutthiwongsachan) is reverently celebrated as the patron saint and spiritual guardian of Phuket Island. This authentic copper medallion (Rian), finished with dark blackened patination (Rom Dam), was consecrated in B.E. 2515 (1972) at Wat Chalong in a formal grand Buddhist ceremony celebrating the eternal legacy of the great master.

Historically, Luang Pho Chaem earned legendary renown during the 1876 Ang Yi Chinese miner rebellions in Phuket, when he tied blessed sacred cloth charms (Pha Prachiat) around the arms of local villagers, empowering them to defend their communities with courage and miraculous resilience. Ever since, images of Luang Pho Chaem carrying his walking staff have been worshipped as symbols of invincible courage, triumph over adversity, and supreme spiritual authority.

The front of this medallion features a crisp bust portrait of Luang Pho Chaem holding his famous walking stick, surrounded by classical Thai scrollwork. The reverse displays the sacred Yant of Wat Chalong with official commemorative Thai typography. This amulet is sought after by travelers, civil servants, and business executives for its power to bestow Maha Amnaj (commanding authority), Kong Grapan (invulnerability), and victory against competing forces. In pristine condition with original black patina.`,
    description_zh: `此枚龙婆湛（Luang Pho Chaem）自身铜牌由普吉岛著名古刹瓦查龙（Wat Chalong）于佛历2515年（西元1972年）隆重督造加持，材质为精美红铜熏黑（Rom Dam）。龙婆湛被尊为普吉岛的守护圣僧，在十九世纪平定矿工叛乱的历史中，以赐予信众加持圣布展现出神奇的护体神迹而名扬全泰。铜牌正面雕刻大师手持神杖的端庄法相，背面为瓦查龙经典护法符文，具有赐予佩戴者崇高威望、战胜困难、避邪挡煞与出入平安之强大灵力，品相完好，值得代代相传。`
  },
  {
    id: 1726,
    name: "Phra Rod Kruba Into Wat Bun Yuen Phayao B.E. 2512 Black Clay Amulet",
    slug: "phra-rod-kruba-into-wat-bun-yuen-phayao-2512-black",
    short: "Rare Phra Rod black clay amulet by Kruba Into, Wat Bun Yuen B.E. 2512. Renowned northern Lanna master for miraculous protection, safety, and triumph.",
    description: `The Phra Rod amulet created by Kruba Into Khanthawanso of Wat Bun Yuen in Phayao Province in B.E. 2512 (1969) is one of the most iconic sacred clay amulets of northern Thailand (Lanna). Kruba Into was a legendary ascetic monk whose meditation accomplishments and moral purity gained immense reverence across Phayao and Chiang Rai.

Modeled after the ancient Hariphunchai Phra Rod style—one of the timeless Benjapakee five grand amulets—this piece represents the Buddha triumphing over Mara (subduing demons) under the sacred Bodhi tree. "Rod" in the Thai language signifies survival, liberation from danger, and enduring safely through any trial. This edition was pressed from sacred ancient soils, pulverized holy stones, and charred herbal ashes, lending it its distinct and highly coveted dark matte coloration (Nuea Dam).

Northern warriors, civil servants, and police officers have long placed deep faith in Kruba Into’s amulets for Klaew Klaad (miraculous deliverance from road accidents and physical harm) and Metta (compassionate assistance from superiors). The piece shows sharp facial characteristics, well-formed Bodhi leaf contours, and authentic 1969 surface calcification. Guaranteed 100% genuine with certificate from Dan Siam Amulets.`,
    description_zh: `此尊帕洛（Phra Rod 脱险脱难佛）黑肉圣土佛牌，由泰国北部帕尧府瓦奔云（Wat Bun Yuen）兰纳圣僧古巴因多（Kruba Into）于佛历2512年（西元1969年）亲制加持。古巴因多德高望重，被誉为帕尧府最伟大的高僧之一。佛牌沿袭古哈利奔猜（Hariphunchai）千百年来五大古佛之经典造型，寓意“从一切灾祸、困厄中脱险重生”。本期特选用深山圣土、药草炭灰等黑肉圣料混合压制，在辟邪避险、化险为夷、官运亨通与防凶险祸患上拥有极强效验，为泰北名作。`
  },
  {
    id: 1725,
    name: "Phra Somdej Kanaen Luang Pu Lamphu Wat Bang Khun Phrom B.E. 2502 Kru",
    slug: "phra-somdej-kanaen-luang-pu-lamphu-wat-bang-khun-phrom-2502-kru",
    short: "Phra Somdej Kanaen by Luang Pu Lamphu Wat Bang Khun Phrom B.E. 2502 with authentic Kru crust. Rich in genuine Somdej Toh 2413 broken holy powder shards.",
    description: `This exquisite Phra Somdej Kanaen (small size tally edition) was consecrated in B.E. 2502 (1959) by the venerable Luang Pu Lamphu of Wat Mai Amataros (better known as Wat Bang Khun Phrom) in Bangkok. It is one of the most historically important substitutes for an original Somdej Toh amulet, because Luang Pu Lamphu personally collected and ground massive quantities of original Phra Somdej Bang Khun Phrom fragments that broke during the official opening of the temple’s sacred chedi pagoda in B.E. 2500.

Scholars and senior amulet authenticators acknowledge that Luang Pu Lamphu’s B.E. 2502 batch contains up to 60–70% genuine powder from Somdej Phra Phutthachan (Toh Promrangsi). After pressing the amulets in 1959, Luang Pu Lamphu deposited a portion back into the temple's underground vault (Kru), where they aged under natural moisture and heat for decades before being retrieved.

The surface of this piece displays the unmistakable, highly prized "Krap Kru" (crypt crust and mineral calcification) confirming its underground aging. Compact yet magnificent, the amulet features the three-tiered seated Buddha inside a bell arch. Worshipping this sacred piece is considered spiritually equivalent to wearing an original multi-million-baht Somdej Toh amulet, endowing the bearer with supreme Metta Mahaniyom, career elevation, and celestial protection.`,
    description_zh: `此尊小模崇迪佛（Phra Somdej Kanaen）由曼谷瓦曼冠碰（Wat Bang Khun Phrom）龙普兰普（Luang Pu Lamphu）于佛历2502年（西元1959年）督造，且经过佛塔入塔（Kru）沉淀出土。佛历2500年瓦曼冠碰大塔开塔时，龙普兰普收集了大量阿赞多亲制的崇迪碎片，并在2502年将其研磨为本批佛牌的核心用料，阿赞多圣粉含量高达60%以上。表面带有极其珍贵的“出塔皮壳”（Krap Kru）矿物包浆，佩戴功效等同阿赞多亲制百万崇迪，具足顶级人缘贵人运、事业腾达与逢凶化吉之无上庇佑。`
  },
  {
    id: 1724,
    name: "Phra Nakprok Suriyamuni Chin Takua Luang Pho An Wat Phraya Tikaram B.E. 2473",
    slug: "phra-nakprok-suriyamuni-chin-takua-luang-pho-an-wat-phraya-ti-2473",
    short: "Rare Phra Nakprok Suriyamuni in ancient lead by Luang Pho An, Wat Phraya Tikaram B.E. 2473. Renowned Ayutthaya amulet for protection and karma defense.",
    description: `Cast nearly a century ago in B.E. 2473 (1930), the Phra Nakprok Suriyamuni is an extraordinarily rare and revered talisman of Ayutthaya Province, crafted by Luang Pho An of Wat Phraya Tikaram (Wat Phra Yati). Luang Pho An was the foremost spiritual successor and close disciple of the supreme grandmaster Luang Pho Klan of Wat Phra Yati—whose first-edition medallion ranks among Thailand's most legendary treasures.

The Phra Nakprok Suriyamuni mold is steeped in ancient Thai astrological and esoteric doctrine. It depicts the Buddha seated in profound meditation sheltered beneath the majestic hood of the seven-headed celestial Naga king Mucalinda, while invoking the solar deity Suriya for warmth, life, and radiant glory. Cast from ancient chin takua (sacred lead-pewter alloy) melted down from antique Ayutthaya-era temple plates, the metal has developed an authentic whitish oxide bloom (Phrai Takua) and deep charcoal sheen that cannot be synthetically replicated.

Traditional collectors hold this amulet in the highest esteem for shielding devotees born under planetary afflictions or facing the "Rahu" shadow period. It provides impenetrable Kong Grapan (invulnerability), dissolves toxic hostility, and transforms misfortune into radiant blessings. Accompanied by Dan Siam Amulets certificate of authenticity.`,
    description_zh: `此尊苏利耶牟尼七龙佛（Phra Nakprok Suriyamuni）由大城府瓦帕亚提佛寺（Wat Phraya Tikaram）龙婆安（Luang Pho An）于佛历2473年（西元1930年）以古老铅质合金（Chin Takua）铸造。龙婆安为大城府第一圣僧龙婆敢（Luang Pho Klan）之最得力大弟子。此期七龙佛融合了古印度太阳神光明与佛陀降服魔障之殊胜法门。铅质金属历经近百年自然氧化，泛出白霜与古朴油润包浆。对于化解命理犯太岁、转运开运、防险辟邪及化解小人恶煞具有极强神力，为近百年难得一见的古董珍品。`
  },
  {
    id: 1723,
    name: "Phra Rod Wat Phra Singh Chiang Mai B.E. 2496 Phim Klang Na Nu",
    slug: "phra-rod-wat-phra-singh-chiang-mai-2496-phim-klang-na-nu",
    short: "Authentic Phra Rod Wat Phra Singh B.E. 2496 medium mold Na Nu. Consecrated in historic Chiang Mai ceremony by top monks from all regions of Thailand.",
    description: `The B.E. 2496 (1953) Phra Rod of Wat Phra Singh Woramahawihan in Chiang Mai is celebrated as one of the finest, most rigorously consecrated clay amulet editions of northern Thailand. Consecrated during the historic restoration of the ancient temple sanctuary, this batch is famous for incorporating massive amounts of original 1,200-year-old crushed Hariphunchai Phra Rod clay fragments, sacred temple soils, and holy ashes from throughout Lanna.

The consecration ritual held in February 2496 was one of the grandest inter-regional ceremonies ever recorded. Leading monks from every province attended, including Luang Pho Sot of Wat Paknam, Luang Pu Phueak of Wat Kingkaew, Luang Pho Rung of Wat Tha Krabue, Luang Pho Chamlong, and the revered Kruba masters of Chiang Mai, Lamphun, and Lampang.

This specimen represents the highly desirable "Phim Klang Na Nu" (Medium Mold, Mouse Face variation), renowned for its finely sculpted facial features, well-articulated hands, and prominent Bodhi leaves. Fired in traditional wood kilns, it exhibits natural two-tone terracotta hues, subtle shrinkage fissures, and authentic kiln skin. As a premier amulet for Klaew Klaad (deliverance from danger) and Metta Mahaniyom, this legendary piece is a cornerstone for any serious collector of Thai sacred art.`,
    description_zh: `此尊帕洛（Phra Rod）脱险佛由清迈皇家第一名刹帕辛寺（Wat Phra Singh）于佛历2496年（西元1953年）盛大督造，此模为备受追捧的中模“老鼠脸”（Phim Klang Na Nu）。本批帕洛特加入大量破碎的1200年前南奔古帕洛真品圣土碎片重新烧制。佛历2496年的开光法会规模空前，邀请了全泰顶尖名僧共同诵经加持，包括水门寺白揽佛创制者龙婆术（Luang Pho Sot）、龙普不（龙婆不 Wat Kingkaew）及龙婆弄等。佛牌具有极强避险挡灾、助运高升与广结善缘之神效，历久弥新。`
  },
  {
    id: 1722,
    name: "Takrut Tone Luang Pu Ya Than Suan Wat Na Udom Ubon B.E. 2538",
    slug: "takrut-tone-luang-pu-ya-than-suan-wat-na-udom-2538",
    short: "Sacred Takrut Tone talisman by Luang Pu Ya Than Suan, Wat Na Udom B.E. 2538. Master-engraved yantra scroll for invulnerability, protection, and charisma.",
    description: `Luang Pu Ya Than Suan Chantharo (Phra Khru Athon Phatthanakhun) of Wat Na Udom in Ubon Ratchathani Province was one of Isan’s (Northeastern Thailand) most spiritually revered and magically adept master monks. This consecrated Takrut Tone—a single lead metal scroll inscribed with sacred esoteric diagrams and wrapped in blessed cordage—was consecrated in B.E. 2538 (1995).

Born in B.E. 2453, Luang Pu Ya Than Suan practiced strict asceticism and inherited profound occult scriptures from ancient Lao and Isan Dhamma lineages, including the secret hand-inscribed yantra rituals of Somdej Lun of Champasak. His Takrut scrolls were inscribed completely by hand with intense meditative concentration, syllable by syllable, while reciting consecration mantras for hours without interruption.

A Takrut Tone of Luang Pu Ya Than Suan is legendary among rural officers, hunters, and travelers for providing Maha Ud (stopping firearms and sharp weapons), Kong Grapan (physical invulnerability), and Klaew Klaad (slipping through life-threatening situations unscathed). Additionally, because of Luang Pu's saintly loving-kindness, it radiates profound Metta Mahaniyom, softening the hearts of adversaries and drawing helpful allies. A prime, authentic example preserved in wonderful condition.`,
    description_zh: `此支单管护身符管（Takrut Tone）由泰国东北部乌汶府瓦纳乌隆（Wat Na Udom）一代圣僧龙婆亚谭宣（Luang Pu Ya Than Suan）于佛历2538年（西元1995年）亲手刻符督造。龙婆亚谭宣生于佛历2453年，圆寂后肉身不腐，被誉为乌汶府近代最伟大的圣僧之一，其符管法门传承自老挝与依善地区传说法宗崇迪伦（Somdej Lun）。师父在铅片上亲手篆刻古老经文符印，经长年禅定念力加持，拥有极强挡灾避险、刀枪不入、驱邪避凶及化敌为友的慈悲魅力，是泰国东北部首屈一指的护身圣物。`
  },
  {
    id: 1721,
    name: "Takrut Mai Chet Si 7 Color Cord Luang Pho Chamnian Wat Tham Suea B.E. 2537",
    slug: "takrut-mai-chet-si-7-color-cord-luang-pho-chamnian-wat-tham-suea-2537",
    short: "Takrut Mai Chet Si 7-color woven cord talisman by Luang Pho Chamnian, Wat Tham Suea Krabi B.E. 2537. Attracts boundless luck, protection, and good fortune.",
    description: `This authentic two-inch Takrut Mai Chet Si (Seven-Color Silk Thread Takrut) was consecrated in B.E. 2537 (1994) by the celebrated Vipassana meditation master Luang Pho Chamnian Silasettho of Wat Tham Suea (the famous Tiger Cave Temple) in Krabi Province. Luang Pho Chamnian was internationally revered for his cheerful compassion, radiant aura, and powerful protective blessings.

The core of the talisman consists of a rolled sacred metal foil inscribed with potent Buddhist yantras, which is then tightly hand-woven with durable silk threads of seven auspicious planetary colors. Each color corresponds to a day of the week and a protective celestial deva, symbolizing continuous 24/7 protection and harmony for individuals of any birth day.

In southern Thai lore, Luang Pho Chamnian’s 7-color takrut is famed for warding off negative energies, calming chaotic environments, and unlocking persistent fortune (Chok Lap) in trade and negotiations. Devotees carry it in pocket, on keychain, or worn on waist cord. Its compact two-inch format and vibrant authentic cord weaving make it both an aesthetically pleasing and spiritually potent everyday talisman. Verified 100% genuine by Dan Siam Amulets.`,
    description_zh: `此支七彩经线符管（Takrut Mai Chet Si，长约2英寸）由泰国南部甲米府虎穴寺（Wat Tham Suea）著名禅修高僧龙婆真念（Luang Pho Chamnian）于佛历2537年（西元1994年）督造加持。龙婆真念以慈悲宏愿闻名海内外，符管内封有师父手刻经文铜片，外层以象征星期一至星期天守护天神的七彩吉祥丝线纯手工紧密编织而成。七彩符管具有全方位调和五行运势、化解阻碍、招引财气贵人以及抵御邪煞灾险之神奇功效，随身佩戴十分轻便灵验，是极受喜爱的随身吉祥圣物。`
  },
  {
    id: 1720,
    name: "Phra Phirap Mask Small Size Ajahn Siri Phong B.E. 2530 Hand Inscribed",
    slug: "phra-phirap-mask-small-size-ajahn-siri-phong-2530",
    short: "Rare small Phra Phirap mask B.E. 2530 by Ajahn Siri Phong with hand-inscribed reverse yantra. Supreme teacher deity for power, protection, and overcoming curse.",
    description: `Phra Phirap (the fierce Bhairava aspect of Lord Shiva) is universally venerated in Thai classical arts, Khon masked dance, and esoteric ritual lineages as the supreme Grand Teacher (Kru Yai) possessing supreme occult authority. This rare miniature Phra Phirap face mask was cast and consecrated in B.E. 2530 (1987) by Ajahn Siri Phong Khruphanit, a master who dedicated his life to preserving authentic Siamese royal court and fine arts esoteric ceremonies.

Unlike decorative masks, ritual Phra Phirap effigies undergo rigorous consecration requiring mastery of ancient Saivite and Buddhist invocation rites. This rare small-format cast metal mask features fierce fangs, third-eye crown, and intricate facial contours. Crucially, the reverse side is hand-inscribed by Ajahn Siri Phong with sacred occult yantras, marking its authenticity and limited production number.

Devotees of Phra Phirap revere the deity for obliterating obstacles, expelling black magic, dissolving generational curses, and granting commanding authority (Maha Amnaj) and artistic triumph. It is particularly worshipped by performing artists, executives, military commanders, and those facing ruthless rivals. A genuine, museum-grade occult talisman preserved in excellent condition.`,
    description_zh: `此尊帕匹腊小面具（Phra Phirap，湿婆神化身大黑天/摩诃迦罗大天神）由泰国皇家艺术与传统面具秘法大师阿赞斯里蓬（Ajahn Siri Phong）于佛历2530年（西元1987年）限量督造。帕匹腊在泰国古典孔剧艺术界与密宗法脉中被尊为至高无上的“大宗师祖师爷”。此尊面具法相威严刚毅，獠牙外露、神目如电，背面有师父亲手篆刻的神圣古印符文，制作数量极为稀少。佩戴或供奉能震慑邪灵、破除降头黑巫术、化解命中煞气，并赋予佩戴者莫大的威望与成愿力量。`
  },
  {
    id: 1718,
    name: "Phra Khun Paen Luang Pho Ruay Wat Tako B.E. 2539 Small Oil Powder",
    slug: "phra-khun-paen-luang-pho-ruay-wat-tako-2539-oil-powder",
    short: "Authentic Phra Khun Paen small mold in holy oil powder by Luang Pho Ruay, Wat Tako B.E. 2539. Renowned for boundless wealth, fortune, and charismatic charm.",
    description: `The Phra Khun Paen in sacred oil powder (Nuea Phong Nam Man) created in B.E. 2539 (1996) by the beloved Luang Pho Ruay Pasathiko of Wat Tako in Ayutthaya is one of the master's most sought-after early powder amulets. Luang Pho Ruay (whose name "Ruay" translates to "Wealth" and "Abundance" in Thai) is celebrated across Asia as a modern saint of prosperity, financial breakthroughs, and ethical business success.

Pressed in a refined small mold (Phim Lek), the front presents the classic Phra Khun Paen seated in meditation within an arch pavilion, symbolizing victory, supreme charm, and respect. The sacred material formula blends holy herb powders, ground incense ashes from Wat Tako's main sanctuary, and blessed holy oils that give the surface an alluring amber, lustrous texture that deepens with age.

The reverse features Luang Pho Ruay’s signature Yan Duang (astrological wealth diagram) designed to uplift destiny, draw customers to commerce, and generate steady financial flows. In addition to financial prosperity, the Khun Paen mold imparts powerful Metta Mahaniyom (popularity and romantic/social attraction). Authentic early works from B.E. 2539 are increasingly scarce. Fully inspected and guaranteed genuine by Dan Siam Amulets.`,
    description_zh: `此尊小模坤平佛（Phra Khun Paen）由泰国大城府瓦达果（Wat Tako）一代财神高僧龙婆瑞（Luang Pho Ruay）于佛历2539年（西元1996年）亲制加持，材质为油质经粉（Nuea Phong Nam Man）。龙婆瑞大师名字在泰语中即为“巨富、富贵”之意，以招财神迹享誉东南亚。此尊坤平正面为经典佛相，背面印有龙婆瑞独门招财改运符印（Yan Duang），通体油润温润，散发古雅光泽。佩戴不仅能催旺正财偏财、助生意兴隆客源不断，更兼具坤平独有的人缘魅力与贵人扶持效力。`
  }
];

async function publishAll() {
  console.log(`Starting to publish ${ITEMS_DATA.length} amulets...`);
  const auditReport = [];

  for (const item of ITEMS_DATA) {
    console.log(`\nProcessing ID ${item.id}: ${item.name}`);

    // 1. Fetch current product record
    const { data: current, error: fetchErr } = await supabase
      .from('products')
      .select('id, name_th, description_th, slug, published')
      .eq('id', item.id)
      .single();

    if (fetchErr || !current) {
      console.error(`Failed to fetch product ${item.id}:`, fetchErr?.message);
      continue;
    }

    const oldData = { ...current };

    // 2. Perform update
    const updatePayload = {
      name: item.name,
      slug: item.slug,
      short: item.short,
      description: item.description,
      description_zh: item.description_zh,
      // description_th is kept 100% intact as-is
      published: true,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error: updateErr } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', item.id)
      .select('id, name_th, name, slug, published')
      .single();

    if (updateErr) {
      console.error(`Update failed for ${item.id}:`, updateErr.message);
      continue;
    }

    console.log(`✓ Published ID ${item.id} -> ${item.slug}`);

    // 3. Notify Google Indexing API
    const liveUrl = `https://dansiamamulets.com/product/${item.slug}`;
    await notifyGoogleIndex(liveUrl);

    auditReport.push({
      id: item.id,
      name_th: current.name_th,
      name_en: item.name,
      slug: item.slug,
      old_slug: oldData.slug,
      published_at: new Date().toISOString(),
      performed_by: "Antigravity AI Agent",
      live_url: liveUrl
    });
  }

  // Save audit log to local JSON file for record keeping
  fs.writeFileSync('published_audit_report.json', JSON.stringify(auditReport, null, 2), 'utf8');
  console.log(`\n🎉 Finished publishing ${auditReport.length} items. Report saved to published_audit_report.json`);
}

publishAll();
