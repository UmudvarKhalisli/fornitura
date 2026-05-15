import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Logo & Description */}
          <div className="lg:pr-8">
            <Link href={`/${locale}`} className="inline-block mb-4 -mt-2 md:-mt-3">
              <img src="/logo.png" alt="Fornitura Logo" className="h-20 md:h-24 w-auto object-contain object-left-top brightness-0 invert" />
            </Link>
            <p className="text-metallic-silver text-sm leading-relaxed mb-8">
              {dictionary.hero.subtitle}
            </p>
          </div>

          {/* Services (Xidmətlər) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              Xidmətlər
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/spare-parts`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.spare_parts}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/repair-service`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.repair_service}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company (Şirkət) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              Şirkət
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (Əlaqə) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              Əlaqə
            </h3>
            <ul className="space-y-4 mb-8">
              {true && (
                <li>
                  <a href={`tel:${(settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || '')}`} className="flex items-center gap-3 text-sm text-metallic-silver hover:text-muted-gold transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center group-hover:bg-muted-gold/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    {(settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || '')}
                  </a>
                </li>
              )}
              {true && (
                <li>
                  <a
                    href={`https://wa.me/${(settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || '').replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-metallic-silver hover:text-[#25D366] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-dark-graphite flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    {(settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || '')}
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

            {/* Social & Hours */}
            <div className="flex flex-wrap gap-3 mb-6">
              {true && (
                <a href={settings?.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={settings?.facebook_url || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={settings?.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="LinkedIn">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={settings?.youtube_url || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Youtube">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-metallic-silver/50">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-sm">{dictionary.footer.working_hours_text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-graphite/50 bg-deep-charcoal/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-metallic-silver text-center md:text-left">
            &copy; {currentYear} Fornitura. {dictionary.footer?.rights || 'Bütün hüquqlar qorunur.'}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-metallic-silver">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-muted-gold transition-colors">
              Məxfilik Siyasəti
            </Link>
            <span className="w-1 h-1 rounded-full bg-dark-graphite" />
            <Link href={`/${locale}/terms-of-service`} className="hover:text-muted-gold transition-colors">
              İstifadə Şərtləri
            </Link>
          </div>

          <p className="text-xs text-metallic-silver text-center md:text-right">
            {settings?.footer_text_az || settings?.footer_text_en || ''}
            <span className="ml-2">ESTABLISHED by UMUDVAR KHALISLI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
