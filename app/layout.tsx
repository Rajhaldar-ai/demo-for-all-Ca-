import type { Metadata } from 'next';
import { Lexend, Karla } from 'next/font/google';
import './globals.css';
import AnalyticsManager from '@/components/AnalyticsManager';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-lexend',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-karla',
  display: 'swap',
});

const siteUrl =
  process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
    ? process.env.APP_URL.replace(/\/$/, '')
    : 'https://your-ca-firm-domain.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Apex Chartered Accountants | Tax, GST & Audit Advisory',
    template: '%s | Apex Chartered Accountants',
  },
  description:
    'Chartered Accountancy firm offering Income Tax filing, GST compliance, Statutory Audits, ROC filings, and advisory services. Book a consultation.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Apex Chartered Accountants | Tax, GST & Audit Advisory',
    description:
      'Chartered Accountancy firm offering Income Tax filing, GST compliance, Statutory Audits, ROC filings, and advisory services. Book a consultation.',
    url: siteUrl,
    siteName: 'Apex Chartered Accountants',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/ca_case_startup.jpg',
        width: 1200,
        height: 900,
        alt: 'Apex Chartered Accountants boardroom with financial valuation charts and tax audit reports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Chartered Accountants | Tax, GST & Audit Advisory',
    description:
      'Chartered Accountancy firm offering Income Tax filing, GST compliance, Statutory Audits, ROC filings, and advisory services. Book a consultation.',
    images: ['/images/ca_case_startup.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: '[PLACEHOLDER: Full Legal CA Firm Name, e.g., Apex Chartered Accountants]',
    description:
      'Chartered Accountancy firm providing Income Tax filing, GST registration and returns, Statutory and Tax Audits, Company Incorporation, and ROC compliance.',
    url: siteUrl,
    image: `${siteUrl}/images/ca_case_startup.jpg`,
    telephone: '[PLACEHOLDER: +91-XXXXXXXXXX]',
    email: '[PLACEHOLDER: contact@your-ca-firm.in]',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[PLACEHOLDER: Office Street Address]',
      addressLocality: '[PLACEHOLDER: City]',
      addressRegion: '[PLACEHOLDER: State]',
      postalCode: '[PLACEHOLDER: PIN Code]',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en" className={`${lexend.variable} ${karla.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          src="https://katrix.app/widget.js"
          data-bot-key="kE2qLR1F4GRogoIkEivZJS72usOhvSelSBl7HmUMLFOT8LTFatIZ2lzL12vvZOFu"
          defer
        ></script>
      </head>
      <body suppressHydrationWarning>
        {children}
        <AnalyticsManager />
      </body>
    </html>
  );
}
