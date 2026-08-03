import { useEffect, useRef, useState } from 'react'

import { appCopy } from '../../data/appCopy'

// Port tombol "Play Music" source asli — gesture-based (bukan autoplay,
// browser modern memblokirnya), pola audio ref sama seperti useMusicPlayer.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio('/audio/hbd.mp3')
    audio.loop = true
    audio.volume = 0.5
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      void audioRef.current.play().catch(() => {})
    }
  }

  return (
    <button type="button" className="hb-btn" onClick={toggle}>
      {isPlaying ? appCopy.surprise.musicPauseLabel : appCopy.surprise.musicPlayLabel}
    </button>
  )
}
