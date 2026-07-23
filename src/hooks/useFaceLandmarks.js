import { useCallback, useEffect, useRef, useState } from 'react'

const MODEL_ASSET_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'

export function useFaceLandmarks({ enabled, videoRef, getFaceAssets }) {
  const animationFrameRef = useRef(null)
  const faceLandmarkerRef = useRef(null)
  const lastTimestampRef = useRef(0)
  const landmarksRef = useRef([])
  const assetsRef = useRef({})

  const [isModelLoading, setIsModelLoading] = useState(false)
  const [isModelReady, setIsModelReady] = useState(false)
  const [faceTrackingError, setFaceTrackingError] = useState('')
  const [isPerformanceFallback, setIsPerformanceFallback] = useState(false)

  const stopFaceTracking = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    landmarksRef.current = []
    setIsModelReady(false)
  }, [])

  const cleanupModel = useCallback(() => {
    stopFaceTracking()

    if (faceLandmarkerRef.current?.close) {
      faceLandmarkerRef.current.close()
    }

    faceLandmarkerRef.current = null
  }, [stopFaceTracking])

  const startFaceTracking = useCallback(async () => {
    if (!enabled) {
      cleanupModel()
      return
    }

    if (faceLandmarkerRef.current) {
      setIsModelReady(true)
      return
    }

    setIsModelLoading(true)
    setFaceTrackingError('')

    try {
      const vision = await import('@mediapipe/tasks-vision')
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(MODEL_ASSET_URL)
      faceLandmarkerRef.current = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces: 1,
      })

      assetsRef.current = await getFaceAssets()
      setIsModelReady(true)

      const runLoop = () => {
        const video = videoRef.current
        const model = faceLandmarkerRef.current

        if (!enabled || !video || !model || video.readyState < 2) {
          animationFrameRef.current = window.requestAnimationFrame(runLoop)
          return
        }

        const now = performance.now()
        const frameDelta = now - lastTimestampRef.current

        if (frameDelta >= 125) {
          lastTimestampRef.current = now

          try {
            const result = model.detectForVideo(video, now)
            const nextLandmarks = result?.faceLandmarks?.[0] ?? []
            landmarksRef.current = nextLandmarks
            setIsPerformanceFallback(false)
          } catch {
            setFaceTrackingError('This effect is feeling shy on this device. You can try another one, sayang.')
            setIsPerformanceFallback(true)
            landmarksRef.current = []
          }
        }

        animationFrameRef.current = window.requestAnimationFrame(runLoop)
      }

      animationFrameRef.current = window.requestAnimationFrame(runLoop)
    } catch {
      setFaceTrackingError('This effect is feeling shy on this device. You can try another one, sayang.')
      setIsModelReady(false)
      cleanupModel()
    } finally {
      setIsModelLoading(false)
    }
  }, [cleanupModel, enabled, getFaceAssets, videoRef])

  useEffect(() => {
    let timeoutId = 0

    if (enabled) {
      timeoutId = window.setTimeout(() => {
        startFaceTracking()
      }, 0)
    } else {
      timeoutId = window.setTimeout(() => {
        cleanupModel()
        setFaceTrackingError('')
        setIsPerformanceFallback(false)
      }, 0)
    }

    return () => {
      window.clearTimeout(timeoutId)
      cleanupModel()
    }
  }, [cleanupModel, enabled, startFaceTracking])

  useEffect(() => () => {
    cleanupModel()
  }, [cleanupModel])

  return {
    isFaceTrackingEnabled: enabled,
    isModelLoading,
    isModelReady,
    faceTrackingError,
    isPerformanceFallback,
    faceLandmarksRef: landmarksRef,
    faceAssetsRef: assetsRef,
    startFaceTracking,
    stopFaceTracking: cleanupModel,
  }
}
