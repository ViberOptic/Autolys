// src/services/favoriteService.js
import { supabase } from '../config/supabase';

// Kita buat satu kunci global untuk semua pengguna
const GLOBAL_SHARED_KEY = 'global_public_shared_v1';

class FavoriteService {
  // Hapus parameter userIdentifier, kita pakai GLOBAL_SHARED_KEY
  async getFavorites() {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('car_id')
        .eq('user_identifier', GLOBAL_SHARED_KEY);
      
      if (error) throw error;
      return { success: true, data: data.map(f => f.car_id) };
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return { success: false, message: error.message };
    }
  }

  // Hapus parameter user_identifier dari input
  async toggleFavorite(data) {
    const { car_id } = data; // Kita cuma butuh car_id sekarang
    
    if (!car_id) return { success: false, message: "Invalid data" };

    try {
      // Cek apakah data sudah ada untuk GLOBAL KEY
      const { data: existing, error: fetchError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_identifier', GLOBAL_SHARED_KEY)
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
        // Tambah dengan GLOBAL KEY
        const { error: insertError } = await supabase
          .from('favorites')
          .insert([{ 
            user_identifier: GLOBAL_SHARED_KEY, 
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