import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';
import HomeShop from '../HomeShop';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop Thai Amulets · พระเครื่องทุกประเภท · 所有佛牌',
  description: 'Browse our full collection of authentic Thai Buddhist amulets — Somdej, Luang Pho, Takrut, Coin amulets and more. Filter by category, price, and availability. Worldwide shipping.',
  keywords: ['shop Thai amulets', 'buy Buddhist amulet', 'Somdej amulet', 'Luang Pho', 'Takrut', 'พระเครื่องทุกชนิด', '泰国佛牌购买'],
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Authentic Thai Amulets · Dan Siam',
    description: 'Browse our full collection of authentic Thai Buddhist amulets. Somdej, Luang Pho, Takrut, Coin amulets and more.',
    url: '/shop',
    type: 'website',
  },
};

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

export default async function ShopPage({ searchParams }: { searchParams?: { category?: string } }) {
  const products = await getProducts();
  return <HomeShop products={products} defaultCategory={searchParams?.category} />;
}
