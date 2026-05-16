import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { SiteSetting } from '@/types';

export async function getSiteSettings() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from('site_settings').select('*').single();
  return data as SiteSetting | null;
}

export async function updateSiteSettings(values: Partial<SiteSetting>) {
  try {
    const supabase = createAdminClient();
    const currentSettings = await getSiteSettings();
    
    if (!currentSettings) {
      // If no settings exist, insert a new row
      const { data, error } = await supabase
        .from('site_settings')
        .insert(values)
        .select()
        .single();
      if (error) throw error;
      return data as SiteSetting;
    }

    const { data, error } = await supabase
      .from('site_settings')
      .update(values)
      .eq('id', currentSettings.id)
      .select()
      .single();

    if (error) throw error;
    return data as SiteSetting;
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
}
