import { useCallback, useEffect, useRef, useState } from 'react'

import { getMusicTracks } from '../services/musicService'
import { readStorage, storageKeys, writeStorage } from '../utils/storageUtils'

export function useMusicPlayer() {
  const audioRef = useRef(null)
  const retryListenersBoundRef = useRef(false)
  const [track, setTrack] = useState(null)
  const [shouldPlay, setShouldPlay] = useState(() => readStorage(storageKeys.music, true))
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState('')

  const tryPlay = useCallback(async () => {
    if (!audioRef.current) {
      return false
    }

    try {
      await audioRef.current.play()
      setError('')
      return true
    } catch {
      setIsPlaying(false)
      setError('')
      return false
    }
  }, [])

  useEffect(() => {
    let disposed = false

    const setupTrack = async () => {
      const tracks = await getMusicTracks()
      const activeTrack =
        tracks.find((item) => item.is_active || item.isDefault) ??
        tracks[0] ??
        null

      if (disposed) {
        return
      }

      setTrack(activeTrack)

      if (!activeTrack) {
        return
      }

      const audio = new Audio(activeTrack.audio_url || activeTrack.src)
      audio.loop = true
      audio.volume = 0.35
      audio.addEventListener('play', () => setIsPlaying(true))
      audio.addEventListener('pause', () => setIsPlaying(false))
      audioRef.current = audio
    }

    setupTrack()

    return () => {
      disposed = true
      retryListenersBoundRef.current = false
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    writeStorage(storageKeys.music, shouldPlay)
  }, [shouldPlay])

  useEffect(() => {
    if (!audioRef.current) {
      return undefined
    }

    if (!shouldPlay) {
      audioRef.current.pause()
      return undefined
    }

    if (!isPlaying) {
      void audioRef.current.play().catch(() => {})
    }
  }, [isPlaying, shouldPlay, track])

  useEffect(() => {
    if (!shouldPlay || isPlaying || retryListenersBoundRef.current) {
      return undefined
    }

    const retryPlayback = async () => {
      const started = await tryPlay()
      if (started) {
        window.removeEventListener('pointerdown', retryPlayback)
        window.removeEventListener('keydown', retryPlayback)
        retryListenersBoundRef.current = false
      }
    }

    retryListenersBoundRef.current = true
    window.addEventListener('pointerdown', retryPlayback, { passive: true })
    window.addEventListener('keydown', retryPlayback)

    return () => {
      window.removeEventListener('pointerdown', retryPlayback)
      window.removeEventListener('keydown', retryPlayback)
      retryListenersBoundRef.current = false
    }
  }, [isPlaying, shouldPlay, track, tryPlay])

  const togglePlayback = async () => {
    if (!audioRef.current) {
      setError('No track ready yet.')
      return
    }

    try {
      if (shouldPlay) {
        setShouldPlay(false)
        audioRef.current.pause()
      } else {
        setShouldPlay(true)
        await tryPlay()
      }
      setError('')
    } catch {
      setShouldPlay(true)
      setError('Tap once more to play our little song.')
    }
  }

  return {
    track,
    isPlaying,
    error,
    togglePlayback,
  }
}
