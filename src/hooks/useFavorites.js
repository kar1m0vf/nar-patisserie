import { useCallback, useEffect, useMemo, useState } from 'react';

const FAVORITES_KEY = 'narPatisserieFavorites';

function readFavoriteIds() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (!Array.isArray(parsedFavorites)) return [];

    return parsedFavorites
      .map(Number)
      .filter(Number.isFinite);
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favoritesSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback(productId => {
    const id = Number(productId);
    if (!Number.isFinite(id)) return;

    setFavoriteIds(currentIds => (
      currentIds.includes(id)
        ? currentIds.filter(currentId => currentId !== id)
        : [...currentIds, id]
    ));
  }, []);

  return {
    favoriteIds,
    favoritesSet,
    favoriteCount: favoriteIds.length,
    toggleFavorite
  };
}
