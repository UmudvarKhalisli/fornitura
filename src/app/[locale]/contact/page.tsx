import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { ContactForm } from '@/components/forms/contact-form';
import { BreadcrumbSchema } from '@/components/seo';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.contact_title,
    description: dictionary.seo.contact_desc,
    locale: locale as Locale,
    path: '/contact',
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const settings = await getSiteSettings();

  const address = (settings as any)?.[`address_${locale}`] || settings?.address_en || 'Bakı, Azərbaycan';

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.contact, path: '/contact' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />

      <section className="py-12 md:py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <span className="text-muted-gold text-xs font-semibold uppercase tracking-[0.15em]">
              {dictionary.nav.contact}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-deep-charcoal tracking-tight mt-3 mb-4">
              {dictionary.contact.title}
            </h1>
            <p className="text-medium-gray">{dictionary.contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Contact info */}
            <div className="space-y-6">
              {settings?.phone_number && (
                <a
                  href={`tel:${settings.phone_number}`}
                  className="flex items-center gap-4 p-4 rounded-lg border border-light-gray hover:border-muted-gold/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-off-white group-hover:bg-muted-gold/10 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-muted-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray uppercase tracking-wider">{dictionary.contact.call_us}</p>
                    <p className="font-semibold text-deep-charcoal">{settings.phone_number}</p>
                  </div>
                </a>
              )}

              {settings?.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-light-gray hover:border-whatsapp/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-off-white group-hover:bg-whatsapp/10 flex items-center justify-center transition-colors">
                    <MessageCircle className="w-5 h-5 text-whatsapp" />
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray uppercase tracking-wider">{dictionary.contact.write_us}</p>
                    <p className="font-semibold text-deep-charcoal">{settings.whatsapp_number}</p>
                  </div>
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 p-4 rounded-lg border border-light-gray hover:border-muted-gold/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-off-white group-hover:bg-muted-gold/10 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5 text-muted-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray uppercase tracking-wider">{dictionary.contact.email_us}</p>
                    <p className="font-semibold text-deep-charcoal">{settings.email}</p>
                  </div>
                </a>
              )}

              <div className="flex items-start gap-4 p-4 rounded-lg border border-light-gray">
                <div className="w-10 h-10 shrink-0 rounded-full bg-off-white flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <p className="text-xs text-medium-gray uppercase tracking-wider">{dictionary.contact.visit_us}</p>
                  <p className="font-semibold text-deep-charcoal">{address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-light-gray">
                <div className="w-10 h-10 shrink-0 rounded-full bg-off-white flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <p className="text-xs text-medium-gray uppercase tracking-wider">{dictionary.footer.working_hours}</p>
                  <p className="font-semibold text-deep-charcoal">{dictionary.footer.working_hours_text}</p>
                </div>
              </div>

              {settings?.google_maps_url && (
                <iframe
                  src={settings.google_maps_url}
                  width="100%"
                  height="200"
                  className="rounded-lg border border-light-gray"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              )}
            </div>

            {/* Contact form */}
            <div>
              <ContactForm dictionary={dictionary} locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
