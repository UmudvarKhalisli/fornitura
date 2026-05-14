import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';

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
            <span className="inline-block text-muted-gold text-xs font-semibold uppercase tracking-[0.15em] mb-3">
              {dictionary.nav.repair_service}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-medium-gray leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/repair-service`}
                className="inline-flex items-center justify-center px-6 py-3 bg-deep-charcoal text-white font-medium rounded-md hover:bg-dark-graphite transition-colors text-sm"
              >
                {dictionary.repair_service.learn_more}
              </Link>
              <a
                href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-deep-charcoal text-deep-charcoal font-medium rounded-md hover:bg-deep-charcoal hover:text-white transition-colors text-sm"
              >
                {dictionary.repair_service.cta}
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-graphite">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-light-gray/30">F</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
