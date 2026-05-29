'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { IcoHome, IcoShop } from '@/components/icons';

export default function NotFound() {
  const { lang } = useLang();
  const t = getDict(lang);

  return (
    <div className="container" style={{ padding: '80px 24px', maxWidth: 540, textAlign: 'center' }}>
      <div style={{ fontSize: 100, color: 'var(--gold)', marginBottom: 12, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1 }}>404</div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
        {lang === 'th' ? 'ไม่พบหน้าที่คุณค้นหา' : lang === 'zh' ? '页面未找到' : 'Page not found'}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>
        {lang === 'th'
          ? 'หน้าที่คุณค้นหาอาจถูกย้ายหรือไม่มีอยู่แล้ว'
          : lang === 'zh'
          ? '您查找的页面可能已被移除或不存在'
          : 'The page you are looking for may have been moved or no longer exists.'}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IcoHome size={14} /> {t.nav.home}
        </Link>
        <Link href="/shop" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IcoShop size={14} /> {t.nav.shop}
        </Link>
      </div>
    </div>
  );
}
