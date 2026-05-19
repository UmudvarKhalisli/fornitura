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

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Contact form submission error:', errorData);
        throw new Error(errorData.error || 'Failed to submit contact form');
      }

      trackContactFormSubmit();
      
      // WhatsApp redirect if successful
      const whatsappNum = (settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP || '994502107920').replace(/[^\d]/g, '');
      const waMessage = encodeURIComponent(`Yeni müraciət:\nAd: ${form.name}\nTelefon: ${form.phone}\nMövzu: ${form.subject}\nMesaj: ${form.message}`);
      window.open(`https://wa.me/${whatsappNum}?text=${waMessage}`, '_blank');

      setState('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setState('idle'), 5000);
    } catch (err: any) {
      console.error('Contact form catch error:', err);
      setState('error');
    }
  };

  const formContent = (
    <div className="flex-1">
      {state === 'success' ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <CheckCircle className="w-16 h-16 text-success mb-4" />
          <h3 className="text-2xl font-bold text-deep-charcoal mb-2">
            {dictionary.contact.success_title || "Təşəkkür edirik!"}
          </h3>
          <p className="text-medium-gray text-lg">{dictionary.contact.success}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-medium-gray uppercase tracking-wider mb-2">
                {dictionary.contact.name} <span className="text-error">*</span>
              </label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={dictionary.contact.name_placeholder || "Ad və soyadınızı daxil edin"}
                className="h-12 px-4 rounded-xl border-light-gray/60 bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-medium-gray uppercase tracking-wider mb-2">
                {dictionary.contact.phone}
              </label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={dictionary.contact.phone_placeholder || "Məs: +994 50 000 00 00"}
                className="h-12 px-4 rounded-xl border-light-gray/60 bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-medium-gray uppercase tracking-wider mb-2">
              {dictionary.contact.email}
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={dictionary.contact.email_placeholder || "E-poçt ünvanınızı daxil edin"}
              className="h-12 px-4 rounded-xl border-light-gray/60 bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm text-sm"
            />
          </div>

            <div>
              <label className="block text-[11px] font-bold text-medium-gray uppercase tracking-wider mb-2">
                {dictionary.contact.subject} <span className="text-error">*</span>
              </label>
              <Input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder={dictionary.contact.subject_placeholder}
                className="h-12 px-4 rounded-xl border-light-gray/60 bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-medium-gray uppercase tracking-wider mb-2">
                {dictionary.contact.message}
              </label>
              <Textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={dictionary.contact.message_placeholder}
                className="p-4 rounded-xl border-light-gray/60 bg-off-white focus-visible:ring-1 focus-visible:ring-muted-gold shadow-sm resize-none text-sm"
              />
            </div>

            {state === 'error' && (
              <div className="flex items-center gap-3 text-sm text-error bg-red-50 p-4 rounded-xl border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {dictionary.contact.error_desc}
              </div>
            )}

            <Button type="submit" disabled={state === 'loading'} className="w-full h-14 text-sm font-bold uppercase tracking-wider rounded-xl gap-3 bg-[#0a0a0a] hover:bg-muted-gold text-white transition-all shadow-md mt-2">
              {state === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {dictionary.contact.sending}
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {dictionary.contact.send_form}
                </>
              )}
            </Button>
        </form>
      )}
    </div>
  );

  if (!showContactInfo) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-light-gray/30 max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
            {dictionary.contact.quick_request}
          </span>
          <h3 className="text-2xl font-bold text-deep-charcoal mb-4">
            {dictionary.contact.order_here}
          </h3>
          <div className="w-12 h-1 bg-deep-charcoal" />
        </div>
        {formContent}
      </div>
    );
  }

  const phoneNum = settings?.phone_number || '+994 50 210 79 20';
  const whatsappNum = settings?.whatsapp_number || '+994 50 210 79 20';
  const emailAddr = settings?.email || 'info@fornitura.az';
  const address = settings?.address_az || 'Bakı, Azərbaycan';

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Left Column - Contact Info */}
      <div className="space-y-8 pt-4">
        <div>
          <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
            {dictionary.contact.info_title}
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-deep-charcoal mb-5 tracking-tight leading-tight">
            {dictionary.contact.title}<br />{dictionary.contact.subtitle.includes('əlaqə') ? 'Saxlayın' : ''}
          </h2>
          <p className="text-medium-gray text-lg max-w-md leading-relaxed">
            {dictionary.contact.form_description || 'Hər hansı bir sualınız və ya xüsusi tələbiniz varsa, bizə birbaşa yazın və ya zəng edin.'}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 pt-8 border-t border-light-gray/40">
          <a href={`tel:${phoneNum}`} className="flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-full border border-light-gray/50 flex items-center justify-center shrink-0 group-hover:border-muted-gold transition-colors">
              <Phone className="w-4 h-4 text-deep-charcoal group-hover:text-muted-gold transition-colors" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-medium-gray mb-1">{dictionary.contact.call_label}</p>
              <p className="text-base font-bold text-deep-charcoal">{phoneNum}</p>
            </div>
          </a>

          <a href={`https://wa.me/${whatsappNum.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-full border border-light-gray/50 flex items-center justify-center shrink-0 group-hover:border-[#1ebe5a] transition-colors">
              <MessageCircle className="w-4 h-4 text-deep-charcoal group-hover:text-[#1ebe5a] transition-colors" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-medium-gray mb-1">WhatsApp</p>
              <p className="text-base font-bold text-deep-charcoal">{whatsappNum}</p>
            </div>
          </a>

          <a href={`mailto:${emailAddr}`} className="flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-full border border-light-gray/50 flex items-center justify-center shrink-0 group-hover:border-muted-gold transition-colors">
              <Mail className="w-4 h-4 text-deep-charcoal group-hover:text-muted-gold transition-colors" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-medium-gray mb-1">{dictionary.contact.email}</p>
              <p className="text-base font-bold text-deep-charcoal break-all">{emailAddr}</p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border border-light-gray/50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-deep-charcoal" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-medium-gray mb-1">{dictionary.footer.working_hours}</p>
              <p className="text-base font-bold text-deep-charcoal">09:00 — 18:00</p>
              <p className="text-xs text-medium-gray mt-1">{dictionary.contact.working_days}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 sm:col-span-2">
            <div className="w-10 h-10 rounded-full border border-light-gray/50 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-charcoal"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-medium-gray mb-1">{dictionary.visit_us || 'Ünvan'}</p>
              <p className="text-base font-bold text-deep-charcoal">{address}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-light-gray/30">
        <div className="mb-8">
          <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
            {dictionary.contact.quick_request}
          </span>
          <h3 className="text-2xl font-bold text-deep-charcoal mb-4">
            {dictionary.contact.order_here}
          </h3>
          <div className="w-12 h-1 bg-deep-charcoal" />
        </div>
        {formContent}
      </div>
    </div>
  );
}
