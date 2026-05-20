import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, readFileSync } from 'fs';
import { resolve, join } from 'path';

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

// Configure Cloudinary
cloudinary.config({
  cloud_name: envVars['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'],
  api_key: envVars['CLOUDINARY_API_KEY'],
  api_secret: envVars['CLOUDINARY_API_SECRET'],
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

// Map file names (or parts of them) to part numbers we just inserted
// To make it easy, just rename your images to these exactly in the temp-images folder:
const fileToPartMap = {
  'part1.jpg': 'EBT-A120',
  'part2.jpg': 'TC-PRO-99',
  'part3.jpg': 'FWS-300',
  'part4.jpg': 'RAD-XL-400',
  'part5.jpg': 'EOF-B90',
  'part6.jpg': 'HDC-6500',
  'part7.jpg': 'TR-88-BOT',
  'part8.jpg': 'HPU-X5',
  'part9.jpg': 'TYR-20-5-25',
  'part10.jpg': 'TNK-900L',
  'part1.png': 'EBT-A120',
  'part2.png': 'TC-PRO-99',
  'part3.png': 'FWS-300',
  'part4.png': 'RAD-XL-400',
  'part5.png': 'EOF-B90',
  'part6.png': 'HDC-6500',
  'part7.png': 'TR-88-BOT',
  'part8.png': 'HPU-X5',
  'part9.png': 'TYR-20-5-25',
  'part10.png': 'TNK-900L'
};

const imagesDir = resolve(process.cwd(), 'temp-images');

async function processImages() {
  await signIn();
  console.log('Successfully signed into Supabase.');

  let files = [];
  try {
    files = readdirSync(imagesDir);
  } catch (err) {
    console.error('Bura baxin: temp-images qovlugu yoxdur ve ya oxuna bilmir.', err);
    return;
  }
  
  if (files.length === 0) {
    console.log('temp-images qovlugu bosdur. Xahis edirik sekilleri oraya qoyun.');
    return;
  }

  for (const file of files) {
    // Only process jpg, png, jpeg, webp
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

    console.log(`Uploading ${file} to Cloudinary...`);
    const filePath = join(imagesDir, file);
    
    // Check if we know which part number this belongs to based on file name
    const partNumber = fileToPartMap[file];
    if (!partNumber) {
      console.log(`Warning: File name ${file} doesn't match part1.jpg...part10.jpg. Ignoring or update map.`);
      continue;
    }

    try {
      // Upload to Cloudinary, folder 'fornitura/products' is typical
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'fornitura/products'
      });
      
      const secureUrl = uploadResult.secure_url;
      console.log(`✓ Uploaded to Cloudinary: ${secureUrl}`);
      
      // Update Supabase
      const { error: upErr } = await supabase.from('products')
        .update({ main_image: secureUrl })
        .eq('part_number', partNumber);

      if (upErr) {
        console.error(`Failed to update DB for part ${partNumber}:`, upErr);
      } else {
        console.log(`✓ Updated DB for part number: ${partNumber}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log('All image operations completed.');
}

processImages().catch(console.error);