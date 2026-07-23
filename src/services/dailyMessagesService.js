import { dailyMessages as fallbackMessages } from '../data/dailyMessages'
import { readCollection, writeCollection } from './storageService'
import { supabase } from './supabaseClient'
import { storageKeys } from '../utils/storageUtils'

const collectionKey = storageKeys.dailyData

export async function getDailyMessages() {
  if (supabase) {
    const { data, error } = await supabase.from('daily_messages').select('*').order('id')
    if (error) {
      throw error
    }
    return data
  }

  return readCollection(collectionKey, fallbackMessages)
}

export async function saveDailyMessage(message) {
  if (supabase) {
    const payload = message.id ? message : { ...message, id: `daily-${Date.now()}` }
    const { data, error } = await supabase.from('daily_messages').upsert(payload).select().single()
    if (error) {
      throw error
    }
    return data
  }

  const current = readCollection(collectionKey, fallbackMessages)
  const nextItem = message.id ? message : { ...message, id: `daily-${Date.now()}` }
  const next = current.some((item) => item.id === nextItem.id)
    ? current.map((item) => (item.id === nextItem.id ? nextItem : item))
    : [nextItem, ...current]
  writeCollection(collectionKey, next)
  return nextItem
}

export async function deleteDailyMessage(messageId) {
  if (supabase) {
    const { error } = await supabase.from('daily_messages').delete().eq('id', messageId)
    if (error) {
      throw error
    }
    return true
  }

  const current = readCollection(collectionKey, fallbackMessages)
  writeCollection(
    collectionKey,
    current.filter((item) => item.id !== messageId),
  )
  return true
}
