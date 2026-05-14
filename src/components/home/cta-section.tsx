import { Container } from '@/components/shared/container';

interface CTASectionProps {
  dictionary: any;
  settings: any;
}

export function CTASection({ dictionary, settings }: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-deep-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />
      <div className="absolute top-0 right-0 w-48 h-48 bg-muted-gold/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {dictionary.home.cta_section_title}
          </h2>
          <p className="text-metallic-silver text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            {dictionary.home.cta_section_desc}
          </p>
          <a
            href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^\d]/g, '') || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-whatsapp text-white font-semibold rounded-md hover:bg-[#1ebe5a] transition-colors text-sm md:text-base"
          >
            {dictionary.home.cta_section_button}
          </a>
        </div>
      </Container>
    </section>
  );
}
