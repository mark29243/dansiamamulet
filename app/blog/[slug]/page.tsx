import { createAdminClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  noStore();
  const admin = createAdminClient();
  const { data: post } = await admin
    .from('blog_posts')
    .select('title, title_th, title_zh, excerpt, excerpt_th, cover_image')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  const title = post.title_th || post.title;
  const desc  = post.excerpt_th || post.excerpt || '';
  const canonicalUrl = `${siteUrl}/blog/${params.slug}`;

  return {
    title,
    description: desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} · Dan Siam Amulets`,
      description: desc,
      url: canonicalUrl,
      type: 'article',
      images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · Dan Siam Amulets`,
      description: desc,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { lang?: string };
}) {
  noStore();
  const lang = (searchParams?.lang ?? 'th') as 'th' | 'en' | 'zh';
  const admin = createAdminClient();
  const { data: post } = await admin
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  // Increment views (fire-and-forget)
  admin.from('blog_posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id).then(() => {});

  const canonicalUrl = `${siteUrl}/blog/${params.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Dan Siam Amulets',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    inLanguage: 'th',
  };

  // Pick content by lang param (default Thai for SEO)
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />

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
            <Image src={post.cover_image} alt={displayTitle} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: 'cover' }} priority />
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
            <span>{new Date(post.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>👁 {post.views} ครั้ง</span>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: 32 }} />

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: displayContent }}
          style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)' }}
        />

        {/* Language switch */}
        {(post.content || post.content_zh) && (
          <div style={{ marginTop: 40, padding: '14px 20px', background: 'var(--cream-dark)', borderRadius: 'var(--radius)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)', marginRight: 4 }}>🌐</span>
            {[
              { code: 'th', label: '🇹🇭 ไทย',    available: !!post.content_th },
              { code: 'en', label: '🇬🇧 English', available: !!post.content },
              { code: 'zh', label: '🇨🇳 中文',    available: !!post.content_zh },
            ].filter(l => l.available).map(l => (
              <a
                key={l.code}
                href={`/blog/${post.slug}?lang=${l.code}`}
                style={{
                  padding: '5px 14px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: lang === l.code ? 600 : 400,
                  textDecoration: 'none',
                  background: lang === l.code ? 'var(--gold-dark)' : 'var(--cream)',
                  color: lang === l.code ? '#fff' : 'var(--text-muted)',
                  border: '1px solid ' + (lang === l.code ? 'var(--gold-dark)' : 'var(--cream-dark)'),
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Back */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
          <Link href="/blog" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            ← กลับไปหน้า Blog
          </Link>
        </div>
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
    </>
  );
}
