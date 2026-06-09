'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IcoSearch, IcoCart, IcoUser, IcoPhone, IcoMail } from '@/components/icons';
import { useLang } from './LangProvider';
import { useCart } from './CartProvider';
import { useWishlist } from './WishlistProvider';
import { getDict, langNames, langs } from '@/lib/i18n';
import { createBrowserClient } from '@supabase/ssr';

export default function Header() {
  const { lang, setLang } = useLang();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const t = getDict(lang);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // ESC to close drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  return (
    <>
      {/* Top language bar */}
      <div style={{ background: 'var(--deep)', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2A1E08' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 11, color: '#6B5730', letterSpacing: 1 }} className="hide-mobile">
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><IcoPhone size={13} /> +66 89 815 7535</span>
          <span style={{ color: '#3A2A10' }}>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><IcoMail size={13} /> dansiamamulets2@gmail.com</span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ color: '#6B5730', fontSize: 10, marginRight: 8, letterSpacing: 2 }} className="hide-mobile">LANG</span>
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={`Switch to ${langNames[l]}`}
              aria-pressed={lang === l}
              style={{
                background: lang === l ? 'var(--gold)' : 'transparent',
                border: '1px solid ' + (lang === l ? 'var(--gold)' : '#3A2A10'),
                color: lang === l ? 'var(--deep)' : 'var(--gold)',
                padding: '3px 12px',
                fontSize: 11,
                letterSpacing: 1,
                borderRadius: 2,
                fontFamily: l === 'zh' ? "'Noto Serif TC', serif" : "'Cormorant Garamond', serif",
                fontWeight: lang === l ? 600 : 400,
              }}
            >
              {langNames[l]}
            </button>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        style={{
          background: 'var(--deep)',
          padding: scrolled ? '12px 24px' : '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #2A1E08',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: 'padding 0.2s',
        }}
      >
        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label={t.nav.menu}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gold)',
            fontSize: 22,
            padding: 8,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ☰
        </button>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: 24, alignItems: 'center', flex: 1 }}>
          <Link href="/" style={navLinkStyle}>{t.nav.home}</Link>
          <Link href="/shop" style={navLinkStyle}>{t.nav.shop}</Link>
          <Link href="/about" style={navLinkStyle}>{t.nav.about}</Link>
          <Link href="/faq" style={navLinkStyle}>FAQ</Link>
          <Link href="/blog" style={navLinkStyle}>{lang === 'th' ? 'บทความ' : lang === 'zh' ? '文章' : 'Blog'}</Link>
        </nav>

        {/* Logo center */}
        <Link
          href="/"
          style={{ textAlign: 'center', flex: '0 0 auto', transition: 'transform 0.2s' }}
          aria-label="Dan Siam Amulets — Home"
        >
          <div
            className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'}
            style={{
              fontSize: scrolled ? 18 : 22,
              fontWeight: 600,
              color: 'var(--gold)',
              letterSpacing: 2,
              lineHeight: 1,
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              transition: 'font-size 0.2s',
            }}
          >
            {lang === 'th' ? 'พระเครื่อง แดนสยาม' : lang === 'zh' ? '丹暹罗佛牌' : 'Dan Siam Amulets'}
          </div>
          {!scrolled && (
            <div style={{ fontSize: 10, color: '#6B5730', letterSpacing: 1, marginTop: 4, fontFamily: "'Sarabun', sans-serif" }}>
              {lang === 'th' ? 'พระเครื่องแท้ รับรองคุณภาพ' : lang === 'zh' ? '正品泰国佛牌' : 'AUTHENTIC SACRED THAI AMULETS'}
            </div>
          )}
        </Link>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Link
            href="/search"
            aria-label="Search"
            style={{ color: 'var(--gold)', padding: '8px 6px', opacity: 0.8, display: 'flex', alignItems: 'center' }}
          >
            <IcoSearch size={20} />
          </Link>
          <Link
            href="/wishlist"
            aria-label={`${t.nav.wishlist}${wishCount > 0 ? ` (${wishCount})` : ''}`}
            style={{ position: 'relative', color: 'var(--gold)', padding: '8px 6px', display: 'flex', alignItems: 'center', opacity: wishCount > 0 ? 1 : 0.7 }}
          >
            <svg width={21} height={21} viewBox="0 0 24 24" fill={wishCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishCount > 0 && (
              <span style={{ background: '#7A1A1A', color: '#fff', fontSize: 10, minWidth: 18, height: 18, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 2, right: 0, fontFamily: 'sans-serif', padding: '0 5px', fontWeight: 600, border: '2px solid var(--deep)' }}>
                {wishCount}
              </span>
            )}
          </Link>
          {userEmail ? (
            <Link href="/orders" style={{ ...navLinkStyle, fontSize: 11, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }} className="hide-mobile" title={userEmail}>
              <IcoUser size={14} /> {userEmail.split('@')[0]}
            </Link>
          ) : (
            <Link href="/signin" style={{ ...navLinkStyle, fontSize: 11 }} className="hide-mobile">
              {t.nav.signin}
            </Link>
          )}
          <Link
            href="/cart"
            aria-label={`${t.nav.cart} (${count})`}
            style={{
              position: 'relative',
              color: 'var(--gold)',
              fontSize: 22,
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.2s',
            }}
          >
            <IcoCart size={22} />
            {count > 0 && (
              <span
                style={{
                  background: '#7A1A1A',
                  color: '#fff',
                  fontSize: 10,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 2,
                  right: 0,
                  fontFamily: 'sans-serif',
                  padding: '0 5px',
                  fontWeight: 600,
                  border: '2px solid var(--deep)',
                  animation: count ? 'scaleIn 0.3s ease' : 'none',
                }}
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />
      <aside
        className={`drawer ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-label={t.nav.menu}
        aria-modal="true"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #3A2A10' }}>
          <div className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 18, color: 'var(--gold)', fontWeight: 600, fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
            {lang === 'th' ? 'พระเครื่อง แดนสยาม' : lang === 'zh' ? '丹暹罗佛牌' : 'Dan Siam Amulets'}
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label={t.nav.close}
            style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontSize: 28, cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { href: '/', label: t.nav.home, icon: <NavIconHome /> },
            { href: '/shop', label: t.nav.shop, icon: <NavIconShop /> },
            { href: '/about', label: t.nav.about, icon: <NavIconAbout /> },
            { href: '/faq', label: 'FAQ', icon: <NavIconFaq /> },
            { href: '/blog', label: lang === 'th' ? 'บทความ' : lang === 'zh' ? '文章' : 'Blog', icon: '✍️' },
            { href: '/wishlist', label: `${t.nav.wishlist}${wishCount > 0 ? ` (${wishCount})` : ''}`, icon: <NavIconHeart filled={wishCount > 0} /> },
            { href: '/cart', label: `${t.nav.cart}${count > 0 ? ` (${count})` : ''}`, icon: <NavIconCart /> },
            { href: '/orders', label: t.nav.orders, icon: <NavIconOrders /> },
            { href: '/signin', label: t.nav.signin, icon: <NavIconUser /> },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '14px 12px',
                color: 'var(--gold-light)',
                fontSize: 16,
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #3A2A10' }}>
          <div style={{ fontSize: 10, color: '#6B5730', letterSpacing: 2, marginBottom: 12 }}>CONTACT</div>
          <div style={{ fontSize: 13, color: 'var(--gold-light)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><IcoPhone size={13} /> +66 89 815 7535</div>
          <div style={{ fontSize: 13, color: 'var(--gold-light)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}><IcoMail size={13} /> dansiamamulets2@gmail.com</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: lang === l ? 'var(--gold)' : 'transparent',
                  border: '1px solid ' + (lang === l ? 'var(--gold)' : '#3A2A10'),
                  color: lang === l ? 'var(--deep)' : 'var(--gold-light)',
                  fontSize: 12,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: l === 'zh' ? "'Noto Serif TC', serif" : "'Cormorant Garamond', serif",
                  fontWeight: lang === l ? 600 : 400,
                }}
              >
                {langNames[l]}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

const NI = 20;
const ni = { width: NI, height: NI, fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function NavIconHome() { return <svg {...ni} viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>; }
function NavIconShop() { return <svg {...ni} viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
function NavIconAbout() { return <svg {...ni} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>; }
function NavIconFaq() { return <svg {...ni} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function NavIconCart() { return <svg {...ni} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>; }
function NavIconOrders() { return <svg {...ni} viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>; }
function NavIconUser() { return <svg {...ni} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function NavIconHeart({ filled }: { filled: boolean }) { return <svg {...ni} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 0 : 1.6}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }

const navLinkStyle: React.CSSProperties = {
  color: 'var(--gold)',
  fontSize: 12,
  letterSpacing: 2,
  opacity: 0.85,
  fontFamily: "'Cormorant Garamond', serif",
  textTransform: 'uppercase',
  padding: '8px 4px',
  position: 'relative',
};
