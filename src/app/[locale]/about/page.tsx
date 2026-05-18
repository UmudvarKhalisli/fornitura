import Image from 'next/image';
import Link from 'next/link';
import { Shield, Truck, HeadphonesIcon, Award, CheckCircle2, ArrowRight } from 'lucide-react';
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
    'Fornitura ağır texnika ehtiyat hissələri və avadanlıqları sahəsində sizin etibarlı tərəfdaşınızdır. Biz ekskavatorlar, kranlar, buldozerlər, yükləyicilər və digər ağır texnikalar üçün həm yüksək keyfiyyətli orijinal ehtiyat hissələrinin satışını, həm də peşəkar təmir xidmətlərini həyata keçiririk.\n\nMəqsədimiz müştərilərimizin texnikalarının kəsintisiz və təhlükəsiz fəaliyyətini təmin etmək, ən çətin anlarda belə onlara operativ texniki dəstək göstərməkdir.';
  
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.about, path: '/about' },
  ];

  const values = [
    {
      icon: Shield,
      title: dictionary.about.quality_title,
      desc: dictionary.about.quality_desc,
    },
    {
      icon: Truck,
      title: dictionary.about.delivery_title,
      desc: dictionary.about.delivery_desc,
    },
    {
      icon: Award,
      title: dictionary.about.repair_title,
      desc: dictionary.about.repair_desc,
    },
    {
      icon: HeadphonesIcon,
      title: dictionary.about.support_title,
      desc: dictionary.about.support_desc,
    },
  ];

  const stats = [
    { number: '100%', label: dictionary.about.stat_parts },
    { number: '7/24', label: dictionary.about.stat_support },
    { number: locale === 'az' ? '1 İl' : locale === 'ru' ? '1 Год' : '1 Year', label: dictionary.about.stat_warranty },
    { number: dictionary.about.stat_delivery_val, label: dictionary.about.stat_delivery },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-deep-charcoal">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/about-bg.png"
            alt="About Fornitura"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-deep-charcoal/50 to-transparent" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-muted-gold/20 border border-muted-gold/30 text-muted-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              {dictionary.nav.about}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {dictionary.about.hero_title_1} <br />
              <span className="text-muted-gold">{dictionary.about.hero_title_2}</span>
            </h1>
            <p className="text-lg md:text-xl text-metallic-silver leading-relaxed max-w-2xl">
              {dictionary.about.hero_subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Introduction Content Section */}
      <section className="py-20 md:py-32 bg-off-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-6 leading-tight">
                  Biznesinizin kəsintisiz işləməsi üçün çalışırıq.
                </{dictionary.about.intro_title}
                </h2>
                <div className="w-16 h-1.5 bg-muted-gold mb-8" />
                <div className="space-y-4">
                  {[
                    dictionary.about.feature_parts,
                    dictionary.about.feature_service,
                    dictionary.about.feature_delivery,
                    dictionary.about.feature_price
                  
                      <CheckCircle2 className="w-5 h-5 text-muted-gold" />
                      <span className="text-deep-charcoal font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-light-gray/40">
                <div className="prose prose-lg max-w-none text-medium-gray leading-loose">
                  {String(content).split('\n').map((paragraph: string, idx: number) => (
                    paragraph.trim() ? <p key={idx} className="mb-6 last:mb-0">{paragraph}</p> : null
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core{dictionary.about.values_badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-deep-charcoal">
              {dictionary.about.values_title}-3xl mx-auto mb-16 md:mb-24">
            <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
              Üstünlüklərimiz
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-deep-charcoal">
              Dəyərlərimiz və Məqsədlərimiz
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-off-white p-8 rounded-3xl border border-light-gray/50 hover:border-muted-gold/50 transition-all group hover:shadow-lg">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <val.icon className="w-8 h-8 text-deep-charcoal group-hover:text-muted-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-deep-charcoal mb-3">{val.title}</h3>
                <p className="text-medium-gray leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-deep-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-muted-gold/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-light-gray/20">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-4xl md:text-6xl font-extrabold text-muted-gold mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-metallic-silver uppercase tracking-[0.15em] font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white">
        <Container>
          <div className="bg-off-white rounded-[3rem] p-10 md:p-20 text-center border border-light-gray/50 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-deep-charcoal mb-6">
                {dictionary.about.cta_title}
              </h2>
              <p className="text-lg md:text-xl text-medium-gray mb-10 max-w-2xl mx-auto">
                {dictionary.about.cta_desc}
              </p>
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 bg-deep-charcoal hover:bg-muted-gold text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-md group"
              >
                {dictionary.about.cta_btn}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
