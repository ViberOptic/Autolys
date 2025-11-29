// src/pages/CarDetailPage.jsx
import { ArrowLeft, Calendar, Gauge, Fuel, Banknote, Zap } from 'lucide-react';
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
             <FavoriteButton recipeId={car.id} size="md" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              {car.category}
            </span>
            {/* UPDATE: Nama Mobil Detail diberi class 'notranslate' */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 notranslate">{car.name}</h1>
            <p className="text-slate-200 text-lg">{car.brand}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-slate-500 text-sm mb-1">Harga OTR (Estimasi)</p>
            <div className="flex items-baseline gap-1.5">
              {priceParts ? (
                <>
                  <span className="text-3xl font-bold text-blue-700 notranslate">{priceParts[1]}</span>
                  <span className="text-3xl font-bold text-blue-700 notranslate">{priceParts[2]}</span>
                  {priceParts[3] && <span className="text-3xl font-bold text-blue-700">{priceParts[3]}</span>}
                </>
              ) : (
                <span className="text-3xl font-bold text-blue-700 notranslate">{car.price}</span>
              )}
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
            Hubungi Dealer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang Kendaraan</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {car.description}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Spesifikasi Utama</h3>
              <div className="grid grid-cols-2 gap-4">
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
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Garansi Resmi</span>
                    <span className="notranslate font-bold text-slate-800">5</span>
                    <span>Tahun</span>
                  </div>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Gratis Service</span>
                    <span className="notranslate font-bold text-slate-800">50.000</span>
                    <span>KM</span>
                  </div>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Asuransi All Risk</span>
                    <span className="notranslate font-bold text-slate-800">1</span>
                    <span>Tahun</span>
                  </div>
                </li>
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

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        
        {parts ? (
          <div className="flex items-baseline gap-1 font-semibold text-slate-900">
            {parts[1] && <span>{parts[1]}</span>}
            <span className="notranslate">{parts[2]}</span>
            {parts[3] && <span className={isMetric ? 'notranslate' : ''}>{parts[3].trim()}</span>}
          </div>
        ) : (
          <p className={`font-semibold text-slate-900 truncate ${isMetric ? 'notranslate' : ''}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}