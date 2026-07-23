import { readStorage, writeStorage } from '../utils/storageUtils'

export function readCollection(key, fallback) {
  return readStorage(key, fallback)
}

export function writeCollection(key, items) {
  writeStorage(key, items)
  return items
}
