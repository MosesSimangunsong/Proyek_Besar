import { supabase } from './supabaseClient'
import { readStorage, storageKeys, writeStorage } from '../utils/storageUtils'

export async function saveReply(payload) {
  if (supabase) {
    const { data, error } = await supabase.from('replies').insert(payload).select().single()

    if (error) {
      throw error
    }

    return data
  }

  const nextItem = {
    id: `reply-${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString(),
  }

  const nextReplies = [nextItem, ...readStorage(storageKeys.replies, [])]
  writeStorage(storageKeys.replies, nextReplies)
  return nextItem
}

export async function getReplies() {
  if (supabase) {
    const { data, error } = await supabase
      .from('replies')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }

  return readStorage(storageKeys.replies, [])
}
