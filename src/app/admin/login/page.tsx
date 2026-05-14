'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user is admin
      const { data: admin } = await supabase
        .from('admins')
        .select('id')
        .single();

      if (!admin) {
        await supabase.auth.signOut();
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      // Update last login
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', admin.id);

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-charcoal">
      <div className="w-full max-w-sm mx-auto p-8">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Fornitura Logo" className="h-12 w-auto mx-auto mb-4 object-contain brightness-0 invert" />
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-metallic-silver mt-1">Fornitura</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fornitura.com"
              className="bg-dark-graphite border-dark-graphite text-white placeholder:text-metallic-silver"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-dark-graphite border-dark-graphite text-white placeholder:text-metallic-silver"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 p-3 rounded-md">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-muted-gold text-deep-charcoal hover:bg-[#B8943A] font-semibold"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
