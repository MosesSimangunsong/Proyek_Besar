import { applyMirroredVideoDraw, createCanvas } from './photoboxCanvasUtils'
import { applyEffectToCanvas } from './photoboxEffectRenderer'

export async function renderCapturedPhoto({
  video,
  effect,
  faceTracking,
  width,
  height,
  mirror = true,
}) {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Konteks kanvas tidak tersedia.')
  }

  ctx.imageSmoothingQuality = 'high'
  ctx.filter = effect?.canvasFilter || 'none'
  applyMirroredVideoDraw(ctx, video, width, height, mirror)
  ctx.filter = 'none'

  const renderOutcome = applyEffectToCanvas(ctx, {
    effect,
    width,
    height,
    faceTracking,
  })

  return {
    canvas,
    renderOutcome,
  }
}
