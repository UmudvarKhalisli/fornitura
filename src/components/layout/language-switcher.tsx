'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/seo/constants';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const labels: Record<Locale, string> = { az: 'AZ', en: 'EN', ru: 'RU' };

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    router.push(`/${segments.join('/')}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center w-9 h-9 rounded-md text-medium-gray hover:text-deep-charcoal hover:bg-off-white transition-colors focus:outline-none cursor-pointer">
        <Globe className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-16 min-w-[4rem] z-[100] bg-white border border-light-gray p-1 shadow-md rounded-md">
        {SUPPORTED_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`cursor-pointer justify-center text-sm rounded-sm py-1.5 focus:bg-muted-gold focus:text-deep-charcoal transition-colors ${currentLocale === locale ? 'font-bold text-muted-gold bg-off-white' : 'text-deep-charcoal hover:bg-off-white'}`}
          >
            {labels[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
