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

const oilParts = [
  { name_en: 'Drill Bit Tungsten', name_az: 'Volfram Qazma Baltası', name_ru: 'Вольфрамовое Буровое Долото', part_number: 'OB-101' },
  { name_en: 'Mud Pump Liner', name_az: 'Palçıq Pompası Qatı', name_ru: 'Втулка Бурового Насоса', part_number: 'MP-205' },
  { name_en: 'Blowout Preventer Valve', name_az: 'Qoruyucu Klapan (BOP)', name_ru: 'Превенторный Клапан', part_number: 'BOP-099' },
  { name_en: 'Rotary Table Bearing', name_az: 'Rotor Stolunun Podşipniki', name_ru: 'Подшипник Роторного Стола', part_number: 'RT-442' },
  { name_en: 'Kelly Spinner Motor', name_az: 'Kelly Fırladıcı Motor', name_ru: 'Мотор Вертлюга', part_number: 'KS-120' },
  { name_en: 'High Pressure Hose 50ft', name_az: 'Yüksək Təzyiq Şlanqı 15m', name_ru: 'Шланг Высокого Давления 15м', part_number: 'HP-50' },
  { name_en: 'Centrifugal Sand Pump', name_az: 'Mərkəzdənqaçma Qum Pompası', name_ru: 'Центробежный Песковый Насос', part_number: 'CP-88' },
  { name_en: 'Shale Shaker Screen', name_az: 'Vibroələk Şəbəkəsi', name_ru: 'Сетка Вибросита', part_number: 'SS-310' },
  { name_en: 'Pulsation Dampener', name_az: 'Pulsasiya Söndürücü', name_ru: 'Гаситель Пульсаций', part_number: 'PD-45' },
  { name_en: 'Drawworks Brake Band', name_az: 'Buxarə Əyləc Lenti', name_ru: 'Тормозная Лента Лебедки', part_number: 'DB-77' },
  { name_en: 'Sucker Rod 25ft', name_az: 'Nasos Ştanqı 7.5m', name_ru: 'Насосная Штанга 7.5м', part_number: 'SR-25' },
  { name_en: 'Wellhead Choke Manifold', name_az: 'Quyuüstü Drossel Manifoldu', name_ru: 'Дроссельный Манифольд Устья Скважины', part_number: 'WM-300' },
  { name_en: 'Casing Elevator', name_az: 'Qoruyucu Boru Elevatoru', name_ru: 'Обсадной Элеватор', part_number: 'CE-550' },
];

const heavyParts = [
  { name_en: 'Excavator Track Chain', name_az: 'Ekskavator Tırtıl Zənciri', name_ru: 'Гусеничная Цепь Экскаватора', part_number: 'EX-TC1' },
  { name_en: 'Hydraulic Cylinder Seal Kit', name_az: 'Hidravlik Silindr Kipgəci Dəsti', name_ru: 'Комплект Уплотнений Гидроцилиндра', part_number: 'HY-SK4' },
  { name_en: 'Bulldozer Cutting Edge', name_az: 'Buldozer Kəsici Bıçağı', name_ru: 'Режущая Кромка Бульдозера', part_number: 'BD-CE8' },
  { name_en: 'Loader Bucket Teeth', name_az: 'Yükləyici Çömçə Dişləri', name_ru: 'Зубья Ковша Погрузчика', part_number: 'LD-BT2' },
  { name_en: 'Diesel Engine Injector', name_az: 'Dizel Mühərrik İnjektoru', name_ru: 'Форсунка Дизельного Двигателя', part_number: 'DE-INJ' },
  { name_en: 'Transmission Filter Kit', name_az: 'Transmissiya Filtr Dəsti', name_ru: 'Комплект Трансмиссионных Фильтров', part_number: 'TR-FK5' },
  { name_en: 'Swing Motor Gearbox', name_az: 'Dönmə Motorunun Sürətlər Qutusu', name_ru: 'Редуктор Поворотного Мотора', part_number: 'SM-GB1' },
  { name_en: 'Heavy Duty Alternator 24V', name_az: 'Ağır Texnika Generatoru 24V', name_ru: 'Генератор Тяжелой Техники 24В', part_number: 'AL-24V' },
  { name_en: 'Air Compressor Valve', name_az: 'Hava Kompressoru Klapanı', name_ru: 'Клапан Воздушного Компрессора', part_number: 'AC-V9' },
  { name_en: 'Final Drive Planetary Gear', name_az: 'Son Ötürücü Planetar Dişli', name_ru: 'Планетарная Шестерня Бортового Редуктора', part_number: 'FD-PG3' },
  { name_en: 'Cooling System Radiator', name_az: 'Soyutma Sistemi Radiatoru', name_ru: 'Радиатор Системы Охлаждения', part_number: 'CS-RAD' },
  { name_en: 'Boom Lift Cylinder', name_az: 'Qaldırıcı Ox Silindri', name_ru: 'Цилиндр Подъема Стрелы', part_number: 'BL-CYL' },
];

async function seed() {
  await signIn();
  console.log('Fetching categories and brands...');
  const { data: categories } = await supabase.from('categories').select('id, name_en');
  const { data: brands } = await supabase.from('brands').select('id, name');

  const catId = categories && categories.length > 0 ? categories[0].id : null;
  const brandId = brands && brands.length > 0 ? brands[0].id : null;

  const allParts = [...oilParts, ...heavyParts].map((p, i) => {
    const slug = p.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    return {
      ...p,
      slug,
      description_en: 'Premium quality ' + p.name_en + ' designed for maximum durability and efficiency in harsh environments.',
      description_az: 'Sərt şərtlərdə maksimum dözümlülük və səmərəlilik üçün dizayn edilmiş yüksək keyfiyyətli ' + p.name_az + '.',
      description_ru: 'Высококачественный ' + p.name_ru + ' предназначенный для максимальной долговечности и эффективности в суровых условиях.',
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
