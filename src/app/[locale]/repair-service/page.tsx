import Image from 'next/image';
import { Wrench, Cog, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { BreadcrumbSchema, JsonLd } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.repair_title,
    description: dictionary.seo.repair_desc,
    locale: locale as Locale,
    path: '/repair-service',
  });
}

const services = [
  { icon: Wrench, key: 'engine' },
  { icon: Cog, key: 'hydraulic' },
  { icon: ShieldCheck, key: 'inspection' },
  { icon: HeadphonesIcon, key: 'consulting' },
];

const serviceContent: Record<string, { az: string; en: string; ru: string }> = {
  engine: {
    az: 'Mühərrik təmiri və diaqnostikası',
    en: 'Engine repair and diagnostics',
    ru: 'Ремонт и диагностика двигателей',
  },
  hydraulic: {
    az: 'Hidravlik sistem təmiri',
    en: 'Hydraulic system repair',
    ru: 'Ремонт гидравлических систем',
  },
  inspection: {
    az: 'Texniki yoxlama və servis',
    en: 'Technical inspection and maintenance',
    ru: 'Технический осмотр и обслуживание',
  },
  consulting: {
    az: 'Texniki məsləhət və dəstək',
    en: 'Technical consulting and support',
    ru: 'Технические консультации и поддержка',
  },
};

export default async function RepairServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();

  const title = (settings as any)?.[`repair_service_title_${locale}`] || dictionary.repair_service.title;
  const description =
    (settings as any)?.[`repair_service_description_${locale}`] || dictionary.repair_service.subtitle;
  const image = settings?.repair_service_image;

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.repair_service, path: '/repair-service' },
  ];

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    provider: { '@type': 'Organization', name: 'Fornitura' },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />
      <JsonLd data={orgSchema} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-deep-charcoal overflow-hidden">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-deep-charcoal/95 to-transparent" />
        <Container className="relative z-10">
          <div className="max-w-xl">
            <span className="text-muted-gold text-xs font-semibold uppercase tracking-[0.15em]">
              {dictionary.nav.repair_service}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-3 mb-4">
              {title}
            </h1>
            <p className="text-metallic-silver leading-relaxed">{description}</p>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionTitle
            title={dictionary.repair_service.title}
            subtitle={dictionary.repair_service.subtitle}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, key }) => {
              const desc = serviceContent[key as keyof typeof serviceContent]?.[locale as keyof (typeof serviceContent)['engine']] || serviceContent[key as keyof typeof serviceContent]?.en || '';
              return (
                <div
                  key={key}
                  className="flex gap-4 p-6 rounded-lg border border-light-gray hover:border-muted-gold/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-muted-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-muted-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-charcoal mb-1">{desc}</h3>
                    <p className="text-sm text-medium-gray leading-relaxed">
                      {dictionary.home.support_desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-off-white">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-deep-charcoal mb-4">
            {dictionary.home.cta_section_title}
          </h2>
          <a
            href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-whatsapp text-white font-semibold rounded-md hover:bg-[#1ebe5a] transition-colors text-sm"
          >
            {dictionary.repair_service.cta}
          </a>
        </Container>
      </section>
    </>
  );
}
