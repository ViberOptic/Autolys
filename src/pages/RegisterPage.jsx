import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import logoUrl from '../assets/LOGORN.png';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cek Email Anda</h2>
          <p className="text-slate-500 mb-6">
            Link konfirmasi telah dikirim ke <strong>{formData.email}</strong>. Silakan verifikasi untuk melanjutkan.
          </p>
          <button onClick={() => onNavigate('login')} className="text-blue-600 font-medium hover:underline">
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kolom Kiri - Image / Decor (Reverse dari Login) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/90 to-purple-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000" 
          alt="Electric Car" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-between p-16 text-white">
          <img src={logoUrl} alt="Autolys" className="h-10 w-auto self-start opacity-80" />
          <div>
            <h2 className="text-4xl font-bold mb-4">Mulai Perjalanan Anda</h2>
            <p className="text-lg text-indigo-100 max-w-md">
              Buat akun untuk menyimpan daftar mobil favorit, mendapatkan rekomendasi personal, dan akses fitur eksklusif.
            </p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru</h2>
          <p className="text-slate-500 mb-8">Bergabung dengan komunitas Autolys.</p>

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
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Daftar Akun'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Sudah punya akun?{' '}
            <button onClick={() => onNavigate('login')} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}