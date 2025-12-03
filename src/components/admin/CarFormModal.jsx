// src/components/admin/CarFormModal.jsx
import { useState, useEffect } from 'react';
import { X, Save, Loader2, UploadCloud } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

export default function CarFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Hyundai',
    category: 'Electric',
    price: '',
    price_value: '',
    horsepower: '',
    engine: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          brand: 'Hyundai',
          category: 'Electric',
          price: '', 
          price_value: '',
          horsepower: '',
          engine: '',
          image_url: '',
          description: ''
        });
      }
    }
  }, [initialData, isOpen]);

  const handlePriceValueChange = (e) => {
    const val = e.target.value;
    let displayPrice = '';
    if (val) {
      const num = parseInt(val);
      displayPrice = `Rp ${num.toLocaleString('id-ID')}`;
    }
    
    setFormData(prev => ({ ...prev, price_value: val, price: displayPrice }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  const renderPreviewPrice = (numericVal) => {
    if (!numericVal) return <span className="text-xs text-blue-600 font-medium">-</span>;
    
    const { value, unit } = formatCurrency(numericVal);

    return (
      <div className="flex items-baseline gap-1 text-xs text-blue-600 font-bold">
        <span className="notranslate">Rp</span>
        <span className="notranslate">{value}</span>
        <span>{unit}</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="carForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Model</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Merek</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                  >
                    {['Hyundai', 'Wuling', 'Toyota', 'Lexus', 'BMW', 'Tesla', 'MG', 'Kia', 'BYD', 'Honda', 'Nissan', 'Mazda', 'Volvo', 'Ferrari', 'Porsche', 'Citroen', 'Suzuki', 'Mini', 'Neta', 'Chery', 'Mitsubishi'].map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                    {['Electric', 'Hybrid'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.category === cat 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Harga (Angka Penuh)</label>
                  <input
                    required
                    type="number"
                    placeholder="850000000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.price_value}
                    onChange={handlePriceValueChange}
                  />
                  <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-xs text-blue-600 font-medium">Preview Tampilan:</span>
                    {renderPreviewPrice(formData.price_value)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tenaga (HP)</label>
                    <input
                      required
                      type="text"
                      placeholder="217 HP"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.horsepower}
                      onChange={e => setFormData({...formData, horsepower: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mesin/Baterai</label>
                    <input
                      required
                      type="text"
                      placeholder="72.6 kWh"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.engine}
                      onChange={e => setFormData({...formData, engine: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">URL Gambar</label>
              <div className="flex gap-2">
                <input
                  required
                  type="url"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                />
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden border border-slate-200">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Lengkap</label>
              <textarea
                required
                rows="3"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

          </form>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button
            form="carForm"
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {initialData ? 'Simpan Perubahan' : 'Tambah Mobil'}
          </button>
        </div>
      </div>
    </div>
  );
}