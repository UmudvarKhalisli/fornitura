import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { OfficialWhatsAppIcon } from '@/components/shared/icons';

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

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

import { getLocalizedPath } from '@/lib/utils/routes';
import type { Locale } from '@/lib/seo/constants';

interface FooterProps {
  locale: string;
  dictionary: any;
  settings: any;
}

export function Footer({ locale, dictionary, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: dictionary.nav.home, href: `/${locale}` },
    { label: dictionary.nav.spare_parts, href: getLocalizedPath('spare-parts', locale as Locale) },
    { label: dictionary.nav.repair_service, href: getLocalizedPath('repair-service', locale as Locale) },
    { label: dictionary.nav.about, href: getLocalizedPath('about', locale as Locale) },
    { label: dictionary.nav.contact, href: getLocalizedPath('contact', locale as Locale) },
    { label: dictionary.nav.blog, href: getLocalizedPath('blog', locale as Locale) },
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
            <Link prefetch={true} href={`/${locale}`} className="inline-block mb-4 -mt-2 md:-mt-3">
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
              {dictionary.home.services}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link prefetch={true} href={getLocalizedPath('spare-parts', locale as Locale)} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.spare_parts}
                </Link>
              </li>
              <li>
                <Link prefetch={true} href={getLocalizedPath('repair-service', locale as Locale)} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.repair_service}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company (Şirkət) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              {dictionary.home.company}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link prefetch={true} href={`/${locale}`} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.home}
                </Link>
              </li>
              <li>
                <Link prefetch={true} href={getLocalizedPath('about', locale as Locale)} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.about}
                </Link>
              </li>
              <li>
                <Link prefetch={true} href={getLocalizedPath('blog', locale as Locale)} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.blog}
                </Link>
              </li>
              <li>
                <Link prefetch={true} href={getLocalizedPath('contact', locale as Locale)} className="text-sm text-metallic-silver hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {dictionary.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (Əlaqə) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-gold mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-muted-gold" />
              {dictionary.nav.contact}
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
                <a href={settings?.instagram_url || "https://www.instagram.com/fornitura.az?igsh=MW5zYzVqczI3eHBsMA%3D%3D&utm_source=qr"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={settings?.facebook_url || "https://www.facebook.com/profile.php?id=61589671533760"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={settings?.tiktok_url || "https://www.tiktok.com/@fornitura.az?_r=1&_t=ZS-96P9wpY1fBA"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="TikTok">
                  <TiktokIcon className="w-5 h-5" />
                </a>
              )}
              {true && (
                <a href={`https://wa.me/${(settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/[^\\d]/g, "")}?text=${encodeURIComponent("Salam! Fornitura.az saytından yazıram. Ehtiyat hissələri və servis xidmətləri barədə məlumat almaq istəyirdim.")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-graphite rounded-lg flex items-center justify-center hover:bg-muted-gold hover:text-deep-charcoal transition-all hover:-translate-y-1 shadow-lg" aria-label="Youtube">
                  <OfficialWhatsAppIcon className="w-5 h-5" />
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
            <Link prefetch={true} href={getLocalizedPath('privacy-policy', locale as Locale)} className="hover:text-muted-gold transition-colors">
              {dictionary.footer.privacy}
            </Link>
            <span className="w-1 h-1 rounded-full bg-dark-graphite" />
            <Link prefetch={true} href={getLocalizedPath('terms-of-service', locale as Locale)} className="hover:text-muted-gold transition-colors">
              {dictionary.footer.terms}
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
