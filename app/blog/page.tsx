import { createAdminClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import './blog.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog · ความรู้พระเครื่อง · 佛牌知识',
  description: 'บทความความรู้เกี่ยวกับพระเครื่องไทย ประวัติวัด หลวงพ่อ วิธีบูชา และการสะสมพระเครื่อง | Thai amulet knowledge, temple history, veneration guides.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog · Dan Siam Amulets', url: '/blog', type: 'website' },
};

export default async function BlogPage() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from('blog_posts')
    .select('id, slug, title, title_th, title_zh, excerpt, excerpt_th, cover_image, category, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>
          ✦ KNOWLEDGE ✦
        </div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--text)', marginBottom: 12 }}>
          ความรู้พระเครื่อง
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
          บทความเกี่ยวกับพระเครื่องไทย ประวัติวัด หลวงพ่อ วิธีบูชา และการสะสม
        </p>
      </div>

      {!posts?.length ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <p>กำลังเตรียมบทความ โปรดติดตาม...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card blog-card animate-fade-in" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Cover */}
                <div style={{ height: 200, background: 'var(--cream-dark)', overflow: 'hidden', flexShrink: 0 }}>
                  {post.cover_image
                    ? <img src={post.cover_image} alt={post.title_th || post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    {post.title_th || post.title}
                  </h2>
                  {post.excerpt_th && (
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt_th}
                    </p>
                  )}
                  <div style={{ marginTop: 'auto', paddingTop: 12, fontSize: 11, color: 'var(--text-faint)' }}>
                    {new Date(post.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
