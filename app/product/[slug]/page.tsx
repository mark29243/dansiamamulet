import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import ProductDetail from './ProductDetail';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: p } = await supabase
    .from('products')
    .select('name, short, images')
    .eq('slug', params.slug)
    .single();
  if (!p) return { title: 'Not found' };
  return {
    title: `${p.name} · Dan Siam Amulets`,
    description: p.short || p.name,
    openGraph: { images: p.images?.[0] ? [p.images[0]] : [] },
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
  const product = data as Product;

  // Fetch related items (same category, exclude self, prefer in-stock)
  const { data: relatedData } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .eq('category', product.category)
    .neq('id', product.id)
    .order('stock', { ascending: false })
    .limit(4);

  return <ProductDetail product={product} related={(relatedData ?? []) as Product[]} />;
}
