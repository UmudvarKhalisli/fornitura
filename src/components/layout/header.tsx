'use client';

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

  const navLinks = navKeys.map((key) => ({
    label: dictionary.nav[key],
    href: key === 'home' ? `/${locale}` : `/${locale}/${key.replace('_', '-')}`,
  }));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-deep-charcoal rounded-md flex items-center justify-center">
              <span className="text-muted-gold font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-deep-charcoal hidden sm:block">Fornitura</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative overflow-hidden px-3 py-2 group text-sm font-medium"
              >
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%] text-medium-gray">
                  {link.label}
                </span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-[150%] group-hover:translate-y-0 text-muted-gold font-semibold">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings?.phone_number || ''}`}
              className="hidden md:flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{settings?.phone_number || '+994 XX XXX XX XX'}</span>
            </a>

            {settings?.whatsapp_number && (
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, '')}`}
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-medium-gray hover:text-deep-charcoal hover:bg-off-white rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${settings?.phone_number || ''}`}
            className="flex items-center gap-2 px-3 py-2.5 text-base text-medium-gray hover:text-deep-charcoal"
          >
            <Phone className="w-4 h-4" />
            {settings?.phone_number || '+994 XX XXX XX XX'}
          </a>
        </nav>
      </div>
    </header>
  );
}
