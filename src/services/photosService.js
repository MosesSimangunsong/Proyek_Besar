import { galleryPhotos as fallbackPhotos } from '../data/galleryPhotos'
import { readCollection, writeCollection } from './storageService'
import { supabase } from './supabaseClient'
import { storageKeys } from '../utils/storageUtils'

const collectionKey = storageKeys.photosData

export async function getPhotos() {
  if (supabase) {
    const { data, error } = await supabase.from('gallery_photos').select('*').order('id')
    if (error) {
      throw error
    }
    return data
  }

  return readCollection(collectionKey, fallbackPhotos)
}

export async function savePhoto(photo) {
  if (supabase) {
    const payload = photo.id ? photo : { ...photo, id: `photo-${Date.now()}` }
    const { data, error } = await supabase.from('gallery_photos').upsert(payload).select().single()
    if (error) {
      throw error
    }
    return data
  }

  const current = readCollection(collectionKey, fallbackPhotos)
  const nextItem = photo.id ? photo : { ...photo, id: `photo-${Date.now()}` }
  const next = current.some((item) => item.id === nextItem.id)
    ? current.map((item) => (item.id === nextItem.id ? nextItem : item))
    : [nextItem, ...current]
  writeCollection(collectionKey, next)
  return nextItem
}

export async function deletePhoto(photoId) {
  if (supabase) {
    const { error } = await supabase.from('gallery_photos').delete().eq('id', photoId)
    if (error) {
      throw error
    }
    return true
  }

  const current = readCollection(collectionKey, fallbackPhotos)
  writeCollection(
    collectionKey,
    current.filter((item) => item.id !== photoId),
  )
  return true
}
