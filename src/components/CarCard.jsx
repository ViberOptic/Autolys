// src/components/CarCard.jsx
import { Zap, Fuel } from 'lucide-react';
import FavoriteButton from './common/FavoriteButton';

export default function CarCard({ car, onClick }) {
  
  // Helper: Format Harga Pintar
  const getPriceParts = (priceString) => {
    if (!priceString) return { value: '', unit: '' };

    const numericPrice = parseInt(priceString.replace(/\D/g, ''));
    
    if (isNaN(numericPrice)) return { value: priceString, unit: '' };

    if (numericPrice >= 1000000000000) {
      return { 
        value: (numericPrice / 1000000000000).toFixed(1).replace(/\.0$/, ''), 
        unit: 'Triliun' 
      };
    }
    if (numericPrice >= 1000000000) {
      return { 
        value: (numericPrice / 1000000000).toFixed(1).replace(/\.0$/, ''), 
        unit: 'Miliar' 
      };
    }
    if (numericPrice >= 1000000) {
      return { 
        value: (numericPrice / 1000000).toFixed(0), 
        unit: 'Juta' 
      };
    }
    
    return { value: numericPrice.toLocaleString('id-ID'), unit: '' };
  };

  const { value, unit } = getPriceParts(car.price);

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
          <FavoriteButtonWV recipeId={car.id} size="sm" /> 
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold rounded-full shadow-sm">
            {car.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {/* UPDATE: Nama Mobil diberi class 'notranslate' */}
        <h3 className="font-bold text-lg text-slate-800 mb-1 truncate group-hover:text-blue-600 transition-colors notranslate">
          {car.name}
        </h3>
        <p className="text-slate-500 text-sm mb-3">{car.brand}</p>
        
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            {car.category === 'Electric' ? (
              <Zap className="w-4 h-4 text-yellow-500 fill-current" />
            ) : (
              <Fuel className="w-4 h-4 text-blue-500" />
            )}
            <span className="notranslate">{car.horsepower}</span>
          </div>
          
          <div className="flex items-baseline gap-1 text-blue-700 font-bold text-sm whitespace-nowrap">
            <span className="notranslate">Rp</span>
            <span className="notranslate">{value}</span>
            {unit && <span>{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoriteButtonWV({ recipeId, size }) {
    return <FavoriteButton recipeId={recipeId} size={size} />
}