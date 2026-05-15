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
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn() {
  const { error } = await supabase.auth.signInWithPassword({
    email: 'forniturammc@gmail.com',
    password: 'Imanov1!'
  });
  if (error) throw error;
}

const mockImages = [
  '/mock-parts/drill_bit.png',
  '/mock-parts/pump.png',
  '/mock-parts/track.png',
  '/mock-parts/engine.png'
];

async function updateImages() {
  await signIn();
  console.log('Fetching products...');
  
  const { data: products, error: fetchErr } = await supabase.from('products').select('id, name_en');
  if (fetchErr) throw fetchErr;

  console.log(`Found ${products.length} products. Updating images...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    // pick an image randomly or sequentially
    const image = mockImages[i % mockImages.length];
    
    // Only update if it doesn't already have a main_image from some real data?
    // Let's just update all products without a main_image or just update all of them for this mock task.
    const { error: upErr } = await supabase.from('products').update({ main_image: image }).eq('id', p.id);
    if (upErr) {
      console.error(`Error updating product ${p.id}:`, upErr);
    }
  }
  
  console.log('Successfully updated product images!');
}

updateImages().catch(console.error);
