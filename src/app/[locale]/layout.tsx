import { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n';
import { MaintenancePage } from '@/components/layout/maintenance-page';
import '@/app/globals.css';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });

export async function generateStaticParams() {
  return [{ locale: 'az' }, { locale: 'en' }, { locale: 'ru' }];
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.az'),
  openGraph: {
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fornitura - Ağır texnika ehtiyat hissələri' }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg']
  },
  verification: {
    google: 'rD2Jj0fWPx229uVYNuivAp4y3rJKHBFN8k17NIAlCPQ',
  },
  alternates: {
    canonical: '/',
    languages: {
      az: '/az',
      en: '/en',
      ru: '/ru'
    }
  }
};

export default async function LocaleLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  // Keep every public localized route on the Coming Soon screen until launch.
  return (
    <html lang={locale} className={`${outfit.variable} h-full antialiased`}>
      <body className="h-full">
        <MaintenancePage />
      </body>
    </html>
  );

}
