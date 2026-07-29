import { useState } from 'react'

import { readStorage, writeStorage } from '../utils/storageUtils'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  const updateValue = (next) => {
    setValue((current) => {
      const resolved = typeof next === 'function' ? next(current) : next
      writeStorage(key, resolved)
      return resolved
    })
  }

  return [value, updateValue]
}
