import { readStorage, storageKeys, writeStorage } from '../utils/storageUtils'

export function getFavorites() {
  return readStorage(storageKeys.favorites, [])
}

export function isFavoriteItem(itemId) {
  return getFavorites().some((item) => item.itemId === itemId)
}

export function toggleFavorite(payload) {
  const favorites = getFavorites()
  const exists = favorites.some((item) => item.itemId === payload.itemId)

  const nextFavorites = exists
    ? favorites.filter((item) => item.itemId !== payload.itemId)
    : [
        {
          id: `fav-${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...payload,
        },
        ...favorites,
      ]

  writeStorage(storageKeys.favorites, nextFavorites)
  return {
    favorites: nextFavorites,
    isFavorite: !exists,
  }
}
