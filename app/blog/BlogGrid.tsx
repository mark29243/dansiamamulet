'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  title_th: string | null;
  title_zh: string | null;
  excerpt: string | null;
  excerpt_th: string | null;
  excerpt_zh: string | null;
  cover_image: string | null;
  category: string | null;
  created_at: string;
};

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLang();

  function getTitle(post: BlogPost) {
    if (lang === 'zh') return post.title_zh || post.title_th || post.title;
    if (lang === 'en') return post.title    || post.title_th;
    return post.title_th || post.title;
  }

  function getExcerpt(post: BlogPost) {
    if (lang === 'zh') return post.excerpt_zh || post.excerpt_th || post.excerpt;
    if (lang === 'en') return post.excerpt    || post.excerpt_th;
    return post.excerpt_th || post.excerpt;
  }

  if (!posts.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <p>กำลังเตรียมบทความ โปรดติดตาม...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}?lang=${lang}`} style={{ textDecoration: 'none' }}>
          <article className="card blog-card animate-fade-in" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Cover */}
            <div style={{ height: 200, background: 'var(--cream-dark)', overflow: 'hidden', flexShrink: 0 }}>
              {post.cover_image
                ? <img src={post.cover_image} alt={getTitle(post) || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🏯</div>
              }
            </div>

            {/* Content */}
            <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {post.category && (
                <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  {post.category}
                </span>
              )}
              <h2 className="serif" style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>
                {getTitle(post)}
              </h2>
              {getExcerpt(post) && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {getExcerpt(post)}
                </p>
              )}
              <div style={{ marginTop: 'auto', paddingTop: 12, fontSize: 11, color: 'var(--text-faint)' }}>
                {new Date(post.created_at).toLocaleDateString(
                  lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-GB',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
