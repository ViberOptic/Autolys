// src/pages/CarDetailPage.jsx
import { ArrowLeft, Calendar, Gauge, Fuel, Zap } from 'lucide-react';
import { useCarDetail } from '../hooks/useCars';
import FavoriteButton from '../components/common/FavoriteButton';

export default function CarDetailPage({ id, onBack }) {
  const { car, loading } = useCarDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-500">Memuat spesifikasi...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Mobil tidak ditemukan</p>
          <button onClick={onBack} className="text-blue-600 font-medium hover:underline">
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  const priceParts = car.price ? car.price.match(/^(\D*)(\d[\d\.,]*)(\D*)$/) : null;

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative h-72 md:h-96 bg-slate-200">
        <img 
          src={car.image_url} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="p-2 bg-black/20 backdrop-blur-md hover:bg-black/30 text-white rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="p-2 bg-black/20 backdrop-blur-md rounded-full">
             <FavoriteButton carId={car.id} size="md" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              {car.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 notranslate">{car.name}</h1>
            <p className="text-slate-200 text-lg">{car.brand}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-slate-500 text-sm mb-1">Harga On The Road (Estimasi)</p>
            <div className="flex items-baseline justify-center md:justify-start gap-1.5 flex-wrap">
              {priceParts ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-700 notranslate">{priceParts[1]}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-700 notranslate">{priceParts[2]}</span>
                  {priceParts[3] && <span className="text-2xl sm:text-3xl font-bold text-blue-700">{priceParts[3]}</span>}
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-blue-700 notranslate">{car.price}</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => window.open('https://www.instagram.com/reel/DO_Z7kQDlI_/?igsh=MTE3aXdpOGtiODZxZw==', '_blank')}
            className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
          >
            Hubungi Dealer
          </button>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang Kendaraan</h3>
              <p className="text-slate-600 leading-relaxed text-lg text-justify sm:text-left">
                {car.description}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Spesifikasi Utama</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <SpecItem 
                  icon={<Fuel className="w-5 h-5 text-blue-500" />}
                  label="Tipe Mesin"
                  value={car.engine}
                />
                <SpecItem 
                  icon={<Zap className="w-5 h-5 text-yellow-500" />}
                  label="Tenaga"
                  value={car.horsepower}
                  isMetric={true}
                />
                <SpecItem 
                  icon={<Gauge className="w-5 h-5 text-red-500" />}
                  label="Transmisi"
                  value="Automatic" 
                />
                <SpecItem 
                  icon={<Calendar className="w-5 h-5 text-green-500" />}
                  label="Tahun Model"
                  value="2025"
                  isMetric={true}
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Highlights</h3>
              <ul className="space-y-3">
                <HighlightItem label="Garansi Resmi" value="5" unit="Tahun" />
                <HighlightItem label="Gratis Service" value="50.000" unit="KM" />
                <HighlightItem label="Asuransi All Risk" value="1" unit="Tahun" />
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SpecItem({ icon, label, value, isMetric }) {
  const parts = value ? value.toString().match(/^(\D*)(\d+(?:[\.,]\d+)?)(\D*)$/) : null;

  const getSuffixParts = (suffix) => {
    if (!suffix) return { unit: '', rest: '' };
    const trimmed = suffix.trim();
    const firstSpaceIdx = trimmed.indexOf(' ');
    
    if (firstSpaceIdx === -1) return { unit: trimmed, rest: '' };
    
    return {
      unit: trimmed.slice(0, firstSpaceIdx),
      rest: trimmed.slice(firstSpaceIdx + 1)
    };
  };

  return (
    <div className="flex items-start gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100 h-full">
      <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        
        {parts ? (() => {
          const { unit, rest } = getSuffixParts(parts[3]);
          return (
            <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
              {parts[1] && <span>{parts[1].trim()} </span>}
              <span className="notranslate">{parts[2]}</span>
              {unit && <span className={isMetric ? 'notranslate' : ''}> {unit}</span>}
              {rest && <span> {rest}</span>}
            </p>
          );
        })() : (
          <p className={`font-semibold text-slate-900 text-sm sm:text-base break-words leading-snug ${isMetric ? 'notranslate' : ''}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function HighlightItem({ label, value, unit }) {
  return (
    <li className="flex items-start gap-2 text-slate-600">
      <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
      <div className="flex flex-wrap items-center gap-1 text-sm">
        <span>{label}</span>
        <span className="notranslate font-bold text-slate-800">{value}</span>
        <span>{unit}</span>
      </div>
    </li>
  );
}