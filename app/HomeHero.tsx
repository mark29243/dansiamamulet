'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';

export default function HomeHero({ productCount }: { productCount: number }) {
  const { lang } = useLang();

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0D0804 0%, #1A1208 55%, #201608 100%)',
        minHeight: 520, display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* glow behind image */}
        <div style={{
          position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container animate-fade-up" style={{
          position: 'relative', zIndex: 2, padding: '60px 24px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
        }} data-hero-grid="">
          {/* Left: text */}
          <div>
            {/* tag pill */}
            <div style={{
              display: 'inline-flex', gap: 6, marginBottom: 20,
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              padding: '6px 14px', borderRadius: 100,
              fontSize: 11, color: 'var(--gold-light)', letterSpacing: 0.5,
            }}>
              {lang === 'th' ? 'พระแท้ · รับประกันทุกองค์ · ส่งรวดเร็ว 100%'
                : lang === 'zh' ? '正品佛牌 · 全件保证 · 快速配送'
                : 'Authentic · Certified · Fast Worldwide Shipping'}
            </div>

            <h1 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{
              fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.15, marginBottom: 16,
            }}>
              {lang === 'th' ? (
                <>พระเครื่องไทยแท้<br /><span style={{ color: 'var(--gold)' }}>จากเกจิชั้นนำ</span></>
              ) : lang === 'zh' ? (
                <>正品泰国佛牌<br /><span style={{ color: 'var(--gold)' }}>源自著名高僧</span></>
              ) : (
                <><span style={{ fontStyle: 'italic', fontWeight: 300 }}>Authentic Thai</span><br />
                  <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Sacred Amulets</span></>
              )}
            </h1>

            <p style={{ fontSize: 14, color: '#9A8060', lineHeight: 1.8, marginBottom: 32, maxWidth: 400 }}>
              {lang === 'th'
                ? 'คัดสรรพระแท้จากเกจิดังทั่วประเทศไทย ทุกองค์รับประกันความแท้'
                : lang === 'zh'
                ? '精选自泰国著名高僧的正品佛牌，每件均提供真品保证'
                : 'Authentic amulets sourced from Thailand\'s most revered monks, every piece certified genuine.'}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn-gold">
                🎁 {lang === 'th' ? 'ดูสินค้าทั้งหมด' : lang === 'zh' ? '查看全部' : 'Browse All'}
              </Link>
              <Link href="/about" className="btn-outline-light">
                {lang === 'th' ? 'เกี่ยวกับเรา' : lang === 'zh' ? '关于我们' : 'About Us'}
              </Link>
            </div>
          </div>

          {/* Right: hero image (add later) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: 260, height: 320,
              background: 'rgba(201,168,76,0.04)',
              border: '1px dashed rgba(201,168,76,0.2)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 10, color: 'rgba(201,168,76,0.25)', fontSize: 12,
            }}>
              <span style={{ fontSize: 52 }}>🙏</span>
              <span>เพิ่มรูปพระได้ภายหลัง</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust bar ────────────────────────────────────────── */}
      <div style={{ background: '#0F0B04', borderTop: '1px solid #2A1E08', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} data-grid="trust-bar">
          <TrustItem icon="🛡"
            t1={lang === 'th' ? 'รับประกันพระแท้' : lang === 'zh' ? '正品保证' : 'Authenticity'}
            t2={lang === 'th' ? 'คืนเงินเต็มจำนวน' : lang === 'zh' ? '全额退款' : 'Full Refund'} />
          <TrustItem icon="🚚"
            t1={lang === 'th' ? 'จัดส่งเร็ว ปลอดภัย' : lang === 'zh' ? '快速安全配送' : 'Fast & Safe'}
            t2={lang === 'th' ? 'แพ็คอย่างดี' : lang === 'zh' ? '精心包装' : 'Well Packed'} />
          <TrustItem icon="✅"
            t1={lang === 'th' ? 'เชื่อถือได้' : lang === 'zh' ? '值得信赖' : 'Trusted'}
            t2={lang === 'th' ? 'ประสบการณ์กว่า 10 ปี' : lang === 'zh' ? '10年以上经验' : '10+ Years Exp.'} />
          <TrustItem icon="💬"
            t1={lang === 'th' ? 'บริการลูกค้า' : lang === 'zh' ? '客户服务' : 'Customer Service'}
            t2={lang === 'th' ? 'ตอบไว เป็นกันเอง' : lang === 'zh' ? '快速友善回复' : 'Quick & Friendly'} />
        </div>
      </div>

      {/* ─── Popular categories ───────────────────────────────── */}
      <div style={{ background: 'var(--deep)', padding: '56px 24px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: 10 }}>
              ✦ {lang === 'th' ? 'CATEGORIES' : lang === 'zh' ? '分类' : 'CATEGORIES'} ✦
            </div>
            <h2 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{
              fontSize: 26, fontWeight: lang === 'en' ? 300 : 600,
              color: '#fff', fontStyle: lang === 'en' ? 'italic' : 'normal',
            }}>
              {lang === 'th' ? 'หมวดหมู่ยอดนิยม' : lang === 'zh' ? '热门分类' : 'Popular Categories'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} data-grid="cats">
            <CatCard
              name={lang === 'th' ? 'พระสมเด็จ' : lang === 'zh' ? '崇迪佛牌' : 'Phra Somdej'}
              sub={lang === 'th' ? 'ยอดนิยม' : lang === 'zh' ? '最受欢迎' : 'Most Popular'}
              cat="พระสมเด็จ" />
            <CatCard
              name={lang === 'th' ? 'หลวงพ่อทวด' : lang === 'zh' ? '龙普托' : 'Luang Pu Tuad'}
              sub={lang === 'th' ? 'นิยมสะสม' : lang === 'zh' ? '收藏热门' : "Collector's Choice"}
              cat="หลวงพ่อทวด" />
            <CatCard
              name={lang === 'th' ? 'เหรียญยอดนิยม' : lang === 'zh' ? '热门圣币' : 'Popular Coins'}
              sub={lang === 'th' ? 'หายาก' : lang === 'zh' ? '稀有' : 'Rare Pieces'}
              cat="เหรียญ" />
            <CatCard
              name={lang === 'th' ? 'พระเกจิอาจารย์' : lang === 'zh' ? '高僧佛牌' : 'Monk Amulets'}
              sub={lang === 'th' ? 'ทั่วประเทศ' : lang === 'zh' ? '全国各地' : 'Nationwide'}
              cat="พระเกจิอาจารย์" />
          </div>
        </div>
      </div>

      {/* ─── Guarantee banner ─────────────────────────────────── */}
      <div style={{ background: '#0D0804', borderTop: '1px solid #2A1E08', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 24px', gap: 20, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 48, height: 48, flexShrink: 0,
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>🛡</div>
            <div>
              <div className="serif" style={{ fontSize: 15, fontWeight: 600, color: 'var(--gold)', marginBottom: 2 }}>
                {lang === 'th' ? 'รับประกันความแท้ 100%' : lang === 'zh' ? '100%正品保证' : '100% Authenticity Guarantee'}
              </div>
              <div style={{ fontSize: 12, color: '#7A6040' }}>
                {lang === 'th' ? 'หากตรวจพบว่าไม่แท้ ยินดีคืนเงินเต็มจำนวน'
                  : lang === 'zh' ? '如发现非正品，全额退款'
                  : 'Full refund if found to be inauthentic'}
              </div>
            </div>
          </div>
          <Link href="/returns" className="btn-outline-light" style={{ fontSize: 12, padding: '10px 20px', whiteSpace: 'nowrap' }}>
            {lang === 'th' ? 'ดูเงื่อนไขการรับประกัน' : lang === 'zh' ? '查看保证条款' : 'View Guarantee Terms'}
          </Link>
        </div>
      </div>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
          <StatItem icon="📿" num={String(productCount)}
            label={lang === 'th' ? 'พระเครื่อง\nรายการทั้งหมด' : lang === 'zh' ? '在售佛牌总数' : 'Total Amulets'} />
          <StatItem icon="🏆" num="100%"
            label={lang === 'th' ? 'ความพึงพอใจ\nจากลูกค้า' : lang === 'zh' ? '客户满意度' : 'Customer Satisfaction'} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-grid="trust-bar"], [data-grid="cats"] { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          [data-hero-grid] { grid-template-columns: 1fr !important; }
          [data-hero-grid] > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  );
}

function TrustItem({ icon, t1, t2 }: { icon: string; t1: string; t2: string }) {
  return (
    <div style={{
      padding: '20px 16px', textAlign: 'center',
      borderRight: '1px solid #1E1508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
    }}>
      <span style={{ fontSize: 26 }}>{icon}</span>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-light)' }}>{t1}</div>
      <div style={{ fontSize: 11, color: '#6B5730' }}>{t2}</div>
    </div>
  );
}

function CatCard({ name, sub, cat }: { name: string; sub: string; cat: string }) {
  return (
    <Link href={`/shop?category=${encodeURIComponent(cat)}`} style={{ textDecoration: 'none' }}>
      <div
        className="cat-card"
        style={{
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid #2A1E08',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div style={{
          aspectRatio: '1',
          background: 'rgba(201,168,76,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid #2A1E08',
        }}>
          <span style={{ fontSize: 44, opacity: 0.25 }}>🙏</span>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div className="serif" style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 2 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#6B5730' }}>{sub}</div>
        </div>
      </div>
    </Link>
  );
}

function StatItem({ icon, num, label }: { icon: string; num: string; label: string }) {
  return (
    <div style={{
      padding: '28px 16px', textAlign: 'center',
      borderRight: '1px solid #2A1E08',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      <span style={{ fontSize: 26, marginBottom: 4 }}>{icon}</span>
      <div className="serif" style={{ fontSize: 30, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: 11, color: '#6B5730', marginTop: 6, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</div>
    </div>
  );
}
