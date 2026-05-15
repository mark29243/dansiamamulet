'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from './LangProvider';

const CONTACTS = [
  { id: 'line', label: 'LINE', icon: '💬', color: '#06C755', href: 'https://line.me/R/ti/p/jarunpim', desc: { th: 'แชทผ่าน LINE', en: 'Chat on LINE', zh: 'LINE 聊天' } },
  { id: 'wechat', label: 'WeChat', icon: '💬', color: '#7BB32E', href: 'weixin://dl/chat?jarunpim', desc: { th: 'แชทผ่าน WeChat', en: 'Chat on WeChat', zh: '微信聊天' }, qr: '/wechat-qr.jpg' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '📱', color: '#25D366', href: 'https://wa.me/66898157535', desc: { th: 'แชท WhatsApp', en: 'WhatsApp Chat', zh: 'WhatsApp' } },
  { id: 'email', label: 'Email', icon: '✉', color: '#8B6914', href: 'mailto:dansiamamulets2@gmail.com', desc: { th: 'ส่งอีเมล', en: 'Send Email', zh: '发邮件' } },
];

export default function QuickContact() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* WeChat QR Popup */}
      {showQR && (
        <div
          onClick={() => setShowQR(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16, padding: 24,
              textAlign: 'center', maxWidth: 280, width: '90%',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 8 }}>💬 WeChat</div>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
              {lang === 'th' ? 'สแกน QR เพื่อเพิ่มเป็นเพื่อน' : lang === 'zh' ? '扫描二维码添加好友' : 'Scan QR to add as friend'}
            </p>
            <img src="/wechat-qr.jpg" alt="WeChat QR" style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
            <p style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>ID: jarunpim</p>
            <button
              onClick={() => setShowQR(false)}
              style={{
                background: '#7BB32E', color: '#fff', border: 'none',
                padding: '10px 24px', borderRadius: 100, cursor: 'pointer', fontSize: 13,
              }}
            >
              {lang === 'th' ? 'ปิด' : lang === 'zh' ? '关闭' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Contact options */}
      <div
        style={{
          position: 'fixed', bottom: 90, right: 24,
          display: 'flex', flexDirection: 'column', gap: 8, zIndex: 90,
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {CONTACTS.map((c, i) => (
          c.id === 'wechat' ? (
            <button
              key={c.id}
              onClick={() => setShowQR(true)}
              style={{
                background: '#fff', padding: '10px 16px', borderRadius: 100,
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'flex',
                alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer',
                color: 'var(--text)', fontSize: 13, fontFamily: 'inherit',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transitionDelay: open ? `${i * 30}ms` : '0ms',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                borderLeft: `3px solid ${c.color}`,
              }}
            >
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <span style={{ fontWeight: 600, minWidth: 70 }}>{c.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.desc[lang as keyof typeof c.desc]}</span>
            </button>
          ) : (
            <a
              key={c.id}
              href={c.href}
              target={c.id !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                background: '#fff', padding: '10px 16px', borderRadius: 100,
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'flex',
                alignItems: 'center', gap: 10, textDecoration: 'none',
                color: 'var(--text)', fontSize: 13, fontFamily: 'inherit',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transitionDelay: open ? `${i * 30}ms` : '0ms',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                borderLeft: `3px solid ${c.color}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)'; }}
            >
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <span style={{ fontWeight: 600, minWidth: 70 }}>{c.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.desc[lang as keyof typeof c.desc]}</span>
            </a>
          )
        ))}
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contact us"
        aria-expanded={open}
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--gold)', color: 'var(--deep)',
          border: 'none', cursor: 'pointer', fontSize: 22,
          boxShadow: '0 4px 20px rgba(201,168,76,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', zIndex: 100,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        {open ? '✕' : '💬'}
      </button>
    </>
  );
}
