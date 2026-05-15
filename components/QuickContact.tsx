'use client';

import { useState, useEffect } from 'react';
import { useLang } from './LangProvider';

const CONTACTS = [
  { id: 'line', label: 'LINE', icon: '💬', color: '#06C755', href: 'https://line.me/R/ti/p/jarunpim', desc: { th: 'แชทผ่าน LINE', en: 'Chat on LINE', zh: 'LINE 聊天' } },
  { id: 'wechat', label: 'WeChat', icon: '💬', color: '#7BB32E', href: 'weixin://dl/chat?dansiam', desc: { th: 'แชทผ่าน WeChat', en: 'Chat on WeChat', zh: '微信聊天' } },
  { id: 'whatsapp', label: 'WhatsApp', icon: '📱', color: '#25D366', href: 'https://wa.me/66812345678', desc: { th: 'แชท WhatsApp', en: 'WhatsApp Chat', zh: 'WhatsApp' } },
  { id: 'email', label: 'Email', icon: '✉', color: '#8B6914', href: 'mailto:dansiamamulets2@gmail.com', desc: { th: 'ส่งอีเมล', en: 'Send Email', zh: '发邮件' } },
];

export default function QuickContact() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Show after small delay to avoid hydration jank
    const t = setTimeout(() => setHidden(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Contact options */}
      <div
        style={{
          position: 'fixed',
          bottom: 90,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 90,
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {CONTACTS.map((c, i) => (
          <a
            key={c.id}
            href={c.href}
            target={c.id !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              background: '#fff',
              padding: '10px 16px',
              borderRadius: 100,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'inherit',
              transition: 'transform 0.2s, box-shadow 0.2s',
              transitionDelay: open ? `${i * 30}ms` : '0ms',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              animationDelay: `${i * 50}ms`,
              borderLeft: `3px solid ${c.color}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)'; }}
          >
            <span style={{ fontSize: 18 }}>{c.icon}</span>
            <span style={{ fontWeight: 600, minWidth: 70 }}>{c.label}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.desc[lang]}</span>
          </a>
        ))}
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contact us"
        aria-expanded={open}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open ? 'var(--burgundy)' : 'var(--gold)',
          color: open ? '#fff' : 'var(--deep)',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
          boxShadow: open ? '0 6px 20px rgba(92,26,26,0.4)' : '0 6px 20px rgba(201,168,76,0.4)',
          zIndex: 91,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        {open ? '×' : '💬'}
      </button>

      <style>{`
        @media (max-width: 768px) {
          button[aria-label="Contact us"] { bottom: 80px !important; }
          div:has(> a[href*="line"]) { bottom: 146px !important; }
        }
      `}</style>
    </>
  );
}
