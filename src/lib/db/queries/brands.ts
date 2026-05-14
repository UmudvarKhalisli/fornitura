import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { Brand } from '@/types';

export async function getActiveBrands() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return (data as Brand[]) || [];
}

export async function getAllBrands() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('brands')
    .select('*')
    .order('display_order', { ascending: true });

  return (data as Brand[]) || [];
}

export async function getBrandById(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single();

  return data as Brand | null;
}

export async function createBrand(values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('brands')
    .insert(values)
    .select()
    .single();

  if (error) throw error;
  return data as Brand;
}

export async function updateBrand(id: string, values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('brands')
    .update(values)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Brand;
}

export async function deleteBrand(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('brands').update({ is_active: false }).eq('id', id);
  if (error) throw error;
}
