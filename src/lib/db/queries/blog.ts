import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import type { BlogPost } from '@/types';

export async function getPublishedPosts(locale: string, page = 1, perPage = 9) {
  const supabase = await createServerSupabaseClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(from, to);

  return { posts: (data as BlogPost[]) || [], count: count || 0 };
}

export async function getPostBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .or(`slug_az.eq.${slug},slug_en.eq.${slug},slug_ru.eq.${slug}`)
    .single();

  return data as BlogPost | null;
}

export async function getAllPosts() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (data as BlogPost[]) || [];
}

export async function getPostById(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  return data as BlogPost | null;
}

export async function createPost(values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(values)
    .select()
    .single();

  if (error) throw error;
  return data as BlogPost;
}

export async function updatePost(id: string, values: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update(values)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as BlogPost;
}

export async function deletePost(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
