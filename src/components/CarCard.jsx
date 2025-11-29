// src/components/CarCard.jsx
import { Zap, Fuel } from 'lucide-react';
import FavoriteButton from './common/FavoriteButton';

export default function CarCard({ car, onClick }) {
  
  // Fungsi Helper: Format Harga Pintar dengan Spasi Konsisten
  const formatPrice = (priceString) => {
    if (!priceString) return '';

    const numericPrice = parseInt(priceString.replace(/\D/g, ''));
    
    // Gunakan template literal standar untuk memastikan spasi terbaca
    if (numericPrice >= 1000000000) {
      const inBillion = (numericPrice / 1000000000).toFixed(1).replace(/\.0$/, '');
      return `Rp ${inBillion} M`;
    } 
    
    if (numericPrice >= 1000000) {
      const inMillion = (numericPrice / 1000000).toFixed(0);
      return `Rp ${inMillion} Jt`;
    }
    
    return priceString;
  };

  return (
    <div 
      onClick={() => onClick(car.id)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image_url} 
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton recipeId={car.id} size="sm" /> 
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold rounded-full shadow-sm">
            {car.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-800 mb-1 truncate group-hover:text-blue-600 transition-colors">
          {car.name}
        </h3>
        <p className="text-slate-500 text-sm mb-3">{car.brand}</p>
        
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          {/* UPDATE: Menggunakan gap-1.5 untuk jarak ikon dan teks yang konsisten */}
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            {car.category === 'Electric' ? (
              <Zap className="w-4 h-4 text-yellow-500 fill-current" />
            ) : (
              <Fuel className="w-4 h-4 text-blue-500" />
            )}
            {/* Bungkus angka spesifikasi agar tidak terjemahkan & jaga jarak */}
            <span className="notranslate">{car.horsepower}</span>
          </div>
          
          {/* UPDATE: Harga dengan whitespace-nowrap agar unit tidak turun baris */}
          <span className="text-blue-700 font-bold text-sm whitespace-nowrap notranslate">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>
    </div>
  );
}