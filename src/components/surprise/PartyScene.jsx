import { useEffect, useState } from 'react'

import BalloonLetters from './BalloonLetters'
import BannerBunting from './BannerBunting'
import BulbGarland from './BulbGarland'

// Backdrop pesta hasil port birthday-master: latar hitam -> peach (5s, port
// #turn_on) -> siklus peach_alive, plus garland bulb, banner, dan balon huruf.
export default function PartyScene({ bannerVariant, bannerLabel, lineUp }) {
  const [phase, setPhase] = useState('dark')

  useEffect(() => {
    const toPeach = setTimeout(() => setPhase('peach'), 80)
    const toAlive = setTimeout(() => setPhase('alive'), 5080)
    return () => {
      clearTimeout(toPeach)
      clearTimeout(toAlive)
    }
  }, [])

  const sceneClass = [
    'hb-scene',
    phase !== 'dark' ? 'hb-scene--peach' : '',
    phase === 'alive' ? 'hb-scene--alive' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={sceneClass}>
      <BulbGarland />
      <BannerBunting variant={bannerVariant} label={bannerLabel} />
      <BalloonLetters lineUp={lineUp} />
    </div>
  )
}
