'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Göstərmək üçün ən az 300px aşağı düşmək lazımdır
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-deep-charcoal text-muted-gold shadow-xl border border-muted-gold/20 backdrop-blur-sm transition-all duration-500 hover:bg-muted-gold hover:text-deep-charcoal hover:-translate-y-2 hover:shadow-muted-gold/30',
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-0 pointer-events-none'
      )}
    >
      <ArrowUp className="w-5 h-5 animate-pulse" />
    </button>
  );
}
