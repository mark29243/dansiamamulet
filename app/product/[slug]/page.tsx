import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import ProductDetail from './ProductDetail';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: p } = await supabase
    .from('products')
    .select('name, name_th, name_zh, description, short, images, price, sale_price, category')
    .eq('slug', params.slug)
    .single();
  if (!p) return { title: 'Not found' };
  const img = p.images?.[0] ?? '';
  return {
    title: `${p.name} · Dan Siam Amulets`,
    description: p.short || p.description?.slice(0, 160) || p.name,
    keywords: `${p.name}, ${p.name_th ?? ''}, ${p.name_zh ?? ''}, Thai amulet, พระเครื่อง, 泰国佛牌, ${p.category}`,
    openGraph: {
      title: `${p.name} · Dan Siam Amulets`,
      description: p.short || p.description?.slice(0, 160) || p.name,
      type: 'website',
      images: img ? [{ url: img, width: 800, height: 600, alt: p.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} · Dan Siam Amulets`,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || p.short,
    image: p.images ?? [],
    brand: { '@type': 'Brand', name: 'Dan Siam Amulets' },
    offers: {
      '@type': 'Offer',
      url: `https://dansiamamulet.vercel.app/product/${p.slug}`,
      priceCurrency: 'THB',
      price: price,
      availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Dan Siam Amulets' },
    },
    category: p.category,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={p} related={related ?? []} />
    </>
  );
}
