import { createAdminClient } from '@/lib/supabase/server';
import type { SiteMessage } from '@/types';

export async function getMessages() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (data as SiteMessage[]) || [];
}

export async function markMessageRead(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
  if (error) throw error;
}

export async function deleteMessage(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
}
