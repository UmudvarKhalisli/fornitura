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
  },
  {
    name_en: 'Steel Threaded Coupling',
    name_az: 'Cilalanmış Dişli Mufta',
    name_ru: 'Стальная Резьбовая Муфта',
    part_number: 'TC-500',
    description_en: 'High-strength steel threaded coupling for secure and leak-proof pipe joint connections.',
    description_az: 'Etibarlı və sızdırmaz boru birləşmələri üçün yüksək möhkəmlikli polad dişli mufta.',
    description_ru: 'Высокопрочная стальная резьбовая муфта для надежных и герметичных трубных соединений.'
  },
  {
    name_en: 'Hydraulic Valve Manifold',
    name_az: 'Hidravlik Klapan Bloku',
    name_ru: 'Гидравлический Блок Клапанов',
    part_number: 'HVB-850',
    description_en: 'Heavy-duty hydraulic control manifold block for precise fluid distribution in industrial machinery.',
    description_az: 'Sənaye maşınlarında dəqiq maye paylanması üçün ağır iş şəraitinə davamlı hidravlik nəzarət bloku.',
    description_ru: 'Сверхмощный гидравлический блок управления для точного распределения жидкости в промышленном оборудовании.'
  },
  {
    name_en: 'Splined Drive Shaft',
    name_az: 'Şlisli Ötürücü Mil',
    name_ru: 'Шлицевой Вал Привода',
    part_number: 'SDS-920',
    description_en: 'Precision-engineered splined drive shaft for optimal torque transmission in heavy-duty gearboxes.',
    description_az: 'Ağır iş sürətlər qutularında optimal fırlanma anı ötürməsi üçün dəqiq işlənmiş şlisli ötürücü mil.',
    description_ru: 'Высокоточный шлицевой вал для оптимальной передачи крутящего момента в тяжелонагруженных редукторах.'
  },
  {
    name_en: 'Bearing Housing Assembly',
    name_az: 'Podşipnik Korpusu (Yatağı)',
    name_ru: 'Корпус Подшипника',
    part_number: 'PBH-300',
    description_en: 'Rugged cast iron bearing housing designed to support heavy rotating loads with maximum stability.',
    description_az: 'Ağır fırlanan yükləri maksimum sabitliklə dəstəkləmək üçün dizayn edilmiş dözümlü çuqun podşipnik korpusu.',
    description_ru: 'Прочный чугунный корпус подшипника, предназначенный для поддержания тяжелых вращающихся нагрузок с максимальной стабильностью.'
  },
  {
    name_en: 'Forged Steel 90° Elbow',
    name_az: 'Döymə Polad 90° Dirşək',
    name_ru: 'Кованый Стальной Отвод 90°',
    part_number: 'FSE-90',
    description_en: 'High-pressure forged steel pipe elbow for changing fluid direction in demanding piping systems.',
    description_az: 'Tələbkar boru sistemlərində mayenin stiqamətini dəyişmək üçün yüksək təzyiqli döymə polad dirşək.',
    description_ru: 'Высоконапорный кованый стальной отвод для изменения направления потока в сложных трубопроводных системах.'
  },
  {
    name_en: 'Hydraulic Piston Pump',
    name_az: 'Hidravlik Porşenli Nasos',
    name_ru: 'Гидравлический Поршневой Насос',
    part_number: 'HPP-V2',
    description_en: 'High-efficiency axial piston pump delivering reliable hydraulic power for mobile and industrial applications.',
    description_az: 'Mobil və sənaye tətbiqlərində etibarlı hidravlik güc təmin edən yüksək səmərəli porşenli nasos.',
    description_ru: 'Высокоэффективный аксиально-поршневой насос, обеспечивающий надежную гидравлическую мощность для мобильных и промышленных применений.'
  },
  {
    name_en: 'Flanged Gate Valve',
    name_az: 'Flanslı Siyirtmə Klapan',
    name_ru: 'Фланцевая Задвижка',
    part_number: 'FGV-400',
    description_en: 'Industrial-grade flanged gate valve providing reliable on/off control in high-capacity fluid pipelines.',
    description_az: 'Yüksək tutumlu maye boru kəmərlərində etibarlı açma/bağlama nəzarəti təmin edən sənaye tipli flanslı siyirtmə klapan.',
    description_ru: 'Промышленная фланцевая задвижка, обеспечивающая надежное управление открытием/закрытием в высокопроизводительных трубопроводах.'
  },
  {
    name_en: 'Flanged Pipe Spool',
    name_az: 'Flanslı Boru Ara Qatı (Spul)',
    name_ru: 'Фланцевая Катушка (Проставка)',
    part_number: 'FPS-150',
    description_en: 'Durable flanged pipe spool for extending or adapting connections in major industrial piping networks.',
    description_az: 'Böyük sənaye boru şəbəkələrində birləşmələri uzatmaq və ya uyğunlaşdırmaq üçün dözümlü flanslı boru.',
    description_ru: 'Прочная фланцевая катушка для удлинения или адаптации соединений в крупных промышленных трубопроводных сетях.'
  },
  {
    name_en: 'Mechanical Seal Cartridge',
    name_az: 'Mexaniki Kipgəc Dəsti',
    name_ru: 'Механическое Торцевое Уплотнение',
    part_number: 'MSA-77',
    description_en: 'Advanced cartridge mechanical seal preventing fluid leakage in high-speed rotary pumps and compressors.',
    description_az: 'Yüksək sürətli fırlanan nasoslarda və kompressorlarda maye sızmasının qarşısını alan qabaqcıl mexaniki kipgəc.',
    description_ru: 'Усовершенствованное картриджное торцевое уплотнение, предотвращающее утечку жидкости в высокоскоростных вращающихся насосах и компрессорах.'
  },
  {
    name_en: 'Rotary Drive Spindle',
    name_az: 'Fırlanma Ötürücü Mili (Şpindel)',
    name_ru: 'Приводной Шпиндель',
    part_number: 'RDA-610',
    description_en: 'Heavy-duty rotary drive spindle built to withstand significant radial and thrust continuous loads.',
    description_az: 'Əhəmiyyətli radial və ox yüklərinə tab gətirmək üçün qurulmuş ağır iş fırlanma ötürücü mili.',
    description_ru: 'Мощный приводной шпиндель, созданный для выдерживания значительных радиальных и осевых непрерывных нагрузок.'
  },
  {
    name_en: 'Wellhead Flanged Cross',
    name_az: 'Quyuüstü Flanslı Xaç',
    name_ru: 'Устьевая Фланцевая Крестовина',
    part_number: 'WHC-10M',
    description_en: 'High-pressure flanged cross manifold component for wellhead and frac tree assemblies.',
    description_az: 'Quyuüstü avadanlıqlar və atqı manifoldları üçün yüksək təzyiqli flanslı xaç.',
    description_ru: 'Высоконапорная фланцевая крестовина манифольда для устьевого оборудования и фонтанной арматуры.'
  },
  {
    name_en: 'Mud Pump Pulsation Dampener',
    name_az: 'Palçıq Pompası Pulsasiya Söndürücüsü',
    name_ru: 'Гаситель Пульсаций Бурового Насоса',
    part_number: 'PD-20V',
    description_en: 'Spherical pulsation dampener designed to minimize pressure variations and protect mud pump discharge lines.',
    description_az: 'Təzyiq dəyişikliklərini minimuma endirmək və palçıq pompası xətlərini qorumaq üçün sferik pulsasiya söndürücü.',
    description_ru: 'Сферический гаситель пульсаций, предназначенный для минимизации перепадов давления и защиты линий нагнетания бурового насоса.'
  },
  {
    name_en: 'Sucker Rod Pumping Unit',
    name_az: 'Mancanaq Dəzgahı (Nasos Ştanqı)',
    name_ru: 'Станок-Качалка',
    part_number: 'SRPU-320',
    description_en: 'Reliable sucker rod pumping unit for artificial lift in onshore oil and gas production.',
    description_az: 'Qurudakı neft və qaz hasilatında süni qaldırma prosesi üçün etibarlı mancanaq dəzgahı.',
    description_ru: 'Надежный станок-качалка для механизированной добычи на наземных нефтяных и газовых месторождениях.'
  },
  {
    name_en: 'Heavy Weight Drill Pipe',
    name_az: 'Ağır Qazma Borusu',
    name_ru: 'Утяжеленная Бурильная Труба',
    part_number: 'HWDP-50',
    description_en: 'Premium heavy weight drill pipe to provide optimal weight to the drill bit during drilling operations.',
    description_az: 'Qazma əməliyyatları zamanı qazma baltasına optimal çəki vermək üçün premium ağır qazma borusu.',
    description_ru: 'Премиальная утяжеленная бурильная труба для обеспечения оптимальной нагрузки на долото во время буровых работ.'
  },
  {
    name_en: 'Industrial Duplex Mud Pump',
    name_az: 'İkiporşenli Palçıq Pompası',
    name_ru: 'Двухпоршневой Буровой Насос',
    part_number: 'DMP-800',
    description_en: 'Robust duplex mud pump ensuring continuous circulation of drilling fluid under high pressure.',
    description_az: 'Yüksək təzyiq altında qazma məhlulunun davamlı sirkulyasiyasını təmin edən dözümlü ikiporşenli palçıq pompası.',
    description_ru: 'Прочный двухпоршневой буровой насос, обеспечивающий непрерывную циркуляцию бурового раствора под высоким давлением.'
  },
  {
    name_en: 'Manual Drill Pipe Tongs',
    name_az: 'Qazma Borusu üçün Mexaniki Açar',
    name_ru: 'Механический Ключ для Бурильных Труб',
    part_number: 'MPT-75',
    description_en: 'Heavy-duty manual tongs for secure making up and breaking out of drill pipe threaded connections.',
    description_az: 'Qazma borusu yivli birləşmələrini etibarlı şəkildə bağlamaq və açmaq üçün gücləndirilmiş mexaniki açar.',
    description_ru: 'Сверхмощный механический ключ для надежного свинчивания и развинчивания резьбовых соединений бурильных труб.'
  },
  {
    name_en: 'Drilling Rotary Swivel',
    name_az: 'Rotor Fırlanma Vertlyuqu',
    name_ru: 'Буровой Роторный Вертлюг',
    part_number: 'RS-400T',
    description_en: 'High-capacity rotary swivel facilitating pipe rotation while simultaneously permitting drilling fluid flow.',
    description_az: 'Qazma məhlulunun axışına imkan verərkən eyni zamanda borunun fırlanmasını asanlaşdıran yüksək tutumlu rotor vertlyuqu.',
    description_ru: 'Высокопроизводительный роторный вертлюг, облегчающий вращение трубы с одновременным обеспечением потока бурового раствора.'
  },
  {
    name_en: 'Mud Pump Power End Assembly',
    name_az: 'Palçıq Pompası Güc Bölməsi',
    name_ru: 'Приводная Часть Бурового Насоса',
    part_number: 'PEA-1000',
    description_en: 'Durable power end assembly with reduction gearing for triplex and duplex drilling mud pumps.',
    description_az: 'Üçporşenli və ikiporşenli palçıq nasosları üçün sürət azaldıcı (reduktor) sistemi ilə təchiz olunmuş dözümlü güc bölməsi.',
    description_ru: 'Надежная приводная часть с понижающим редуктором для трехпоршневых и двухпоршневых буровых насосов.'
  },
  {
    name_en: 'Industrial Gear Reducer',
    name_az: 'Sənaye Sürətlər Qutusu (Reduktor)',
    name_ru: 'Промышленный Редуктор',
    part_number: 'IGR-250',
    description_en: 'High-torque industrial gear reducer optimized for heavy machinery and conveyor drive systems.',
    description_az: 'Ağır maşınlar və konveyer idarəetmə sistemləri üçün optimallaşdırılmış yüksək fırlanma anlı sənaye reduktoru.',
    description_ru: 'Высокомоментный промышленный редуктор, оптимизированный для тяжелого машиностроения и приводных систем конвейеров.'
  },
  {
    name_en: 'V-Belt Drive Pulley',
    name_az: 'V-Kəmərli Ötürücü Qasnaq (Şkiv)',
    name_ru: 'Клиноременный Шкив',
    part_number: 'VDP-05',
    description_en: 'Precision-balanced multi-groove V-belt pulley ensuring efficient power transmission without slippage.',
    description_az: 'Sürüşmədən səmərəli güc ötürülməsini təmin edən dəqiq balanslaşdırılmış çoxkanallı V-kəmər qasnağı.',
    description_ru: 'Точно сбалансированный многоручьевой клиноременный шкив, обеспечивающий эффективную передачу мощности без проскальзывания.'
  }
];

async function seed() {
  await signIn();
  
  console.log('Deleting all existing products...');
  // Delete all existing products so we only keep this fresh batch of 30
  const { error: delErr } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delErr) {
    console.error('Error clearing old products:', delErr);
  }

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
      main_image: `/mock-parts/part${i + 1}.png`,
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
