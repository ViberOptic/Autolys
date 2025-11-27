import { supabase } from '../config/supabase';

class FavoriteService {
  // Helper untuk mendapatkan user saat ini
  async _getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getFavorites() {
    try {
      const user = await this._getCurrentUser();
      
      // Jika user belum login, kembalikan array kosong (atau bisa throw error untuk redirect)
      if (!user) return { success: true, data: [] };

      const { data, error } = await supabase
        .from('favorites')
        .select('car_id')
        .eq('user_identifier', user.id); // Gunakan ID user asli
      
      if (error) throw error;
      return { success: true, data: data.map(f => f.car_id) };
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return { success: false, message: error.message };
    }
  }

  async toggleFavorite(data) {
    const { car_id } = data;
    if (!car_id) return { success: false, message: "Invalid data" };

    try {
      const user = await this._getCurrentUser();
      if (!user) return { success: false, message: "Silakan login untuk menyimpan favorit." };

      // Cek data untuk user ini
      const { data: existing, error: fetchError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_identifier', user.id)
        .eq('car_id', car_id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
        // Hapus
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);
          
        if (deleteError) throw deleteError;
        return { success: true, action: 'removed' };
      } else {
        // Tambah
        const { error: insertError } = await supabase
          .from('favorites')
          .insert([{ 
            user_identifier: user.id, // Simpan ID user asli
            car_id: car_id 
          }]);
          
        if (insertError) throw insertError;
        return { success: true, action: 'added' };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      return { success: false, message: error.message };
    }
  }
}

export default new FavoriteService();