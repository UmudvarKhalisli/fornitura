import { Metadata } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { OrganizationSchema } from '@/components/seo';
import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { isValidLocale } from '@/i18n';
import '@/app/globals.css';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export async function generateStaticParams() {
  return [{ locale: 'az' }, { locale: 'en' }, { locale: 'ru' }];
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fornitura.vercel.app'),
  openGraph: {
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fornitura' }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg']
  },
  icons: {
    icon: '/favicon.ico'
  },
  alternates: {
    languages: {
      az: '/az',
      en: '/en',
      ru: '/ru'
    }
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();

  return (
    <html lang={locale} className={`${outfit.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Header locale={locale} dictionary={dictionary} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dictionary={dictionary} settings={settings} />
        <WhatsAppButton 
          phone={settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || ''} 
          message="Salam! Fornitura.az saytından yazıram. Ehtiyat hissələri və servis xidmətləri barədə məlumat almaq istəyirdim."
        />
        <ScrollToTop />
        <OrganizationSchema />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
