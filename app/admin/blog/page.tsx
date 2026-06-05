import { createAdminClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from('blog_posts')
    .select('id, slug, title, title_th, category, published, views, created_at, cover_image')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)' }}>Blog</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{posts?.length ?? 0} บทความ</p>
        </div>
        <Link href="/admin/blog/new" className="btn-gold" style={{ padding: '10px 20px', fontSize: 13 }}>
          + เขียนบทความใหม่
        </Link>
      </div>

      {!posts?.length ? (
        <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✍️</div>
          <p>ยังไม่มีบทความ กด "+ เขียนบทความใหม่" เพื่อเริ่มต้น</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map((post) => (
            <div key={post.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Cover */}
              <div style={{ width: 64, height: 64, flexShrink: 0, background: 'var(--cream-dark)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                {post.cover_image
                  ? <img src={post.cover_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📝</div>
                }
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {post.title}
                </div>
                {post.title_th && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title_th}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {post.category && (
                    <span style={{ fontSize: 11, background: 'var(--cream-dark)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 100 }}>
                      {post.category}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>
                    {new Date(post.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>👁 {post.views}</span>
                </div>
              </div>

              {/* Status + actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
                  background: post.published ? 'rgba(45,90,61,0.12)' : 'rgba(139,0,0,0.08)',
                  color: post.published ? 'var(--jade)' : 'var(--burgundy)',
                }}>
                  {post.published ? 'เผยแพร่' : 'ฉบับร่าง'}
                </span>
                <Link
                  href={`/admin/blog/${post.id}`}
                  style={{ fontSize: 12, color: 'var(--gold-dark)', textDecoration: 'none', padding: '4px 12px', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}
                >
                  แก้ไข
                </Link>
                {post.published && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}
                  >
                    ดู ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
