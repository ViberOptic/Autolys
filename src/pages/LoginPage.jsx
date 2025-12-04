// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import logoUrl from '../assets/LOGORN.png';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

export default function LoginPage({ onNavigate }) {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onNavigate('home'); 
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 relative">
        
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher variant="default" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mb-10 text-center sm:text-left">
            <img 
              src={logoUrl} 
              alt="Autolys" 
              className="h-20 sm:h-24 w-auto mb-8 mx-auto sm:mx-0 transition-transform hover:scale-105 drop-shadow-sm" 
            />
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Selamat Datang Kembali
            </h2>
            <p className="text-slate-500 text-lg">
              Masuk untuk mengakses garasi impian Anda.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all duration-200"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                  Lupa password?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk Sekarang'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-slate-600">
              Belum punya akun?{' '}
              <button 
                onClick={() => onNavigate('register')} 
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                Daftar Gratis
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/80 to-slate-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000" 
          alt="Luxury Car" 
          className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[20s] ease-linear"
        />
        
        <div className="relative z-20 h-full flex flex-col justify-end p-20 text-white">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Future of Mobility
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              Revolusi Kendaraan <br/>
              <span className="text-blue-400">Listrik</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-md leading-relaxed">
              Bergabunglah dengan ribuan pengguna Autolys dan temukan masa depan transportasi yang efisien dan ramah lingkungan hari ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}