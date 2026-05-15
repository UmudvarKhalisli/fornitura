import Image from 'next/image';
import { Wrench, Cog, ShieldCheck, HeadphonesIcon, Settings, PenTool, SearchCode, CheckCircle2 } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { BreadcrumbSchema, JsonLd } from '@/components/seo';
import { ContactForm } from '@/components/forms/contact-form';
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

const serviceContent: Record<string, { az: { title: string, desc: string }; en: { title: string, desc: string }; ru: { title: string, desc: string } }> = {
  engine: {
    az: { title: 'Mühərrik Təmiri', desc: 'Ağır texnika mühərriklərinin əsaslı təmiri və diaqnostikası.' },
    en: { title: 'Engine Repair', desc: 'Major repair and diagnostics of heavy machinery engines.' },
    ru: { title: 'Ремонт Двигателей', desc: 'Капитальный ремонт и диагностика двигателей спецтехники.' },
  },
  hydraulic: {
    az: { title: 'Hidravlik Sistemlər', desc: 'Nasoslar, motorlar və hidravlik silindrlərin təmiri.' },
    en: { title: 'Hydraulic Systems', desc: 'Repair of pumps, motors, and hydraulic cylinders.' },
    ru: { title: 'Гидравлические Системы', desc: 'Ремонт насосов, моторов и гидравлических цилиндров.' },
  },
  inspection: {
    az: { title: 'Texniki Baxış', desc: 'Müntəzəm texniki qulluq və ehtiyat hissələrinin yoxlanılması.' },
    en: { title: 'Technical Inspection', desc: 'Regular maintenance and spare parts inspection.' },
    ru: { title: 'Технический Осмотр', desc: 'Регулярное обслуживание и проверка запчастей.' },
  },
  consulting: {
    az: { title: 'Texniki Dəstək', desc: 'Ekspert məsləhəti və nasazlıqların yerində təyini.' },
    en: { title: 'Technical Support', desc: 'Expert consulting and on-site troubleshooting.' },
    ru: { title: 'Техническая Поддержка', desc: 'Консультации экспертов и устранение неполадок на месте.' },
  },
};

const processSteps = [
  { icon: SearchCode, az: 'Diaqnostika', en: 'Diagnostics', ru: 'Диагностика' },
  { icon: PenTool, az: 'Planlaşdırma', en: 'Planning', ru: 'Планирование' },
  { icon: Settings, az: 'Təmir', en: 'Repair', ru: 'Ремонт' },
  { icon: CheckCircle2, az: 'Təhvil', en: 'Delivery', ru: 'Сдача' },
];

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
  const image = '/repair-bg.png'; // Premium dark-themed industrial repair background

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

      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center bg-deep-charcoal overflow-hidden min-h-[60vh]">
        <Image
          src={image}
          alt="Repair Service Hero"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/95 via-deep-charcoal/60 to-transparent z-10" />
        <div className="absolute inset-0 opacity-[0.03] z-10" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-0 left-0 w-24 h-1 bg-muted-gold z-20" />
        
        <Container className="relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block text-muted-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {dictionary.nav.repair_service}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
            </h1>
            <p className="text-base md:text-lg text-metallic-silver leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-off-white relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">
              {dictionary.repair_service.title}
            </h2>
            <div className="w-16 h-1 bg-muted-gold mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map(({ icon: Icon, key }) => {
              const content = serviceContent[key as keyof typeof serviceContent]?.[locale as keyof (typeof serviceContent)['engine']] || serviceContent.engine.en;
              return (
                <div
                  key={key}
                  className="group relative bg-white p-8 rounded-2xl border border-light-gray hover:border-muted-gold/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-muted-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                  
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-off-white flex items-center justify-center group-hover:bg-muted-gold/10 transition-colors">
                      <Icon className="w-7 h-7 text-deep-charcoal group-hover:text-muted-gold transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-charcoal mb-3">{content.title}</h3>
                      <p className="text-medium-gray leading-relaxed">
                        {content.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white border-y border-light-gray/50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">
              {locale === 'az' ? 'İş Prosesi' : locale === 'en' ? 'Work Process' : 'Рабочий Процесс'}
            </h2>
            <div className="w-16 h-1 bg-muted-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-light-gray" />
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 mx-auto bg-white border-2 border-light-gray rounded-full flex items-center justify-center relative z-10 mb-6 group hover:border-muted-gold transition-colors">
                  <div className="w-16 h-16 bg-off-white rounded-full flex items-center justify-center group-hover:bg-muted-gold/10 transition-colors">
                    <step.icon className="w-8 h-8 text-deep-charcoal group-hover:text-muted-gold transition-colors" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-muted-gold text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-deep-charcoal">
                  {step[locale as keyof typeof step] as string}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-off-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">
                {dictionary.home.cta_section_title}
              </h2>
              <p className="text-lg text-medium-gray">
                {dictionary.home.cta_section_desc}
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-light-gray/50">
              <ContactForm dictionary={dictionary} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
