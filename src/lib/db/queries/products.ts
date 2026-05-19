import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { Product } from '@/types';

export async function getActiveProducts(locale: string, page = 1, perPage = 12) {
  const supabase = await createServerSupabaseClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  return { products: (data as Product[]) || [], count: count || 0 };
}

export async function getProductBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  return data as Product | null;
}

export async function getFeaturedProducts(locale: string, limit = 8) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  return (data as Product[]) || [];
}

export async function searchProducts(
  query: string,
  locale: string,
  categoryId?: string,
  brandId?: string,
  page = 1,
  perPage = 12
) {
  const supabase = await createServerSupabaseClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let q = supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)', { count: 'exact' })
    .eq('is_active', true);

  if (query) {
    const col = locale === 'az' ? 'name_az' : locale === 'ru' ? 'name_ru' : 'name_en';
    q = q.or(`${col}.ilike.%${query}%,part_number.ilike.%${query}%`);
  }

  if (categoryId) q = q.eq('category_id', categoryId);
  if (brandId) q = q.eq('brand_id', brandId);

  const { data, count } = await q
    .order('created_at', { ascending: false })
    .range(from, to);

  return { products: (data as Product[]) || [], count: count || 0 };
}

export async function getAllProducts() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .order('created_at', { ascending: false });

  return (data as Product[]) || [];
}

export async function getProductById(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), brand:brands(*)')
    .eq('id', id)
    .single();

  return data as Product | null;
}

export async function createProduct(values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('products')
    .insert(values)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('products')
    .update(values)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  // Burada is_active=false etmek evezine, admin paneldenden de tamam silinmesi ucun birbasa delete istifade edirik
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
