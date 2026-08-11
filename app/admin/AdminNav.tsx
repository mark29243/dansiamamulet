'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OrderNotifier from './OrderNotifier';
import { useLang } from '@/components/LangProvider';
import { langNames, langs } from '@/lib/i18n';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/orders', label: 'Orders', icon: '📦', badge: true },
  { href: '/admin/products', label: 'Products', icon: '🪬' },
  { href: '/admin/accounting', label: 'Accounting', icon: '💰' },
  { href: '/admin/homepage', label: 'Homepage', icon: '🖼️' },
  { href: '/admin/blog', label: 'Blog', icon: '✍︎' },
  { href: '/admin/import', label: 'Import', icon: '⬆︎' },
  { href: '/admin/reviews', label: 'Reviews', icon: '★' },
  { href: '/admin/description-review', label: 'SEO Review', icon: '📝' },
  { href: '/admin/remove-bg', label: 'BG Remover', icon: '✂️' },
];

export default function AdminNav({ email, role }: { email: string; role: string }) {
  const pathname = usePathname();
  const [pendingOrders, setPendingOrders] = useState(0);
  const { lang, setLang } = useLang();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'white',
      borderBottom: '1px solid #EDEBE8',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <OrderNotifier onNewOrders={setPendingOrders} />

      {/* Row 1: logo + email */}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 48,
        paddingLeft: 16, paddingRight: 16,
        gap: 8,
      }}>
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: '#F4EFE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🪬</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1208', letterSpacing: '0.02em' }}>Admin</span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Language switcher */}
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: '3px 8px',
                borderRadius: 6,
                border: '1px solid ' + (lang === l ? '#C9A96E' : '#EDEBE8'),
                background: lang === l ? '#F4EFE5' : 'transparent',
                color: lang === l ? '#1A1208' : '#6B6760',
                fontSize: 11,
                fontWeight: lang === l ? 700 : 400,
                cursor: 'pointer',
                lineHeight: 1.4,
              }}
            >
              {langNames[l]}
            </button>
          ))}
        </div>

        {/* User pill + logout */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: '#F9F7F4', border: '1px solid #EDEBE8' }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8E0D2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#5C4D2E', flexShrink: 0 }}>
            {email?.[0]?.toUpperCase() ?? 'A'}
          </span>
          <span style={{ fontSize: 12, color: '#6B6760', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email}
          </span>
          <button
            onClick={async () => {
              const { createClient } = await import('@/lib/supabase/client');
              await createClient().auth.signOut();
              window.location.href = '/signin';
            }}
            style={{ marginLeft: 2, padding: '1px 6px', fontSize: 10, color: '#9B8868', border: '1px solid #DEDAD3', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
            title="Sign out"
          >
            ออก
          </button>
        </div>
      </div>

      {/* Row 2: nav items */}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 40,
        paddingLeft: 8, paddingRight: 8,
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid #F3F0EB',
        scrollbarWidth: 'none',
      }}>
        {NAV.map(({ href, label, icon, badge }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);
          const showBadge = badge && pendingOrders > 0;
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 10px',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#1A1208' : '#6B6760',
              background: active ? '#F4EFE5' : 'transparent',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              position: 'relative',
              transition: 'background 0.15s, color 0.15s',
            }}>
              <span style={{ fontSize: 12, opacity: 0.8 }}>{icon}</span>
              {label}
              {showBadge && (
                <span style={{
                  position: 'absolute', top: -2, right: -4,
                  minWidth: 16, height: 16, borderRadius: 999,
                  background: '#DC2626', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px',
                  border: '2px solid white',
                  fontFamily: 'system-ui, sans-serif',
                  animation: 'pulse-badge 2s infinite',
                }}>
                  {pendingOrders}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
