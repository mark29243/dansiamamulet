'use client';
import { useState, useEffect } from 'react';
import { useLang } from './LangProvider';

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

  const desc = (th: string, en: string, zh: string) =>
    lang === 'th' ? th : lang === 'zh' ? zh : en;

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              <WeChatLogo size={22} /> WeChat
            </div>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
              {desc('สแกน QR เพื่อเพิ่มเป็นเพื่อน', 'Scan QR to add as friend', '扫描二维码添加好友')}
            </p>
            <img src="/wechat-qr.jpg" alt="WeChat QR" style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
            <p style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>ID: jajackthai</p>
            <button
              onClick={() => setShowQR(false)}
              style={{
                background: '#07C160', color: '#fff', border: 'none',
                padding: '10px 24px', borderRadius: 100, cursor: 'pointer', fontSize: 13,
              }}
            >
              {desc('ปิด', 'Close', '关闭')}
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
        {/* Facebook */}
        <ContactRow
          href="https://www.facebook.com/Jackyamulet999"
          color="#1877F2"
          logo={<FacebookLogo size={20} />}
          label="Facebook"
          detail={desc('ส่งข้อความ', 'Message us', '发消息')}
          delay={open ? 0 : 0}
          open={open}
        />

        {/* WeChat — opens QR popup */}
        <button
          onClick={() => setShowQR(true)}
          style={{
            background: '#fff', padding: '10px 16px', borderRadius: 100,
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'flex',
            alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer',
            color: 'var(--text)', fontSize: 13, fontFamily: 'inherit',
            borderLeft: '3px solid #07C160',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.3s',
            transitionDelay: open ? '30ms' : '0ms',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', color: '#07C160' }}><WeChatLogo size={20} /></span>
          <span style={{ fontWeight: 600, minWidth: 70 }}>WeChat</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc('แชทผ่าน WeChat', 'Chat on WeChat', '微信聊天')}</span>
        </button>

        {/* LINE */}
        <ContactRow
          href="https://lin.ee/reGR6nC"
          color="#06C755"
          logo={<LineLogo size={20} />}
          label="LINE"
          detail={desc('แชทผ่าน LINE', 'Chat on LINE', 'LINE 聊天')}
          delay={open ? 60 : 0}
          open={open}
        />

        {/* Email */}
        <ContactRow
          href="mailto:dansiamamulets2@gmail.com"
          color="#EA4335"
          logo={<EmailLogo size={20} />}
          label="Email"
          detail={desc('ส่งอีเมล', 'Send Email', '发邮件')}
          delay={open ? 90 : 0}
          open={open}
          newTab={false}
        />
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
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(201,168,76,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', zIndex: 100,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        {open ? (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  );
}

function ContactRow({
  href, color, logo, label, detail, delay, open, newTab = true,
}: {
  href: string; color: string; logo: React.ReactNode; label: string;
  detail: string; delay: number; open: boolean; newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        background: '#fff', padding: '10px 16px', borderRadius: 100,
        boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'flex',
        alignItems: 'center', gap: 10, textDecoration: 'none',
        color: 'var(--text)', fontSize: 13,
        borderLeft: `3px solid ${color}`,
        transform: open ? 'translateY(0)' : 'translateY(20px)',
        opacity: open ? 1 : 0,
        transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.3s',
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)'; }}
    >
      <span style={{ display: 'flex', alignItems: 'center', color }}>{logo}</span>
      <span style={{ fontWeight: 600, minWidth: 70 }}>{label}</span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{detail}</span>
    </a>
  );
}

/* Brand SVG logos */

function FacebookLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function WeChatLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .186-.059l2.114-1.225a.59.59 0 0 1 .292-.079.6.6 0 0 1 .166.023c.692.19 1.437.296 2.196.296h.373c-.27-.685-.42-1.418-.42-2.18 0-3.72 3.558-6.733 7.938-6.733.28 0 .556.016.83.045C15.87 4.822 12.6 2.188 8.69 2.188zm-2.35 4.045c.6 0 1.086.488 1.086 1.09a1.088 1.088 0 1 1-2.172 0c0-.602.487-1.09 1.086-1.09zm4.7 0c.6 0 1.086.488 1.086 1.09a1.088 1.088 0 1 1-2.172 0c0-.602.487-1.09 1.086-1.09zM15.77 9.53c-3.793 0-6.872 2.742-6.872 6.124 0 3.38 3.079 6.124 6.872 6.124a8.1 8.1 0 0 0 1.93-.236.51.51 0 0 1 .145-.021.51.51 0 0 1 .254.069l1.736 1.005a.283.283 0 0 0 .161.051.252.252 0 0 0 .252-.252.41.41 0 0 0-.042-.184l-.339-1.285a.514.514 0 0 1 .185-.578C21.44 19.35 22.64 17.62 22.64 15.654c0-3.382-3.079-6.124-6.872-6.124zm-2.117 3.434c.523 0 .947.425.947.949a.948.948 0 1 1-1.894 0c0-.524.424-.949.947-.949zm4.234 0c.523 0 .947.425.947.949a.948.948 0 1 1-1.894 0c0-.524.424-.949.947-.949z"/>
    </svg>
  );
}

function LineLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}

function EmailLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}
