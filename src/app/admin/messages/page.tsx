import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { createAdminClient } from '@/lib/supabase/server';
import { Mail, Phone, Calendar, Trash2, Eye, MessageSquare, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import type { SiteMessage } from '@/types';

async function getMessages(): Promise<SiteMessage[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  return (data as SiteMessage[]) || [];
}

export default async function AdminMessagesPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const messages = await getMessages();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-deep-charcoal tracking-tight">Müraciətlər</h1>
          <p className="text-medium-gray mt-1">Sifariş formundan gələn bütün mesajlar burada qeyd olunur.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-light-gray flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-muted-gold" />
          <span className="text-sm font-bold text-deep-charcoal">{messages.length} cəmi</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-light-gray overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off-white border-b border-light-gray">
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Göndərən</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Mövzu / Mesaj</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Tarix</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-medium-gray uppercase tracking-wider text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/50">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-medium-gray">
                    Hələ heç bir müraciət yoxdur.
                  </td>
                </tr>
              ) : (
                messages.map((msg: SiteMessage) => (
                  <tr key={msg.id} className="hover:bg-off-white transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-deep-charcoal">{msg.name}</span>
                        <div className="flex flex-col gap-1 mt-1">
                          <a href={`mailto:${msg.email}`} className="text-xs text-medium-gray hover:text-muted-gold flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {msg.email}
                          </a>
                          {msg.phone && (
                            <a href={`tel:${msg.phone}`} className="text-xs text-medium-gray hover:text-muted-gold flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {msg.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="font-semibold text-deep-charcoal text-sm truncate">{msg.subject}</p>
                      <p className="text-xs text-medium-gray line-clamp-2 mt-1">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-medium-gray">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(msg.created_at), 'd MMMM yyyy, HH:mm', { locale: az })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {msg.is_read ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 uppercase">
                          <CheckCircle2 className="w-3 h-3" /> Oxunub
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 uppercase">
                          Yeni
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-light-gray rounded-lg transition-colors text-deep-charcoal" title="Bax">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors" title="Sil">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
