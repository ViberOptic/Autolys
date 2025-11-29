// src/pages/AboutPage.jsx
import logoUrl from '../assets/LOGORN.png';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { Zap, Smartphone, Cloud, Code, Heart, ShieldCheck, Github, Instagram, LogOut, Settings, Globe } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const features = [
    { icon: <Smartphone className="w-6 h-6 text-blue-500" />, title: "PWA Ready", desc: "Dapat diinstal di perangkat mobile dan berjalan offline layaknya aplikasi native." },
    { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: "Performa Cepat", desc: "Dibangun dengan Vite dan React untuk pengalaman pengguna yang instan dan mulus." },
    { icon: <Cloud className="w-6 h-6 text-indigo-500" />, title: "Cloud Database", desc: "Data favorit Anda tersimpan aman di cloud menggunakan Supabase Realtime." },
    { icon: <ShieldCheck className="w-6 h-6 text-green-500" />, title: "Data Terpercaya", desc: "Spesifikasi mobil dikurasi dari sumber terpercaya untuk akurasi tinggi." }
  ];

  const techStack = [
    { name: "React 19", color: "bg-blue-100 text-blue-700" },
    { name: "Vite", color: "bg-purple-100 text-purple-700" },
    { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-700" },
    { name: "Supabase", color: "bg-green-100 text-green-700" },
    { name: "PWA", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="pt-8 px-4 pb-24 md:pb-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" />
          
          <img 
            src={logoUrl} 
            alt="Autolys Logo" 
            className="w-24 h-24 mx-auto mb-0 object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-500" 
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Autolys
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v1.0.0 (Stable)
          </div>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-6">
            Platform katalog mobil listrik dan hybrid masa depan. Temukan spesifikasi lengkap, harga, dan simpan mobil impian Anda dalam satu aplikasi modern.
          </p>

          {/* Area Pengaturan & Aksi */}
          <div className="mt-8 flex flex-col items-center gap-4">
            
            {/* Language Switcher UI */}
            {/* PERBAIKAN: Ditambahkan class 'md:hidden' agar hilang di Desktop (karena sudah ada di Navbar) */}
            <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl w-full max-w-sm border border-slate-100 shadow-sm relative z-20 md:hidden">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" /> Pengaturan Bahasa
                </span>
                <div className="w-full">
                  <LanguageSwitcher variant="boxed" />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 flex-wrap mt-2 relative z-10">
              <button 
                onClick={() => onNavigate('manage')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-medium rounded-xl transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <Settings className="w-4 h-4" />
                Kelola Katalog
              </button>

              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium rounded-xl transition-all active:scale-95 border border-red-100 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                LogOut
              </button>
            </div>
          </div>
        </div>

        {/* 2. Features Grid */}
        <div className="relative z-0">
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">Keunggulan Aplikasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="p-3 bg-slate-50 rounded-xl shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Tech Stack & Developer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-800">Teknologi</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-semibold ${tech.color}`}>{tech.name}</span>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-400 fill-current" />
              <h3 className="font-bold text-slate-800">Dibuat Oleh</h3>
            </div>
            <div className="space-y-3">
              <p className="text-slate-600 font-medium">Muhammad Azka Wijasena (21120123140125)</p>
              <div className="flex gap-3 pt-2">
                <a href="https://github.com/ViberOptic" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"><Github className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/m_azka_w/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-400">© 2025 Autolys Project. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}