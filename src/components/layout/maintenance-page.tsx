'use client';

import { Settings, Tooltip } from 'lucide-react';
import { Container } from '@/components/shared/container';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-deep-charcoal flex items-center justify-center p-6 text-white text-center overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted-gold/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <Container className="relative z-10 max-w-2xl">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center relative group">
            <Settings className="w-12 h-12 text-muted-gold animate-spin-slow group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-muted-gold rounded-full flex items-center justify-center shadow-lg">
              <span className="text-deep-charcoal font-bold text-xs">!</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
          SAYTDA TEXNİKİ <span className="text-muted-gold">QULLUQ</span> GEDİR
        </h1>
        
        <p className="text-lg md:text-xl text-metallic-silver mb-10 leading-relaxed font-medium">
          Sizə daha yaxşı xidmət göstərmək üçün saytda təkmilləşdirmə işləri aparırıq. 
          Çox qısa zamanda yenidən aktiv olacağıq.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Təhlükəsizlik', icon: '🛡️' },
            { label: 'Sürət', icon: '⚡' },
            { label: 'Yenilik', icon: '✨' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <p className="text-sm text-white/50">Təcili müraciət üçün:</p>
          <a 
            href="tel:+994502107920" 
            className="text-2xl font-bold text-muted-gold hover:underline transition-all"
          >
            +994 50 210 79 20
          </a>
        </div>
      </Container>
    </div>
  );
}
