import { cache } from 'react';
import { createAdminClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BlogPostClient from './BlogPostClient';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

const getBlogPost = cache(async (slug: string) => {
  const admin = createAdminClient();
  const { data: post } = await admin
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return post;
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
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
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

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
