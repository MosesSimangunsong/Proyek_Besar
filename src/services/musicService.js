import { musicTracks as fallbackTracks } from '../data/musicTracks'
import { readCollection, writeCollection } from './storageService'
import { supabase } from './supabaseClient'
import { storageKeys } from '../utils/storageUtils'

const collectionKey = storageKeys.musicData

export async function getMusicTracks() {
  if (supabase) {
    const { data, error } = await supabase.from('music_tracks').select('*').order('id')
    if (error) {
      throw error
    }
    return data
  }

  return readCollection(collectionKey, fallbackTracks)
}

export async function saveMusicTrack(track) {
  if (supabase) {
    const payload = track.id ? track : { ...track, id: `music-${Date.now()}` }
    const { data, error } = await supabase.from('music_tracks').upsert(payload).select().single()
    if (error) {
      throw error
    }
    return data
  }

  const current = readCollection(collectionKey, fallbackTracks)
  const nextItem = track.id ? track : { ...track, id: `music-${Date.now()}` }
  let next = current.some((item) => item.id === nextItem.id)
    ? current.map((item) => (item.id === nextItem.id ? nextItem : item))
    : [nextItem, ...current]

  if (nextItem.is_active) {
    next = next.map((item) => ({ ...item, is_active: item.id === nextItem.id }))
  }

  writeCollection(collectionKey, next)
  return nextItem
}

export async function setActiveMusic(trackId) {
  const tracks = await getMusicTracks()
  const next = tracks.map((item) => ({
    ...item,
    is_active: item.id === trackId,
    isDefault: item.id === trackId,
  }))

  if (supabase) {
    for (const item of next) {
      const { error } = await supabase
        .from('music_tracks')
        .update({ is_active: item.is_active })
        .eq('id', item.id)
      if (error) {
        throw error
      }
    }
    return true
  }

  writeCollection(collectionKey, next)
  return true
}

export async function deleteMusicTrack(trackId) {
  if (supabase) {
    const { error } = await supabase.from('music_tracks').delete().eq('id', trackId)
    if (error) {
      throw error
    }
    return true
  }

  const current = readCollection(collectionKey, fallbackTracks)
  writeCollection(
    collectionKey,
    current.filter((item) => item.id !== trackId),
  )
  return true
}
