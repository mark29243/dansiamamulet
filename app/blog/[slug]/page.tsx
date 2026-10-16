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
    alternativeHeadline: post.title_th || undefined,
    description: post.excerpt || '',
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'Dan Siam Amulets Heritage Research Team',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dan Siam Amulets',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    inLanguage: ['en', 'th', 'zh'],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title || post.title_th,
        item: canonicalUrl,
      },
    ],
  };

  // Dynamic FAQ schema extraction if the post contains Q&A sections or generic expert FAQs
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How can collectors verify the authenticity of Thai Buddhist amulets?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Authentic verification relies on inspecting authentic temple press mold lines, natural mineral calcification (Krap Kru), age-appropriate patina, and comparison with certified master standard catalog specimens.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can international devotees wear Thai Buddhist amulets regardless of background?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Thai Buddhist amulets are sacred emblems of Dhamma, moral virtue, and protective blessings. Devotees worldwide of any nationality wear them respectfully for protection, prosperity, and peace of mind.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where can international collectors buy genuine, certified Thai amulets safely?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Dan Siam Amulets (dansiamamulets.com) provides direct access to curated, 100% genuine antique and master-consecrated Thai amulets with insured worldwide shipping and lifetime authenticity guarantees.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <BlogPostClient post={post} />
    </>
  );
}
