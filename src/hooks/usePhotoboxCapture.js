import { useCallback } from 'react'

import { canvasToBlob } from '../utils/photoboxCanvasUtils'
import { renderCapturedPhoto } from '../utils/photoboxCaptureRenderer'

export function usePhotoboxCapture() {
  const captureFrame = useCallback(async ({
    video,
    effect,
    layout,
    theme,
    faceTracking,
  }) => {
    if (!video?.videoWidth || !video?.videoHeight) {
      throw new Error('Pratinjau kamera belum siap.')
    }

    const { canvas, renderOutcome } = await renderCapturedPhoto({
      video,
      effect,
      faceTracking,
      width: video.videoWidth,
      height: video.videoHeight,
    })

    const blob = await canvasToBlob(canvas)
    const dataUrl = canvas.toDataURL('image/png')
    const previewUrl = blob ? URL.createObjectURL(blob) : dataUrl

    return {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      dataUrl,
      previewUrl,
      blob,
      width: canvas.width,
      height: canvas.height,
      capturedAt: new Date().toISOString(),
      layoutId: layout.id,
      themeId: theme.id,
      effectId: effect.id,
      faceApplied: renderOutcome.faceApplied,
    }
  }, [])

  return {
    captureFrame,
  }
}
