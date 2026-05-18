import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { getLocalizedPath } from '@/lib/utils/routes';
import type { Locale } from '@/lib/seo/constants';

interface RepairIntroProps {
  dictionary: any;
  locale: string;
  settings: any;
}

export function RepairIntro({ dictionary, locale, settings }: RepairIntroProps) {
  const title = settings?.[`repair_service_title_${locale}`] || dictionary.home.repair_intro_title;
  const description = settings?.[`repair_service_description_${locale}`] || dictionary.home.repair_intro_desc;
  const image = settings?.repair_service_image;

  return (
    <section className="py-16 md:py-24 bg-off-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-muted-gold" />
              <span className="text-muted-gold text-xs font-bold uppercase tracking-widest">
                {dictionary.nav.repair_service}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-deep-charcoal tracking-tight mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-medium-gray text-lg leading-relaxed mb-8 max-w-lg">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={getLocalizedPath('repair-service', locale as Locale)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-deep-charcoal text-white font-medium rounded-md hover:bg-muted-gold hover:text-deep-charcoal transition-all duration-300 text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {dictionary.repair_service.learn_more}
              </Link>
              <a
                href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-light-gray text-deep-charcoal font-medium rounded-md hover:border-deep-charcoal transition-all duration-300 text-sm bg-white"
              >
                {dictionary.repair_service.cta}
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-muted-gold/10 rounded-2xl transform rotate-2 md:-rotate-2 transition-transform duration-500 hover:rotate-0" />
            
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
              <Image
                src={image || "/repair-bg.png"}
                alt="Ağır texnika təmir xidməti"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-light-gray flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="w-12 h-12 bg-muted-gold/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-deep-charcoal">{dictionary.home.professional_repair}</p>
                <p className="text-xs text-medium-gray">{dictionary.home.guaranteed_service}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
