// src/services/carService.js
import { supabase } from '../config/supabase';

export const carService = {
  async createCar(carData) {
    try {
      if (!carData.name || !carData.price_value) {
        throw new Error("Nama dan harga wajib diisi.");
      }

      const payload = {
        name: carData.name,
        brand: carData.brand,
        category: carData.category,
        price: carData.price,
        price_value: parseInt(carData.price_value.toString().replace(/\D/g, '')),
        horsepower: carData.horsepower,
        engine: carData.engine,
        image_url: carData.image_url,
        description: carData.description,
        is_featured: false,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('cars')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };

    } catch (error) {
      console.error('Error creating car:', error.message);
      return { success: false, message: error.message };
    }
  },

  async updateCar(id, carData) {
    try {
      if (!id) throw new Error("ID mobil tidak ditemukan.");

      const payload = {
        name: carData.name,
        brand: carData.brand,
        category: carData.category,
        price: carData.price,
        price_value: parseInt(carData.price_value.toString().replace(/\D/g, '')),
        horsepower: carData.horsepower,
        engine: carData.engine,
        image_url: carData.image_url,
        description: carData.description
      };

      const { data, error } = await supabase
        .from('cars')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };

    } catch (error) {
      console.error('Error updating car:', error.message);
      return { success: false, message: error.message };
    }
  },

  async deleteCar(id) {
    try {
      if (!id) throw new Error("ID tidak valid");

      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };

    } catch (error) {
      console.error('Error deleting car:', error.message);
      return { success: false, message: error.message };
    }
  }
};