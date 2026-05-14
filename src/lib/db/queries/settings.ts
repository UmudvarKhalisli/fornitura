import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { SiteSetting } from '@/types';

export async function getSiteSettings() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from('site_settings').select('*').single();
  return data as SiteSetting | null;
}

export async function updateSiteSettings(values: Partial<SiteSetting>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('site_settings')
    .update(values)
    .eq('id', (await getSiteSettings())?.id)
    .select()
    .single();

  if (error) throw error;
  return data as SiteSetting;
}
