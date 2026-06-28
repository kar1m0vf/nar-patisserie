import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'narPatisserieFavorites';

function readFavoriteIds() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function toggleFavorite(productId) {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds(favoriteIds.filter(id => id !== productId));
    } else {
      setFavoriteIds([...favoriteIds, productId]);
    }
  }

  return {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    toggleFavorite
  };
}
