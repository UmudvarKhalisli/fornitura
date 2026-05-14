import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/supabase/admin';
import { getMessages } from '@/lib/db/queries/messages';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default async function AdminMessagesPage() {
  const admin = await isAdminAuthenticated();
  if (!admin) redirect('/admin/login');

  const messages = await getMessages();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-deep-charcoal">Messages</h1>
        <p className="text-sm text-medium-gray">{messages.length} total</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-5 rounded-lg border ${
              msg.is_read ? 'border-light-gray bg-white' : 'border-muted-gold/30 bg-muted-gold/5'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-deep-charcoal">{msg.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-medium-gray mt-1">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-deep-charcoal">
                    <Mail className="w-3 h-3" /> {msg.email}
                  </a>
                  {msg.phone && (
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-deep-charcoal">
                      <Phone className="w-3 h-3" /> {msg.phone}
                    </a>
                  )}
                </div>
              </div>
              <span className="text-xs text-medium-gray">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
            </div>

            {msg.subject && (
              <p className="text-sm font-medium text-deep-charcoal mb-1">{msg.subject}</p>
            )}
            <p className="text-sm text-medium-gray whitespace-pre-line">{msg.message}</p>

            {msg.product_name && (
              <div className="mt-3 flex items-center gap-2 text-xs text-medium-gray bg-off-white rounded-md px-3 py-2">
                <MessageSquare className="w-3 h-3" />
                About: {msg.product_name}
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-16 text-medium-gray">No messages yet.</div>
        )}
      </div>
    </div>
  );
}
