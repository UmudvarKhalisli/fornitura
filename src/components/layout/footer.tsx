import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, ExternalLink, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  locale: string;
  dictionary: any;
  settings: any;
}

export function Footer({ locale, dictionary, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: dictionary.nav.home, href: `/${locale}` },
    { label: dictionary.nav.spare_parts, href: `/${locale}/spare-parts` },
    { label: dictionary.nav.repair_service, href: `/${locale}/repair-service` },
    { label: dictionary.nav.about, href: `/${locale}/about` },
    { label: dictionary.nav.contact, href: `/${locale}/contact` },
    { label: dictionary.nav.blog, href: `/${locale}/blog` },
  ];

  const address = settings?.[`address_${locale}`] || settings?.address_en || 'Bakı, Azərbaycan';

  return (
    <footer className="bg-[#111111] text-white border-t border-dark-graphite/50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-muted-gold/5 rounded-full blur-[80px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company */}
          <div className="lg:pr-8">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <img src="/logo.png" alt="Fornitura Logo" className="h-12 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-metallic-silver text-sm leading-relaxed mb-8">
              {dictionary.hero.subtitle}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              {dictionary.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              {dictionary.footer.contact}
            </h3>
            <ul className="space-y-4">
              {settings?.phone_number && (
                <li>
                  <a href={`tel:${settings.phone_number}`} className="flex items-center gap-3 text-sm text-metallic-silver hover:text-muted-gold transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center group-hover:bg-muted-gold/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    {settings.phone_number}
                  </a>
                </li>
              )}
              {settings?.whatsapp_number && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-metallic-silver hover:text-[#25D366] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    {settings.whatsapp_number}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-metallic-silver hover:text-muted-gold transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center group-hover:bg-muted-gold/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3 text-sm text-metallic-silver">
                <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="mt-1.5">{address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              {dictionary.footer.follow_us}
            </h3>
            <div className="flex flex-wrap gap-3">
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Youtube">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-metallic-silver/50">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-sm">{dictionary.footer.working_hours_text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-graphite/50 bg-deep-charcoal/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-metallic-silver">
            &copy; {currentYear} Fornitura. {dictionary.footer.rights}
          </p>
          <p className="text-xs text-metallic-silver">
            {settings?.footer_text_az || settings?.footer_text_en || ''}
          </p>
        </div>
      </div>
    </footer>
  );
}
