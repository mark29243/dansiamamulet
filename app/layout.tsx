import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { LangProvider } from '@/components/LangProvider';
import { CartProvider } from '@/components/CartProvider';
import { ToastProvider } from '@/components/ToastProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickContact from '@/components/QuickContact';
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
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.svg`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'dansiamamulets2@gmail.com',
        telephone: '+66898157535',
        contactType: 'customer service',
        availableLanguage: ['English', 'Thai', 'Chinese'],
      },
      sameAs: [
        'https://line.me/R/ti/p/jarunpim',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Dan Siam Amulets',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LangProvider>
          <ToastProvider>
            <CurrencyProvider>
              <CartProvider>
                <a href="#main" className="sr-only">Skip to content</a>
                <Header />
                <main id="main" style={{ minHeight: 'calc(100vh - 280px)' }}>
                  {children}
                </main>
                <Footer />
                <QuickContact />
              </CartProvider>
            </CurrencyProvider>
          </ToastProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
