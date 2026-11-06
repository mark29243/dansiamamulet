const fs = require('fs');

// Read extracted Chinese captions
const zhCaptions = JSON.parse(fs.readFileSync('scripts/extracted_chinese_captions.json', 'utf8'));

// 18 Amulets Full Specifications with Verified English Captions
const items = [
  {
    id: 'sarika',
    num: 1,
    titleTh: '1. สาริกาโมบายคู่ หลวงพ่อเคน วัดถ้ำเขาอีโต้ ปราจีนบุรี',
    subTh: '人缘金舌鸟双鸟挂饰 · เมตตามหานิยม ค้าขาย แขวนหน้าร้าน / Sacred Hand-Carved Sarika Birds',
    url: 'https://dansiamamulets.com/product/sarika-mobile-pair-carved-wood-luang-pho-ken-wat-tham-khao-ito-prachin-buri',
    imgs: [
      { src: '/amulets/talisman_sarika_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/talisman_sarika_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/talisman_sarika_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['sarika'],
    captionEn: `⭐ Masterpiece of Siamese Metta Wicha
Luang Pho Ken - Sacred Hand-Carved Holy Wood Sarika Birds (Mobile Pair)
Wat Tham Khao Ito, Prachin Buri | Heritage Golden Tongue Birds

💎 Consecration Heritage & Sacred Provenance:
Luang Pho Ken was revered throughout Southeast Asia as the undisputed centenarian master of the ancient Sarika (Golden-Tongue Bird) wicha. Residing in sacred mountain caves, he hand-carved these sacred birds from consecrated auspicious wood and continuously empowered them through deep meditative absorptions until imbued with supreme charismatic vibrations.

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme Charisma & Metta Maha Niyom: Instantly softens hearts, inspires affection, and attracts influential benefactors.
• Commercial Magnetism & Customer Attraction: Specially hung at shopfronts, offices, or cash counters to draw continuous foot traffic and high-value orders.
• Unmatched Persuasion & Deal-Closing Power: Empowers negotiations, business presentations, sales pitches, and corporate consensus.
• Harmonious Relationships: The paired birds represent unbreakable mutual affection and protection against domestic discord.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Chanting prayer & offering guide)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'namtao',
    num: 2,
    titleTh: '2. น้ำเต้าดูดทรัพย์ หลวงปู่ทิม วัดพระขาว ปี 2552',
    subTh: '大吉祥吸财聚财福禄宝葫芦 · เงินทองเข้าไม่รั่วไหล / Sacred Wealth-Attracting Gourd B.E. 2552',
    url: 'https://dansiamamulets.com/product/namtao-dood-sup-maha-lap-luang-pu-tim-wat-phra-khao-2552',
    imgs: [
      { src: '/amulets/talisman_namtao_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/talisman_namtao_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/talisman_namtao_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['namtao'],
    captionEn: `⭐ Consecrated Wealth-Attracting Talisman
Luang Pu Tim - Sacred Wealth Gourd (Namtao Dood Sup Maha Lap)
Wat Phra Khao, Ayutthaya | B.E. 2552 (2009)

💎 Sacred Consecration & Monastery Provenance:
Luang Pu Tim Attasanto was revered as the beloved "Saint of Loving-Kindness of Ayutthaya". This famous wealth-sucking gourd was cast and consecrated during the auspicious Maha Lap blessing ceremony in B.E. 2552. Designed to act as an energetic wealth vessel, it magnetically gathers monetary fortune while sealing leaks in personal finances.

✨ Core Virtues & Blessings (พุทธคุณ):
• Multi-Directional Wealth Inflow: Magnetizes unexpected windfalls, business profits, and steady cashflow from all cardinal directions.
• Financial Leak Prevention: Shields personal and business finances from sudden unexpected losses or wasteful outflows.
• Health, Vitality & Auspicious Qi: In Buddhist and esoteric traditions, the gourd represents robust vitality, longevity, and warding off misfortune.
• Business & Vehicle Guardian: Perfect for carrying on keychains, placing in retail shops, or hanging in vehicles for safe journeys and prosperous ventures.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Chanting prayer & activation instructions)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'khunphaen',
    num: 3,
    titleTh: '3. พระขุนแผน หลังกุมารสมบัติ หลวงพ่อพูล วัดไผ่ล้อม ปี 2548',
    subTh: '坤平佛背金童古曼宝藏 · เมตตามหาเสน่ห์ ค้าขาย กุมารทองเรียกลูกค้า / Phra Khun Phaen Lang Kuman Sombat B.E. 2548',
    url: 'https://dansiamamulets.com/product/phra-khun-phaen-lang-kuman-sombat-luang-pho-pool-wat-phai-lom-2548',
    imgs: [
      { src: '/amulets/batch2_khunphaen_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/batch2_khunphaen_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/batch2_khunphaen_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['khunphaen'],
    captionEn: `⭐ Final Consecrated Masterpiece of Wat Phai Lom
Luang Pho Pool - Phra Khun Phaen Lang Kuman Sombat (Na Cha Li Ti)
Wat Phai Lom, Nakhon Pathom | B.E. 2548 (2005)

💎 Historic Monastery Heritage:
Consecrated in B.E. 2548 by Luang Pho Pool, the legendary Abbot of Wat Phai Lom, in his final historic blessing ceremony before entering eternal meditation. The front portrays the majestic Phra Khun Phaen, while the reverse features "Kuman Sombat", the celebrated miraculous treasure-bringing golden spirit boy of Wat Phai Lom, ringed by the primordial wealth mantra "Na Cha Li Ti".

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme Charisma & Metta Maha Saneh: Amplifies personal allure, charm, and social standing in high-stakes environments.
• Kuman Sombat Spiritual Assistance: Alert intuition, business lead generation, customer attraction, and household protection.
• Speculative Wealth & Windfalls: Enhances sharp instincts for investments, risk mitigation, and unexpected opportunities.
• Protection & Negative Ward: Shields against jealous competitors, bad energies, and spiritual interference.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Offering Guide
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'takrut',
    num: 4,
    titleTh: '4. ตะกรุดสาริกาคู่บารมี เนื้อเงิน แช่น้ำมันสาริกา หลวงปู่คำบุ ปี 2553',
    subTh: '纯银双效金舌鸟符管配人缘金鸟油 · พูดจาเจรจาค้าขาย ปิดดีลธุรกิจ / Solid Silver Takrut Sarika Khu B.E. 2553',
    url: 'https://dansiamamulets.com/product/takrut-sarika-khu-baramee-silver-luang-pu-kambu-wat-kut-chomphu-2553',
    imgs: [
      { src: '/amulets/batch2_takrut_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/batch2_takrut_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/batch2_takrut_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['takrut'],
    captionEn: `⭐ Authentic Isan Silver Talisman
Luang Pu Kambu - Solid Silver Takrut Sarika Khu Baramee with Holy Sarika Oil
Wat Kut Chomphu, Ubon Ratchathani | B.E. 2553 (2010)

💎 Ancient Isan Wicha Consecration:
Consecrated in B.E. 2553 by the venerated master Luang Pu Kambu, celebrated keeper of the sacred Mekong river wicha. This rare talisman comprises paired solid silver scrolls inscribed with ancient male/female Sarika yant formulas, permanently encased in fragrant herbal Sarika oil charged through months of continuous chanting.

✨ Core Virtues & Blessings (พุทธคุณ):
• Golden-Tongued Speech (Salika Lin Thong): Words carry irresistible persuasion, authority, and warmth, turning tough negotiations into closed contracts.
• Magnetic Commerce & Wealth Draw: Attracts high-value business clients, beneficial joint ventures, and unexpected profitable deals.
• Patronage & Superior Support: Garnering natural favor from superiors, mentors, and corporate leadership.
• Spiritual Protection: Solid silver purity deflects negative speech, envy, and harmful intentions.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Chanting prayer & activation)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'lpthuat',
    num: 5,
    titleTh: '5. หลวงปู่ทวด หลวงตาพัน วัดใหม่อมตรส ปี 2502 (ผสมผงเก่าบางขุนพรหม)',
    subTh: '老瓦曼坤碰阿赞多老料龙婆托 · แคล้วคลาดปลอดภัยอันดับ 1 + ผงสมเด็จโต / Sacred Luang Pu Thuad Luang Ta Phan B.E. 2502',
    url: 'https://dansiamamulets.com/product/luang-pu-tuad-luang-ta-phan-wat-mai-amataros-2502-bang-khun-phrom',
    imgs: [
      { src: '/amulets/batch2_lpthuat_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/batch2_lpthuat_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/batch2_lpthuat_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['lpthuat'],
    captionEn: `⭐ Historic Consecration Infused with Authentic Somdej Toh Powders
Luang Ta Phan - Sacred Luang Pu Thuad (Bang Khun Phrom Crypt Powder)
Wat Mai Amataros (Wat Bang Khun Phrom), Bangkok | B.E. 2502 (1959)

💎 Provenance of the Century:
Following the historic 1957 (B.E. 2500) opening of the great Bang Khun Phrom pagoda, Luang Ta Phan gathered authentic broken fragments of original Phra Somdej blessed by Somdej Toh Promrangsi. In B.E. 2502, he hand-pressed this historic Luang Pu Thuad image using an exceptionally high density of these sacred 19th-century powders, energized in a grand multi-monk consecration.

✨ Core Virtues & Blessings (พุทธคุณ):
• Unsurpassed Life Protection: Luang Pu Thuad is universally venerated as Thailand's supreme savior from fatal vehicular accidents, violence, and life-threatening crises.
• Somdej Toh Sacred Powder Energy: Imbued with the 5 primordial holy powders, blessing the wearer with prestige, harmony, and unshakeable luck.
• Absolute Expulsion of Dark Energies: Purifies spiritual environments and deflects ill wishes, curses, and demonic forces.
• Transformation from Crisis to Triumph: Renowned for turning hopeless personal or financial situations into miraculous breakthroughs.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Luang Pu Thuad invocation)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'tiger',
    num: 6,
    titleTh: '6. พระสมเด็จ หลังเสือเผ่น หลวงพ่อทองอยู่ วัดใหม่หนองพะองค์ ปี 2519',
    subTh: '崇迪佛背猛虎跃腾印 · ราชาพระเครื่อง ผสาน มหาอำนาจข่มศัตรูคู่แข่ง / Phra Somdej Lang Suea Phern B.E. 2519',
    url: 'https://dansiamamulets.com/product/phra-somdej-lang-suea-phoen-luang-pho-thong-yu-wat-mai-nong-pha-ong-2519',
    imgs: [
      { src: '/amulets/batch2_tiger_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/batch2_tiger_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/batch2_tiger_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['tiger'],
    captionEn: `⭐ The King of Amulets Meets the Fierce Leaping Tiger
Luang Pho Thong Yu - Phra Somdej Lang Suea Phern (Leaping Tiger Reverse)
Wat Mai Nong Pha Ong, Samut Sakhon | B.E. 2519 (1976)

💎 Master Consecration & Noble Lineage:
Consecrated in B.E. 2519 by Luang Pho Thong Yu, close Dhamma friend of Somdej Phra Sangkharat (Phaen) of Wat Suthat. The obverse depicts the classical serene Phra Somdej, while the reverse is stamped with the commanding "Leaping Tiger" yant. Pressed from sacred mineral clays and ancient sutra powders.

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme King of Amulets Auspices: Bestows continuous elevation in social ranking, business prestige, and noble harmony.
• Maha Amnaj & Competitive Dominance: The leaping tiger projects formidable authority, subduing adversaries, jealous rivals, and corporate detractors.
• Financial Stability & Expansion: Anchors personal wealth while opening channels for commercial expansion.
• Shield Against Calamity: Repels weapon violence, road hazards, and aggressive psychic disturbances.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Offering Guide
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'paladkhik',
    num: 7,
    titleTh: '7. ปลัดขิก ไม้เขยตาย ติดตะกรุดไม้ หลวงปู่เมฆ วัดลำกระดาน',
    subTh: '神木辟邪招财巴拉吉 · ยอดเครื่องรางค้าขาย ดูดเงินดูดทอง กันคุณไสย / Sacred Palad Khik Luang Pu Mek',
    url: 'https://dansiamamulets.com/product/plad-khik-dead-wood-takrud-luang-pu-mek-wat-lam-kradan',
    imgs: [
      { src: '/amulets/batch2_paladkhik_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/batch2_paladkhik_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/batch2_paladkhik_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['paladkhik'],
    captionEn: `⭐ Legendary Trade & Metta Talisman of Bangkok
Luang Pu Mek - Sacred Hand-Carved Holy Wood Palad Khik with Embedded Takrut
Wat Lam Kradan, Bangkok | Authentic Animist Heritage

💎 Master Provenance & Sacred Wood:
Luang Pu Mek of Wat Lam Kradan was celebrated throughout Thailand for his miraculous Palad Khik talismans. Carved exclusively from naturally deceased standing sacred wood (Mai Khaye Tai) and embedded with a consecrated secret wooden takrut peg, each piece was blessed until exhibiting extraordinary spiritual buoyancy.

✨ Core Virtues & Blessings (พุทธคุณ):
• Unrivaled Commerce & Cash Drawer Magnet: Traditionally placed in cash registers or worn at the waist to siphon steady monetary flow and customers.
• Supreme Antidote to Black Magic & Curses: Neutralizes malevolent sorcery, ill wishes, and toxic environmental energies.
• Wards off Venomous Creatures: Renowned among rural Thais for repelling venomous snakes, scorpions, and dangerous insects.
• Personal Charm & Likability: Facilitates effortless social ease and warm reception in negotiations.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Palad Khik Activation Chant)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'wuathanu',
    num: 8,
    titleTh: '8. วัวธนู เนื้อครั่งพุทรา หลวงพ่อพุฒ วัดกลางบางพระ นครปฐม ปี 2538',
    subTh: '护宅辟邪神牛 · เฝ้าบ้าน เฝ้าโรงงาน ป้องกันโจรขโมย ปัดเป่าคุณไสย / Sacred Guardian Bull Wua Thanu B.E. 2538',
    url: 'https://dansiamamulets.com/product/wua-thanu-krang-phutsa-luang-pho-phut-wat-klang-bang-phra-2538',
    imgs: [
      { src: '/amulets/talisman_wuathanu_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/talisman_wuathanu_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/talisman_wuathanu_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['wuathanu'],
    captionEn: `⭐ Ancient Siamese Territorial Guardian Bull
Luang Pho Phut - Sacred Wua Thanu (Jujube Lacquer Resin Bull)
Wat Klang Bang Phra, Nakhon Pathom | B.E. 2538 (1995)

💎 Consecration of the Nakhon Pathom Lineage:
Consecrated in B.E. 2538 by Luang Pho Phut, direct lineage heir to Luang Phor Noi (Wat Srisathorn). Molded from sacred copper wire skeletal armature coated with wild consecrated Jujube lacquer resin (Krang Phutsa) harvested from auspicious cardinal directions.

✨ Core Virtues & Blessings (พุทธคุณ):
• Elite Property & Warehouse Guardian: Spiritually patrolled perimeter protection against burglars, home invaders, and thieves.
• Absolute Annihilation of Black Magic: The mythical archery bull charges and crushes hostile demonic entities, hexes, and graveyard spirits.
• Deflects Harmful Feng Shui Energies: Neutralizes road clashes, graveyard proximities, and negative spiritual portals.
• Business Protection: Safeguards business inventories, production plants, and retail shops from deliberate sabotage.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Offering Instructions
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'guman',
    num: 9,
    titleTh: '9. กุมารทอง เนื้อดิน 7 ป่าช้า หลวงพ่อพิณ วัดอุบลฯ ราชบุรี ปี 2500',
    subTh: '白法正统天童古曼 · กึ่งพุทธกาล สายขาวแท้ เตือนภัย เรียกลูกค้า / White Wicha Guman Thong B.E. 2500',
    url: 'https://dansiamamulets.com/product/guman-thong-din-chet-pacha-luang-pho-pin-wat-ubon-2500',
    imgs: [
      { src: '/amulets/talisman_guman_1.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/talisman_guman_2.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/talisman_guman_3.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['guman'],
    captionEn: `⭐ 25th Buddhist Century Pure White Wicha Guman Thong
Luang Pho Pin - Sacred Guman Thong (7 Cemetery Earths)
Wat Ubon Wannaram, Ratchaburi | B.E. 2500 (1957)

💎 Pure Monastic Theravada Consecration:
Consecrated in B.E. 2500 (1957) during the sacred 25th Buddhist Century grand Jubilee era by Luang Pho Pin, the primary disciple of Luang Pho Khong (Wat Bang Kaphom). Molded from 7 sacred soils (Cemeteries representing impermanence & meditation, pier soils for bustling trade, ant mound soils for wealth accumulation) under strict Buddhist Vinaya white magic. 100% wholesome celestial spirit boy (Thep Guman), zero dark occultism.

✨ Core Virtues & Blessings (พุทธคุณ):
• Customer Magnetism & Retail Boost: Invisibly guides customers and buyers towards the owner's store or online business.
• Intuitive Sixth Sense & Danger Warning: Alerts the caretaker in dreams or intuitive flashes to imminent hazards or fraudulent deals.
• Household Guardian: Protects families and premises against negative unseen spirits and mischief.
• Financial Luck & Opportunities: Brings unexpected opportunities, windfalls, and commercial goodwill.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Ethical Wholesome Care Guide
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'somdej_nak',
    num: 10,
    titleTh: '10. พระสมเด็จฐานขาโต๊ะ หลวงปู่นาค วัดระฆัง ปี 2495',
    subTh: '桌腿座崇迪佛 · ผสมผงเก่าสมเด็จโต วัดระฆังแท้ๆ ยอดนิยมสูงสุด / Phra Somdej Thaan Kha To B.E. 2495',
    url: 'https://dansiamamulets.com/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495',
    imgs: [
      { src: '/amulets/somdej_nak_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/somdej_nak_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/somdej_nak_side.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['somdej_nak'],
    captionEn: `⭐ Authentic Wat Rakang Masterpiece with Somdej Toh Powders
Luang Pu Nak - Phra Somdej Thaan Kha To (Table-Leg Base Mould)
Wat Rakang Kositaram, Bangkok | B.E. 2495 (1952)

💎 Sacred Mother-Temple Provenance:
Consecrated in B.E. 2495 by Luang Pu Nak, celebrated Abbot of Wat Rakang Kositaram. Renowned worldwide for containing a very high concentration of crushed original Somdej Toh Promrangsi antique powders preserved within the temple archives, pressed into the iconic and prestigious "Table-Leg Base" altar mould.

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme Universal King of Amulets Blessings: Bestows unshakeable luck, life elevation, and harmony in all pursuits.
• Maha Metta & Benevolent Attraction: Inspires profound goodwill from VIP clients, superiors, colleagues, and associates.
• Career Advancement & Royal Prestige: Facilitates executive promotions, leadership authority, and social honor.
• Obstacle Dissolution & Safety: Smooths life's hardest trials and protects from bodily harm and misfortune.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Chinabanchorn & Wat Rakang Katha
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'somdej_pae',
    num: 11,
    titleTh: '11. พระสมเด็จพระประทาน หลวงพ่อแพ วัดพิกุลทอง ปี 2514',
    subTh: '大东座大佛主尊崇迪 · หลวงพ่อแพโด่งดังที่สุดในเอเชีย / Phra Somdej Phra Prathan Luang Pho Pae B.E. 2514',
    url: 'https://dansiamamulets.com/product/phra-somdej-phra-prathan-wat-muang-luang-pho-pae-wat-pikul-thong-2514',
    imgs: [
      { src: '/amulets/somdej_pae_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/somdej_pae_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/somdej_pae_side.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['somdej_pae'],
    captionEn: `⭐ Master Consecration by Asia's Legend Luang Pho Pae
Luang Pho Pae - Phra Somdej Phra Prathan (Great Presiding Buddha)
Wat Pikul Thong (Issued at Wat Muang, Yala) | B.E. 2514 (1971)

💎 International Golden Era Provenance:
Empowered in B.E. 2514 by Phra Thammaratthanon (Luang Pho Pae) of Wat Pikul Thong, Singburi, whose amulets gained legendary international acclaim across Hong Kong, Singapore, and Taiwan. Pressed from his signature triple-purified holy powders, gold leaf flecks, and sacred botanical minerals.

✨ Core Virtues & Blessings (พุทธคุณ):
• Multiplied Prosperity & Wealth Attraction: Attracts thriving commercial success, solid profit margins, and investment growth.
• Peaceful Household & Emotional Balance: Bestows deep tranquility, clarity of mind, and harmonious family life.
• Charismatic Influence (Metta): Natural appeal and trustworthiness in all professional engagements.
• Comprehensive Divine Protection: Shields from physical violence, travel accidents, and spiritual attacks.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Offering Instructions
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'pidta',
    num: 12,
    titleTh: '12. พระปิดตา ผงว่านจินดามณี ฝังตะกรุด หลวงพ่อทองอยู่ ปี 2520',
    subTh: '金达玛尼草药符管必打佛 · เมตตา โชคลาภ แคล้วคลาด กันคุณไสย / Phra Pidta Wan Jindamanee B.E. 2520',
    url: 'https://dansiamamulets.com/product/phra-pidta-wan-jindamanee-takrut-luang-pho-thong-yu-wat-tha-sao-2520',
    imgs: [
      { src: '/amulets/pidta_jindamanee_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/pidta_jindamanee_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/pidta_jindamanee_side.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['pidta'],
    captionEn: `⭐ Sacred Jindamanee Medicine Formula Phra Pidta
Luang Pho Thong Yu - Phra Pidta Wan Jindamanee with Embedded Sacred Takrut
Wat Tha Sao, Samut Sakhon | B.E. 2520 (1977)

💎 Esoteric "Wish-Fulfilling Jewel" Lineage:
Consecrated in B.E. 2520 by Luang Pho Thong Yu, inheritor of the legendary Wat Klang Bang Kaew Jindamanee medical-sorcery lineage. Hand-molded from genuine Ya Jindamanee holy herbal medicine, 108 botanical wans, and embedded with a consecrated metallic Takrut in the reverse.

✨ Core Virtues & Blessings (พุทธคุณ):
• Sensory Restraint & Inner Peace (Maha Uttama): Closed eyes symbolize sensory discipline, silencing external chaos, and promoting sharp strategic focus.
• Windfall Wealth & Debt Clearing (Maha Lap): Draws unexpected business revenue, investment profits, and steady financial stability.
• Inversion of Illness & Physical Vitality: Ya Jindamanee herbal aura is renowned for supporting bodily health, vitality, and clearing negative energetic sluggishness.
• Complete Immunity to Black Magic: The closed posture deflects curses, hexes, and envious attacks from all 9 sensory portals.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Chanting Manual
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'koon',
    num: 13,
    titleTh: '13. พระนางพญา คูณลาภ หลวงพ่อคูณ วัดบ้านไร่ ปี 2517',
    subTh: '女王佛 · 乘倍发财/倍增福禄 · ยุคทองปี 2517 โชคลาภทวีคูณ / Phra Nang Phaya Koon Lap B.E. 2517',
    url: 'https://dansiamamulets.com/product/phra-nang-phaya-koon-lap-luang-pho-koon-wat-ban-rai-2517',
    imgs: [
      { src: '/amulets/koon_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/koon_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/koon_side.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['koon'],
    captionEn: `⭐ Golden Era B.E. 2517 Consecration by the Living Arhat
Luang Pho Koon - Phra Nang Phaya Koon Lap (Double Wealth Edition)
Wat Ban Rai, Nakhon Ratchasima | B.E. 2517 (1974)

💎 The Golden Era of Dan Khun Thot:
Blessed in B.E. 2517, the most celebrated and highly sought-after vintage era of Luang Pho Koon Parisuttho. Pressed from sacred temple pollens, ancient herbals, and powdered scripture ashes, shaped in the timeless triangular form of the "Queen of Amulets" (Phra Nang Phaya) and blessed for exponential wealth ("Koon Lap").

✨ Core Virtues & Blessings (พุทธคุณ):
• Multiplied Fortunes (Koon Lap): Magnetically multiplies earnings, investment capital, and corporate profits.
• Supreme Queen of Amulets Grace & Leadership: Bestows dignified elegance, executive authority, and natural command over staff and partners.
• Overcomes Harsh Obstacles: Blessed with Luang Pho Koon's miraculous power to shatter bad luck, legal conflicts, and debt traps.
• Life Preservation & Accident Shield: Famous for unyielding Klaew Klaad protection across all travel and work activities.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Luang Pho Koon Blessing Katha
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'turtle',
    num: 14,
    titleTh: '14. เหรียญเต่าหับ หลวงปู่หลิว วัดไร่แตงทอง ปี 2535 แช่น้ำมนต์',
    subTh: '全泰第一招财神龟·84岁圣水浸泡版 / Sacred Wealth Turtle Luang Pu Liu B.E. 2535',
    url: 'https://dansiamamulets.com/product/turtle-amulet-luang-pu-liu-84th-birthday-be2535',
    imgs: [
      { src: '/amulets/turtle_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/turtle_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/turtle_detail.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['turtle'],
    captionEn: `⭐ The Undisputed #1 Wealth Turtle Master of Thailand
Luang Pu Liu - Sacred Consecrated Wealth Turtle Coin (Rian Phaya Tao Ruean)
Wat Rai Taeng Thong, Nakhon Pathom | B.E. 2535 (1992) - 84th Birthday Edition

💎 Holy Water Immersion Provenance:
Consecrated in B.E. 2535 on the auspicious occasion of Luang Pu Liu's 84th birthday. The sacred copper medals were fully immersed in large temple bronze cauldrons of holy water, where Luang Pu Liu performed intensive daily samadhi meditation for months. The surface retains natural temple holy water oxidation and sacred patina.

✨ Core Virtues & Blessings (พุทธคุณ):
• Miraculous Debt Clearing (Plod Nee): Celebrated across Asia as the premier talisman for entrepreneurs to eliminate massive debts and restart financial abundance.
• Maha Lap & Steady Wealth Inflow: Brings unceasing revenue, steady business expansion, and windfall fortune.
• Longevity & Vibrant Health: The sacred turtle embodies ancient resilience, bestowing vigor and shielding the physical body from illness.
• Impenetrable Shell Protection: Strong defense against malicious lawsuits, backstabbing colleagues, and unforeseen accidents.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Luang Pu Liu Turtle Chant & Usage Manual)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'rahu',
    num: 15,
    titleTh: '15. ราหูกะลาแกะ หลวงพ่อปิ่น วัดศรีษะทอง นครปฐม',
    subTh: '全泰第一拉胡祖庙·单眼椰壳手雕拉胡 / Hand-Carved One-Eyed Coconut Rahu',
    url: 'https://dansiamamulets.com/product/rahu-kala-gaew-luang-pho-pin-wat-srisathorn',
    imgs: [
      { src: '/amulets/rahu_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/rahu_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/rahu_detail.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['rahu'],
    captionEn: `⭐ The Pinnacle Heritage of Wat Srisathorn
Luang Pho Pin - Sacred Hand-Carved One-Eyed Coconut Shell Phra Rahu
Wat Srisathorn, Nakhon Pathom | Direct Lineage of Luang Phor Noi

💎 Consecration at the #1 Rahu Temple of Siam:
Wat Srisathorn is universally recognized as the primordial birthplace of Phra Rahu wicha in Thailand. Luang Pho Pin was the prime direct successor to the immortal Luang Phor Noi. This museum specimen is hand-carved from an exceptionally rare, naturally occurring single-eyed coconut shell (Kala Ta Diao), meticulously etched with Rahu devouring the moon and energized with hand-inscribed sacred yant formulas.

✨ Core Virtues & Blessings (พุทธคุณ):
• Devours Traitors & Backstabbers (Kin Khon Phran): Neutralizes malicious gossip, corporate politics, and backstabbing, deflecting ill-will back to its source.
• Overcomes Astrological Clashes (Tai Sui & Bad Stars): Invaluable during difficult astrological years, neutralizing malefic cosmic influences.
• Sudden Turnaround in Misfortune: Legendary for taking individuals at their lowest points and propelling them into victory and acclaim.
• Wealth from Unconventional Angles: Rahu is renowned for unlocking bold speculative profits and overcoming regulatory hurdles.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha & Offering Ritual Guide
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'tigertakrut',
    num: 16,
    titleTh: '16. ตะกรุดหนังเสือ หลวงพ่อเที่ยง วัดเขากระโดง บุรีรัมย์ ปี 2539',
    subTh: '古法真品虎皮生漆符管 / Authentic Tiger Skin Takrut Luang Pho Thiang B.E. 2539',
    url: 'https://dansiamamulets.com/product/tiger-skin-takrut-luang-pho-thiang-khao-kradong-2539',
    imgs: [
      { src: '/amulets/tigertakrut_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/tigertakrut_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/tigertakrut_detail.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['tigertakrut'],
    captionEn: `⭐ Ferocious Authority of Ancient Khmer Wicha
Luang Pho Thiang - Authentic Hand-Lacquered Tiger Skin Takrut
Wat Khao Kradong Volcano Monastery, Buriram | B.E. 2539 (1996)

💎 Extinct Volcano Consecration Heritage:
Consecrated in B.E. 2539 by Luang Pho Thiang, legendary master of the extinct volcanic heights of Khao Kradong on the Cambodian border. Utilizing genuine tiger pelt from a naturally deceased apex tiger, the master personally hand-inscribed esoteric Khmer yantras on the skin, wrapped it with sacred cord bindings, and preserved it in natural black botanical lacquer (Rak Dam).

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme Commanding Authority (Maha Amnaj): Radiates the undisputed aura of the jungle's monarch, commanding immediate obedience and respect in executive settings.
• Absolute Spiritual Shield (Kong Grapan & Anti-Occult): Evaporates evil spirits, hexes, dark witchcraft, and hostile psychic energies.
• Predatory Business Acumen: Sharpening predatory commercial instincts to seize lucrative market opportunities and outmaneuver fierce corporate competitors.
• Physical Protection: Ancient warrior wicha designed to shield the bearer from severe physical impacts and hazards.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Khmer Tiger Chanting Prayer)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'garuda',
    num: 17,
    titleTh: '17. พญาครุฑ กฐินพระราชทาน หลวงพ่อวราห์ วัดโพธิทอง ปี 2564',
    subTh: '当代第一金翅鸟宗师·皇家袈裟展翼大鹏 / Phaya Garuda Royal Kathina 64',
    url: 'https://dansiamamulets.com/product/garuda-amulet-kathina-2564-luang-pho-vrah',
    imgs: [
      { src: '/amulets/garuda_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/garuda_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/garuda_detail.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['garuda'],
    captionEn: `⭐ Thailand's Undisputed #1 Living Master of Garuda
Luang Pho Vrah - Phaya Garuda Royal Kathina Consecration
Wat Bodhi Thong, Bangkok | B.E. 2564 (2021)

💎 Royal Offering Auspicious Provenance:
Chao Khun Luang Pho Vrah of Wat Bodhi Thong is universally recognized by the Thai Royal Family, military leadership, and international collectors as the supreme living master of Phaya Garuda wicha. Consecrated during the historic Royal Kathina Robe Ceremony bestowed by the Thai Crown in B.E. 2564, this majestic winged emblem carries the highest state and spiritual auspices.

✨ Core Virtues & Blessings (พุทธคุณ):
• Sovereign Career Promotion: The Garuda represents supreme state authority, royal prestige, and dramatic elevation into leadership and boardrooms.
• Feng Shui & Geopathic Neutralization: Unsurpassed in dispelling aggressive environmental Feng Shui clashes, T-junction arrows, and unfavorable building energies.
• Spiritual Subjugation of Evil: The natural sovereign predator of malevolent spirits, instantly purifying environments of dark witchcraft.
• Boundless Expansion & Commercial Ambition: Wings spread wide, symbolizing unstoppable international business breakthroughs and conquest of new frontiers.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Original Temple Box & Authentication Stamp
✓ Full Romanized Katha (Royal Garuda Prayer)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  },
  {
    id: 'biagae',
    num: 18,
    titleTh: '18. เบี้ยแก้ เปลือย หลวงปู่คง วัดกลางบางแก้ว ปี 2568 ตัวขนาดกลาง',
    subTh: '全泰第一挡降贝祖庙·原壳活水银 / Bia Gae Luang Pu Kong B.E. 2568',
    url: 'https://dansiamamulets.com/product/bia-kaae-pluay-luang-pu-kong-wat-klang-bang-kaew-2568-medium',
    imgs: [
      { src: '/amulets/biagae_front.jpg', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/biagae_back.jpg', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/biagae_detail.jpg', label: 'ซูมลายละเอียด (Detail)' }
    ],
    captionZh: zhCaptions['biagae'],
    captionEn: `⭐ The Historic #1 Bia Gae Sanctuary of Siam
Luang Pu Kong - Sacred Living Mercury Bia Gae Cowrie Shell (Medium Size)
Wat Klang Bang Kaew, Nakhon Pathom | B.E. 2568 (2025)

💎 Consecration at the Mother Temple of Bia Gae:
Wat Klang Bang Kaew is universally celebrated as the historic birthplace of Thailand's greatest Bia Gae lineage (from the legendary Luang Phor Boon). Blessed in strict adherence to ancient temple canons, active consecrated liquid mercury (Parot) is channeled into a natural 32-toothed cowrie shell, sealed with sacred Chanrong underground stingless bee resin and inscribed lead plating. When shaken, the living mercury dynamically slides within.

✨ Core Virtues & Blessings (พุทธคุณ):
• Supreme Protection & Inversion of Harm (Kae Rai Glai Pen Dee): Converts bad fortune into good luck; neutralizes black magic, hexes, curses, and psychic interference.
• Mirror Deflection of Malice: Automatically reflects jealousy, corporate sabotage, and negative intentions directly back to their initiators.
• Wealth Preservation (Bia as Ancient Currency): Prevents monetary loss, protects business treasuries, and guards against unforeseen economic distress.
• Energetic Purification: Stabilizes personal aura, clears persistent nightmares, and banishes spiritual illness.

📜 Collector's Complete Package:
✓ 100% Lifetime Authenticity Guarantee
✓ Full Romanized Katha (Wat Klang Bang Kaew Chanting Prayer)
✓ Worldwide Tracked Express Airmail Shipping
✓ Secure Checkout via Visa, Mastercard, Apple Pay & Alipay on our official website

💬 DM / PM directly for inquiries, adoption, and worldwide shipping.
👇 Direct official museum archive & microscopic HD multi-angle photography in the 1st comment below!`
  }
];

// Generate Complete fb.html
let html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Dan Siam Amulets — Facebook Post Manager (Dual Language: 中文 & English)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: #0d0f15; color: #f3f4f6; padding: 14px; padding-bottom: 90px; }
    
    .header { text-align: center; margin-bottom: 16px; padding-top: 6px; }
    .header h1 { font-size: 21px; color: #f59e0b; font-weight: 800; letter-spacing: -0.5px; }
    .header p { font-size: 13px; color: #9ca3af; margin-top: 4px; }

    /* Sticky Control Bar */
    .sticky-bar {
      position: sticky;
      top: 10px;
      z-index: 100;
      background: rgba(22, 27, 38, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 18px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    }
    .stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 13px;
      font-weight: 600;
    }
    .badge-unposted { color: #f59e0b; background: rgba(245, 158, 11, 0.15); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-posted { color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3); }
    
    .filter-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 10px;
    }
    .tab-btn {
      background: #11141c;
      border: 1px solid #2d3345;
      color: #9ca3af;
      padding: 8px 4px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .tab-btn.active {
      background: #f59e0b;
      color: #000;
      border-color: #f59e0b;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
    }

    /* Language Switcher */
    .lang-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0d1017;
      border: 1px solid #2d3345;
      border-radius: 10px;
      padding: 6px 10px;
      gap: 8px;
    }
    .lang-label {
      font-size: 11.5px;
      color: #9ca3af;
      font-weight: 600;
      white-space: nowrap;
    }
    .lang-toggle-group {
      display: flex;
      gap: 4px;
      flex: 1;
    }
    .lang-btn {
      flex: 1;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid transparent;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      background: transparent;
      color: #9ca3af;
      transition: all 0.2s;
    }
    .lang-btn.active {
      background: #2563eb;
      color: #fff;
      border-color: #3b82f6;
      box-shadow: 0 2px 6px rgba(37,99,235,0.4);
    }

    .reset-btn {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      padding: 2px 6px;
    }

    .tip-box {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 20px;
      font-size: 12.5px;
      line-height: 1.55;
      color: #a7f3d0;
    }
    .tip-box b { color: #34d399; }

    /* Cards */
    .card {
      background: #161922;
      border-radius: 16px;
      border: 1px solid #262b3a;
      padding: 16px;
      margin-bottom: 22px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card.hidden-card {
      display: none !important;
    }
    .card.fade-out {
      opacity: 0;
      transform: scale(0.95);
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 4px;
      gap: 8px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      line-height: 1.35;
      flex: 1;
    }
    .card-sub {
      font-size: 12px;
      color: #f59e0b;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    /* Per-Card Language Switcher Pill */
    .card-lang-pill {
      display: flex;
      background: #0f121a;
      border: 1px solid #2d3345;
      border-radius: 20px;
      padding: 2px;
      gap: 2px;
    }
    .card-lang-pill button {
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 16px;
      cursor: pointer;
    }
    .card-lang-pill button.active {
      background: #3b82f6;
      color: #fff;
    }

    .images-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 14px;
    }
    .img-wrap {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      border: 1px solid #2a3040;
    }
    .img-wrap img {
      width: 100%;
      height: auto;
      display: block;
    }
    .img-label {
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(0,0,0,0.8);
      color: #fff;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.15);
    }

    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 14px;
    }
    .copy-btn {
      width: 100%;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #000;
      font-weight: 700;
      font-size: 14px;
      border: none;
      padding: 13px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
    }
    .copy-btn:active { transform: scale(0.98); }

    .copy-comment-btn {
      width: 100%;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #fff;
      font-weight: 700;
      font-size: 13.5px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 12px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
      transition: all 0.2s;
    }
    .copy-comment-btn:active { transform: scale(0.98); }

    .comment-preview-box {
      background: rgba(2, 132, 199, 0.08);
      border: 1px dashed rgba(56, 189, 248, 0.4);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 11.5px;
      line-height: 1.5;
      color: #7dd3fc;
      margin-top: 8px;
      word-break: break-all;
    }
    .comment-preview-box b {
      color: #38bdf8;
    }

    .open-fb-btn {
      width: 100%;
      background: #1877f2;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      border: none;
      padding: 12px;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
    }
    .open-fb-btn:active { opacity: 0.85; }

    .done-btn {
      width: 100%;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-weight: 700;
      font-size: 14px;
      padding: 12px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .done-btn:active {
      background: #10b981;
      color: #000;
    }

    .undone-btn {
      width: 100%;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
      font-weight: 600;
      font-size: 13.5px;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .caption-preview {
      background: #0f121a;
      border: 1px solid #242a3a;
      border-radius: 10px;
      padding: 12px;
      font-size: 12px;
      line-height: 1.6;
      color: #d1d5db;
      white-space: pre-wrap;
      word-break: break-all;
      margin-top: 12px;
      max-height: 140px;
      overflow-y: auto;
    }

    .empty-state {
      text-align: center;
      padding: 48px 16px;
      color: #9ca3af;
      display: none;
    }
    .empty-state h3 { font-size: 18px; color: #10b981; margin-bottom: 8px; }
    .empty-state p { font-size: 13px; line-height: 1.6; }

    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: #fff;
      padding: 10px 22px;
      border-radius: 30px;
      font-size: 13.5px;
      font-weight: 600;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      z-index: 999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      text-align: center;
      white-space: nowrap;
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>Dan Siam Amulets</h1>
    <p>ผู้ช่วยสร้างโพสต์และคัดลอกแคปชั่นสำหรับ Facebook (จีน & อังกฤษ 2 ภาษา)</p>
  </div>

  <div class="sticky-bar">
    <div class="stats-row">
      <div>
        <span class="badge-unposted">รอโพสต์: <span id="count-unposted">0</span></span>
        <span class="badge-posted" style="margin-left: 6px;">โพสต์แล้ว: <span id="count-posted">0</span></span>
      </div>
      <button class="reset-btn" onclick="resetAllPosted()">รีเซ็ตทั้งหมด</button>
    </div>

    <div class="filter-tabs">
      <button class="tab-btn active" id="tab-unposted" onclick="setFilter('unposted')">ยังไม่โพสต์ (<span id="tab-count-unposted">0</span>)</button>
      <button class="tab-btn" id="tab-posted" onclick="setFilter('posted')">โพสต์แล้ว (<span id="tab-count-posted">0</span>)</button>
      <button class="tab-btn" id="tab-all" onclick="setFilter('all')">ทั้งหมด (18)</button>
    </div>

    <!-- Global Language Toggle -->
    <div class="lang-row">
      <span class="lang-label">🌐 ภาษาแคปชั่น:</span>
      <div class="lang-toggle-group">
        <button class="lang-btn active" id="btn-lang-zh" onclick="setGlobalLang('zh')">🇨🇳 ภาษาจีน (中文)</button>
        <button class="lang-btn" id="btn-lang-en" onclick="setGlobalLang('en')">🇬🇧 ภาษาอังกฤษ (English)</button>
      </div>
    </div>
  </div>

  <div class="tip-box">
    🛡️ <b>สูตรโพสต์แบบปลอดภัย 100% (รองรับทั้งกลุ่มจีนและกลุ่มฝรั่งสากล):</b><br>
    <b>ขั้นตอนที่ 1:</b> แตะค้างบันทึกรูปภาพ 3 รูป ➡️ เลือกภาษา (🇨🇳 จีน หรือ 🇬🇧 อังกฤษ) ➡️ กดปุ่มสีทอง <b>"📋 1. คัดลอกแคปชั่นหลัก"</b> แล้วโพสต์ลงกลุ่มได้เลย <i>(แคปชั่นนี้ไม่มีลิงก์เว็บ บอท Facebook และแอดมินจะไม่ลบโพสต์แน่นอน)</i><br>
    <b>ขั้นตอนที่ 2:</b> เมื่อโพสต์เสร็จ กดปุ่มสีฟ้า <b>"💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก"</b> ➡️ นำไปวางในช่องแสดงความคิดเห็นใต้โพสต์ตัวเอง <i>(ลูกค้ากดดูเว็บได้ปกติ แถมช่วยดันโพสต์ให้เด้งขึ้นหน้าแรกของกลุ่ม)</i><br>
    <b>ขั้นตอนที่ 3:</b> กดปุ่ม <b>"🚀 3. เปิดแอป Facebook"</b> ระบบจะค้นหากลุ่มภาษาที่เลือกให้อัตโนมัติ ➡️ กดปุ่มเขียว <b>"✅ โพสต์ Facebook แล้ว"</b> เพื่อซ่อนรายการครับ!
  </div>

  <div id="cards-container">
`;

// Build cards HTML
items.forEach(item => {
  html += `
    <div class="card" data-id="${item.id}">
      <div class="card-header-row">
        <div class="card-title">${item.titleTh}</div>
        <div class="card-lang-pill">
          <button id="pill-zh-${item.id}" class="active" onclick="setCardLang('${item.id}', 'zh')">🇨🇳 中文</button>
          <button id="pill-en-${item.id}" onclick="setCardLang('${item.id}', 'en')">🇬🇧 EN</button>
        </div>
      </div>
      <div class="card-sub">${item.subTh}</div>
      
      <div class="images-grid">
        <div class="img-wrap">
          <span class="img-label">${item.imgs[0].label}</span>
          <img src="${item.imgs[0].src}" alt="${item.id} front" loading="lazy">
        </div>
        <div class="img-wrap">
          <span class="img-label">${item.imgs[1].label}</span>
          <img src="${item.imgs[1].src}" alt="${item.id} back" loading="lazy">
        </div>
        <div class="img-wrap">
          <span class="img-label">${item.imgs[2].label}</span>
          <img src="${item.imgs[2].src}" alt="${item.id} detail" loading="lazy">
        </div>
      </div>

      <!-- Caption Preview Box -->
      <div class="caption-preview" id="caption-preview-${item.id}">${item.captionZh}</div>

      <!-- Comment Preview Box -->
      <div class="comment-preview-box" id="comment-preview-${item.id}">
        💬 <b>ข้อความสำหรับแปะคอมเมนต์แรก (Comment 1):</b><br>
        <span id="comment-text-${item.id}">👉 查阅高清显微多角度细节与官方历史档案：<br>${item.url}</span>
      </div>

      <div class="btn-group">
        <button class="copy-btn" id="copy-btn-${item.id}" onclick="copyCaption('${item.id}')">
          📋 1. คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์ ไม่โดนลบ)
        </button>
        
        <button class="copy-comment-btn" id="copy-comment-btn-${item.id}" onclick="copyComment('${item.id}')">
          💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก (中文)
        </button>

        <a href="https://www.facebook.com" class="open-fb-btn" id="open-fb-btn-${item.id}" onclick="openFacebookGroup('${item.id}'); return false;">
          🚀 3. เปิดแอป Facebook เพื่อโพสต์
        </a>

        <button class="done-btn" id="status-btn-${item.id}" onclick="togglePosted('${item.id}')">
          ✅ โพสต์ Facebook แล้ว (ซ่อนรายการนี้)
        </button>
      </div>
    </div>
`;
});

// Add empty state and script
html += `
  </div>

  <div class="empty-state" id="empty-state">
    <h3>🎉 สุดยอดมาก! คุณโพสต์ครบทุกรายการแล้ว</h3>
    <p>ไม่มีรายการที่ค้างอยู่ หากต้องการกลับมาดูใหม่ ให้กดแท็บ <b>"โพสต์แล้ว"</b> หรือกดปุ่ม <b>"รีเซ็ตทั้งหมด"</b> ที่แถบด้านบนครับ</p>
  </div>

  <div class="toast" id="toast">คัดลอกเรียบร้อยแล้ว!</div>

  <script>
    const STORAGE_KEY = 'dansiam_fb_posted_ids';
    const LANG_STORAGE_KEY = 'dansiam_fb_lang';

    // Captions & URLs Database
    const amuletsDb = ${JSON.stringify(items.reduce((acc, item) => {
      acc[item.id] = {
        url: item.url,
        captionZh: item.captionZh,
        captionEn: item.captionEn,
        commentZh: `👉 查阅高清显微多角度细节与官方历史档案：\\n${item.url}`,
        commentEn: `👉 View official museum archive & microscopic HD multi-angle photography:\\n${item.url}`
      };
      return acc;
    }, {}), null, 2)};

    let currentFilter = 'unposted';
    let globalLang = localStorage.getItem(LANG_STORAGE_KEY) || 'zh';
    const cardLangState = {};

    function getPostedIds() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    function savePostedIds(ids) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }

    function setGlobalLang(lang) {
      globalLang = lang;
      localStorage.setItem(LANG_STORAGE_KEY, lang);

      document.getElementById('btn-lang-zh').classList.toggle('active', lang === 'zh');
      document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

      // Update all cards to global language
      Object.keys(amuletsDb).forEach(id => {
        setCardLang(id, lang, false);
      });

      showToast(lang === 'zh' ? '🇨🇳 สลับเป็นภาษาจีน (中文) ทั้งหมดแล้ว' : '🇬🇧 Switched to English for all amulets!');
    }

    function setCardLang(id, lang, showNotice = true) {
      cardLangState[id] = lang;
      const data = amuletsDb[id];
      if (!data) return;

      // Update Card Pill Buttons
      const pillZh = document.getElementById('pill-zh-' + id);
      const pillEn = document.getElementById('pill-en-' + id);
      if (pillZh && pillEn) {
        pillZh.classList.toggle('active', lang === 'zh');
        pillEn.classList.toggle('active', lang === 'en');
      }

      // Update Caption Preview
      const capPreview = document.getElementById('caption-preview-' + id);
      if (capPreview) {
        capPreview.innerText = lang === 'zh' ? data.captionZh : data.captionEn;
      }

      // Update Comment Preview
      const comText = document.getElementById('comment-text-' + id);
      if (comText) {
        comText.innerHTML = lang === 'zh'
          ? '👉 查阅高清显微多角度细节与官方历史档案：<br>' + data.url
          : '👉 View official museum archive & microscopic HD multi-angle photography:<br>' + data.url;
      }

      // Update Buttons text
      const copyBtn = document.getElementById('copy-btn-' + id);
      if (copyBtn) {
        copyBtn.innerText = lang === 'zh'
          ? '📋 1. คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์ ไม่โดนลบ)'
          : '📋 1. Copy English Caption (No Link - 100% Safe)';
      }

      const copyComBtn = document.getElementById('copy-comment-btn-' + id);
      if (copyComBtn) {
        copyComBtn.innerText = lang === 'zh'
          ? '💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก (中文)'
          : '💬 2. Copy Link for 1st Comment (English)';
      }

      const openFbBtn = document.getElementById('open-fb-btn-' + id);
      if (openFbBtn) {
        openFbBtn.innerText = lang === 'zh'
          ? '🚀 3. เปิดแอป Facebook (กลุ่มภาษาจีน)'
          : '🚀 3. Open Facebook App (English Groups)';
      }

      if (showNotice) {
        showToast(lang === 'zh' ? '🇨🇳 สลับองค์นี้เป็นภาษาจีน' : '🇬🇧 Switched this amulet to English');
      }
    }

    function copyToClipboard(text, successMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast(successMsg));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(successMsg);
      }
    }

    function copyCaption(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      const text = lang === 'zh' ? data.captionZh : data.captionEn;
      const msg = lang === 'zh' 
        ? '📋 คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์) สำเร็จแล้ว!' 
        : '📋 Copied English Caption (Safe No-Link) successfully!';
      copyToClipboard(text, msg);
    }

    function copyComment(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      const text = lang === 'zh' ? data.commentZh : data.commentEn;
      const msg = lang === 'zh'
        ? '💬 คัดลอกข้อความแปะคอมเมนต์แรก (中文) แล้ว!'
        : '💬 Copied 1st comment link text (English)!';
      copyToClipboard(text, msg);
    }

    function openFacebookGroup(id) {
      const lang = cardLangState[id] || globalLang;
      const searchUrl = lang === 'zh'
        ? 'https://www.facebook.com/groups/search/groups/?q=佛牌买卖谢绝假牌'
        : 'https://www.facebook.com/groups/search/groups/?q=Thai+Amulet+Collectors';
      window.location.href = searchUrl;
    }

    function togglePosted(id) {
      let postedIds = getPostedIds();
      const card = document.querySelector('.card[data-id="' + id + '"]');

      if (postedIds.includes(id)) {
        postedIds = postedIds.filter(item => item !== id);
        savePostedIds(postedIds);
        showToast('↩️ ยกเลิกสถานะโพสต์แล้ว');
      } else {
        postedIds.push(id);
        savePostedIds(postedIds);
        if (currentFilter === 'unposted') {
          card.classList.add('fade-out');
          setTimeout(() => {
            card.classList.remove('fade-out');
            updateUI();
          }, 300);
          showToast('✅ บันทึกว่าโพสต์แล้ว (ซ่อนเรียบร้อย)');
          return;
        } else {
          showToast('✅ บันทึกว่าโพสต์แล้ว');
        }
      }
      updateUI();
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      const activeTab = document.getElementById('tab-' + filter);
      if (activeTab) activeTab.classList.add('active');
      updateUI();
    }

    function resetAllPosted() {
      if (confirm('ต้องการรีเซ็ตสถานะโพสต์ทั้งหมด ให้กลับมาแสดงใหม่ใช่หรือไม่?')) {
        localStorage.removeItem(STORAGE_KEY);
        showToast('🔄 รีเซ็ตสถานะทั้งหมดเรียบร้อยแล้ว');
        updateUI();
      }
    }

    function updateUI() {
      const postedIds = getPostedIds();
      const allCards = document.querySelectorAll('.card');
      let visibleCount = 0;
      let unpostedCount = 0;
      let postedCount = 0;

      allCards.forEach(card => {
        const id = card.getAttribute('data-id');
        const isPosted = postedIds.includes(id);
        const statusBtn = document.getElementById('status-btn-' + id);

        if (isPosted) {
          postedCount++;
          if (statusBtn) {
            statusBtn.className = 'undone-btn';
            statusBtn.innerText = '↩️ ยกเลิก (ย้ายกลับไปรอโพสต์)';
          }
        } else {
          unpostedCount++;
          if (statusBtn) {
            statusBtn.className = 'done-btn';
            statusBtn.innerText = '✅ โพสต์ Facebook แล้ว (ซ่อนรายการนี้)';
          }
        }

        let show = false;
        if (currentFilter === 'all') {
          show = true;
        } else if (currentFilter === 'unposted') {
          show = !isPosted;
        } else if (currentFilter === 'posted') {
          show = isPosted;
        }

        if (show) {
          card.classList.remove('hidden-card');
          visibleCount++;
        } else {
          card.classList.add('hidden-card');
        }
      });

      document.getElementById('count-unposted').innerText = unpostedCount;
      document.getElementById('tab-count-unposted').innerText = unpostedCount;
      document.getElementById('count-posted').innerText = postedCount;
      document.getElementById('tab-count-posted').innerText = postedCount;

      const emptyState = document.getElementById('empty-state');
      if (visibleCount === 0 && currentFilter === 'unposted' && postedCount > 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.style.opacity = '1';
      setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    }

    // Initialize on page load
    setGlobalLang(globalLang);
    updateUI();
  </script>
</body>
</html>
`;

fs.writeFileSync('public/fb.html', html, 'utf8');
console.log('Successfully generated public/fb.html with Dual Language (Chinese & English) for all 18 amulets!');
