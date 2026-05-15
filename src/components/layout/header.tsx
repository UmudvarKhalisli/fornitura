'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

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

import { cn } from '@/lib/utils';

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
    href: key === 'home' ? `/${locale}` : `/${locale}/${key.replace('_', '-')}`,
  }));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <img 
              src="/logo.png" 
              alt="Fornitura Logo" 
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
              href={`tel:${settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}`}
              className="hidden md:flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}</span>
            </a>

            {true && (
              <a
                href={`https://wa.me/${(settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || '').replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-whatsapp text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1ebe5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{dictionary.common.whatsapp}</span>
              </a>
            )}

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
            href={`tel:${settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}`}
            className="flex items-center gap-2 px-3 py-2.5 text-base text-medium-gray hover:text-deep-charcoal"
          >
            <Phone className="w-4 h-4" />
            {settings?.phone_number || process.env.NEXT_PUBLIC_PHONE || ''}
          </a>
          <hr className="my-3 border-t border-light-gray" />

          {/* Social Icons inside Mobile Menu */}
          <div className="flex items-center gap-4 px-3 py-1 mb-2 text-medium-gray">
            <a href={settings?.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 -ml-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={settings?.facebook_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href={settings?.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={settings?.youtube_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:text-deep-charcoal hover:bg-light-gray transition-colors" aria-label="YouTube">
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="px-3 py-2 border-t border-light-gray/50 mb-2 mt-2 pt-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <div className="flex flex-col px-3 gap-3 text-sm text-medium-gray pb-6">
            <Link href={`/${locale}/privacy-policy`} onClick={() => setMobileOpen(false)} className="hover:text-deep-charcoal transition-colors">
              {dictionary.footer?.privacy || "Məxfilik siyasəti"}
            </Link>
            <Link href={`/${locale}/terms-of-service`} onClick={() => setMobileOpen(false)} className="hover:text-deep-charcoal transition-colors">
              {dictionary.footer?.terms || "İstifadə şərtləri"}
            </Link>
          </div>        </nav>
      </div>
    </header>
  );
}
