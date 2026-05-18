'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
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

import { cn } from '@/lib/utils';
import { getLocalizedPath } from '@/lib/utils/routes';
import type { Locale } from '@/lib/seo/constants';

interface HeaderProps {
  locale: string;
  dictionary: any;
  settings: any;
}

const navKeys = ['home', 'spare_parts', 'repair_service', 'about', 'contact', 'blog'] as const;

export function Header({ locale, dictionary, settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = navKeys.map((key) => ({
    label: dictionary.nav[key],
    href: key === 'home' ? `/${locale}` : getLocalizedPath(key.replace('_', '-'), locale as Locale),
  }));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link prefetch={true} href={`/${locale}`} className="flex items-center shrink-0">
            <img 
              src="/logo.png" 
              alt={dictionary.home.logo_alt} 
              className="h-16 md:h-20 w-auto object-contain scale-[1.2] md:scale-[1.4] origin-left" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative inline-flex items-center justify-center overflow-hidden px-3 py-2 group text-sm font-medium rounded-md"
                >
                  <span className={cn(
                    "block transition-transform duration-700 ease-in-out group-hover:-translate-y-[150%]",
                    isActive ? "text-muted-gold" : "text-medium-gray group-hover:text-deep-charcoal"
                  )}>
                    {link.label}
                  </span>
                  <span className={cn(
                    "absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-in-out translate-y-[150%] group-hover:translate-y-0 font-bold",
                    isActive ? "text-muted-gold" : "text-muted-gold"
                  )}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:+${settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}`}
              className="hidden md:flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}</span>
            </a>

            

            <div className="hidden lg:block"><LanguageSwitcher currentLocale={locale} /></div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-medium-gray hover:text-deep-charcoal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bg-white border-b border-light-gray shadow-lg transition-all duration-300 z-50',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
<nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.filter(l => !l.href.includes("/blog")).map((link) => {
            const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-base font-medium rounded-md transition-colors",
                  isActive 
                    ? "text-muted-gold bg-off-white" 
                    : "text-medium-gray hover:text-deep-charcoal hover:bg-off-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={`tel:+${settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}`}
            className="flex items-center gap-2 px-3 py-2.5 text-base text-medium-gray hover:text-deep-charcoal"
          >
            <Phone className="w-4 h-4" />
            {settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}
          </a>
          <hr className="my-3 border-t border-light-gray" />

          {/* Social Icons inside Mobile Menu */}
          <div className="flex items-center gap-4 px-3 py-1 mb-2 text-medium-gray">
            <a href={settings?.instagram_url || "https://www.instagram.com/fornitura.az?igsh=MW5zYzVqczI3eHBsMA%3D%3D&utm_source=qr"} target="_blank" rel="noopener noreferrer" className="p-2 -ml-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={settings?.facebook_url || "https://www.facebook.com/profile.php?id=61589671533760"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href={settings?.tiktok_url || "https://www.tiktok.com/@fornitura.az?_r=1&_t=ZS-96P9wpY1fBA"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="TikTok">
              <TiktokIcon className="w-5 h-5" />
            </a>
            <a href={`https://wa.me/${(settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/[^\d]/g, "")}?text=${encodeURIComponent("Salam, məhsul haqqında məlumat almaq istəyirəm")}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="WhatsApp">
              <OfficialWhatsAppIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="px-3 py-2 border-t border-light-gray/50 mb-2 mt-2 pt-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <div className="flex flex-col px-3 gap-3 text-sm text-medium-gray pb-6">
            <Link prefetch={true} href={`/${locale}/privacy-policy`} onClick={() => setMobileOpen(false)} className="hover:text-deep-charcoal transition-colors">
              {dictionary.footer?.privacy || "Məxfilik siyasəti"}
            </Link>
            <Link prefetch={true} href={`/${locale}/terms-of-service`} onClick={() => setMobileOpen(false)} className="hover:text-deep-charcoal transition-colors">
              {dictionary.footer?.terms || "İstifadə şərtləri"}
            </Link>
          </div>        </nav>
      </div>
    </header>
  );
}
