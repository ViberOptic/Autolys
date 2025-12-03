// src/components/common/CarFilter.jsx
import { Filter, X } from 'lucide-react';

export default function CarFilter({ filters, setFilters, onReset }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const brands = [
    "BMW", "BYD", "Chery", "Citroen", "Ferrari", 
    "Honda", "Hyundai", "Kia", "Lexus", "Mazda", 
    "MG", "Mini", "Mitsubishi", "Neta", "Nissan", 
    "Porsche", "Suzuki", "Tesla", "Toyota", "Volvo", "Wuling"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          Filter Autolys
        </h3>
        <button 
          onClick={onReset}
          className="text-xs text-red-500 font-medium hover:text-red-600 flex items-center gap-1"
        >
          <X className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Merek</label>
          <select
            value={filters.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Semua Merek</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Tipe Penggerak</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Semua Tipe</option>
            <option value="Electric">⚡ Listrik Murni (BEV)</option>
            <option value="Hybrid">⛽ Hybrid (HEV/PHEV)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Rentang Harga</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Semua Harga</option>
            <option value="under_500">Di bawah 500 Juta</option>
            <option value="500_1000">500 Juta - 1 Miliar</option>
            <option value="above_1000">Di atas 1 Miliar</option>
          </select>
        </div>
      </div>
    </div>
  );
}