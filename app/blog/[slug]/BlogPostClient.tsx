'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/components/LangProvider';

type BlogPostProps = {
  post: {
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

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: 760 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 24 }}>
        <Link href="/">หน้าแรก</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/blog">Blog</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{displayTitle}</span>
      </nav>

      {/* Cover */}
      {post.cover_image && (
        <div style={{ width: '100%', height: 360, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 32, position: 'relative' }}>
          <Image src={post.cover_image} alt={displayTitle || ''} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: 'cover' }} priority />
        </div>
      )}

      {/* Meta */}
      <div style={{ marginBottom: 24 }}>
        {post.category && (
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: "'Cormorant Garamond', serif", display: 'block', marginBottom: 10 }}>
            {post.category}
          </span>
        )}
        <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, marginBottom: 12 }}>
          {displayTitle}
        </h1>
        {displayExcerpt && (
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>{displayExcerpt}</p>
        )}
        <div style={{ fontSize: 12, color: 'var(--text-faint)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span>{new Date(post.created_at).toLocaleDateString(
            lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-GB', 
            { day: 'numeric', month: 'long', year: 'numeric' }
          )}</span>
          <span>👁 {post.views} ครั้ง</span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: 32 }} />

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: displayContent || '' }}
        style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)' }}
      />

      {/* Back */}
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
        <Link href="/blog" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          ← กลับไปหน้า Blog
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
