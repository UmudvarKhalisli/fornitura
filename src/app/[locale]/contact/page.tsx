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

      <section className="py-12 md:py-20 bg-off-white min-h-screen">
        <Container>
          <ContactForm dictionary={dictionary} locale={locale} settings={settings} showContactInfo />
          
          {settings?.google_maps_url && (
            <div className="mt-16 md:mt-24">
              <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-center">
                {dictionary.contact.map_badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-deep-charcoal mb-8 text-center">
                {dictionary.contact.map_title}
              </h3>
              <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-light-gray/40 shadow-lg bg-white p-2">
                <iframe
                  src={settings.google_maps_url}
                  width="100%"
                  height="100%"
                  className="rounded-2xl"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
