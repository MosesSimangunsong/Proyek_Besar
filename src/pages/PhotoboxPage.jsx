import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import ConfirmDialog from '../components/common/ConfirmDialog'
import CameraCanvasPreview from '../components/photobox/CameraCanvasPreview'
import CameraErrorState from '../components/photobox/CameraErrorState'
import EffectPicker from '../components/photobox/EffectPicker'
import FaceTrackingStatus from '../components/photobox/FaceTrackingStatus'
import PhotoboxControls from '../components/photobox/PhotoboxControls'
import PhotoboxResult from '../components/photobox/PhotoboxResult'
import PhotoStripPreview from '../components/photobox/PhotoStripPreview'
import PrivacyNote from '../components/photobox/PrivacyNote'
import RetakeControls from '../components/photobox/RetakeControls'
import ThemePicker from '../components/photobox/ThemePicker'
import { photoboxCopy } from '../data/photoboxCopy'
import { photoboxEffects } from '../data/photoboxEffects'
import { photoboxLayouts } from '../data/photoboxLayouts'
import { photoboxThemes } from '../data/photoboxThemes'
import { useFaceLandmarks } from '../hooks/useFaceLandmarks'
import { usePhotoboxAssets } from '../hooks/usePhotoboxAssets'
import { usePhotoboxCamera } from '../hooks/usePhotoboxCamera'
import { usePhotoboxCapture } from '../hooks/usePhotoboxCapture'
import { usePhotoboxEffects } from '../hooks/usePhotoboxEffects'
import { applyMirroredVideoDraw } from '../utils/photoboxCanvasUtils'
import { downloadBlob, downloadDataUrl } from '../utils/photoboxDownloadUtils'
import { applyEffectToCanvas } from '../utils/photoboxEffectRenderer'
import { generatePhotoboxFinalImage } from '../utils/photoboxThemeRenderer'

const COUNTDOWN_SECONDS = 5

function revokePhotoUrls(photos) {
  photos.forEach((photo) => {
    if (photo.previewUrl && photo.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(photo.previewUrl)
    }
  })
}

export default function PhotoboxPage() {
  const outletContext = useOutletContext()
  const {
    videoRef,
    isCameraActive,
    isVideoReady,
    setIsVideoReady,
    cameraError,
    startCamera,
    stopCamera,
  } = usePhotoboxCamera()
  const previewCanvasRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const countdownTimeoutRef = useRef(null)
  const countdownResolveRef = useRef(null)
  const finalImageUrlRef = useRef(null)
  const capturedPhotosRef = useRef([])

  const [selectedLayout, setSelectedLayout] = useState(photoboxLayouts[0])
  const [selectedTheme, setSelectedTheme] = useState(photoboxThemes[0])
  const [selectedEffect, setSelectedEffect] = useState(photoboxEffects[0])
  const [lockedLayout, setLockedLayout] = useState(null)
  const [lockedTheme, setLockedTheme] = useState(null)
  const [lockedEffect, setLockedEffect] = useState(null)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [currentCaptureIndex, setCurrentCaptureIndex] = useState(0)
  const [retakeIndex, setRetakeIndex] = useState(null)
  const [finalImageUrl, setFinalImageUrl] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uiError, setUiError] = useState('')
  const [showRetakeAllConfirm, setShowRetakeAllConfirm] = useState(false)

  const { activeEffect, requiresFaceTracking } = usePhotoboxEffects(selectedEffect)
  const { captureFrame } = usePhotoboxCapture()
  const {
    getFaceAssets,
    assetError,
  } = usePhotoboxAssets()
  const {
    isModelLoading,
    isModelReady,
    faceTrackingError,
    isPerformanceFallback,
    faceLandmarksRef,
    faceAssetsRef,
  } = useFaceLandmarks({
    enabled: requiresFaceTracking,
    videoRef,
    getFaceAssets,
  })

  const activeLayout = lockedLayout ?? selectedLayout
  const activeTheme = lockedTheme ?? selectedTheme
  const effectForCapture = lockedEffect ?? activeEffect
  const totalPhotos = activeLayout.photoCount
  const hasAllPhotos = capturedPhotos.length === totalPhotos
  const canStartCapture = isCameraActive && isVideoReady && !isCapturing && Boolean(selectedLayout && selectedTheme && activeEffect)
  const canDownload = hasAllPhotos && !isCapturing

  const clearCountdownTimers = useCallback((shouldResolve = false) => {
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }

    if (countdownTimeoutRef.current) {
      window.clearTimeout(countdownTimeoutRef.current)
      countdownTimeoutRef.current = null
    }

    if (shouldResolve && countdownResolveRef.current) {
      countdownResolveRef.current(false)
      countdownResolveRef.current = null
    }

    setCountdown(null)
  }, [])

  const clearFinalImageUrl = useCallback(() => {
    if (finalImageUrlRef.current?.startsWith('blob:')) {
      URL.revokeObjectURL(finalImageUrlRef.current)
    }

    finalImageUrlRef.current = null
    setFinalImageUrl(null)
  }, [])

  useEffect(() => {
    capturedPhotosRef.current = capturedPhotos
  }, [capturedPhotos])

  useEffect(() => () => {
    clearCountdownTimers(true)
    revokePhotoUrls(capturedPhotosRef.current)
    clearFinalImageUrl()
    stopCamera()
  }, [clearCountdownTimers, clearFinalImageUrl, stopCamera])

  const runCountdown = useCallback((seconds = COUNTDOWN_SECONDS) => new Promise((resolve) => {
    clearCountdownTimers()
    countdownResolveRef.current = resolve

    let value = seconds
    setCountdown(value)

    countdownIntervalRef.current = window.setInterval(() => {
      value -= 1

      if (value <= 0) {
        if (countdownIntervalRef.current) {
          window.clearInterval(countdownIntervalRef.current)
          countdownIntervalRef.current = null
        }

        setCountdown('Senyum, sayang!')
        countdownTimeoutRef.current = window.setTimeout(() => {
          countdownTimeoutRef.current = null
          setCountdown(null)

          if (countdownResolveRef.current) {
            countdownResolveRef.current(true)
            countdownResolveRef.current = null
          }
        }, 350)

        return
      }

      setCountdown(value)
    }, 1000)
  }), [clearCountdownTimers])

  const ensureCameraReady = useCallback(async () => {
    setUiError('')

    if (isCameraActive && isVideoReady) {
      return true
    }

    const started = await startCamera()

    if (!started) {
      outletContext?.showToast(photoboxCopy.permissionError, 'error')
      return false
    }

    return true
  }, [isCameraActive, isVideoReady, outletContext, startCamera])

  const renderPreviewFrame = useCallback(() => {
    const video = videoRef.current
    const canvas = previewCanvasRef.current

    if (!video || !canvas || video.readyState < 2) {
      if (video?.videoWidth && video?.videoHeight && video.readyState >= 2 && !isVideoReady) {
        setIsVideoReady(true)
      }
      return
    }

    const width = video.videoWidth || 720
    const height = video.videoHeight || 960

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    if (!isVideoReady) {
      setIsVideoReady(true)
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, width, height)
    ctx.imageSmoothingQuality = 'high'
    ctx.filter = activeEffect?.canvasFilter || 'none'
    applyMirroredVideoDraw(ctx, video, width, height, true)
    ctx.filter = 'none'

    applyEffectToCanvas(ctx, {
      effect: activeEffect,
      width,
      height,
      faceTracking: {
        landmarks: faceLandmarksRef.current,
        assets: faceAssetsRef.current,
      },
    })
  }, [activeEffect, faceAssetsRef, faceLandmarksRef, isVideoReady, setIsVideoReady, videoRef])

  const createCaptureRecord = useCallback(async (index, layout, theme, effect) => {
    const photo = await captureFrame({
      video: videoRef.current,
      effect,
      layout,
      theme,
      faceTracking: {
        landmarks: faceLandmarksRef.current,
        assets: faceAssetsRef.current,
      },
    })

    return {
      ...photo,
      index,
      id: `photo-${index + 1}-${Date.now()}`,
    }
  }, [captureFrame, faceAssetsRef, faceLandmarksRef, videoRef])

  const handleStartCamera = useCallback(async () => {
    const started = await startCamera()

    if (started) {
      setUiError('')
      outletContext?.showToast('Kamera sudah siap untuk Photobox kecil kita.', 'success')
    } else {
      outletContext?.showToast(cameraError || photoboxCopy.permissionError, 'error')
    }
  }, [cameraError, outletContext, startCamera])

  const resetSessionImages = useCallback(() => {
    revokePhotoUrls(capturedPhotos)
    setCapturedPhotos([])
    clearFinalImageUrl()
  }, [capturedPhotos, clearFinalImageUrl])

  const handleSelectLayout = useCallback((layout) => {
    setSelectedLayout(layout)

    if (!selectedTheme.supportedLayouts.includes(layout.id)) {
      const fallbackTheme = photoboxThemes.find((theme) => theme.supportedLayouts.includes(layout.id))

      if (fallbackTheme) {
        setSelectedTheme(fallbackTheme)
      }
    }
  }, [selectedTheme])

  const handleStartPhotobox = useCallback(async () => {
    const canProceed = await ensureCameraReady()

    if (!canProceed) {
      return
    }

    const layout = selectedLayout
    const theme = selectedTheme
    const effect = activeEffect

    setLockedLayout(layout)
    setLockedTheme(theme)
    setLockedEffect(effect)
    setIsCapturing(true)
    setRetakeIndex(null)
    setCurrentCaptureIndex(0)
    setUiError('')
    resetSessionImages()

    try {
      const nextPhotos = []

      for (let index = 0; index < layout.photoCount; index += 1) {
        setCurrentCaptureIndex(index)
        const countdownFinished = await runCountdown(COUNTDOWN_SECONDS)

        if (!countdownFinished) {
          throw new Error('Countdown cancelled.')
        }

        const photo = await createCaptureRecord(index, layout, theme, effect)
        nextPhotos.push(photo)
        setCapturedPhotos([...nextPhotos])
      }

      if (effect.requiresFaceTracking && !nextPhotos.some((photo) => photo.faceApplied)) {
        setUiError(photoboxCopy.faceFallback)
      }

      outletContext?.showToast(`${layout.photoCount} kenangan kecil kita sudah siap.`, 'success')
    } catch (error) {
      if (error.message !== 'Countdown cancelled.') {
        setUiError('Kamera melewatkan momen itu. Yuk, coba lagi, sayang.')
        outletContext?.showToast('Kamera melewatkan momen itu. Yuk, coba lagi, sayang.', 'error')
      }
    } finally {
      clearCountdownTimers()
      setIsCapturing(false)
      setCurrentCaptureIndex(0)
      setRetakeIndex(null)
    }
  }, [activeEffect, clearCountdownTimers, createCaptureRecord, ensureCameraReady, outletContext, resetSessionImages, runCountdown, selectedLayout, selectedTheme])

  const handleRetakePhoto = useCallback(async (index) => {
    const canProceed = await ensureCameraReady()

    if (!canProceed || !lockedLayout || !lockedTheme || !lockedEffect) {
      return
    }

    setUiError('')
    setIsCapturing(true)
    setRetakeIndex(index)
    setCurrentCaptureIndex(index)
    clearFinalImageUrl()

    try {
      const countdownFinished = await runCountdown(COUNTDOWN_SECONDS)

      if (!countdownFinished) {
        throw new Error('Countdown cancelled.')
      }

      const newPhoto = await createCaptureRecord(index, lockedLayout, lockedTheme, lockedEffect)

      setCapturedPhotos((previous) => previous.map((photo, photoIndex) => {
        if (photoIndex !== index) {
          return photo
        }

        if (photo.previewUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(photo.previewUrl)
        }

        return newPhoto
      }))

      outletContext?.showToast(`Foto ${index + 1} baru saja diambil ulang.`, 'success')
    } catch (error) {
      if (error.message !== 'Countdown cancelled.') {
        setUiError('Kamera melewatkan momen itu. Yuk, coba lagi, sayang.')
        outletContext?.showToast('Kamera melewatkan momen itu. Yuk, coba lagi, sayang.', 'error')
      }
    } finally {
      clearCountdownTimers()
      setIsCapturing(false)
      setRetakeIndex(null)
      setCurrentCaptureIndex(0)
    }
  }, [clearCountdownTimers, clearFinalImageUrl, createCaptureRecord, ensureCameraReady, lockedEffect, lockedLayout, lockedTheme, outletContext, runCountdown])

  const confirmRetakeAll = useCallback(() => {
    clearCountdownTimers(true)
    resetSessionImages()
    setUiError('')
    setRetakeIndex(null)
    setCurrentCaptureIndex(0)
    setIsCapturing(false)
    setLockedLayout(null)
    setLockedTheme(null)
    setLockedEffect(null)
    setShowRetakeAllConfirm(false)
    outletContext?.showToast('Stripnya sudah dibersihkan. Kita bisa mulai lagi kapan saja.', 'info')
  }, [clearCountdownTimers, outletContext, resetSessionImages])

  const handleDownload = useCallback(async () => {
    if (!lockedLayout || !lockedTheme || capturedPhotos.length !== lockedLayout.photoCount) {
      setUiError('Ambil dulu semua kenangan kecilnya, sayang.')
      outletContext?.showToast('Ambil dulu semua kenangan kecilnya, sayang.', 'error')
      return
    }

    setIsGenerating(true)
    setUiError('')

    try {
      const result = await generatePhotoboxFinalImage({
        photos: capturedPhotos,
        layout: lockedLayout,
        theme: lockedTheme,
      })

      clearFinalImageUrl()

      if (result.blob) {
        const previewUrl = URL.createObjectURL(result.blob)
        finalImageUrlRef.current = previewUrl
        setFinalImageUrl(previewUrl)
        downloadBlob(result.blob, result.filename)
      } else {
        finalImageUrlRef.current = result.dataUrl
        setFinalImageUrl(result.dataUrl)
        downloadDataUrl(result.dataUrl, result.filename)
      }

      outletContext?.showToast('Photobox kecilmu sudah siap.', 'success')
    } catch {
      setUiError('Aku belum bisa menyimpan kenangan kecil ini. Coba lagi, sayang.')
      outletContext?.showToast('Aku belum bisa menyimpan kenangan kecil ini. Coba lagi, sayang.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }, [capturedPhotos, clearFinalImageUrl, lockedLayout, lockedTheme, outletContext])

  const pageStatus = useMemo(() => {
    if (isCapturing && retakeIndex !== null) {
      return `Mengambil ulang foto ${retakeIndex + 1}...`
    }

    if (isCapturing) {
      return `Mengambil foto ${currentCaptureIndex + 1} dari ${totalPhotos}...`
    }

    if (hasAllPhotos) {
      return `Semua ${totalPhotos} kenangan kecil sudah siap untuk dilihat dan diunduh.`
    }

    if (capturedPhotos.length > 0) {
      return `${capturedPhotos.length} dari ${totalPhotos} foto sudah diambil.`
    }

    if (isCameraActive) {
      return 'Kamera siap. Pilih layout, pilih gaya kenangan, lalu mulai Photobox.'
    }

  }, [capturedPhotos.length, currentCaptureIndex, hasAllPhotos, isCameraActive, isCapturing, retakeIndex, totalPhotos])

  return (
    <section className="page-section">
      <div className="page-shell stack-lg">
        <PrivacyNote message={photoboxCopy.privacyNote} />

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            alignItems: 'start',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
          }}
        >
          <div className="stack-md">
            <CameraCanvasPreview
              videoRef={videoRef}
              isCameraActive={isCameraActive}
              isVideoReady={isVideoReady}
              setIsVideoReady={setIsVideoReady}
              previewCanvasRef={previewCanvasRef}
              selectedEffect={activeEffect}
              selectedTheme={activeTheme}
              cameraError={cameraError}
              countdown={countdown}
              currentCaptureIndex={currentCaptureIndex}
              totalPhotos={totalPhotos}
              isRetake={retakeIndex !== null}
              renderPreviewFrame={renderPreviewFrame}
              layouts={photoboxLayouts}
              currentLayout={selectedLayout}
              onSelectLayout={handleSelectLayout}
              layoutPickerDisabled={isCapturing || capturedPhotos.length > 0}
            />

            <EffectPicker
              effects={photoboxEffects}
              selectedEffect={selectedEffect}
              onSelectEffect={setSelectedEffect}
              disabled={isCapturing || capturedPhotos.length > 0}
            />

            <RetakeControls
              photosCount={capturedPhotos.length}
              totalPhotos={totalPhotos}
              retakeIndex={retakeIndex}
              isCapturing={isCapturing}
              selectedLayout={activeLayout}
            />

            <PhotoStripPreview
              photos={capturedPhotos}
              layout={activeLayout}
              theme={activeTheme}
              effect={effectForCapture}
              onRetake={handleRetakePhoto}
              isCapturing={isCapturing}
              retakeIndex={retakeIndex}
            />

            <PhotoboxResult
              finalImageUrl={finalImageUrl}
              theme={activeTheme}
              isGenerating={isGenerating}
              uiError={uiError && finalImageUrl ? '' : uiError}
            />
          </div>

          <div className="stack-md">
            <PhotoboxControls
              onStartCamera={handleStartCamera}
              onStartPhotobox={handleStartPhotobox}
              onRetakeAll={() => setShowRetakeAllConfirm(true)}
              onDownload={handleDownload}
              isCameraActive={isCameraActive}
              isCapturing={isCapturing}
              canStartCapture={canStartCapture}
              canDownload={canDownload}
              hasPhotos={capturedPhotos.length > 0}
              isGenerating={isGenerating}
            />

            <CameraErrorState message={cameraError} onRetry={handleStartCamera} />

            <FaceTrackingStatus
              requiresFaceTracking={requiresFaceTracking}
              isModelLoading={isModelLoading}
              isModelReady={isModelReady}
              faceTrackingError={faceTrackingError}
              isPerformanceFallback={isPerformanceFallback}
            />

            <ThemePicker
              themes={photoboxThemes}
              selectedTheme={selectedTheme}
              selectedLayoutId={selectedLayout.id}
              onSelectTheme={setSelectedTheme}
              disabled={isCapturing || capturedPhotos.length > 0}
            />
          </div>
        </div>
      </div>

      {showRetakeAllConfirm ? (
        <ConfirmDialog
          title="Ambil ulang semuanya?"
          body={photoboxCopy.startOverConfirm}
          confirmLabel="Ambil Ulang Semua"
          onConfirm={confirmRetakeAll}
          onCancel={() => setShowRetakeAllConfirm(false)}
        />
      ) : null}
    </section>
  )
}
