// src/components/splash/LoadingAnimation.jsx
export default function LoadingAnimation({ fadeIn, progress }) {
  return (
    <div className={`w-full max-w-xs sm:max-w-sm transition-all duration-1000 ${
      !fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
    }`} style={{ transitionDelay: '600ms' }}>
      
      {/* Progress Bar Container */}
      <div className="relative mb-4">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Kilau pada bar */}
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 skew-x-12" />
          </div>
        </div>
      </div>
       
      {/* Status Text & Percentage */}
      {/* PERBAIKAN: Hapus 'notranslate' dari div parent ini agar anak-anaknya bisa diatur secara individu */}
      <div className="flex justify-between items-center mb-8">
        
        {/* Teks Status: Tetap BISA diterjemahkan (User Request) */}
        <span className="text-slate-500 text-xs font-medium tracking-wide uppercase">
          {progress < 100 ? 'Memuat Mesin...' : 'Siap Meluncur'}
        </span>

        {/* Angka Persentase: DIBLOKIR dari translate agar tidak stuck/error saat angka berubah cepat */}
        <span className="text-blue-700 text-xs font-bold font-mono notranslate">
          {Math.min(Math.round(progress), 100)}%
        </span>
      </div>

      {/* Loading Indicators (Bentuk kotak/teknis) */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-sm transition-all duration-500 ${
              progress < 100 
                ? 'bg-blue-600 animate-pulse' 
                : 'bg-green-500 scale-110'
            }`} 
            style={{ 
              animationDelay: `${i * 150}ms`,
              opacity: progress < 100 ? 0.6 : 1
            }} 
          />
        ))}
      </div>
    </div>
  );
}