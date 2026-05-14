import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  dictionary: any;
  settings: any;
  locale: string;
}

export function CTASection({ dictionary, settings, locale }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-deep-charcoal relative overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <Image
        src="/repair-bg.png"
        alt="CTA Background"
        fill
        className="object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-transparent to-transparent" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-muted-gold/10 rounded-full blur-[100px]" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-1 bg-muted-gold mb-8 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            {dictionary.home.cta_section_title}
          </h2>
          <p className="text-metallic-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {dictionary.home.cta_section_desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Primary Action Button */}
            <Link
              href={`/${locale}/spare-parts`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-muted-gold text-deep-charcoal font-bold rounded-lg hover:bg-white transition-all duration-300 text-base md:text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl group"
            >
              {dictionary.nav.spare_parts}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Small Animated WhatsApp Button */}
            <div className="relative group flex items-center">
              <div className="absolute -inset-2 bg-whatsapp rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
              <a
                href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-3 px-5 py-3 bg-[#111111] border border-whatsapp/30 text-white font-medium rounded-full hover:bg-[#1ebe5a] hover:border-[#1ebe5a] transition-all duration-300 text-sm md:text-base z-10"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-whatsapp group-hover:text-white transition-colors" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
