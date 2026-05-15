'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, AlertCircle, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trackContactFormSubmit } from '@/lib/analytics/events';

interface ContactFormProps {
  dictionary: any;
  locale: string;
  settings?: any;
  showContactInfo?: boolean;
}

export function ContactForm({ dictionary, locale, settings, showContactInfo }: ContactFormProps) {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!res.ok) throw new Error('Failed');
      trackContactFormSubmit();
      setState('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setState('idle'), 5000);
    } catch {
      setState('error');
    }
  };

  const formContent = (
    <div className="flex-1">
      {state === 'success' ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-10 rounded-2xl border border-green-200 bg-green-50/50">
          <CheckCircle className="w-16 h-16 text-success mb-4" />
          <h3 className="text-xl font-bold text-deep-charcoal mb-2">
            {dictionary.contact.success}
          </h3>
          <p className="text-medium-gray leading-relaxed">{dictionary.contact.success_desc}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-6">{dictionary.contact.form_title || 'Bizə Mesaj Göndərin'}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-deep-charcoal mb-2">
                {dictionary.contact.name} <span className="text-error">*</span>
              </label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={dictionary.contact.name}
                className="h-12 px-4 rounded-xl border-light-gray bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-charcoal mb-2">
                {dictionary.contact.email} <span className="text-error">*</span>
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={dictionary.contact.email}
                className="h-12 px-4 rounded-xl border-light-gray bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-deep-charcoal mb-2">
                {dictionary.contact.phone}
              </label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={dictionary.contact.phone}
                className="h-12 px-4 rounded-xl border-light-gray bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-charcoal mb-2">
                {dictionary.contact.subject}
              </label>
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder={dictionary.contact.subject}
                className="h-12 px-4 rounded-xl border-light-gray bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-charcoal mb-2">
              {dictionary.contact.message} <span className="text-error">*</span>
            </label>
            <Textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={dictionary.contact.message}
              className="p-4 rounded-xl border-light-gray bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm resize-none"
            />
          </div>

          {state === 'error' && (
            <div className="flex items-center gap-3 text-sm text-error bg-red-50 p-4 rounded-xl border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {dictionary.contact.error_desc}
            </div>
          )}

          <Button type="submit" disabled={state === 'loading'} className="w-full h-12 text-base font-semibold rounded-xl gap-2 bg-deep-charcoal hover:bg-muted-gold text-white transition-all shadow-md">
            {state === 'loading' ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {dictionary.common.loading}
              </span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {dictionary.contact.submit}
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );

  if (!showContactInfo) {
    return formContent;
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
      <div className="lg:col-span-3">
        {formContent}
      </div>
      
      <div className="lg:col-span-2 bg-deep-charcoal rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-muted-gold/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
        
        <h3 className="text-2xl font-bold mb-8 relative z-10">{dictionary.contact.title || 'Bizimlə Əlaqə'}</h3>
        
        <div className="space-y-8 relative z-10">
          {settings?.phone_number && (
            <a href={`tel:${settings.phone_number}`} className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-muted-gold/20 flex items-center justify-center shrink-0 transition-colors">
                <Phone className="w-6 h-6 text-muted-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-metallic-silver mb-1">{dictionary.contact.call_us}</p>
                <p className="text-lg font-medium">{settings.phone_number}</p>
              </div>
            </a>
          )}

          {settings?.whatsapp_number && (
            <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-[#1ebe5a]/20 flex items-center justify-center shrink-0 transition-colors">
                <MessageCircle className="w-6 h-6 text-[#1ebe5a]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-metallic-silver mb-1">{dictionary.contact.write_us}</p>
                <p className="text-lg font-medium">{settings.whatsapp_number}</p>
              </div>
            </a>
          )}

          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-muted-gold/20 flex items-center justify-center shrink-0 transition-colors">
                <Mail className="w-6 h-6 text-muted-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-metallic-silver mb-1">{dictionary.contact.email_us}</p>
                <p className="text-lg font-medium">{settings.email}</p>
              </div>
            </a>
          )}

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-muted-gold" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-metallic-silver mb-1">{dictionary.footer.working_hours}</p>
              <p className="text-lg font-medium">{dictionary.footer.working_hours_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
