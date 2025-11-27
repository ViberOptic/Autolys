// src/pages/FavoritePage.jsx
import { useState, useEffect } from 'react';
import { carData } from '../data/cars';
import favoriteService from '../services/favoriteService';
// Hapus import getUserIdentifier
import CarCard from '../components/CarCard';
import ModernPagination from '../components/common/ModernPagination';
import { Heart, ArrowRight, Car } from 'lucide-react';

export default function FavoritePage({ onCarClick, onNavigate }) {
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [allFavorites, setAllFavorites] = useState([]); 
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      // Tidak perlu userId lagi
      const { success, data } = await favoriteService.getFavorites();
      if (success && Array.isArray(data)) {
        const favCars = carData.filter(car => data.includes(car.id));
        setAllFavorites(favCars);
      }
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFavorites(allFavorites.slice(startIndex, endIndex));
  }, [page, allFavorites]);

  const totalPages = Math.ceil(allFavorites.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-8 px-4 pb-10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-full text-red-500 border border-red-100">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Koleksi Favorit</h1>
              <p className="text-slate-500 text-sm mt-1">
                {allFavorites.length} mobil impian tersimpan
              </p>
            </div>
          </div>
          <button onClick={() => onNavigate('ev')} className="hidden md:flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
            Tambah Lagi <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-slate-500">Memuat koleksi Anda...</p>
          </div>
        ) : favorites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {favorites.map(car => (
                <CarCard key={car.id} car={car} onClick={onCarClick} />
              ))}
            </div>
            <div className="py-8">
                <ModernPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 px-4 bg-white rounded-3xl border border-dashed border-slate-300 text-center shadow-sm">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border border-red-100 mb-4">
              <Heart className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada favorit</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              Koleksi Anda masih kosong. Jelajahi katalog dan simpan mobil impian Anda.
            </p>
            <button onClick={() => onNavigate('ev')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium flex items-center gap-2 text-sm">
              <Car className="w-4 h-4" /> Jelajahi Katalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}