import { readStorage, storageKeys, writeStorage } from '../utils/storageUtils'

export function useLocalHistory() {
  const getHistory = () => readStorage(storageKeys.history, [])

  const addHistoryItem = ({ letterId, mood }) => {
    const next = [
      {
        id: `history-${Date.now()}`,
        letterId,
        mood,
        openedAt: new Date().toISOString(),
      },
      ...getHistory().filter((item) => item.letterId !== letterId),
    ].slice(0, 20)

    writeStorage(storageKeys.history, next)
    return next
  }

  return {
    getHistory,
    addHistoryItem,
  }
}
