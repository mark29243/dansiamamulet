'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OrderNotifier from './OrderNotifier';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/orders', label: 'Orders', icon: '📦', badge: true },
  { href: '/admin/products', label: 'Products', icon: '🪬' },
  { href: '/admin/blog', label: 'Blog', icon: '✍︎' },
  { href: '/admin/import', label: 'Import', icon: '⬆︎' },
  { href: '/admin/reviews', label: 'Reviews', icon: '★' },
  { href: '/admin/description-review', label: 'SEO Review', icon: '📝' },
];

export default function AdminNav({ email, role }: { email: string; role: string }) {
  const pathname = usePathname();
  const [pendingOrders, setPendingOrders] = useState(0);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 56,
      background: 'white',
      borderBottom: '1px solid #EDEBE8',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      gap: 4,
    }}>
      <OrderNotifier onNewOrders={setPendingOrders} />

      {/* Logo mark */}
      <Link href="/admin" style={{ marginRight: 16, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', flexShrink: 0 }}>
        <span style={{ width: 28, height: 28, borderRadius: 7, background: '#F4EFE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🪬</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1208', letterSpacing: '0.02em' }}>Admin</span>
      </Link>

      {/* Nav items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, overflowX: 'auto' }}>
        {NAV.map(({ href, label, icon, badge }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);
          const showBadge = badge && pendingOrders > 0;
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px',
              borderRadius: 7,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#1A1208' : '#6B6760',
              background: active ? '#F4EFE5' : 'transparent',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s, color 0.15s',
              position: 'relative',
            }}>
              <span style={{ fontSize: 12, opacity: 0.8 }}>{icon}</span>
              {label}
              {showBadge && (
                <span style={{
                  position: 'absolute', top: -2, right: -4,
                  minWidth: 18, height: 18, borderRadius: 999,
                  background: '#DC2626', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 5px',
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

      {/* User pill */}
      <div style={{
        flexShrink: 0, marginLeft: 12,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '4px 10px',
        borderRadius: 20,
        background: '#F9F7F4',
        border: '1px solid #EDEBE8',
      }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8E0D2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#5C4D2E' }}>
          {email?.[0]?.toUpperCase() ?? 'A'}
        </span>
        <span style={{ fontSize: 12, color: '#6B6760', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email}
        </span>
      </div>
    </nav>
  );
}
