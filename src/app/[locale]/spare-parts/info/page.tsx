import { getDictionary } from '@/i18n';
import { Container } from '@/components/shared/container';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Truck, Clock } from 'lucide-react';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: `${dictionary.nav.spare_parts} - ${dictionary.catalog.info_title || 'Məlumat'}`,
    description: dictionary.catalog.info_desc || 'Ağır texnika ehtiyat hissələri haqqında ətraflı məlumat.',
    locale: locale as Locale,
    path: '/spare-parts/info',
  });
}

export default async function SparePartsInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center bg-deep-charcoal overflow-hidden">
        <Image
          src="/catalog-bg.png"
          alt="Spare Parts Information"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/80 to-deep-charcoal z-10" />
        
        <Container className="relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block text-muted-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {dictionary.nav.spare_parts}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {dictionary.catalog.info_title || 'Ehtiyat hissələri haqqında'}
            </h1>
            <p className="text-lg md:text-xl text-metallic-silver leading-relaxed">
              {dictionary.catalog.info_subtitle || 'Ağır texnikanızın ömrünü uzadan keyfiyyətli detallar'}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-deep-charcoal mb-6">
                  {dictionary.catalog.why_choose_title}
                </h2>
                <p className="text-medium-gray text-lg leading-relaxed mb-6">
                  {dictionary.catalog.why_choose_desc_1}
                </p>
                <p className="text-medium-gray text-lg leading-relaxed">
                  {dictionary.catalog.why_choose_desc_2}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle2, title: dictionary.catalog.original_quality, desc: dictionary.catalog.original_quality_desc },
                  { icon: ShieldCheck, title: dictionary.catalog.warranty, desc: dictionary.catalog.warranty_desc },
                  { icon: Truck, title: dictionary.catalog.fast_delivery, desc: dictionary.catalog.fast_delivery_desc },
                  { icon: Clock, title: dictionary.catalog.support_24_7, desc: dictionary.catalog.support_24_7_desc }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-off-white rounded-2xl border border-light-gray/50 hover:border-muted-gold/30 transition-colors">
                    <item.icon className="w-8 h-8 text-muted-gold mb-4" />
                    <h3 className="font-bold text-deep-charcoal mb-2">{item.title}</h3>
                    <p className="text-sm text-medium-gray leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/repair-bg.png"
                  alt={dictionary.catalog.original_assurance}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-muted-gold text-deep-charcoal p-8 rounded-3xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-3xl font-bold mb-2">100%</p>
                <p className="text-sm font-semibold uppercase tracking-wider leading-tight">
                  {dictionary.catalog.original_assurance}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Text Section */}
      <section className="py-16 bg-off-white border-t border-light-gray/50">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-gold lg:prose-lg">
            <h2 className="text-deep-charcoal">{dictionary.catalog.seo_title}</h2>
            <p className="text-medium-gray">
              {dictionary.catalog.seo_desc_1}
            </p>
            <h3 className="text-deep-charcoal">{dictionary.catalog.seo_title_2}</h3>
            <p className="text-medium-gray">
              {dictionary.catalog.seo_desc_2}
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
