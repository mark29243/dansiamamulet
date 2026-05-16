import type { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'FAQ · Frequently Asked Questions',
  description: 'Answers to common questions about Dan Siam Amulets — authenticity, shipping times, payment methods, returns, and how to contact us.',
  keywords: ['Thai amulet FAQ', 'amulet authenticity', 'shipping Thailand', 'พระเครื่องคำถาม', '佛牌常见问题'],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ · Dan Siam Amulets',
    description: 'Answers about amulet authenticity, worldwide shipping, payment methods, and returns.',
    url: '/faq',
    type: 'website',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are your amulets authentic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — every piece comes with a certificate of authenticity and is verified by experts with over 20 years of experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within Thailand: 2-3 days. Asia: 5-7 days. Worldwide: 7-14 days. Full tracking included.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Visa/Mastercard credit & debit cards, PromptPay (Thailand), Alipay & WeChat Pay (China) — all processed securely via Stripe.',
      },
    },
    {
      '@type': 'Question',
      name: "Can I return an amulet I don't like?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, within 7 days of delivery. The amulet must be in original condition with certificate and packaging intact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is shipping insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every shipment is insured. If damage occurs in transit, we will replace your order immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I send an amulet as a gift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every amulet ships in a beautiful wooden box. Gift wrapping and personalized cards are available on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact you?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LINE: jarunpim, WeChat: jarunpim, email: dansiamamulets2@gmail.com, or phone: +66 89 815 7535',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQContent />
    </>
  );
}
