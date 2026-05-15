import { getDictionary } from '@/i18n';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateSEOMetadata({
    title: 'Məxfilik Siyasəti | Fornitura',
    description: 'Fornitura MMC-nin məxfilik siyasəti. Şəxsi məlumatların qorunması qaydaları.',
    locale: locale as Locale,
    path: '/privacy-policy',
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="pt-32 pb-20 bg-white">
      <Container className="max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-deep-charcoal mb-8">Məxfilik Siyasəti</h1>
        <div className="prose prose-lg max-w-none text-medium-gray">
          <p className="font-semibold text-deep-charcoal">Son yenilənmə tarixi: 15 May 2026</p>
          
          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">1. Ümumi Müddəalar</h2>
          <p>
            "Fornitura" MMC (bundan sonra "Şirkət" və ya "Biz") müştərilərinin və veb-sayt istifadəçilərinin şəxsi məlumatlarının məxfiliyini qorumağa xüsusi əhəmiyyət verir. Bu Məxfilik Siyasəti, fornitura.az veb-saytından istifadə zamanı şəxsi məlumatlarınızın necə toplandığını, istifadə olunduğunu və qorunduğunu izah edir.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">2. Toplanan Məlumatlar</h2>
          <p>
            Bizimlə əlaqə saxladığınızda, saytımızdakı formaları doldurduqda və ya xidmətlərimizdən istifadə etdikdə aşağıdakı məlumatları toplaya bilərik:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Ad, soyad və şirkət adı;</li>
            <li>Əlaqə vasitələri (telefon nömrəsi, e-poçt ünvanı);</li>
            <li>Sorğunuz və texnikanız haqqında detallar (məsələn, tələb olunan ehtiyat hissəsi və ya texnikanın modeli);</li>
            <li>Veb-saytdan istifadə zamanı toplanan texniki məlumatlar (IP ünvanı, brauzer növü).</li>
          </ul>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">3. Məlumatların İstifadəsi</h2>
          <p>
            Toplanan şəxsi məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Müştəri sorğularını cavablandırmaq və xidmət göstərmək;</li>
            <li>Sifarişlərin qəbulu və ehtiyat hissələrinin çatdırılması prosesini idarə etmək;</li>
            <li>Saytımızın fəaliyyətini yaxşılaşdırmaq və müştəri təcrübəsini təkmilləşdırmək;</li>
            <li>Yeniliklər və təkliflər barədə məlumatlandırmaq (yalnız sizin razılığınızla).</li>
          </ul>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">4. Məlumatların Üçüncü Tərəflərlə Paylaşılması</h2>
          <p>
            Fornitura MMC sizin şəxsi məlumatlarınızı heç bir halda kommersiya məqsədləri üçün satmır və üçüncü tərəflərə ötürmür. Məlumatlar yalnız qanunvericiliklə tələb olunan hallarda və ya məhsul çatdırılması zamanı etibarlı logistika tərəfdaşlarımıza zəruri miqdarda ötürülə bilər.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">5. Məlumatların Təhlükəsizliyi</h2>
          <p>
            Şəxsi məlumatlarınızın qorunması üçün veb-saytımızda müvafiq təhlükəsizlik tədbirləri (şifrələmə, qorunmuş serverlər) tətbiq edilir. Buna baxmayaraq, internet üzərindən məlumat ötürülməsinin 100% təhlükəsiz olmasına heç bir platforma zəmanət verə bilməz.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">6. Əlaqə</h2>
          <p>
            Məxfilik siyasəti ilə bağlı hər hansı sualınız olarsa, bizimlə əlaqə saxlamaqdan çəkinməyin:
            <br />
            <strong>E-poçt:</strong> info@fornitura.az
          </p>
        </div>
      </Container>
    </div>
  );
}
