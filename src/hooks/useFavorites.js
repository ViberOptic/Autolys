import { useState, useEffect, useCallback } from 'react';
import favoriteService from '../services/favoriteService';

export function useIsFavorited(carId) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!carId) {
        setLoading(false);
        return;
    }
    
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

    const previousState = isFavorited;
    setIsFavorited(!previousState);

    const result = await favoriteService.toggleFavorite(parseInt(carId));

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
    const { success, data } = await favoriteService.getFavorites();
    setFavorites(success ? data || [] : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, refetch: fetchFavorites };
}