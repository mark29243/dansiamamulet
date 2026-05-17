'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLang } from './LangProvider';
import { useCart } from './CartProvider';
import { getDict, langNames, langs } from '@/lib/i18n';
import { createBrowserClient } from '@supabase/ssr';

export default function Header() {
  const { lang, setLang } = useLang();
  const { count } = useCart();
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
          <span>📞 +66 89 815 7535</span>
          <span style={{ color: '#3A2A10' }}>·</span>
          <span>✉ dansiamamulets2@gmail.com</span>
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
            <div className="serif" style={{ fontSize: 10, color: '#6B5730', letterSpacing: 3, fontStyle: 'italic', marginTop: 4 }}>
              {lang === 'th' ? 'พระเครื่องแท้ รับรองคุณภาพ' : lang === 'zh' ? '正品泰国佛牌' : 'AUTHENTIC SACRED THAI AMULETS'}
            </div>
          )}
        </Link>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Link
            href="/search"
            aria-label="Search"
            style={{ color: 'var(--gold)', fontSize: 18, padding: '8px 6px', opacity: 0.8, display: 'flex', alignItems: 'center' }}
          >
            🔍
          </Link>
          {userEmail ? (
            <Link href="/orders" style={{ ...navLinkStyle, fontSize: 11, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="hide-mobile" title={userEmail}>
              👤 {userEmail.split('@')[0]}
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
            🛒
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
            { href: '/', label: t.nav.home, icon: '🏠' },
            { href: '/shop', label: t.nav.shop, icon: '🛍️' },
            { href: '/about', label: t.nav.about, icon: '✦' },
            { href: '/faq', label: 'FAQ', icon: '?' },
            { href: '/cart', label: `${t.nav.cart}${count > 0 ? ` (${count})` : ''}`, icon: '🛒' },
            { href: '/orders', label: t.nav.orders, icon: '📦' },
            { href: '/signin', label: t.nav.signin, icon: '👤' },
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
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #3A2A10' }}>
          <div style={{ fontSize: 10, color: '#6B5730', letterSpacing: 2, marginBottom: 12 }}>CONTACT</div>
          <div style={{ fontSize: 13, color: 'var(--gold-light)', marginBottom: 8 }}>📞 +66 89 815 7535</div>
          <div style={{ fontSize: 13, color: 'var(--gold-light)', marginBottom: 16 }}>✉ dansiamamulets2@gmail.com</div>
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
