// src/pages/RecommendationPage.jsx
import { useState } from 'react';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import ModernPagination from '../components/common/ModernPagination';
import { Sparkles, Crown } from 'lucide-react';

export default function RecommendationPage({ onCarClick }) {
  const [page, setPage] = useState(1);
  const { cars, loading, pagination } = useCars({ priceRange: 'above_1000', page, limit: 5 });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-8 px-4 pb-10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Crown className="w-64 h-64 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-medium mb-4 border border-yellow-500/30">
              <Sparkles className="w-4 h-4" />
              Pilihan Editor
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Rekomendasi Sultan</h1>
            <p className="text-slate-300 max-w-xl text-lg">
              Koleksi eksklusif mobil performa tinggi untuk Anda yang menginginkan yang terbaik.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white h-80 rounded-2xl animate-pulse shadow-sm border border-slate-100"></div>
             ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cars.map(car => (
                <CarCard key={car.id} car={car} onClick={onCarClick} />
              ))}
            </div>
            
            {/* PERBAIKAN: Wrapper untuk memberikan jarak pada pagination */}
            <div className="py-8">
              <ModernPagination currentPage={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}