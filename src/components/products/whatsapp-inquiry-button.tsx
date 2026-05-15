'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics/events';

interface WhatsAppInquiryButtonProps {
  phone: string;
  productName: string;
  partNumber: string;
  productUrl: string;
  locale: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'small';
}

export function WhatsAppInquiryButton({
  phone,
  productName,
  partNumber,
  productUrl,
  locale,
  label,
  className,
  variant = 'default',
}: WhatsAppInquiryButtonProps) {
  const message = buildWhatsAppMessage({ productName, partNumber, productUrl, locale });
  const url = getWhatsAppUrl(phone, message);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackWhatsAppClick(productName);
    window.open(url, '_blank');
  };

  const styles = {
    default: 'bg-whatsapp text-white px-6 py-3 hover:bg-[#1ebe5a] text-sm font-medium',
    outline: 'border border-whatsapp text-whatsapp px-4 py-2 hover:bg-whatsapp hover:text-white text-sm font-medium',
    small: 'bg-whatsapp text-white px-3 py-1.5 text-xs font-medium hover:bg-[#1ebe5a]',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200',
        styles[variant],
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {label || 'Ask on WhatsApp'}
    </button>
  );
}
