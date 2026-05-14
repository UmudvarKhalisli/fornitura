'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  variant?: 'floating' | 'inline' | 'cta';
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  phone,
  message = '',
  variant = 'floating',
  label,
  className,
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 animate-whatsapp-pulse',
          className
        )}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200',
        variant === 'cta'
          ? 'bg-whatsapp text-white px-6 py-3 hover:bg-[#1ebe5a]'
          : 'border border-whatsapp text-whatsapp px-4 py-2 hover:bg-whatsapp hover:text-white text-sm',
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {label || 'WhatsApp'}
    </a>
  );
}
