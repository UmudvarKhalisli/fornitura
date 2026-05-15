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
    title: 'İstifadə Şərtləri | Fornitura',
    description: 'Fornitura MMC veb-saytının istifadə şərtləri və qaydaları.',
    locale: locale as Locale,
    path: '/terms-of-service',
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="pt-32 pb-20 bg-white">
      <Container className="max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-deep-charcoal mb-8">İstifadə Şərtləri</h1>
        <div className="prose prose-lg max-w-none text-medium-gray">
          <p className="font-semibold text-deep-charcoal">Son yenilənmə tarixi: 15 May 2026</p>
          
          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">1. Razılaşmanın Qəbulu</h2>
          <p>
            fornitura.az veb-saytına ("Sayt") daxil olmaqla və ya xidmətlərimizdən istifadə etməklə siz bu İstifadə Şərtləri ilə razılaşdığınızı təsdiq edirsiniz. Əgər bu şərtlərlə razı deyilsinizsə, lütfən saytdan istifadə etməyin.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">2. Xidmətlərin Təsviri</h2>
          <p>
            Fornitura MMC ("Biz" və ya "Şirkət") ekskavator, kran, buldozer və digər ağır texnikalar üçün ehtiyat hissələrinin satışı və texniki təmir xidmətlərini təqdim edir. Saytda yerləşdirilmiş məhsul məlumatları, şəkillər və göstəricilər məlumat xarakteri daşıyır.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">3. Saytdan İstifadə Qaydaları</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Saytın məzmununu kopyalamaq, çoxaltmaq və ya kommersiya məqsədləri üçün Şirkətin icazəsi olmadan istifadə etmək qadağandır.</li>
            <li>İstifadəçi saytın fəaliyyətinə müdaxilə edən, zərərli proqramlar və ya viruslar yayan hərəkətlərdən çəkinməlidir.</li>
            <li>Sayt üzərindən müraciət formalarını doldurarkən təqdim edilən məlumatların doğruluğuna istifadəçi cavabdehdir.</li>
          </ul>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">4. Məhdudiyyətlər və Məsuliyyət</h2>
          <p>
            Biz saytın fasiləsiz işləməsi üçün əlimizdən gələni edirik. Lakin texniki səbəblərdən yaranan qısamüddətli fasilələrə görə Şirkət məsuliyyət daşımır. Saytda nümayiş etdirilən hissələrin mövcudluğu və ya qiymətləri bazar şərtlərinə uyğun olaraq dəyişə bilər. Sifariş tam təsdiqlənmədən məhsulun satışı hüquqi öhdəlik yaratmır.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">5. İntellektual Mülkiyyət</h2>
          <p>
            Saytda olan bütün dizayn elementləri, loqolar, mətnlər, qrafiklər və proqram təminatı Fornitura MMC-nin əqli mülkiyyətidir və müvafiq qanunvericiliklə qorunur.
          </p>

          <h2 className="text-xl font-bold text-deep-charcoal mt-8 mb-4">6. Şərtlərdə Dəyişikliklər</h2>
          <p>
            Şirkət bu İstifadə Şərtlərinə istənilən vaxt əvvəlcədən xəbərdarlıq etmədən dəyişiklik etmək hüququnu özündə saxlayır. Dəyişikliklər saytda yayımlandığı andan qüvvəyə minir.
          </p>
        </div>
      </Container>
    </div>
  );
}
