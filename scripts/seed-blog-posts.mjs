import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env from .env.local manually
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.join('=').trim().replace(/^"|"$|^'|'$/g, '');
    }
  }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY']; // Use ANON key

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn() {
  const { error } = await supabase.auth.signInWithPassword({
    email: 'forniturammc@gmail.com',
    password: 'Imanov1!'
  });
  if (error) throw error;
}

const blogPosts = [
  {
    slug_az: 'agir-texnikada-orijinal-ehtiyat-hisseleri',
    slug_en: 'original-spare-parts-in-heavy-machinery',
    slug_ru: 'originalniye-zapchasti-v-tyajeloy-texnike',
    title_az: 'Ağır Texnikada Ehtiyat Hissələrinin Rolu: Orijinal yoxsa Yan Sanaye?',
    title_en: 'The Role of Spare Parts in Heavy Machinery: Original vs Aftermarket?',
    title_ru: 'Роль запчастей в тяжелой технике: Оригинал или аналог?',
    excerpt_az: 'Ağır texnikaların sıradan çıxmasının qarşısını almaq və uzunömürlülüyünü artırmaq üçün ehtiyat hissəsi seçimi necə olmalıdır?',
    excerpt_en: 'How should the choice of spare parts be made to prevent heavy machinery breakdowns and increase longevity?',
    excerpt_ru: 'Как правильно выбрать запчасти для предотвращения поломок тяжелой техники и увеличения ее срока службы?',
    content_az: `Ağır texnika və sənaye avadanlıqları layihələrin davamlılığını təmin edən əsas vasitələrdir. Ekskavatorlar, kranlar və yükləyicilər gün boyu ağır yük altında çalışır, bu isə onların mütəmadi olaraq texniki xidmətə ehtiyac duyması deməkdir. Ən çox verilən suallardan biri budur: Orijinal ehtiyat hissələri istifadə edilməlidir, yoxsa qiymətcə daha ucuz olan yan sanaye (aftermarket) məhsulları?

    Orijinal (OEM) ehtiyat hissələrinin üstünlükləri nələrdir?
    - Dəqiqlik və Uyğunluq: Orijinal hissələr avadanlıq istehsalçısı tərəfindən hazırlandığı üçün texnikanıza tamamilə uyğun gəlir. Heç bir əlavə modifikasiyaya ehtiyac qalmır.
    - Zəmanət və Təhlükəsizlik: Orijinal hissələr istehsalçı tərəfindən zəmanətlidir. Bu isə o deməkdir ki, gözlənilməz bir arıza baş verdikdə əlavə xərcə düşmürsünüz.
    - Uzunömürlülük: Ucuz detallar ilk baxışda sərfəli görünsə də, qısa müddətdən sonra yenidən sıradan çıxır. Nəticədə texnika dayanır və layihə ləngiyir. Orijinal detallar isə iş prosesini kəsintisiz davam etdirir.
    
    Fornitura MMC olaraq biz bütün növ ağır texnikalar üçün 100% orijinal ehtiyat hissələrinin satışını həyata keçiririk.`,
    content_en: `Heavy machinery and industrial equipment are the backbone of sustainable projects. Excavators, cranes, and loaders work under heavy loads all day long, requiring regular maintenance. One of the most frequently asked questions is: Should original spare parts be used, or cheaper aftermarket alternatives?
    
    What are the advantages of Original (OEM) spare parts?
    - Precision and Compatibility: Since original parts are manufactured by the equipment producer, they perfectly match your machinery without needing modifications.
    - Warranty and Safety: Original parts come with a manufacturer's warranty, protecting you from unexpected repair costs.
    - Longevity: While cheap parts may seem cost-effective initially, they break down faster, causing equipment downtime and project delays.
    
    At Fornitura LLC, we provide 100% original spare parts for all types of heavy machinery.`,
    content_ru: `Тяжелая техника и промышленное оборудование — основа любого успешного проекта. Экскаваторы, краны и погрузчики работают под большой нагрузкой, что требует регулярного обслуживания. Один из самых частых вопросов: Стоит ли использовать оригинальные запчасти или более дешевые аналоги?
    
    В чем преимущества оригинальных (OEM) запчастей?
    - Точность и Совместимость: Оригинальные запчасти производятся производителем оборудования и идеально подходят к вашей технике.
    - Гарантия и Безопасность: На оригинальные детали предоставляется гарантия производителя.
    - Долговечность: Хотя дешевые детали изначально кажутся выгодными, они быстрее выходят из строя, что приводит к простоям техники.
    
    Компания Fornitura LLC предлагает 100% оригинальные запчасти для всех видов тяжелой техники.`,
    image: '/blog/excavator-track.png',
    tags: ['Ehtiyat Hissələri', 'Ağır Texnika', 'Məsləhət', 'Texniki Xidmət'],
    is_published: true,
    published_at: new Date().toISOString(),
    seo_title_az: 'Orijinal Ehtiyat Hissələri - Ağır Texnika Üçün Məsləhətlər',
    seo_title_en: 'Original Spare Parts - Tips for Heavy Machinery',
    seo_title_ru: 'Оригинальные запчасти - Советы для тяжелой техники',
    seo_description_az: 'Ağır texnika ehtiyat hissələri alarkən nələrə diqqət edilməlidir? Orijinal və yan sanaye detalları arasındakı fərqlər.',
    seo_description_en: 'What to look for when buying heavy machinery spare parts? Differences between original and aftermarket parts.',
    seo_description_ru: 'На что обратить внимание при покупке запчастей для тяжелой техники? Различия между оригинальными и аналоговыми деталями.',
  },
  {
    slug_az: 'ekskavatorlarin-uzunomurluluyu-ucun-5-qayda',
    slug_en: '5-rules-for-excavator-longevity',
    slug_ru: '5-pravil-dlya-dolgoletiya-ekskavatorov',
    title_az: 'Ekskavatorların Uzunömürlülüyünü Necə Təmin Etməli? - 5 Qızıl Qayda',
    title_en: 'How to Ensure Excavator Longevity? - 5 Golden Rules',
    title_ru: 'Как обеспечить долговечность экскаватора? - 5 золотых правил',
    excerpt_az: 'Ekskavatorların texniki xidməti və gündəlik yoxlamaları onların ömrünü nə qədər uzada bilər? Vacib məsləhətlər.',
    excerpt_en: 'How much can maintenance and daily inspections extend the life of excavators? Important tips.',
    excerpt_ru: 'Насколько техническое обслуживание и ежедневные проверки могут продлить срок службы экскаваторов? Важные советы.',
    content_az: `Ekskavatorlar tikinti və mədən sektorunda ən çox istifadə olunan ağır texnikalardır. Onların daim işlək vəziyyətdə qalması şirkətlərin gəlirliliyi üçün mühüm amildir. Ekskavatorun sıradan çıxması təkcə təmir xərci deyil, həm də layihənin dayanması deməkdir.
    
    1. Gündəlik Vizual Baxış: İşə başlamazdan əvvəl yağ sızmaları, tırtılların vəziyyəti və şlanqların zədələnmədiyini mütləq yoxlayın.
    2. Filtr və Yağ Dəyişimi: Mühərrik və hidravlik yağları vaxtında dəyişdirin. Filtrlər tıxandıqda sistemdə həddindən artıq istiləşmə baş verir.
    3. Düzgün Operator İstismarı: Operatorların təlimli olması və texnikanın gücündən kənar yüklənmələrdən qaçınması əsas şərtdir.
    4. Yürüş Hissəsinə Diqqət (Undercarriage): Ekskavatorun tırtıl zəncirləri və oxları xüsusi təmizliyə və yağlanmaya ehtiyac duyur.
    5. Peşəkar Təmir: Hər hansı qeyri-adi səs və ya performans düşüşü zamanı mütləq peşəkar ustalara müraciət edin.
    
    Fornitura olaraq ağır texnikanızın təmiri və diaqnostikasını yüksək peşəkarlıqla həyata keçiririk.`,
    content_en: `Excavators are the most widely used heavy machinery in the construction and mining sectors. Keeping them in working condition is crucial for company profitability. An excavator breakdown means not only repair costs but also project delays.
    
    1. Daily Visual Inspection: Before starting work, check for oil leaks, the condition of the tracks, and any damaged hoses.
    2. Filter and Oil Change: Change engine and hydraulic oils on time. Clogged filters cause the system to overheat.
    3. Proper Operator Usage: Trained operators who avoid overloading the equipment beyond its capacity are essential.
    4. Attention to Undercarriage: Excavator tracks and axles require special cleaning and lubrication.
    5. Professional Repair: Whenever there is an unusual noise or a drop in performance, always consult professional technicians.
    
    At Fornitura, we provide highly professional repair and diagnostics for your heavy machinery.`,
    content_ru: `Экскаваторы — самая популярная тяжелая техника в строительной и горнодобывающей отраслях. Поддержание их в рабочем состоянии имеет решающее значение для прибыльности компаний. Поломка экскаватора — это не только затраты на ремонт, но и остановка проекта.
    
    1. Ежедневный осмотр: Перед началом работы обязательно проверяйте наличие утечек масла, состояние гусениц и шлангов.
    2. Замена масла и фильтров: Вовремя меняйте моторное и гидравлическое масло. Засоренные фильтры приводят к перегреву системы.
    3. Правильная эксплуатация: Обученные операторы и недопущение перегрузок являются основными условиями.
    4. Внимание к ходовой части: Гусеничные цепи и оси экскаватора требуют очистки и смазки.
    5. Профессиональный ремонт: При любых необычных звуках или падении производительности обращайтесь к профессионалам.
    
    Fornitura осуществляет профессиональный ремонт и диагностику вашей техники.`,
    image: '/blog/engine-part.png',
    tags: ['Ekskavator', 'Təmir', 'Baxım', 'Qaydalar'],
    is_published: true,
    published_at: new Date().toISOString(),
    seo_title_az: 'Ekskavatorların Uzunömürlülüyü: Təmir və Baxım',
    seo_title_en: 'Excavator Longevity: Repair and Maintenance',
    seo_title_ru: 'Долговечность экскаваторов: Ремонт и обслуживание',
    seo_description_az: 'Ekskavatorların ömrünü uzatmaq üçün gündəlik baxım və peşəkar təmir məsləhətləri. Ağır texnikaya necə qulluq etməli?',
    seo_description_en: 'Daily maintenance and professional repair tips to extend the life of excavators. How to care for heavy machinery?',
    seo_description_ru: 'Ежедневное обслуживание и советы по ремонту для продления срока службы экскаваторов.',
  },
  {
    slug_az: 'neft-ve-qaz-senayesinde-agir-avadanliqlara-qulluq',
    slug_en: 'maintenance-of-heavy-equipment-in-oil-and-gas',
    slug_ru: 'obslujivanie-tyajelogo-oborudovaniya-v-neftegazovoy-otrasli',
    title_az: 'Neft və Qaz Sənayesində Ağır Avadanlıqlara Düzgün Qulluq',
    title_en: 'Proper Maintenance of Heavy Equipment in the Oil and Gas Industry',
    title_ru: 'Правильное обслуживание тяжелого оборудования в нефтегазовой отрасли',
    excerpt_az: 'Xüsusi şəraitlərdə çalışan neft-qaz sənayesi avadanlıqlarının uzunömürlülüyünü necə təmin etmək olar?',
    excerpt_en: 'How to ensure the longevity of oil and gas industry equipment working in special conditions?',
    excerpt_ru: 'Как обеспечить долговечность нефтегазового оборудования, работающего в особых условиях?',
    content_az: `Neft və qaz sənayesi dünyada ən çox riskli və çətin şərtlərdə işləyən sektorlardan biridir. Dəniz platformalarında, yüksək təzyiq və ekstremal hava şəraitlərində fəaliyyət göstərən avadanlıqlar daim erroziyaya və aşınmaya məruz qalır.
    
    Avadanlıqların nasazlığı nəinki məhsuldarlığı aşağı salır, həm də ciddi təhlükəsizlik riskləri yaradır. Bəs bu texnikalara necə düzgün qulluq edilməlidir?
    
    Yüksək Keyfiyyətli Yağlardan İstifadə: Neft-qaz sənayesi mühərrikləri və nasosları yüksək keyfiyyətli sintetik yağlarla işləməlidir. Standartlardan kənar yağlar qızdırma və detalların əriməsi ilə nəticələnə bilər.
    Mütəmadi Kalibrasiya və Testlər: Pompa və kompressorların təzyiq göstəriciləri daima test edilməli və beynəlxalq standartlara uyğun kalibrasiya olunmalıdır.
    Korroziyaya Qarşı Tədbirlər: Dəniz kənarında istifadə edilən texnikalar xüsusi anti-korroziya örtükləri və təmizləyici kimyəvilərlə mühafizə olunmalıdır.
    
    Fornitura şirkəti olaraq sənaye tipli nasoslar, kompressorlar və spesifik neft avadanlıqları üçün üstün keyfiyyətli ehtiyat hissələrini və təmirini təmin edirik.`,
    content_en: `The oil and gas industry is one of the sectors operating under the most hazardous and challenging conditions worldwide. Equipment operating on offshore platforms, under high pressure and extreme weather conditions, is constantly subjected to erosion and wear.
    
    Equipment failure not only reduces productivity but also poses serious safety risks. So how should this machinery be properly maintained?
    
    Use of High-Quality Lubricants: Oil and gas industry engines and pumps must run on high-quality synthetic oils. Substandard oils can result in overheating and part melting.
    Regular Calibration and Testing: Pressure indicators of pumps and compressors must be continuously tested and calibrated to international standards.
    Anti-Corrosion Measures: Equipment used in offshore environments must be protected with special anti-corrosion coatings and cleaning chemicals.
    
    As Fornitura, we provide premium quality spare parts and repair services for industrial pumps, compressors, and specific oil equipment.`,
    content_ru: `Нефтегазовая промышленность является одним из секторов, работающих в самых опасных и сложных условиях в мире. Оборудование, работающее на морских платформах, при высоком давлении и экстремальных погодных условиях, постоянно подвергается эрозии и износу.
    
    Отказ оборудования не только снижает производительность, но и создает серьезные риски для безопасности. Так как же правильно обслуживать эту технику?
    
    Использование высококачественных масел: Двигатели и насосы нефтегазовой отрасли должны работать на высококачественных синтетических маслах.
    Регулярная калибровка и тестирование: Показатели давления насосов и компрессоров должны постоянно проверяться.
    Антикоррозийные меры: Техника, используемая в морских условиях, должна быть защищена специальными антикоррозийными покрытиями.
    
    Компания Fornitura поставляет высококачественные запчасти и осуществляет ремонт промышленных насосов, компрессоров и специфического нефтяного оборудования.`,
    image: '/blog/pump.png',
    tags: ['Neft-Qaz', 'Pompa', 'Təmir', 'Sənaye'],
    is_published: true,
    published_at: new Date().toISOString(),
    seo_title_az: 'Neft-Qaz Sənayesində Ağır Avadanlıqlara Qulluq',
    seo_title_en: 'Maintenance of Heavy Equipment in Oil-Gas Industry',
    seo_title_ru: 'Обслуживание оборудования в нефтегазовой отрасли',
    seo_description_az: 'Neft və qaz sənayesində işlədilən kompressor, pompa və ağır avadanlıqlara necə düzgün texniki xidmət göstərməli?',
    seo_description_en: 'How to properly maintain compressors, pumps, and heavy equipment used in the oil and gas industry?',
    seo_description_ru: 'Как правильно обслуживать компрессоры, насосы и тяжелое оборудование в нефтегазовой отрасли?',
  }
];

async function seed() {
  await signIn();
  console.log('Inserting blog posts...');
  
  // Clean old posts
  const { data: existingPosts } = await supabase.from('blog_posts').select('id');
  if (existingPosts && existingPosts.length > 0) {
    for (const post of existingPosts) {
      await supabase.from('blog_posts').delete().eq('id', post.id);
    }
  }

  const { error } = await supabase.from('blog_posts').insert(blogPosts);

  if (error) {
    console.error('Error inserting blogs:', error);
  } else {
    console.log('Successfully inserted all blog posts!');
  }
}

seed().catch(console.error);
