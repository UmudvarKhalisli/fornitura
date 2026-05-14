import { createServerSupabaseClient } from './server';

export async function getAdminUserId(): Promise<string | null> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single();

  return data ? user.id : null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const id = await getAdminUserId();
  return id !== null;
}
