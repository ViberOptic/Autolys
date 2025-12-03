import { Heart, Loader2 } from 'lucide-react';
import { useIsFavorited } from '../../hooks/useFavorites';

export default function FavoriteButton({ carId, size = 'md' }) {
  const { isFavorited, loading, toggleFavorite } = useIsFavorited(carId);
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading) {
      toggleFavorite();
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        transition-all duration-200 shadow-md hover:shadow-lg
        ${isFavorited 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-white/90 hover:bg-white text-slate-400 hover:text-red-500'
        }
        backdrop-blur-sm
      `}
      title={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
    >
      {loading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <Heart 
          className={`${iconSizes[size]} ${isFavorited ? 'fill-current' : ''}`} 
        />
      )}
    </button>
  );
}