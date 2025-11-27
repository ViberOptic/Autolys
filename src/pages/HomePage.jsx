// src/pages/HomePage.jsx
import { useCars } from '../hooks/useCars';
import HeroSection from '../components/home/HeroSection';
import FeaturedCarsSection from '../components/home/FeaturedCarsSection';

export default function HomePage({ onNavigate, onCarClick }) {
  const { cars: newArrivals } = useCars({ limit: 3 });
  const { cars: electricCars } = useCars({ category: 'Electric', limit: 3 });

  return (
    <div className="pb-10"> 
      <HeroSection onNavigate={onNavigate} />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-0 space-y-16">
        <FeaturedCarsSection 
          title="Koleksi Terbaru" 
          cars={newArrivals} 
          onCarClick={onCarClick}
          linkLabel="Lihat Semua Katalog"
          onLinkClick={() => onNavigate('ev')} 
        />

        <FeaturedCarsSection 
          title="Masa Depan Listrik" 
          cars={electricCars} 
          onCarClick={onCarClick}
          linkLabel="Lihat Mobil Listrik"
          onLinkClick={() => onNavigate('ev')}
        />
      </div>
    </div>
  );
}