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
    .select('*')
    .eq('published', true)
    .order('stock', { ascending: false })
    .order('id', { ascending: true });
  if (error) {
    console.error('Failed to load products:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

export default async function HomePage({ searchParams }: { searchParams?: { category?: string } }) {
  const products = await getProducts();
  return (
    <>
      <HomeHero productCount={products.length} products={products} />
      <ReviewsSection />
      <HomeShop products={products} defaultCategory={searchParams?.category} />
    </>
  );
}
