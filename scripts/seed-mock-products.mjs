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

const mockParts = [
  { 
    name_en: 'Heavy Duty Turbocharger', 
    name_az: 'Ağır Texnika Turbokompressoru', 
    name_ru: 'Турбокомпрессор для Спецтехники', 
    part_number: 'TC-905X',
    description_en: 'High-performance turbocharger designed to boost engine efficiency and power output for heavy construction machinery.',
    description_az: 'Ağır tikinti texnikalarında mühərrikin səmərəliliyini və gücünü artırmaq üçün dizayn edilmiş yüksək performanslı turbokompressor.',
    description_ru: 'Высокопроизводительный турбокомпрессор, предназначенный для повышения эффективности и мощности двигателей тяжелой строительной техники.'
  },
  { 
    name_en: 'Industrial Cooling Radiator', 
    name_az: 'Sənaye Soyutma Radiatoru', 
    name_ru: 'Промышленный Радиатор Охлаждения', 
    part_number: 'RAD-2200',
    description_en: 'Durable aluminum core radiator providing optimal thermal management for continuous heavy-duty operations.',
    description_az: 'Fasiləsiz ağır fəaliyyət üçün optimal istilik tənzimləməsini təmin edən dözümlü alüminium özəkli radiator.',
    description_ru: 'Прочный радиатор с алюминиевым сердечником, обеспечивающий оптимальное терморегулирование при непрерывных тяжелых работах.'
  },
  { 
    name_en: 'Hydraulic Cylinder Shaft', 
    name_az: 'Hidravlik Silindr Ştoku (Mili)', 
    name_ru: 'Шток Гидравлического Цилиндра', 
    part_number: 'HCS-45-CR',
    description_en: 'Chrome-plated hydraulic cylinder shaft ensuring high resistance to corrosion and mechanical wear.',
    description_az: 'Korroziyaya və mexaniki aşınmaya qarşı yüksək müqavimət təmin edən xrom örtüklü hidravlik silindr mili.',
    description_ru: 'Хромированный шток гидравлического цилиндра, обеспечивающий высокую устойчивость к коррозии и механическому износу.'
  },
  { 
    name_en: 'Flanged Ball Valve', 
    name_az: 'Flanslı Şar Klapan', 
    name_ru: 'Фланцевый Шаровой Кран', 
    part_number: 'FBV-800',
    description_en: 'Robust flanged ball valve built for tight shutoff and reliable fluid control in high-pressure industrial systems.',
    description_az: 'Yüksək təzyiqli sənaye sistemlərində etibarlı maye nəzarəti və tam sızdırmazlıq üçün istehsal edilmiş flanslı şar klapan.',
    description_ru: 'Надежный фланцевый шаровой кран, созданный для герметичного перекрытия и надежного управления жидкостями в промышленных системах высокого давления.'
  },
  { 
    name_en: 'Flexible Flange Coupling', 
    name_az: 'Elastik Flans Muftası', 
    name_ru: 'Эластичная Фланцевая Муфта', 
    part_number: 'FFC-60',
    description_en: 'Precision-machined flexible flange coupling for absorbing shock loads and compensating for shaft misalignment.',
    description_az: 'Zərbə yüklərini udmaq və millər arası uyğunsuzluğu kompensasiya etmək üçün dəqiq işlənmiş elastik flans muftası.',
    description_ru: 'Точно обработанная эластичная фланцевая муфта для поглощения ударных нагрузок и компенсации несоосности валов.'
  },
  { 
    name_en: 'Heavy Machinery Filter Kit', 
    name_az: 'Ağır Texnika Filtr Dəsti', 
    name_ru: 'Комплект Фильтров Спецтехники', 
    part_number: 'FK-COMBO-5',
    description_en: 'Comprehensive equipment filter kit including oil, air, and hydraulic filters to ensure absolute system cleanliness.',
    description_az: 'Sistemin mütləq təmizliyini təmin etmək üçün yağ, hava və hidravlik filtrləri özündə birləşdirən kompleks avadanlıq filtr dəsti.',
    description_ru: 'Комплексный набор фильтров для оборудования, включающий масляный, воздушный и гидравлический фильтры для обеспечения абсолютной чистоты системы.'
  },
  { 
    name_en: 'Heavy Duty Universal Joint', 
    name_az: 'Gücləndirilmiş Kardan Oynağı (Krestovina)', 
    name_ru: 'Усиленная Крестовина Карданного Вала', 
    part_number: 'UJ-40X',
    description_en: 'High-strength forged universal joint designed to transmit rotary motion under extreme torque conditions.',
    description_az: 'Ekstremal fırlanma anı şəraitində hərəkəti ötürmək üçün dizayn edilmiş yüksək möhkəmlikli döymə kardan krestovinası.',
    description_ru: 'Высокопрочная кованая крестовина карданного вала, предназначенная для передачи вращательного движения в условиях экстремального крутящего момента.'
  },
  { 
    name_en: 'Industrial Clutch Kit', 
    name_az: 'Sənaye Maşınları üçün Mufta (Səbət) Dəsti', 
    name_ru: 'Комплект Сцепления Промышленных Машин', 
    part_number: 'CLK-2500',
    description_en: 'Complete heavy-duty clutch kit providing smooth engagement and superior friction life for industrial transmissions.',
    description_az: 'Sənaye transmissiyaları üçün səlis qoşulma və üstün sürtünmə ömrü təmin edən gücləndirilmiş tam mufta dəsti.',
    description_ru: 'Полный усиленный комплект сцепления, обеспечивающий плавное включение и превосходный срок службы для промышленных трансмиссий.'
  },
  { 
    name_en: 'Double Acting Hydraulic Cylinder', 
    name_az: 'İki Tərəfli Hidravlik Silindr', 
    name_ru: 'Гидроцилиндр Двустороннего Действия', 
    part_number: 'DAHC-120-800',
    description_en: 'Powerful double acting hydraulic cylinder designed to handle massive lifting and pushing capacities.',
    description_az: 'Kütləvi qaldırma və itələmə güclərinin öhdəsindən gəlmək üçün dizayn edilmiş güclü ikitərəfli hidravlik silindr.',
    description_ru: 'Мощный гидроцилиндр двустороннего действия, рассчитанный на огромные подъемные и толкающие усилия.'
  },
  { 
    name_en: 'High Pressure Hydraulic Pump', 
    name_az: 'Yüksək Təzyiqli Hidravlik Nasos', 
    name_ru: 'Гидравлический Насос Высокого Давления', 
    part_number: 'HPP-G4',
    description_en: 'Efficient and durable high pressure hydraulic pump to supply consistent operational fluid power.',
    description_az: 'Ardıcıl hidravlik güc təmin etmək üçün səmərəli və dözümlü yüksək təzyiqli hidravlik nasos.',
    description_ru: 'Эффективный и долговечный гидравлический насос высокого давления для обеспечения стабильной гидравлической мощности.'
  }
];

async function seed() {
  await signIn();
  console.log('Fetching categories and brands...');
  const { data: categories } = await supabase.from('categories').select('id, name_en');
  const { data: brands } = await supabase.from('brands').select('id, name');

  const catId = categories && categories.length > 0 ? categories[0].id : null;
  const brandId = brands && brands.length > 0 ? brands[0].id : null;

  const allParts = mockParts.map((p, i) => {
    const slug = p.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    return {
      ...p,
      slug,
      short_description_en: 'High-quality replacement part.',
      short_description_az: 'Yüksək keyfiyyətli ehtiyat hissəsi.',
      short_description_ru: 'Высококачественная запасная часть.',
      category_id: catId,
      brand_id: brandId,
      compatible_models: ['Model A', 'Model B'],
      stock_status: i % 5 === 0 ? 'out_of_stock' : 'in_stock',
      images: [],
      main_image: null,
      is_featured: i % 4 === 0,
      is_active: true,
      seo_title_az: p.name_az,
      seo_title_en: p.name_en,
      seo_title_ru: p.name_ru,
      seo_description_az: 'Sifariş verin: ' + p.name_az,
      seo_description_en: 'Order now: ' + p.name_en,
      seo_description_ru: 'Закажите сейчас: ' + p.name_ru,
    };
  });

  console.log(`Inserting ${allParts.length} products...`);
  const { error } = await supabase.from('products').insert(allParts);

  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Successfully inserted all products!');
  }
}

seed().catch(console.error);
