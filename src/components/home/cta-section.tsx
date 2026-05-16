import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { MessageCircle, ArrowRight, Wrench } from 'lucide-react';

interface CTASectionProps {
  dictionary: any;
  settings: any;
  locale: string;
}

export function CTASection({ dictionary, settings, locale }: CTASectionProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center border-t border-light-gray/10">
      {/* Background Image & Sleek Gradients */}
      <div className="absolute inset-0 bg-deep-charcoal" />
      <Image
        src="/repair-bg.png"
        alt="CTA Background"
        fill
        className="object-cover opacity-20 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-transparent to-deep-charcoal" />

      {/* Modern subtle ambient glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-muted-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col items-center text-center">
          
          {/* Subtle Tag/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-gold mb-8">
            <Wrench className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">{dictionary.nav.spare_parts || "Ehtiyat Hissələri"}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight mb-6 leading-tight max-w-3xl">
            {dictionary.home.cta_section_title}
          </h2>
          
          <p className="text-metallic-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {dictionary.home.cta_section_desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button */}
            <Link
              href={`/${locale}/spare-parts`}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-muted-gold text-deep-charcoal font-bold rounded-xl hover:bg-white transition-all duration-300 text-base md:text-lg shadow-[0_0_20px_rgba(255,200,87,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 w-full sm:w-auto"
            >
              {dictionary.nav.spare_parts}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            {/* Secondary Modern WhatsApp Button */}
            <a
              href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-[#25D366]/10 hover:border-[#25D366]/50 hover:text-[#25D366] transition-all duration-300 text-base md:text-lg hover:-translate-y-1 w-full sm:w-auto"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
