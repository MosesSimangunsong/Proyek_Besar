import { useCallback, useEffect, useRef, useState } from 'react'

import { photoboxCopy } from '../data/photoboxCopy'

function normalizeCameraError(error) {
  if (!error) {
    return photoboxCopy.permissionError
  }

  if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
    return photoboxCopy.permissionError
  }

  if (
    error.name === 'NotFoundError'
    || error.name === 'DevicesNotFoundError'
    || error.name === 'NotReadableError'
    || error.name === 'OverconstrainedError'
  ) {
    return photoboxCopy.cameraUnavailable
  }

  return 'Kamera melewatkan momen itu. Coba lagi ya, sayang.'
}

export function usePhotoboxCamera() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const readyCheckFrameRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [cameraError, setCameraError] = useState('')

  const stopCamera = useCallback(() => {
    if (readyCheckFrameRef.current) {
      window.cancelAnimationFrame(readyCheckFrameRef.current)
      readyCheckFrameRef.current = null
    }

    const activeStream = streamRef.current

    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop())
    }

    streamRef.current = null
    setStream(null)
    setIsCameraActive(false)
    setIsVideoReady(false)

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }
  }, [])

  const waitForVideoReady = useCallback(() => new Promise((resolve) => {
    const video = videoRef.current

    if (!video) {
      resolve(false)
      return
    }

    const finish = (ready) => {
      if (readyCheckFrameRef.current) {
        window.cancelAnimationFrame(readyCheckFrameRef.current)
        readyCheckFrameRef.current = null
      }

      setIsVideoReady(ready)
      resolve(ready)
    }

    const checkReady = () => {
      const hasFrame = Boolean(video.videoWidth && video.videoHeight && video.readyState >= 2)

      if (hasFrame) {
        finish(true)
        return
      }

      readyCheckFrameRef.current = window.requestAnimationFrame(checkReady)
    }

    checkReady()

    window.setTimeout(() => {
      const hasFrame = Boolean(video.videoWidth && video.videoHeight && video.readyState >= 2)

      if (!hasFrame) {
        finish(false)
      }
    }, 4000)
  }), [])

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(photoboxCopy.cameraUnavailable)
      return false
    }

    try {
      setCameraError('')

      if (streamRef.current) {
        stopCamera()
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      streamRef.current = mediaStream
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        await videoRef.current.play()
      }

      setIsCameraActive(true)
      setIsVideoReady(false)
      await waitForVideoReady()
      return true
    } catch (error) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      streamRef.current = null
      setStream(null)
      setIsCameraActive(false)
      setIsVideoReady(false)
      setCameraError(normalizeCameraError(error))
      return false
    }
  }, [stopCamera, waitForVideoReady])

  useEffect(() => () => {
    stopCamera()
  }, [stopCamera])

  return {
    videoRef,
    stream,
    isCameraActive,
    isVideoReady,
    cameraError,
    startCamera,
    stopCamera,
    setIsVideoReady,
  }
}
