import { useState } from 'react'

import { readSessionStorage, writeSessionStorage } from '../utils/storageUtils'

export function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => readSessionStorage(key, initialValue))

  const updateValue = (next) => {
    setValue((current) => {
      const resolved = typeof next === 'function' ? next(current) : next
      writeSessionStorage(key, resolved)
      return resolved
    })
  }

  return [value, updateValue]
}
