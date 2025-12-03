import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import logoUrl from '../assets/LOGORN.png';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

export default function RegisterPage({ onNavigate }) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin 
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher variant="boxed" />
        </div>

        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 text-center border border-slate-100 animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Cek Email Anda</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Link konfirmasi telah dikirim ke <strong className="text-slate-900">{formData.email}</strong>.<br/>
            Silakan verifikasi email Anda, lalu kembali ke sini untuk Login.
          </p>
          <button 
            onClick={() => onNavigate('login')} 
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 hover:underline gap-2"
          >
            Kembali ke Login <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/90 via-slate-900/80 to-slate-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000" 
          alt="Electric Car" 
          className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[20s] ease-linear"
        />
        
        <div className="relative z-20 h-full flex flex-col justify-between p-16 text-white">
          <img src={logoUrl} alt="Autolys" className="h-10 w-auto self-start opacity-90 drop-shadow-md" />
          <div className="space-y-4 mb-10">
            <h2 className="text-5xl font-bold leading-tight">
              Mulai Perjalanan <br/> Anda
            </h2>
            <p className="text-lg text-indigo-100 max-w-md leading-relaxed">
              Buat akun untuk menyimpan daftar mobil favorit, mendapatkan rekomendasi personal, dan akses fitur eksklusif.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 relative">
        
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher variant="default" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Buat Akun Baru
            </h2>
            <p className="text-slate-500 text-lg">
              Bergabung dengan komunitas Autolys sekarang.
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
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 outline-none transition-all duration-200"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 outline-none transition-all duration-200"
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Daftar Akun'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-slate-600">
              Sudah punya akun?{' '}
              <button 
                onClick={() => onNavigate('login')} 
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}