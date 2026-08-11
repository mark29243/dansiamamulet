import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import HomeHero from './HomeHero';
import HomeShop from './HomeShop';
import ReviewsSection from '@/components/ReviewsSection';

export const revalidate = 60; // ISR: re-fetch every 60s

async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, name_th, name_zh, category, price, sale_price, stock, short, images, is_featured')
    .eq('published', true)
    .order('stock', { ascending: false })
    .order('id', { ascending: true });
  if (error) {
    console.error('Failed to load products:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

async function getHomepageSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch('https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/homepage-settings.json', { next: { revalidate: 60 } });
    if (!res.ok) return {};
    return await res.json();
  } catch (e) {
    return {};
  }
}

export default async function HomePage({ searchParams }: { searchParams?: { category?: string } }) {
  const [products, customImages] = await Promise.all([
    getProducts(),
    getHomepageSettings()
  ]);
  
  return (
    <>
      <HomeHero productCount={products.length} products={products} customImages={customImages} />
      <ReviewsSection />
      <HomeShop products={products} defaultCategory={searchParams?.category} />
    </>
  );
}
