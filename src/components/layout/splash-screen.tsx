'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Yalnız bir sessiyada (istifadəçi ilk dəfə sayta girəndə) görünsün deyə check edirik
    const hasVisited = sessionStorage.getItem('splash_shown');
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    // 1 saniyə ekranda aydınca gözləyəcək, sonra animasiya başlayacaq
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
      sessionStorage.setItem('splash_shown', 'true');
    }, 1000);

    // Animasiya bitdikdən sonra DOM-dan tamamilə silirik ki mane olmasın
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1800); // 1000ms gozleme + 800ms animasiya vaxti

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-all duration-700 ease-in-out',
        isZooming ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <div
        className={cn(
          'relative w-36 h-36 md:w-48 md:h-48 transition-all duration-700 ease-in-out',
          isZooming 
            ? 'scale-[4] md:scale-[5] opacity-0 blur-sm' 
            : 'scale-100 opacity-100 animate-pulse'
        )}
      >
        <Image
          src="/splash-logo.png"
          alt="Fornitura Loading"
          fill
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
    </div>
  );
}
