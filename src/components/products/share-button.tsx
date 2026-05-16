'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  url: string;
  label: string;
}

export function ShareButton({ url, label }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {copied ? 'Kopyalandı!' : label}
    </button>
  );
}
