import { createAdminClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import './blog.css';
import BlogGrid from './BlogGrid';

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
    .select('id, slug, title, title_th, title_zh, excerpt, excerpt_th, excerpt_zh, cover_image, category, created_at')
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

      <BlogGrid posts={posts ?? []} />
    </div>
  );
}
