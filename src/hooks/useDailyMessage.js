import { useEffect, useState } from 'react'

import { getDailyMessages } from '../services/dailyMessagesService'
import { getDateSeedNumber, getTodaySeed } from '../utils/dateUtils'
import { pickBySeed } from '../utils/randomUtils'

export function useDailyMessage() {
  const [state, setState] = useState({
    message: null,
    seed: getTodaySeed(),
  })

  useEffect(() => {
    const seed = getTodaySeed()

    const load = async () => {
      const messages = await getDailyMessages()
      const activeMessages = messages.filter((item) => item.is_active !== false)
      setState({
        seed,
        message: pickBySeed(activeMessages, getDateSeedNumber(seed)),
      })
    }

    load()
  }, [])

  return state
}
