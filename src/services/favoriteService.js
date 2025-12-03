// src/services/favoriteService.js
import { supabase } from '../config/supabase';

const favoriteService = {
  async getFavorites() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { success: true, data: [] };
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('car_id')
        .eq('user_identifier', session.user.id);
      
      if (error) throw error;
      
      return { success: true, data: data.map(f => f.car_id) };
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return { success: false, message: error.message };
    }
  },

  async toggleFavorite(carId) {
    if (!carId) return { success: false, message: "Invalid Car ID" };

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        return { success: false, message: "Silakan login untuk menyimpan favorit." };
      }

      const userId = session.user.id;

      const { data: existing, error: fetchError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_identifier', userId)
        .eq('car_id', carId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);
          
        if (deleteError) throw deleteError;
        return { success: true, action: 'removed' };
      } else {
        const { error: insertError } = await supabase
          .from('favorites')
          .insert([{ user_identifier: userId, car_id: carId }]);
          
        if (insertError) throw insertError;
        return { success: true, action: 'added' };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      return { success: false, message: error.message };
    }
  }
};

export default favoriteService;