import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';

interface HeroSectionProps {
  dictionary: any;
  locale: string;
  settings: any;
}

export function HeroSection({ dictionary, locale, settings }: HeroSectionProps) {
  const title = settings?.[`hero_title_${locale}`] || dictionary.hero.title;
  const description = settings?.[`hero_description_${locale}`] || dictionary.hero.subtitle;
  const heroImage = settings?.hero_image;

  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center bg-deep-charcoal overflow-hidden">
      {/* Background image or gradient */}
      <Image
        src={heroImage || "/hero-bg.png"}
        alt="Heavy machinery background"
        fill
        className="object-cover opacity-40 mix-blend-overlay"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/90 via-deep-charcoal/60 to-transparent" />

      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-24 h-1 bg-muted-gold" />

      <Container className="relative z-10 w-full">
        <div className="max-w-2xl">
          <span className="inline-block text-muted-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Fornitura
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-base md:text-lg text-metallic-silver leading-relaxed max-w-xl mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/spare-parts`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-muted-gold text-deep-charcoal font-semibold rounded-md hover:bg-[#B8943A] transition-colors text-sm md:text-base"
            >
              {dictionary.hero.cta_primary}
            </Link>
            <a
              href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white font-medium rounded-md hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              {dictionary.hero.cta_secondary}
            </a>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
