import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import logoUrl from '../assets/LOGORN.png';

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
      onNavigate('home'); // Redirect ke home setelah login
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kolom Kiri - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src={logoUrl} alt="Autolys" className="h-12 w-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang Kembali</h2>
          <p className="text-slate-500 mb-8">Masuk untuk mengakses garasi impian Anda.</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk Sekarang'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Belum punya akun?{' '}
            <button onClick={() => onNavigate('register')} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              Daftar Gratis
            </button>
          </p>
        </div>
      </div>

      {/* Kolom Kanan - Image / Decor */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000" 
          alt="Luxury Car" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-end p-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Revolusi Kendaraan Listrik</h2>
          <p className="text-lg text-blue-100 max-w-md">
            Bergabunglah dengan ribuan pengguna Autolys dan temukan masa depan transportasi hari ini.
          </p>
        </div>
      </div>
    </div>
  );
}