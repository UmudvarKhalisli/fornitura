'use client';

import { useState } from 'react';
import { Save, AlertTriangle, ShieldCheck, Globe, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateSettingsAction } from '@/app/admin/settings/actions';
import { toast } from 'sonner';

export function SettingsForm({ settings }: { settings: any }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(settings || {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateSettingsAction(form);
      if (result.success) {
        toast.success('Tənzimləmələr uğurla yadda saxlanıldı');
      } else {
        toast.error(result.error || 'Xəta baş verdi');
      }
    } catch (error) {
      console.error(error);
      toast.error('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-light-gray shadow-sm">
            <h2 className="text-xl font-bold text-deep-charcoal mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-gold" />
              Ümumi Məlumatlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Saytın Adı</label>
                <Input 
                  value={form.site_name || ''} 
                  onChange={(e) => setForm({...form, site_name: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Email Ünvanı</label>
                <Input 
                  value={form.email || ''} 
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Telefon</label>
                <Input 
                  value={form.phone_number || ''} 
                  onChange={(e) => setForm({...form, phone_number: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">WhatsApp</label>
                <Input 
                  value={form.whatsapp_number || ''} 
                  onChange={(e) => setForm({...form, whatsapp_number: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Ünvan (AZ)</label>
              <Input 
                value={form.address_az || ''} 
                onChange={(e) => setForm({...form, address_az: e.target.value})}
                className="rounded-xl border-light-gray h-12"
              />
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-light-gray shadow-sm">
            <h2 className="text-xl font-bold text-deep-charcoal mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-muted-gold" />
              Sosial Şəbəkələr
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Instagram</label>
                <Input 
                  value={form.instagram_url || ''} 
                  onChange={(e) => setForm({...form, instagram_url: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-medium-gray uppercase tracking-wider">Facebook</label>
                <Input 
                  value={form.facebook_url || ''} 
                  onChange={(e) => setForm({...form, facebook_url: e.target.value})}
                  className="rounded-xl border-light-gray h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Maintenance Mode */}
          <div className={`p-8 rounded-3xl border shadow-lg transition-all duration-300 ${form.is_maintenance ? 'bg-amber-50 border-amber-200 shadow-amber-200/20' : 'bg-white border-light-gray'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-deep-charcoal flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${form.is_maintenance ? 'text-amber-600' : 'text-green-600'}`} />
                Texniki Qulluq
              </h2>
              <div 
                onClick={() => setForm({...form, is_maintenance: !form.is_maintenance})}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${form.is_maintenance ? 'bg-amber-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${form.is_maintenance ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
            <p className={`text-sm mb-6 leading-relaxed ${form.is_maintenance ? 'text-amber-800' : 'text-medium-gray'}`}>
              {form.is_maintenance 
                ? 'Sayt hazırda ziyarətçilər üçün bağlıdır. Yalnız admin panelə giriş mümkündür.' 
                : 'Sayt hazırda aktivdir və bütün ziyarətçilər daxil ola bilər.'}
            </p>
            {form.is_maintenance && (
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-100/50 p-3 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
                Diqqət: Ziyarətçilər "Tezliklə" səhifəsini görəcək.
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-8 bg-deep-charcoal text-white rounded-3xl font-bold text-lg hover:bg-muted-gold hover:text-deep-charcoal transition-all shadow-xl shadow-deep-charcoal/10 gap-3"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            Dəyişiklikləri Saxla
          </Button>
        </div>
      </div>
    </form>
  );
}
