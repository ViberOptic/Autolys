// src/pages/ManageCarsPage.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { carService } from '../services/carService';
import CarFormModal from '../components/admin/CarFormModal';
import { Plus, Edit2, Trash2, Search, Settings, AlertCircle, Loader2 } from 'lucide-react';

export default function ManageCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setCars(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (editingCar) {
      result = await carService.updateCar(editingCar.id, formData);
    } else {
      result = await carService.createCar(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      fetchCars();
    } else {
      alert('Error: ' + result.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus data mobil ini permanen?')) {
      const result = await carService.deleteCar(id);
      if (result.success) {
        setCars(prev => prev.filter(c => c.id !== id));
      } else {
        alert('Gagal menghapus: ' + result.message);
      }
    }
  };

  // Helper render harga pintar untuk list
  const renderPrice = (priceStr) => {
    if (!priceStr) return null;
    const parts = priceStr.match(/^(\D*)(\d[\d\.,]*)(\D*)$/);
    if (!parts) return <span className="text-blue-700 font-bold text-sm notranslate">{priceStr}</span>;
    
    return (
      <div className="flex items-baseline gap-1 text-blue-700 font-bold text-sm">
        {parts[1] && <span>{parts[1]}</span>}
        <span className="notranslate">{parts[2]}</span>
        {parts[3] && <span>{parts[3].trim()}</span>}
      </div>
    );
  };

  return (
    <div className="pt-8 px-4 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-slate-700" />
              Kelola Katalog
            </h1>
            <p className="text-slate-500 mt-1">Tambah, edit, atau hapus data kendaraan.</p>
          </div>
          
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Unit</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 sticky top-20 z-30">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari mobil..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
            <p className="mt-4 text-slate-500">Memuat data...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Data tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all relative">
                
                <div className="relative h-48">
                  <img 
                    src={car.image_url} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleOpenEdit(car)}
                      className="p-3 bg-white text-blue-600 rounded-full hover:scale-110 active:scale-95 transition-transform shadow-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="p-3 bg-white text-red-500 rounded-full hover:scale-110 active:scale-95 transition-transform shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-black/50 text-white backdrop-blur-sm">
                      {car.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-slate-800 truncate">{car.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{car.brand}</p>
                  {/* Render Harga Pintar */}
                  {renderPrice(car.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CarFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCar}
      />
    </div>
  );
}