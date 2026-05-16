import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import ProductDetail from './ProductDetail';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulet.vercel.app';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: p } = await supabase
    .from('products')
    .select('name, name_th, name_zh, description, short, images, price, sale_price, category')
    .eq('slug', params.slug)
    .single();
  if (!p) return { title: 'Not found' };
  const img = p.images?.[0] ?? '';
  const desc = p.short || p.description?.slice(0, 160) || p.name;
  const canonicalUrl = `${siteUrl}/product/${params.slug}`;
  return {
    title: p.name,
    description: desc,
    keywords: [p.name, p.name_th ?? '', p.name_zh ?? '', 'Thai amulet', 'พระเครื่อง', '泰国佛牌', p.category].filter(Boolean),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${p.name} · Dan Siam Amulets`,
      description: desc,
      url: canonicalUrl,
      type: 'website',
      images: img ? [{ url: img, width: 800, height: 600, alt: p.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} · Dan Siam Amulets`,
      description: desc,
      images: img ? [img] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error || !data) notFound();

  const p = data as Product;
  const price = (p.sale_price ?? p.price) / 100;

  const productUrl = `${siteUrl}/product/${p.slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || p.short,
    image: p.images ?? [],
    brand: { '@type': 'Brand', name: 'Dan Siam Amulets' },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'THB',
      price: price,
      availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Dan Siam Amulets' },
    },
    category: p.category,
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
        name: 'Shop',
        item: `${siteUrl}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.category,
        item: `${siteUrl}/shop?category=${encodeURIComponent(p.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: p.name,
        item: productUrl,
      },
    ],
  };

  const { data: related } = await supabase
    .from('products')
    .select('id, name, name_th, name_zh, slug, images, price, sale_price, stock, category')
    .eq('category', p.category)
    .eq('published', true)
    .neq('id', p.id)
    .limit(4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={p} related={(related ?? []) as unknown as Product[]} />
    </>
  );
}
