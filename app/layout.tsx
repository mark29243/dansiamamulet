import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LangProvider } from '@/components/LangProvider';
import { CartProvider } from '@/components/CartProvider';
import { ToastProvider } from '@/components/ToastProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickContact from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Dan Siam Amulets · พระเครื่องแท้ · 丹暹罗佛牌',
  description: 'Authentic Thai amulets from sacred temples. Worldwide shipping with certificate of authenticity.',
  openGraph: {
    title: 'Dan Siam Amulets',
    description: 'Authentic Thai amulets from sacred temples',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1208',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          <ToastProvider>
            <CartProvider>
              <a
                href="#main"
                className="sr-only"
                style={{ position: 'absolute', top: 0, left: 0, padding: 12, background: 'var(--gold)', color: 'var(--deep)', zIndex: 9999 }}
                onFocus={(e) => { e.currentTarget.classList.remove('sr-only'); }}
                onBlur={(e) => { e.currentTarget.classList.add('sr-only'); }}
              >
                Skip to content
              </a>
              <Header />
              <main id="main" style={{ minHeight: 'calc(100vh - 280px)' }}>
                {children}
              </main>
              <Footer />
              <QuickContact />
            </CartProvider>
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  );
}
