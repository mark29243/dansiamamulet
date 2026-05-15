'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';

const CONTENT = {
  th: {
    hero: 'เรื่องราวของเรา',
    subtitle: 'ความศรัทธาที่สืบทอดข้ามชาติ',
    sections: [
      {
        title: 'ความเป็นมา',
        body: 'แดนสยามก่อตั้งขึ้นด้วยความตั้งใจที่จะเป็นสะพานเชื่อมระหว่างวัฒนธรรมพุทธไทยและผู้ศรัทธาทั่วโลก เราคัดสรรพระเครื่องแท้ทุกองค์ด้วยตัวเองจากวัดดังทั่วประเทศไทย ',
      },
      {
        title: 'การรับรองความแท้',
        body: 'พระเครื่องของเราผ่านการตรวจสอบจากผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 20 ปี ทุกองค์มาพร้อมรายละเอียดวัด ปี และที่มาอย่างชัดเจน',
      },
      {
        title: 'การจัดส่งทั่วโลก',
        body: 'เราจัดส่งพระเครื่องไปยังกว่า 150 ประเทศ พร้อมระบบติดตามพัสดุครบวงจร บรรจุภัณฑ์พิเศษและการประกันความเสียหาย',
      },
    ],
  },
  en: {
    hero: 'Our Story',
    subtitle: 'A bridge between sacred tradition and global devotion',
    sections: [
      {
        title: 'Heritage',
        body: 'Dan Siam was founded to connect the rich tradition of Thai Buddhist amulets with devotees around the world. Every amulet in our collection is personally sourced from renowned temples across Thailand, working directly with master monks and their lineages.',
      },
      {
        title: 'Authentication',
        body: 'Every piece is verified by experts with over 20 years of experience. All amulets ship with a certificate of authenticity detailing the originating temple, year of creation, and provenance.',
      },
      {
        title: 'Worldwide Shipping',
        body: 'We ship to over 150 countries with full tracking, premium packaging, and shipping insurance to ensure your sacred amulet arrives safely.',
      },
    ],
  },
  zh: {
    hero: '关于我们',
    subtitle: '架起神圣传统与全球信仰的桥梁',
    sections: [
      {
        title: '传承',
        body: '丹暹罗成立的初衷是将泰国佛教佛牌的丰富传统与世界各地的信众联系起来。我们收藏的每一件佛牌都是亲自从泰国各地的著名寺庙采购，与高僧大师及其传承直接合作。',
      },
      {
        title: '正品认证',
        body: '每件佛牌均由拥有20年以上经验的专家鉴定。所有佛牌均附有真品证书，详细说明来源寺庙、制作年份和出处。',
      },
      {
        title: '全球配送',
        body: '我们配送至150多个国家，提供全程物流追踪、高级包装和运输保险，确保您的神圣佛牌安全送达。',
      },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = getDict(lang);
  const c = CONTENT[lang];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0D0804 0%, #1A1208 100%)', padding: '60px 24px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, fontSize: 240, opacity: 0.04, color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden>🙏</div>
        <div className="container" style={{ position: 'relative' }}>
          <div className="serif" style={{ fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: 14 }}>✦ ABOUT US ✦</div>
          <h1 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: lang === 'en' ? 300 : 600, marginBottom: 10, fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
            {c.hero}
          </h1>
          <p className="serif" style={{ fontSize: 17, color: 'var(--gold-light)', fontStyle: 'italic' }}>
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container" style={{ padding: '20px 24px 0' }}>
        <nav className="breadcrumb">
          <Link href="/">{t.nav.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <span style={{ color: 'var(--text)' }}>{t.nav.about}</span>
        </nav>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '40px 24px 60px', maxWidth: 800 }}>
        {c.sections.map((s, i) => (
          <article key={i} style={{ marginBottom: 40 }}>
            <h2 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--gold)' }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9 }}>
              {s.body}
            </p>
          </article>
        ))}

        {/* Values cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 40 }}>
          <ValueCard icon="🙏" label={lang === 'th' ? 'ศรัทธา' : lang === 'zh' ? '信仰' : 'Devotion'} />
          <ValueCard icon="⚖️" label={lang === 'th' ? 'ความซื่อสัตย์' : lang === 'zh' ? '诚信' : 'Integrity'} />
          <ValueCard icon="💎" label={lang === 'th' ? 'คุณภาพ' : lang === 'zh' ? '品质' : 'Quality'} />
          <ValueCard icon="🌏" label={lang === 'th' ? 'ทั่วโลก' : lang === 'zh' ? '全球' : 'Worldwide'} />
        </div>

        <div style={{ textAlign: 'center', marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--cream-dark)' }}>
          <h3 className="serif" style={{ fontSize: 20, marginBottom: 16, color: 'var(--text)' }}>
            {lang === 'th' ? 'พร้อมเริ่มต้นการเดินทาง?' : lang === 'zh' ? '准备开始您的旅程？' : 'Ready to begin your journey?'}
          </h3>
          <Link href="/shop" className="btn-gold">🛍️ {t.cart.browseShop}</Link>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="card" style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
      <div className="serif" style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
}
