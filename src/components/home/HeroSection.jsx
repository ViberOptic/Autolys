// src/components/home/HeroSection.jsx
import { Search, Crown, ArrowRight, Loader2 } from 'lucide-react';
import { useFeaturedCars } from '../../hooks/useCars';

export default function HeroSection({ onNavigate }) {
  const { cars, loading } = useFeaturedCars(4);

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-16 lg:pt-20 lg:pb-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          <div className="text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4 border border-blue-200 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Platform Mobil Listrik No. 1
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 lg:mb-6 tracking-tight">
              Revolusi Berkendara <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Tanpa Emisi
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Nikmati sensasi berkendara masa depan dengan koleksi mobil listrik dan hybrid terbaik. Efisien, bertenaga, dan ramah lingkungan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('ev')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 font-medium hover:-translate-y-0.5 active:scale-95"
              >
                <Search className="w-5 h-5" />
                Cari Mobil Impian
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onNavigate('recommendation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-medium shadow-sm hover:-translate-y-0.5 active:scale-95"
              >
                <Crown className="w-5 h-5 text-yellow-500 fill-current" />
                Koleksi Sultan
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                100% Electric & Hybrid
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Premium Selection
              </div>
            </div>
          </div>

          <div className="relative order-2 w-full max-w-md mx-auto lg:max-w-none lg:pl-10">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12">
                  {cars[0] && (
                    <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/10 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 z-10 relative overflow-hidden group">
                      <img 
                        src={cars[0].image_url} 
                        alt={cars[0].name} 
                        className="rounded-lg sm:rounded-xl w-full h-28 sm:h-40 object-cover"
                      />
                      {/* UPDATE: Nama Mobil Hero diberi class 'notranslate' */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold text-center p-2 notranslate">
                        {cars[0].name}
                      </div>
                    </div>
                  )}
                  {cars[1] && (
                    <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/10 rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105 overflow-hidden group">
                      <img 
                        src={cars[1].image_url} 
                        alt={cars[1].name} 
                        className="rounded-lg sm:rounded-xl w-full h-24 sm:h-32 object-cover"
                      />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold text-center p-2 notranslate">
                        {cars[1].name}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {cars[2] && (
                    <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg shadow-purple-500/10 rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 overflow-hidden group">
                      <img 
                        src={cars[2].image_url} 
                        alt={cars[2].name} 
                        className="rounded-lg sm:rounded-xl w-full h-24 sm:h-32 object-cover"
                      />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold text-center p-2 notranslate">
                        {cars[2].name}
                      </div>
                    </div>
                  )}
                  {cars[3] && (
                    <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/10 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 overflow-hidden group">
                      <img 
                        src={cars[3].image_url} 
                        alt={cars[3].name} 
                        className="rounded-lg sm:rounded-xl w-full h-28 sm:h-40 object-cover"
                      />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold text-center p-2 notranslate">
                        {cars[3].name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}