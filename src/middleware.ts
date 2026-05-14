import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['az', 'en', 'ru'];
const DEFAULT_LOCALE = 'az';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(png|jpe?g|gif|svg|webp|ico|xml|txt)$/i)
  ) {
    return NextResponse.next();
  }

  // Check if already has a locale prefix
  const pathLocale = SUPPORTED_LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathLocale) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathLocale);
    return response;
  }

  // Redirect to default locale
  const locale = request.cookies.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|admin|static|.*\\..*).*)'],
};
