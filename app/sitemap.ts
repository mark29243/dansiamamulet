import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${baseUrl}/shop`,      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${baseUrl}/blog`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/shipping`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/returns`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/signin`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  try {
    const supabase = createClient();
    const [{ data: products }, { data: blogs }] = await Promise.all([
      supabase.from('products').select('slug, updated_at').eq('published', true),
      supabase.from('blog_posts').select('slug, updated_at').eq('published', true),
    ]);

    const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at),
      changeFrequency: 'monthly',
      priority: 0.65,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
