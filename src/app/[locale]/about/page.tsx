import Image from 'next/image';
import { Shield, Truck, HeadphonesIcon, Award } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { BreadcrumbSchema } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.about_title,
    description: dictionary.seo.about_desc,
    locale: locale as Locale,
    path: '/about',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();

  const content =
    (settings as any)?.[`about_content_${locale}`] ||
    'Fornitura is a reliable partner in heavy machinery spare parts. With years of experience in the industry, we provide high-quality spare parts and professional repair services for excavators, cranes, bulldozers, loaders and other heavy equipment.';
  const aboutImage = settings?.about_image;

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.about, path: '/about' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      <section className="py-12 md:py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <span className="text-muted-gold text-xs font-semibold uppercase tracking-[0.15em]">
              {dictionary.nav.about}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-deep-charcoal tracking-tight mt-3">
              {dictionary.about.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-off-white border border-light-gray">
              {aboutImage ? (
                <Image
                  src={aboutImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-bold text-light-gray">F</span>
                </div>
              )}
            </div>
            <div>
              <div className="prose prose-sm max-w-none text-medium-gray leading-relaxed whitespace-pre-line">
                {content}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20">
            {[
              { number: '500+', label: dictionary.product.featured_title },
              { number: '50+', label: dictionary.brands.title },
              { number: '1000+', label: dictionary.home.support_desc },
              { number: '10+', label: dictionary.home.experience },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-lg border border-light-gray">
                <div className="text-3xl md:text-4xl font-bold text-muted-gold mb-1">{stat.number}</div>
                <div className="text-xs text-medium-gray uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
