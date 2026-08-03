import { useEffect, useState } from 'react'

// Port dari loading screen source asli: spinner tampil sebentar saat scene dibuka,
// lalu fade out (mengikuti $(window).load -> loading fadeOut di effect.js).
export default function LoadingIntro() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 900)
    const removeTimer = setTimeout(() => setVisible(false), 1500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div aria-hidden="true" className={`hb-loading-wrap ${fading ? 'hb-loading-wrap--hide' : ''}`}>
      <div className="hb-loading" />
    </div>
  )
}
