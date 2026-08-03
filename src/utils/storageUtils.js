export const storageKeys = {
  role: 'ines-love-site:role',
  unlock: 'ines-love-site:unlock',
  admin: 'ines-love-site:admin',
  music: 'ines-love-site:music',
  photosData: 'ines-love-site:photos-data',
  musicData: 'ines-love-site:music-data',
  galleryVisibility: 'ines-love-site:gallery-visible-ids',
  surpriseStep: 'ines-love-site:surprise-step',
}

export function readStorage(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage(key) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(key)
}

export function readSessionStorage(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const stored = window.sessionStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function writeSessionStorage(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(key, JSON.stringify(value))
}
