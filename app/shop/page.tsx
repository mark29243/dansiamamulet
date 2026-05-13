import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import HomeShop from '../HomeShop';

export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('stock', { ascending: false })
    .order('id', { ascending: true });
  return (data ?? []) as Product[];
}

export default async function ShopPage() {
  const products = await getProducts();
  return <HomeShop products={products} />;
}
