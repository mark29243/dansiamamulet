'use client';

import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import Link from 'next/link';

export default function HomeHero({ productCount }: { productCount: number }) {
  const { lang } = useLang();
  const t = getDict(lang);
  const titleClass = lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif';

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0D0804 0%, #1A1208 50%, #201608 100%)', minHeight: 520, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative pattern */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', background: 'repeating-linear-gradient(45deg, rgba(201,168,76,.04) 0, rgba(201,168,76,.04) 1px, transparent 0, transparent 22px)' }} />
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', fontSize: 280, opacity: 0.04, color: 'var(--gold)' }} aria-hidden>🙏</div>

        <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 2, padding: '60px 24px' }}>
          <div style={{ maxWidth: 620 }}>
            <div className="serif" style={{ fontSize: 11, color: 'var(--gold-light)', letterSpacing: 5, marginBottom: 14, opacity: 0.85 }}>
              {t.hero.pre}
            </div>
            <h1 className={titleClass} style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: lang === 'en' ? 300 : 600, color: '#fff', lineHeight: 1.15, marginBottom: 14, fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
              {t.hero.title1}
              <br />
              {t.hero.title2}
            </h1>
            <div className="serif" style={{ fontSize: 'clamp(14px, 2vw, 17px)', fontStyle: 'italic', color: 'var(--gold-light)', marginBottom: 20 }}>
              {t.hero.sub}
            </div>
            <p style={{ fontSize: 14, color: '#9A8060', lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
              {t.hero.desc}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn-gold">
                🛍️ {t.hero.btn1}
              </Link>
              <Link href="#trust" className="btn-outline-light">
                {t.hero.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'var(--deep)', borderTop: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} data-grid="stats">
          <Stat num={String(productCount)} label={lang === 'th' ? 'พระเครื่อง' : lang === 'zh' ? '在售佛牌' : 'AMULETS'} />
          <Stat num="100%" label={lang === 'th' ? 'รับรองแท้' : lang === 'zh' ? '正品保证' : 'AUTHENTIC'} />
          <Stat num="150+" label={lang === 'th' ? 'ประเทศ' : lang === 'zh' ? '国家' : 'COUNTRIES'} />
          <Stat num="24/7" label={lang === 'th' ? 'บริการ' : lang === 'zh' ? '客服' : 'SUPPORT'} />
        </div>
      </div>

      {/* Trust */}
      <div id="trust" style={{ background: 'var(--cream)', padding: '60px 24px', borderBottom: '1px solid var(--cream-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: 10 }}>
              ✦ WHY US ✦
            </div>
            <h2 className={titleClass} style={{ fontSize: 28, fontWeight: lang === 'en' ? 300 : 600, color: 'var(--text)', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
              {lang === 'th' ? 'ทำไมต้องเลือกเรา' : lang === 'zh' ? '为什么选择我们' : 'Why Choose Us'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} data-grid="trust">
            <TrustCol icon="🏛️" t={t.trust.t1} d={t.trust.d1} />
            <TrustCol icon="🌏" t={t.trust.t2} d={t.trust.d2} />
            <TrustCol icon="📜" t={t.trust.t3} d={t.trust.d3} />
            <TrustCol icon="💬" t={t.trust.t4} d={t.trust.d4} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-grid="stats"], [data-grid="trust"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ padding: '24px 16px', textAlign: 'center', borderRight: '1px solid #2A1E08' }}>
      <div className="serif" style={{ fontSize: 30, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
      <div className="serif" style={{ fontSize: 10, color: '#6B5730', letterSpacing: 2, marginTop: 6, fontStyle: 'italic' }}>{label}</div>
    </div>
  );
}

function TrustCol({ icon, t, d }: { icon: string; t: string; d: string }) {
  return (
    <div className="card" style={{ padding: 24, textAlign: 'center', transition: 'all 0.2s' }}
         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div className="serif" style={{ fontSize: 14, color: 'var(--gold-dark)', marginBottom: 8, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase' }}>{t}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>{d}</div>
    </div>
  );
}
