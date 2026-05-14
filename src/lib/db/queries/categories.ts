import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { Category } from '@/types';

export async function getActiveCategories() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return (data as Category[]) || [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .or(`slug_az.eq.${slug},slug_en.eq.${slug},slug_ru.eq.${slug}`)
    .single();

  return data as Category | null;
}

export async function getAllCategories() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  return (data as Category[]) || [];
}

export async function getCategoryById(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  return data as Category | null;
}

export async function createCategory(values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('categories')
    .insert(values)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('categories')
    .update(values)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('categories').update({ is_active: false }).eq('id', id);
  if (error) throw error;
}
