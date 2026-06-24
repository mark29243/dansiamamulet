import { createAdminClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BlogPostClient from './BlogPostClient';

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <BlogPostClient post={post} />
    </>
  );
}
