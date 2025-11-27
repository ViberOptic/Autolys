// src/hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';
import favoriteService from '../services/favoriteService';
// Hapus import getUserIdentifier karena tidak dipakai lagi

export function useIsFavorited(carId) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!carId) {
        setLoading(false);
        return;
    }
    
    // Tidak perlu kirim userId
    const { success, data } = await favoriteService.getFavorites();
    
    if (success && Array.isArray(data)) {
      setIsFavorited(data.includes(parseInt(carId)));
    }
    setLoading(false);
  }, [carId]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const toggleFavorite = async () => {
    if (!carId) return;

    // Optimistic Update
    const previousState = isFavorited;
    setIsFavorited(!previousState);

    // Cukup kirim car_id saja
    const result = await favoriteService.toggleFavorite({
      car_id: parseInt(carId)
    });

    if (!result.success) {
      setIsFavorited(previousState);
      console.error('Gagal update favorit:', result.message);
    }
    
    return result.success;
  };

  return { isFavorited, loading, toggleFavorite };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    // Tidak perlu kirim userId
    const { success, data } = await favoriteService.getFavorites();
    
    if (success) {
      setFavorites(data || []);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, refetch: fetchFavorites };
}