import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, ExternalLink } from 'lucide-react';
// Social icons: since lucide-react doesn't have brand icons, we use generic ones

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
    { label: dictionary.nav.brands, href: `/${locale}/brands` },
    { label: dictionary.nav.contact, href: `/${locale}/contact` },
    { label: dictionary.nav.blog, href: `/${locale}/blog` },
  ];

  const address = settings?.[`address_${locale}`] || settings?.address_en || 'Bakı, Azərbaycan';

  return (
    <footer className="bg-deep-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-muted-gold rounded-md flex items-center justify-center">
                <span className="text-deep-charcoal font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">Fornitura</span>
            </div>
            <p className="text-metallic-silver text-sm leading-relaxed max-w-xs">
              {dictionary.hero.subtitle}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-gold mb-4">
              {dictionary.footer.navigation}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-metallic-silver hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-gold mb-4">
              {dictionary.footer.contact}
            </h3>
            <ul className="space-y-3">
              {settings?.phone_number && (
                <li>
                  <a href={`tel:${settings.phone_number}`} className="flex items-center gap-2 text-sm text-metallic-silver hover:text-white transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                    {settings.phone_number}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-metallic-silver hover:text-white transition-colors">
                    <Mail className="w-4 h-4 shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.whatsapp_number && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-metallic-silver hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    {settings.whatsapp_number}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-sm text-metallic-silver">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-metallic-silver">
                <Clock className="w-4 h-4 shrink-0" />
                {dictionary.footer.working_hours_text}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-gold mb-4">
              {dictionary.footer.follow_us}
            </h3>
            <div className="flex flex-wrap gap-3">
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-md flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all" aria-label="Instagram">
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-md flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all" aria-label="Facebook">
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {settings?.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-md flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all" aria-label="LinkedIn">
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-md flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all" aria-label="Youtube">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-graphite">
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
