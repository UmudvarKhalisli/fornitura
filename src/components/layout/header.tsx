'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
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

            <LanguageSwitcher currentLocale={locale} />

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
          {navLinks.map((link) => {
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
        </nav>
      </div>
    </header>
  );
}
