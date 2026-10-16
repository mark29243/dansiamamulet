'use client';

import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';

export default function BlogHeader() {
  const { lang } = useLang();
  const t = getDict(lang);

  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>
        {t.blog.badge}
      </div>
      <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--text)', marginBottom: 12 }}>
        {t.blog.title}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
        {t.blog.subtitle}
      </p>
    </div>
  );
}
