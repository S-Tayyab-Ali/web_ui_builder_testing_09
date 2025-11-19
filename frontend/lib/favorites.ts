"use client";

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(wallpaperId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(wallpaperId)) {
    favorites.push(wallpaperId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(wallpaperId: string): void {
  const favorites = getFavorites();
  const filtered = favorites.filter((id) => id !== wallpaperId);
  localStorage.setItem('favorites', JSON.stringify(filtered));
}

export function isFavorite(wallpaperId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(wallpaperId);
}
