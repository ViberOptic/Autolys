// src/pages/EVPage.jsx
import { useState } from 'react';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import ModernPagination from '../components/common/ModernPagination';
import CarFilter from '../components/common/CarFilter';
import { Search, Zap } from 'lucide-react';

export default function EVPage({ onCarClick }) {
  const [filters, setFilters] = useState({ search: '', brand: 'all', category: 'all', priceRange: 'all' });
  const [page, setPage] = useState(1);
  const { cars, loading, pagination } = useCars({ ...filters, page, limit: 5 });

  const handleReset = () => { setFilters({ search: '', brand: 'all', category: 'all', priceRange: 'all' }); setPage(1); };
  const handlePageChange = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pt-8 px-4 pb-10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Katalog EV & Hybrid</h1>
              <p className="text-slate-500 text-sm mt-1">Temukan mobil masa depan Anda.</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative mb-6">
            <input 
              type="text" 
              value={filters.search}
              onChange={(e) => { setFilters(p => ({...p, search: e.target.value})); setPage(1); }}
              placeholder="Cari nama mobil..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
          <CarFilter filters={filters} setFilters={(n) => { setFilters(n); setPage(1); }} onReset={handleReset} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {[...Array(5)].map((_, i) => (<div key={i} className="bg-white h-80 rounded-2xl animate-pulse shadow-sm border border-slate-100"></div>))}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              {/* UPDATE: Gap 1.5 dan notranslate pada angka */}
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <span>Menampilkan</span>
                <span className="notranslate font-bold text-slate-800">{pagination.total}</span>
                <span>mobil</span>
              </div>
            </div>
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cars.map(car => (<CarCard key={car.id} car={car} onClick={onCarClick} />))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">Tidak ada mobil yang cocok.</p>
                <button onClick={handleReset} className="mt-4 text-blue-600 hover:underline text-sm">Reset Filter</button>
              </div>
            )}
            
            <div className="py-8">
              <ModernPagination currentPage={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}