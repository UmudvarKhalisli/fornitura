'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trackContactFormSubmit } from '@/lib/analytics/events';

interface ContactFormProps {
  dictionary: any;
  locale: string;
}

export function ContactForm({ dictionary, locale }: ContactFormProps) {
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

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center text-center p-10 rounded-lg border border-green-200 bg-green-50">
        <CheckCircle className="w-12 h-12 text-success mb-3" />
        <h3 className="text-lg font-semibold text-deep-charcoal mb-1">
          {dictionary.contact.success}
        </h3>
        <p className="text-sm text-medium-gray">{dictionary.contact.success_desc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-deep-charcoal mb-4">{dictionary.contact.form_title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-1">
            {dictionary.contact.name} <span className="text-error">*</span>
          </label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={dictionary.contact.name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-1">
            {dictionary.contact.email} <span className="text-error">*</span>
          </label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={dictionary.contact.email}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-1">
            {dictionary.contact.phone}
          </label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={dictionary.contact.phone}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-1">
            {dictionary.contact.subject}
          </label>
          <Input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder={dictionary.contact.subject}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-deep-charcoal mb-1">
          {dictionary.contact.message} <span className="text-error">*</span>
        </label>
        <Textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={dictionary.contact.message}
        />
      </div>

      {state === 'error' && (
        <div className="flex items-center gap-2 text-sm text-error bg-red-50 p-3 rounded-md">
          <AlertCircle className="w-4 h-4" />
          {dictionary.contact.error_desc}
        </div>
      )}

      <Button type="submit" disabled={state === 'loading'} className="w-full gap-2 bg-deep-charcoal hover:bg-dark-graphite">
        {state === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {dictionary.common.loading}
          </span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {dictionary.contact.submit}
          </>
        )}
      </Button>
    </form>
  );
}
