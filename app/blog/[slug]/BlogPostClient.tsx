'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { useLang } from '@/components/LangProvider';
import { getDict, getCatName } from '@/lib/i18n';

type BlogPostProps = {
  post: {
    id?: number;
    title: string;
    title_th: string | null;
    title_zh: string | null;
    content: string;
    content_th: string | null;
    content_zh: string | null;
    excerpt: string | null;
    excerpt_th: string | null;
    excerpt_zh: string | null;
    category: string | null;
    cover_image: string | null;
    created_at: string;
    views: number;
    slug: string;
  };
};

export default function BlogPostClient({ post }: BlogPostProps) {
  const { lang } = useLang();
  const t = getDict(lang);
  const [viewCount, setViewCount] = useState(post.views ?? 0);

  useEffect(() => {
    const identifier = post.id || post.slug;
    if (identifier) {
      fetch(`/api/blog/${identifier}/view`, { method: 'POST' })
        .then(res => {
          if (res.ok) {
            setViewCount(prev => prev + 1);
          }
        })
        .catch(() => {});
    }
  }, [post.id, post.slug]);

  // Pick content by lang param
  const displayTitle = lang === 'en' ? (post.title || post.title_th)
    : lang === 'zh' ? (post.title_zh || post.title)
    : (post.title_th || post.title);
    
  const displayContent = lang === 'en' ? (post.content || post.content_th)
    : lang === 'zh' ? (post.content_zh || post.content_th)
    : (post.content_th || post.content);
    
  const displayExcerpt = lang === 'en' ? (post.excerpt || post.excerpt_th)
    : lang === 'zh' ? (post.excerpt_zh || post.excerpt_th)
    : (post.excerpt_th || post.excerpt);

  const cleanContent = (displayContent || '').replace(/<div class="copyright-notice"[\s\S]*?<\/div>/gi, '');

  const copyrightNotice = (lang === 'zh') ? {
    title: '版权与学术引用声明：',
    body: '本文所有历史研究文献、三语翻译文本及高精度微距影像均为 Dan Siam Amulets 之知识产权。允许非商业性质的学术学习与学术引用，但必须完整保留出处并附带指向本站的原始网页链接。严禁任何未经授权的商业复制、翻印或挪用影像之行为。'
  } : (lang === 'en') ? {
    title: 'Academic Citation & Copyright Policy:',
    body: 'All original essays, trilingual historical translations, and high-resolution studio photographs are protected intellectual property of Dan Siam Amulets. Non-commercial and scholarly citations are permitted strictly under the condition that full canonical URL attribution is credited to Dan Siam Amulets. Commercial scraping or unauthorized usage of studio imagery is strictly prohibited.'
  } : {
    title: 'ข้อกำหนดลิขสิทธิ์และมาตรฐานการอ้างอิงวิชาการ:',
    body: 'เนื้อหาบทความ งานวิจัยประวัติศาสตร์ งานแปลทั้ง ๓ ภาษา และภาพถ่ายสตูดิโอความละเอียดสูงทุกภาพ เป็นทรัพย์สินทางปัญญาของ Dan Siam Amulets ได้รับการคุ้มครองตามพระราชบัญญัติลิขสิทธิ์ พ.ศ. ๒๕๓๗ อนุญาตให้อ้างอิงเพื่อการศึกษาหรือเผยแพร่เชิงวิชาการโดยต้องระบุแหล่งที่มาและใส่ Canonical Hyperlink กลับมายังบทความต้นฉบับอย่างสมบูรณ์ ห้ามคัดลอก ดัดแปลง หรือนำภาพถ่ายไปใช้ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร'
  };

  const displayCategory = getCatName(post.category, lang);

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: 760 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 24 }}>
        <Link href="/">{t.blog.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/blog">{t.blog.blog}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{displayTitle}</span>
      </nav>

      {/* Meta */}
      <div style={{ marginBottom: 28 }}>
        {displayCategory && (
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: "'Cormorant Garamond', serif", display: 'block', marginBottom: 10 }}>
            {displayCategory}
          </span>
        )}
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, marginBottom: 14 }}>
          {displayTitle}
        </h1>
        {displayExcerpt && (
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>{displayExcerpt}</p>
        )}
        <div style={{ fontSize: 12, color: 'var(--text-faint)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span>{new Date(post.created_at).toLocaleDateString(
            lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-GB', 
            { day: 'numeric', month: 'long', year: 'numeric' }
          )}</span>
          <span>👁 {viewCount} {t.blog.views}</span>
        </div>
      </div>

      {/* Cover */}
      {post.cover_image && (
        <div
          style={{
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 36,
            background: 'var(--cream-dark)',
            border: '1px solid var(--cream-darker, rgba(0,0,0,0.06))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={displayTitle || ''}
            style={{
              maxWidth: '100%',
              maxHeight: '650px',
              width: 'auto',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain',
              borderRadius: 'var(--radius-lg)'
            }}
            loading="eager"
          />
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: 32 }} />

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
        style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)' }}
      />

      {/* Dynamic Single-Language Copyright Notice */}
      <div
        className="copyright-notice"
        style={{
          marginTop: 48,
          padding: 24,
          background: '#0f172a',
          borderLeft: '4px solid #d4af37',
          borderRadius: 8,
          fontSize: 13,
          color: '#94a3b8',
          lineHeight: 1.7,
        }}
      >
        <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          © 2026 Dan Siam Amulets Heritage Research Archive. All Rights Reserved.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: '#cbd5e1' }}>{copyrightNotice.title}</strong> {copyrightNotice.body}
        </p>
      </div>

      {/* Back */}
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
        <Link href="/blog" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          {t.blog.back}
        </Link>
      </div>
      
      <style>{`
        .blog-content h2 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--text); margin: 32px 0 14px; }
        .blog-content h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: var(--text); margin: 24px 0 10px; }
        .blog-content p  { margin-bottom: 18px; }
        .blog-content ul, .blog-content ol { padding-left: 24px; margin-bottom: 18px; }
        .blog-content li { margin-bottom: 8px; }
        .blog-content strong { color: var(--text); font-weight: 600; }
        .blog-content a  { color: var(--gold-dark); }
        .blog-content blockquote { border-left: 3px solid var(--gold); padding-left: 16px; color: var(--text-muted); font-style: italic; margin: 20px 0; }
      `}</style>
    </div>
  );
}
