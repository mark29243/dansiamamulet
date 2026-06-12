import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { LangProvider } from '@/components/LangProvider';
import { CartProvider } from '@/components/CartProvider';
import { ToastProvider } from '@/components/ToastProvider';
import { WishlistProvider } from '@/components/WishlistProvider';
import { RecentlyViewedProvider } from '@/components/RecentlyViewedProvider';
import ConditionalSiteChrome from '@/components/ConditionalSiteChrome';
import { CurrencyProvider } from '@/components/CurrencyProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dan Siam Amulets · พระเครื่องแท้ · 丹暹罗佛牌',
    template: '%s · Dan Siam Amulets',
  },
  description: 'Authentic Thai amulets from sacred temples. Worldwide shipping with certificate of authenticity. พระเครื่องแท้จากวัดดัง จัดส่งทั่วโลก พร้อมใบรับรองความแท้.',
  keywords: ['Thai amulet', 'พระเครื่อง', '泰国佛牌', 'Buddhist amulet', 'amulet Thailand', 'Dan Siam', 'พระเครื่องแท้', 'sacred amulet', 'Luang Pho', 'Somdej'],
  authors: [{ name: 'Dan Siam Amulets', url: siteUrl }],
  creator: 'Dan Siam Amulets',
  publisher: 'Dan Siam Amulets',
  verification: {
    google: 'VOLTZvoeRJPKv_XPdhGTTWAzrTwWbzGMUy5BnhWAPZI',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'x-default': siteUrl,
      'en': siteUrl,
      'th': siteUrl,
      'zh-Hans': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Dan Siam Amulets',
    title: 'Dan Siam Amulets · พระเครื่องแท้ · 丹暹罗佛牌',
    description: 'Authentic Thai amulets from sacred temples. Worldwide shipping with certificate of authenticity.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Dan Siam Amulets — Authentic Thai Buddhist Amulets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Siam Amulets · พระเครื่องแท้',
    description: 'Authentic Thai amulets from sacred temples. Worldwide shipping with certificate of authenticity.',
    images: ['/og-image.svg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Dan Siam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1208',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Dan Siam Amulets',
      alternateName: ['แดนสยามอมิวเล็ตส์', '丹暹罗佛牌', 'Dan Siam'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteUrl}/#logo`,
        url: `${siteUrl}/icon.svg`,
        contentUrl: `${siteUrl}/icon.svg`,
        caption: 'Dan Siam Amulets',
      },
      image: { '@id': `${siteUrl}/#logo` },
      description: 'Authentic Thai Buddhist amulets sourced directly from sacred temples across Thailand. Verified by experts with over 20 years of experience. Worldwide shipping with certificate of authenticity.',
      foundingLocation: {
        '@type': 'Place',
        name: 'Thailand',
        address: { '@type': 'PostalAddress', addressCountry: 'TH' },
      },
      areaServed: 'Worldwide',
      currenciesAccepted: 'THB, CNY',
      paymentAccepted: 'Visa, Mastercard, PromptPay, Alipay, WeChat Pay',
      priceRange: '฿฿',
      knowsAbout: [
        'Thai Buddhist amulets',
        'พระเครื่อง',
        '泰国佛牌',
        'Phra Somdej',
        'Luang Pu Tuad amulets',
        'Phra Pidta',
        'Takrut',
        'Thai sacred objects',
        'Buddhist collectibles',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: 'dansiamamulets2@gmail.com',
          telephone: '+66898157535',
          contactType: 'customer service',
          availableLanguage: ['English', 'Thai', 'Chinese'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/Jackyamulet999',
        'https://lin.ee/reGR6nC',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Dan Siam Amulets',
      description: 'Shop authentic Thai Buddhist amulets with worldwide shipping. พระเครื่องแท้จากวัดดัง จัดส่งทั่วโลก. 正品泰国佛牌，全球配送。',
      inLanguage: ['en', 'th', 'zh'],
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'OnlineStore',
      '@id': `${siteUrl}/#store`,
      name: 'Dan Siam Amulets',
      url: siteUrl,
      image: `${siteUrl}/og-image.svg`,
      description: 'Authentic Thai Buddhist amulets — Phra Somdej, Luang Pu Tuad, Phra Pidta, Takrut, coin amulets and protective charms. Sourced from temples across Thailand.',
      currenciesAccepted: 'THB',
      paymentAccepted: 'Visa, Mastercard, PromptPay, Alipay, WeChat Pay',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Thai Buddhist Amulets',
        itemListElement: [
          { '@type': 'OfferCatalog', name: 'พระสมเด็จ · Phra Somdej' },
          { '@type': 'OfferCatalog', name: 'หลวงปู่ทวด · Luang Pu Tuad' },
          { '@type': 'OfferCatalog', name: 'พระปิดตา · Phra Pidta' },
          { '@type': 'OfferCatalog', name: 'เหรียญ · Coin Amulets' },
          { '@type': 'OfferCatalog', name: 'ตะกรุด · Takrut' },
          { '@type': 'OfferCatalog', name: 'เครื่องราง · Protective Charms' },
        ],
      },
      parentOrganization: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, '\\u003c') }}
        />
        <LangProvider>
          <ToastProvider>
            <CurrencyProvider>
              <WishlistProvider>
              <RecentlyViewedProvider>
              <CartProvider>
                <a href="#main" className="sr-only">Skip to content</a>
                <ConditionalSiteChrome>
                  {children}
                </ConditionalSiteChrome>
              </CartProvider>
              </RecentlyViewedProvider>
              </WishlistProvider>
            </CurrencyProvider>
          </ToastProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
