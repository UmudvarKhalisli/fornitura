'use client';

import { Menu, Bell, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-light-gray h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 lg:hidden hover:bg-light-gray rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-deep-charcoal" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-off-white rounded-lg border border-light-gray/50 w-64 lg:w-96 group focus-within:border-muted-gold/50 transition-all">
          <Search className="w-4 h-4 text-medium-gray group-focus-within:text-muted-gold" />
          <input 
            type="text" 
            placeholder="Search products, orders..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-deep-charcoal w-full placeholder:text-medium-gray/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 hover:bg-light-gray rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-deep-charcoal" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-light-gray mx-2 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-semibold text-deep-charcoal leading-none mb-1">Admin</p>
            <p className="text-xs text-medium-gray font-medium">Control Panel</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-deep-charcoal text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
