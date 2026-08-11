'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/components/LangProvider';
import { IcoAmulet } from '@/components/icons';

type MinProduct = { category: string; images?: string[] | null };

function pickImage(products: MinProduct[], cat: string): string | null {
  const pool = products.filter((p) => p.category?.includes(cat) && p.images?.[0]);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)].images![0];
}

export default function HomeHero({ productCount, products }: { productCount: number; products: MinProduct[] }) {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const catImages = useMemo(() => ({
    'พระสมเด็จ': mounted ? pickImage(products, 'พระสมเด็จ') : null,
    'หลวงพ่อทวด': mounted ? pickImage(products, 'หลวงพ่อทวด') : null,
    'เหรียญ': mounted ? pickImage(products, 'เหรียญ') : null,
    'พระเกจิอาจารย์': mounted ? pickImage(products, 'พระเกจิอาจารย์') : null,
  }), [products, mounted]);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0D0804 0%, #1A1208 55%, #201608 100%)',
        minHeight: 480, display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* center glow */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container animate-fade-up" data-hero-inner="" style={{
          position: 'relative', zIndex: 2, padding: '72px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* tag pill */}
          <div data-tag-pill="" style={{
            display: 'inline-flex', gap: 6, marginBottom: 24,
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            padding: '7px 18px', borderRadius: 100,
            fontSize: 12, color: 'var(--gold-light)', letterSpacing: 1,
          }}>
            {lang === 'th' ? 'พระแท้ · รับประกันทุกองค์ · ส่งรวดเร็ว 100%'
              : lang === 'zh' ? '正品佛牌 · 全件保证 · 快速配送'
              : 'Authentic · Certified · Fast Worldwide Shipping'}
          </div>

          <h1 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700,
            color: '#fff', lineHeight: 1.2, marginBottom: 20,
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

          <p style={{ fontSize: 15, color: '#9A8060', lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
            {lang === 'th'
              ? 'คัดสรรพระแท้จากเกจิดังทั่วประเทศไทย ทุกองค์รับประกันความแท้'
              : lang === 'zh'
              ? '精选自泰国著名高僧的正品佛牌，每件均提供真品保证'
              : 'Authentic amulets sourced from Thailand\'s most revered monks, every piece certified genuine.'}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <IconShop /> {lang === 'th' ? 'ดูสินค้าทั้งหมด' : lang === 'zh' ? '查看全部' : 'Browse All'}
            </Link>
            <Link href="/about" className="btn-outline-light">
              {lang === 'th' ? 'เกี่ยวกับเรา' : lang === 'zh' ? '关于我们' : 'About Us'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Trust bar ────────────────────────────────────────── */}
      <div style={{ background: '#0F0B04', borderTop: '1px solid #2A1E08', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} data-grid="trust-bar">
          <TrustItem icon={<IconShieldCheck />}
            t1={lang === 'th' ? 'รับประกันพระแท้' : lang === 'zh' ? '正品保证' : 'Authenticity'}
            t2={lang === 'th' ? 'คืนเงินเต็มจำนวน' : lang === 'zh' ? '全额退款' : 'Full Refund'} />
          <TrustItem icon={<IconTruck />}
            t1={lang === 'th' ? 'จัดส่งเร็ว ปลอดภัย' : lang === 'zh' ? '快速安全配送' : 'Fast & Safe'}
            t2={lang === 'th' ? 'แพ็คอย่างดี' : lang === 'zh' ? '精心包装' : 'Well Packed'} />
          <TrustItem icon={<IconAward />}
            t1={lang === 'th' ? 'เชื่อถือได้' : lang === 'zh' ? '值得信赖' : 'Trusted'}
            t2={lang === 'th' ? 'ประสบการณ์กว่า 20 ปี' : lang === 'zh' ? '20年以上经验' : '20+ Years Exp.'} />
          <TrustItem icon={<IconChat />}
            t1={lang === 'th' ? 'บริการลูกค้า' : lang === 'zh' ? '客户服务' : 'Customer Service'}
            t2={lang === 'th' ? 'ตอบไว เป็นกันเอง' : lang === 'zh' ? '快速友善回复' : 'Quick & Friendly'} />
        </div>
      </div>

      {/* ─── Popular categories ───────────────────────────────── */}
      <div data-cats-section="" style={{ background: 'var(--deep)', padding: '56px 24px' }}>
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
              cat="พระสมเด็จ" image={catImages['พระสมเด็จ']} />
            <CatCard
              name={lang === 'th' ? 'หลวงพ่อทวด' : lang === 'zh' ? '龙普托' : 'Luang Pu Tuad'}
              sub={lang === 'th' ? 'นิยมสะสม' : lang === 'zh' ? '收藏热门' : "Collector's Choice"}
              cat="หลวงพ่อทวด" image={catImages['หลวงพ่อทวด']} />
            <CatCard
              name={lang === 'th' ? 'เหรียญยอดนิยม' : lang === 'zh' ? '热门圣币' : 'Popular Coins'}
              sub={lang === 'th' ? 'หายาก' : lang === 'zh' ? '稀有' : 'Rare Pieces'}
              cat="เหรียญ" image={catImages['เหรียญ']} />
            <CatCard
              name={lang === 'th' ? 'พระเกจิอาจารย์' : lang === 'zh' ? '高僧佛牌' : 'Monk Amulets'}
              sub={lang === 'th' ? 'ทั่วประเทศ' : lang === 'zh' ? '全国各地' : 'Nationwide'}
              cat="พระเกจิอาจารย์" image={catImages['พระเกจิอาจารย์']} />
          </div>
        </div>
      </div>

      {/* ─── Guarantee banner ─────────────────────────────────── */}
      <div style={{ background: '#0D0804', borderTop: '1px solid #2A1E08', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 24px', gap: 20, flexWrap: 'wrap',
        }} data-guarantee="">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 48, height: 48, flexShrink: 0,
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)',
            }}><IconShieldCheck /></div>
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
          <Link href="/returns" data-guarantee-btn="" className="btn-outline-light" style={{ fontSize: 12, padding: '10px 20px', whiteSpace: 'nowrap' }}>
            {lang === 'th' ? 'ดูเงื่อนไขการรับประกัน' : lang === 'zh' ? '查看保证条款' : 'View Guarantee Terms'}
          </Link>
        </div>
      </div>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
          <StatItem icon={<IconAmulet />} num={String(productCount)}
            label={lang === 'th' ? 'พระเครื่อง\nรายการทั้งหมด' : lang === 'zh' ? '在售佛牌总数' : 'Total Amulets'} />
          <StatItem icon={<IconStar />} num="100%"
            label={lang === 'th' ? 'ความพึงพอใจ\nจากลูกค้า' : lang === 'zh' ? '客户满意度' : 'Customer Satisfaction'}
            href="/reviews" />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-grid="trust-bar"], [data-grid="cats"] { grid-template-columns: repeat(2,1fr) !important; }
          [data-hero-inner] { padding: 48px 20px !important; }
          [data-cats-section] { padding: 40px 16px !important; }
          [data-tag-pill] { font-size: 10px !important; padding: 6px 12px !important; text-align: center !important; }
          [data-guarantee] { flex-direction: column !important; align-items: flex-start !important; }
          [data-guarantee-btn] { width: 100% !important; text-align: center !important; }
          [data-trust-item]:nth-child(2n) { border-right: none !important; }
          [data-trust-item]:nth-child(1),
          [data-trust-item]:nth-child(2) { border-bottom: 1px solid #1E1508 !important; }
        }
        @media (max-width: 400px) {
          [data-tag-pill] { font-size: 9px !important; }
        }
      `}</style>
    </>
  );
}

function TrustItem({ icon, t1, t2 }: { icon: React.ReactNode; t1: string; t2: string }) {
  return (
    <div data-trust-item="" style={{
      padding: '20px 16px', textAlign: 'center',
      borderRight: '1px solid #1E1508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <div style={{ color: 'var(--gold)', marginBottom: 2 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-light)' }}>{t1}</div>
      <div style={{ fontSize: 11, color: '#6B5730' }}>{t2}</div>
    </div>
  );
}

function CatCard({ name, sub, cat, image }: { name: string; sub: string; cat: string; image?: string | null }) {
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
          position: 'relative', overflow: 'hidden',
        }}>
          {image ? (
            <Image src={image} alt={name} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
          ) : (
            <span style={{ opacity: 0.25, color: 'var(--gold)', display: 'flex' }}><IcoAmulet size={44} strokeWidth={1.5} /></span>
          )}
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div className="serif" style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 2 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#6B5730' }}>{sub}</div>
        </div>
      </div>
    </Link>
  );
}

function StatItem({ icon, num, label, href }: { icon: React.ReactNode; num: string; label: string; href?: string }) {
  const inner = (
    <>
      <div style={{ color: 'var(--gold)', marginBottom: 4 }}>{icon}</div>
      <div className="serif" style={{ fontSize: 30, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: 11, color: '#6B5730', marginTop: 6, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</div>
      {href && <div style={{ fontSize: 10, color: 'var(--gold)', marginTop: 4, letterSpacing: 1, opacity: 0.7 }}>→ รีวิว</div>}
    </>
  );
  const style: React.CSSProperties = {
    padding: '28px 16px', textAlign: 'center',
    borderRight: '1px solid #2A1E08',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    ...(href ? { cursor: 'pointer', transition: 'opacity 0.15s' } : {}),
  };
  if (href) return <Link href={href} style={{ ...style, textDecoration: 'none' }}>{inner}</Link>;
  return <div style={style}>{inner}</div>;
}

const S = 28;
function IconShieldCheck() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
function IconTruck() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 5v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}
function IconAward() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="7"/>
      <polyline points="9 9 11 11 15 7"/>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
    </svg>
  );
}
function IconChat() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconShop() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
function IconAmulet() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
