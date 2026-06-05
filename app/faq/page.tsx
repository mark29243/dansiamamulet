import type { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'FAQ · Frequently Asked Questions',
  description: 'Answers to common questions about Dan Siam Amulets — authenticity, shipping times, payment methods, returns, and how to contact us.',
  keywords: ['Thai amulet FAQ', 'amulet authenticity', 'shipping Thailand', 'พระเครื่องคำถาม', '佛牌常见问题'],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ · Dan Siam Amulets',
    description: 'Answers about amulet authenticity, worldwide shipping, payment methods, and returns.',
    url: '/faq',
    type: 'website',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // ── Authenticity ──────────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: 'Are your amulets authentic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — every piece comes with a certificate of authenticity and is verified by experts with over 20 years of experience. We source directly from temples and reputable Thai collectors.',
      },
    },
    {
      '@type': 'Question',
      name: 'พระเครื่องที่ขายแท้จริงหรือไม่?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'แท้ทุกองค์ครับ เรารับประกันความแท้และผ่านการตรวจสอบจากผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 20 ปี พร้อมใบรับรองทุกชิ้น',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I tell if a Thai amulet is genuine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Genuine Thai amulets can be identified by their material composition, mould details, age patina, and temple markings. At Dan Siam Amulets, every piece is verified by experts and comes with a certificate of authenticity. We recommend buying only from trusted dealers with transparent provenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'พระเครื่องปลอมดูยังไง?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'พระเครื่องปลอมมักมีพิมพ์ไม่คมชัด เนื้อหยาบ น้ำหนักผิดปกติ และไม่มีร่องรอยอายุตามธรรมชาติ ควรซื้อจากร้านที่น่าเชื่อถือและมีใบรับรองความแท้ทุกองค์',
      },
    },
    // ── Shipping ──────────────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within Thailand: 2-3 business days. Asia (China, Japan, Singapore, Hong Kong): 5-7 days. Europe & USA: 7-14 days. All orders include full tracking.',
      },
    },
    {
      '@type': 'Question',
      name: 'ส่งพระเครื่องไปต่างประเทศได้ไหม?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ได้ครับ เราส่งทั่วโลก ไม่ว่าจะเป็น จีน ญี่ปุ่น ยุโรป อเมริกา หรือออสเตรเลีย ทุกออเดอร์มีระบบติดตามพัสดุและประกันการจัดส่ง',
      },
    },
    {
      '@type': 'Question',
      name: 'Is shipping insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every shipment is fully insured. If your order is lost or damaged in transit, we will replace it immediately at no extra cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free shipping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — orders within Thailand over ฿1,000 qualify for free shipping. International orders are calculated at checkout based on weight and destination.',
      },
    },
    // ── Payment ──────────────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept Visa and Mastercard credit/debit cards, PromptPay (Thailand), Alipay and WeChat Pay (China). All payments are processed securely through Stripe.',
      },
    },
    {
      '@type': 'Question',
      name: 'รับชำระเงินผ่านช่องทางใดบ้าง?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'รับบัตรเครดิต/เดบิต Visa Mastercard, PromptPay, Alipay และ WeChat Pay ผ่านระบบ Stripe ที่ปลอดภัยระดับสากล',
      },
    },
    // ── Products ──────────────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: 'What types of Thai amulets do you sell?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dan Siam Amulets specialises in authentic Thai Buddhist amulets including Phra Somdej, Luang Pu Tuad, Phra Pidta, coin amulets (Rian), Takrut, Kuman Thong, and protective charms (Khruang Rang). All items are sourced from reputable temples and collectors across Thailand.',
      },
    },
    {
      '@type': 'Question',
      name: 'พระเครื่องแต่ละประเภทมีความศักดิ์สิทธิ์อะไรบ้าง?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'พระสมเด็จ: แคล้วคลาด มหาเมตตา | หลวงปู่ทวด: คุ้มครองภัย โชคลาภ | พระปิดตา: มหาลาภ ป้องกันภัย | เหรียญหลวงพ่อ: มหาเมตตา ค้าขายดี | ตะกรุด: คงกระพัน แคล้วคลาด | กุมารทอง: ค้าขายดี โชคลาภ',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I venerate a Thai amulet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each amulet ships with a trilingual (Thai/English/Chinese) veneration guide including the appropriate mantra (Katha), offering suggestions, and basic ceremony. Generally, light incense, offer flowers or water, and recite the mantra 3 or 9 times while focusing your intention.',
      },
    },
    // ── Returns & Trust ──────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: "Can I return an amulet?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, within 7 days of delivery. The amulet must be in original condition with its certificate and packaging intact. Contact us at dansiamamulets2@gmail.com to initiate a return.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I send an amulet as a gift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every amulet ships in a beautiful wooden gift box. Personalized cards and gift wrapping are available — just add a note at checkout.',
      },
    },
    // ── Contact ──────────────────────────────────────────────────────────
    {
      '@type': 'Question',
      name: 'How can I contact Dan Siam Amulets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LINE: jarunpim (https://lin.ee/reGR6nC), WeChat: jajackythai, Facebook: Jackyamulet999, Email: dansiamamulets2@gmail.com, Phone: +66 89 815 7535. We respond in Thai, English, and Chinese.',
      },
    },
    {
      '@type': 'Question',
      name: 'ติดต่อร้านแดนสยามอมิวเล็ตส์ได้ทางไหน?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LINE: jarunpim, WeChat: jajackythai, Facebook: Jackyamulet999, อีเมล: dansiamamulets2@gmail.com, โทร: +66 89 815 7535 ตอบทั้งไทย อังกฤษ และจีน',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQContent />
    </>
  );
}
