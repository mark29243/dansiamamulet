import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import ProductDetail from './ProductDetail';
import ViewTracker from './ViewTracker';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

// ISR: Cache product page for 60 seconds on CDN to prevent crawler query storms
export const revalidate = 60;

// Deduplicate query so generateMetadata and ProductPage share the exact same fetch
const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return (data as Product) || null;
});

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const img = p.images?.[0] ?? '';
  // short = English meta description (new products) or Thai name (legacy) — use if English
  const isEnglishShort = p.short && !/[ก-๙]/.test(p.short);
  const desc = (isEnglishShort ? p.short : null)
    || p.description?.slice(0, 160)
    || p.name;
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
  const p = await getProduct(params.slug);
  if (!p) notFound();

  const supabase = createClient();

  const price = (p.sale_price ?? p.price) / 100;

  const productUrl = `${siteUrl}/product/${p.slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    alternateName: [p.name_th, p.name_zh].filter(Boolean),
    description: p.description || p.short,
    image: p.images ?? [],
    brand: { '@type': 'Brand', name: 'Dan Siam Amulets' },
    itemCondition: 'https://schema.org/UsedCondition',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '34',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'THB',
      price: price,
      availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Dan Siam Amulets' },
      priceValidUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'WW',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'THB',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['TH', 'SG', 'MY', 'US', 'GB', 'CN', 'HK', 'TW', 'AU', 'EU'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
    },
    category: p.category,
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
        name: 'Shop',
        item: `${siteUrl}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.category || 'Amulets',
        item: `${siteUrl}/shop?category=${encodeURIComponent(p.category || '')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: p.name,
        item: productUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${p.name || 'this amulet'} 100% authentic and certified?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Every sacred amulet offered by Dan Siam Amulets is individually verified authentic by senior Thai amulet authenticators, accompanied by our lifetime authenticity guarantee.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How does international shipping and insurance work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We ship worldwide via express international couriers (DHL / FedEx / EMS) with full transit insurance, real-time tracking, and shockproof protective packaging.',
        },
      },
      {
        '@type': 'Question',
        name: `What spiritual powers and blessings are associated with ${p.name || 'this piece'}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In traditional Thai Buddhist belief, this sacred amulet was consecrated by revered master monks to bestow Metta Mahaniyom (loving-kindness and charisma), Chok Lap (wealth and business fortune), and Klaew Klaad (miraculous protection from harm).`,
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <ViewTracker productId={p.id} />
      <ProductDetail product={p} related={(related ?? []) as unknown as Product[]} />
    </>
  );
}
