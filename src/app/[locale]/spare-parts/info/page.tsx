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
                  {locale === 'az' ? 'Niyə bizim ehtiyat hissələrini seçməli?' : 'Why choose our spare parts?'}
                </h2>
                <p className="text-medium-gray text-lg leading-relaxed mb-6">
                  {locale === 'az' 
                    ? 'Fornitura olaraq biz ağır texnika üçün ehtiyat hissələrinin seçimində keyfiyyət və davamlılığa xüsusi önəm veririk. Sizin texnikanızın fasiləsiz işləməsi bizim üçün prioritetdir.'
                    : 'At Fornitura, we place special emphasis on quality and durability in the selection of spare parts for heavy machinery. Your equipment\'s continuous operation is our priority.'}
                </p>
                <p className="text-medium-gray text-lg leading-relaxed">
                  {locale === 'az'
                    ? 'Bizim təqdim etdiyimiz bütün detallar beynəlxalq standartlara cavab verir və istehsalçı tərəfindən zəmanətlidir.'
                    : 'All the parts we provide meet international standards and are guaranteed by the manufacturer.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle2, title: locale === 'az' ? 'Orijinal Keyfiyyət' : 'Original Quality', desc: locale === 'az' ? 'Hər bir detal sınaqdan keçirilmişdir.' : 'Each part has been tested.' },
                  { icon: ShieldCheck, title: locale === 'az' ? 'Zəmanət' : 'Warranty', desc: locale === 'az' ? 'Məhsullarımıza tam zəmanət veririk.' : 'We provide a full warranty.' },
                  { icon: Truck, title: locale === 'az' ? 'Sürətli Çatdırılma' : 'Fast Delivery', desc: locale === 'az' ? 'Sifarişləriniz qısa zamanda qapınızda.' : 'Orders at your door soon.' },
                  { icon: Clock, title: locale === 'az' ? '7/24 Dəstək' : '24/7 Support', desc: locale === 'az' ? 'Mütəxəssislərimiz hər zaman köməyə hazırdır.' : 'Our experts are always ready to help.' }
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
                  alt="Engine parts"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-muted-gold text-deep-charcoal p-8 rounded-3xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-3xl font-bold mb-2">100%</p>
                <p className="text-sm font-semibold uppercase tracking-wider leading-tight">
                  {locale === 'az' ? 'Orijinal Ehtiyat Hissələri Təminatı' : 'Original Spare Parts Assurance'}
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
            <h2 className="text-deep-charcoal">{locale === 'az' ? 'Ağır Texnika Ehtiyat Hissələrinin Satışı' : 'Sale of Heavy Machinery Spare Parts'}</h2>
            <p className="text-medium-gray">
              {locale === 'az' 
                ? 'Azərbaycanda ağır texnika ehtiyat hissələri bazarında Fornitura lider mövqelərdən birini tutur. Biz Caterpillar, Komatsu, Volvo, JCB və digər məşhur brendlər üçün geniş çeşiddə detallar təqdim edirik. Hidravlik sistemlər, mühərrik detalları, asqı sistemləri və süzgəclər - hamısı bir ünvanda.'
                : 'Fornitura holds one of the leading positions in the heavy machinery spare parts market in Azerbaijan. We provide a wide range of parts for Caterpillar, Komatsu, Volvo, JCB and other famous brands. Hydraulic systems, engine parts, suspension systems and filters - all in one place.'}
            </p>
            <h3 className="text-deep-charcoal">{locale === 'az' ? 'Ehtiyat hissələrinin sifarişi qaydası' : 'How to order spare parts'}</h3>
            <p className="text-medium-gray">
              {locale === 'az'
                ? 'İstədiyiniz detalı kataloqumuzdan tapa bilərsiniz. Əgər axtardığınız məhsul siyahıda yoxdursa, narahat olmayın. WhatsApp vasitəsilə detalı şəkli və ya kodu ilə bizə göndərin, mütəxəssislərimiz dərhal axtarışa başlasın.'
                : 'You can find the part you want from our catalog. If the product you are looking for is not on the list, don\'t worry. Send us the part with its photo or code via WhatsApp, and our experts will start searching immediately.'}
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
