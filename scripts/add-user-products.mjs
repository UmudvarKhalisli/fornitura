import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn() {
  const { error } = await supabase.auth.signInWithPassword({
    email: 'forniturammc@gmail.com',
    password: 'Imanov1!'
  });
  if (error) throw error;
}

const userProducts = [
  {
    name_en: 'Excavator Bucket Teeth Adapters',
    name_az: 'Ekskavator Çalovu (Rukoyat) Dişləri və Adapterləri',
    name_ru: 'Коронки и Адаптеры Ковша Экскаватора',
    part_number: 'EBT-A120',
    description_en: 'High-wear resistance bucket teeth and adapters for heavy excavation tasks.',
    description_az: 'Ağır qazıntı işləri üçün yüksək aşınma müqavimətli çalov dişləri və adapterləri.',
    description_ru: 'Высокоизносостойкие коронки и адаптеры ковша для тяжелых земляных работ.',
    main_image: '/mock-parts/part1.jpg'
  },
  {
    name_en: 'Heavy Duty Turbocharger',
    name_az: 'Ağır Texnika Turbokompressoru',
    name_ru: 'Турбокомпрессор для Спецтехники',
    part_number: 'TC-PRO-99',
    description_en: 'High-performance turbocharger providing optimal combustion air to heavy duty engines.',
    description_az: 'Ağır texnika mühərriklərinə optimal yanma havasını təmin edən yüksək performanslı turbokompressor.',
    description_ru: 'Высокопроизводительный турбокомпрессор, обеспечивающий оптимальную подачу воздуха в двигатель.',
    main_image: '/mock-parts/part2.jpg'
  },
  {
    name_en: 'Fuel Water Separator Filter',
    name_az: 'Yanacaq-Su Ayırıcı Filtr',
    name_ru: 'Фильтр-Сепаратор Топлива',
    part_number: 'FWS-300',
    description_en: 'Premium filter assembly separating water and eliminating contaminants from fuel.',
    description_az: 'Suyu yanacaqdan ayıran və çirkləndiriciləri təmizləyən premium filtr yığımı.',
    description_ru: 'Премиальный фильтр-сепаратор, отделяющий воду и устраняющий загрязнения из топлива.',
    main_image: '/mock-parts/part3.jpg'
  },
  {
    name_en: 'Industrial Cooling Radiator',
    name_az: 'Sənaye Soyutma Radiatoru',
    name_ru: 'Промышленный Радиатор',
    part_number: 'RAD-XL-400',
    description_en: 'Heavy-duty radiator designed to keep machinery operating safely at peak temperatures.',
    description_az: 'Texnikanın pik temperaturda təhlükəsiz işləməsini təmin edən ağır yük üçün hazırlanmış radiator.',
    description_ru: 'Промышленный радиатор, предназначенный для защиты оборудования от перегрева при пиковых нагрузках.',
    main_image: '/mock-parts/part4.jpg'
  },
  {
    name_en: 'Engine Oil Spin-On Filter',
    name_az: 'Mühərrik Yağ Filtri',
    name_ru: 'Навинчиваемый Масляный Фильтр',
    part_number: 'EOF-B90',
    description_en: 'Spin-on type engine oil filter for maximum protection against engine wear.',
    description_az: 'Mühərrikin aşınmasına qarşı maksimum qoruma üçün mühərrik yağ filtri.',
    description_ru: 'Масляный фильтр закрытого типа для максимальной защиты двигателя от износа.',
    main_image: '/mock-parts/part5.jpg'
  },
  {
    name_en: 'Heavy Hydraulic Cylinder',
    name_az: 'Ağır Hidravlik Silindr',
    name_ru: 'Тяжелый Гидравлический Цилиндр',
    part_number: 'HDC-6500',
    description_en: 'Large bore hydraulic cylinder engineered for superior lifting and pushing forces.',
    description_az: 'Böyük qaldırma və itələmə gücü üçün dizayn edilmiş qalın çaplı hidravlik silindr.',
    description_ru: 'Гидравлический цилиндр большого диаметра для высоких подъемных и толкающих усилий.',
    main_image: '/mock-parts/part6.jpg'
  },
  {
    name_en: 'Track Roller / Bottom Roller',
    name_az: 'Tırtıl Alt Roliki (Katok)',
    name_ru: 'Опорный Каток Гусеницы',
    part_number: 'TR-88-BOT',
    description_en: 'Durable bottom track roller ensuring smooth undercarriage movement for tracked excavators.',
    description_az: 'Ekskavatorların hərəkət hissəsinin səlis irəliləməsini təmin edən dözümlü tırtıl alt roliki.',
    description_ru: 'Долговечный опорный каток, обеспечивающий плавное движение ходовой части гусеничных экскаваторов.',
    main_image: '/mock-parts/part7.jpg'
  },
  {
    name_en: 'Hydraulic Piston Pump Unit',
    name_az: 'Hidravlik Porşenli Nasos Aqreqatı',
    name_ru: 'Гидравлический Поршневой Насос',
    part_number: 'HPU-X5',
    description_en: 'Main hydraulic pump for construction vehicles delivering consistent and strong fluid flow.',
    description_az: 'Tikinti maşınları üçün ardıcıl və güclü maye axınını təmin edən əsas hidravlik nasos.',
    description_ru: 'Главный гидравлический насос для строительной техники, обеспечивающий стабильный поток жидкости.',
    main_image: '/mock-parts/part8.jpg'
  },
  {
    name_en: 'Heavy Duty Loader Tire',
    name_az: 'Ağır Texnika (Yükləyici) Təkəri',
    name_ru: 'Шина для Фронтального Погрузчика',
    part_number: 'TYR-20-5-25',
    description_en: 'Deep-treaded heavy duty tire built for maximum traction on rough operational terrains.',
    description_az: 'Çətin relyeflərdə maksimum dartma üçün dərin naxışlı gücləndirilmiş ağır texnika təkəri.',
    description_ru: 'Шина с глубоким протектором для максимального сцепления на пересеченной местности.',
    main_image: '/mock-parts/part9.jpg'
  },
  {
    name_en: 'Hydraulic / Fuel Metal Reservoir',
    name_az: 'Hidravlik / Yanacaq Metal Çən',
    name_ru: 'Металлический Топливный Бак',
    part_number: 'TNK-900L',
    description_en: 'Heavy-duty steel reservoir for secure storage of hydraulic fluid or fuel on big machinery.',
    description_az: 'Böyük maşınlarda hidravlik maye və ya yanacağın etibarlı saxlanması üçün möhkəm polad çən.',
    description_ru: 'Прочный стальной бак для надежного хранения гидравлической жидкости или топлива на тяжелой технике.',
    main_image: '/mock-parts/part10.jpg'
  }
];

async function seedUserProducts() {
  await signIn();
  console.log('Fetching generic category and brand...');
  
  const { data: categories } = await supabase.from('categories').select('id, name_en');
  const { data: brands } = await supabase.from('brands').select('id, name');

  const catId = categories && categories.length > 0 ? categories[0].id : null;
  const brandId = brands && brands.length > 0 ? brands[0].id : null;

  console.log('Inserting 10 new user-uploaded products...');
  
  for (let i = 0; i < userProducts.length; i++) {
    const prod = userProducts[i];
    
    // Create base product
    const { error: insErr } = await supabase.from('products').insert([{
      name_en: prod.name_en,
      name_az: prod.name_az,
      name_ru: prod.name_ru,
      part_number: prod.part_number,
      description_en: prod.description_en,
      description_az: prod.description_az,
      description_ru: prod.description_ru,
      main_image: prod.main_image,
      stock_status: 'in_stock',
      category_id: catId,
      brand_id: brandId,
      slug: prod.part_number.toLowerCase()
    }]);

    if (insErr) {
      console.error(`Failed to insert product (part: ${prod.part_number}):`, insErr);
    } else {
      console.log(`✓ Inserted: ${prod.name_az}`);
    }
  }

  console.log('Successfully added all user products!');
}

seedUserProducts().catch(console.error);