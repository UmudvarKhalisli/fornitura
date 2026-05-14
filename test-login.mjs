import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://riaefkbefgbyrotprrqw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYWVma2JlZmdieXJvdHBycnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTMwNTIsImV4cCI6MjA5NDMyOTA1Mn0.bzlniw-IceRrAF2K2YNbJfDORQKjBGDVJFNtxcYRjdg'
);

async function test() {
  console.log("Signing in...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'forniturammc@gmail.com',
    password: 'Imanov1!'
  });

  if (authError) {
    console.error("Auth Error:", authError.message);
    return;
  }
  console.log("Logged in successfully as:", authData.user.id);

  console.log("Checking admin privileges...");
  const { data: adminData, error: adminError } = await supabase
    .from('admins')
    .select('id')
    .single();

  if (adminError) {
    console.error("Admin Check Error:", adminError.message, adminError.details, adminError.hint);
  } else if (!adminData) {
    console.log("No admin data found!");
  } else {
    console.log("Admin privileges confirmed! Admin ID:", adminData.id);
  }
}

test();
