import { drawFaceOverlay, getFaceAnchorPoints, getFaceRollAngle, getFaceWidth } from './faceOverlayUtils'
import { drawHeart, drawFilmGrain, drawLightLeak, drawScanLines, drawSparkle, drawDustAndScratch, drawWashiTape, drawStampBox } from './vintageEffectsUtils'

function drawFloatingHearts(ctx, width, height) {
  const hearts = [
    [width * 0.16, height * 0.18, 18],
    [width * 0.86, height * 0.2, 12],
    [width * 0.2, height * 0.76, 14],
    [width * 0.82, height * 0.78, 16],
  ]

  hearts.forEach(([x, y, size]) => drawHeart(ctx, x, y, size))
}

function drawSparkleField(ctx, width, height) {
  const sparkles = [
    [width * 0.18, height * 0.22, 14],
    [width * 0.82, height * 0.24, 12],
    [width * 0.76, height * 0.72, 16],
    [width * 0.24, height * 0.78, 10],
  ]

  sparkles.forEach(([x, y, size]) => drawSparkle(ctx, x, y, size))
}

function drawPaperNote(ctx, width, height) {
  ctx.save()
  ctx.translate(width * 0.63, height * 0.62)
  ctx.rotate(-0.08)
  ctx.fillStyle = 'rgba(255, 250, 234, 0.92)'
  ctx.fillRect(0, 0, width * 0.24, height * 0.18)
  ctx.strokeStyle = 'rgba(122, 92, 75, 0.4)'
  ctx.lineWidth = 2
  ctx.strokeRect(0, 0, width * 0.24, height * 0.18)
  ctx.fillStyle = 'rgba(122, 92, 75, 0.9)'
  ctx.font = `${Math.max(18, width * 0.035)}px "Brush Script MT", cursive`
  ctx.fillText('for Ines', width * 0.04, height * 0.1)
  ctx.restore()
}

function drawForInesSticker(ctx, width, height) {
  ctx.save()
  ctx.fillStyle = 'rgba(255, 248, 239, 0.86)'
  ctx.strokeStyle = 'rgba(201, 143, 143, 0.85)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.roundRect(width * 0.1, height * 0.08, width * 0.32, height * 0.1, 18)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#5e3940'
  ctx.font = `${Math.max(20, width * 0.044)}px Georgia, serif`
  ctx.fillText('For Ines', width * 0.145, height * 0.145)
  ctx.restore()
}

function drawSoftGlow(ctx, width, height) {
  const gradient = ctx.createRadialGradient(width * 0.5, height * 0.45, width * 0.06, width * 0.5, height * 0.45, width * 0.62)
  gradient.addColorStop(0, 'rgba(255,255,255,0.18)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function drawOldPaperHaze(ctx, width, height) {
  ctx.fillStyle = 'rgba(212, 187, 158, 0.13)'
  ctx.fillRect(0, 0, width, height)
}

function drawVhsTimestamp(ctx, width, height) {
  ctx.save()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.font = `${Math.max(16, width * 0.028)}px monospace`
  ctx.fillText('REC  08 JUL 2026', width * 0.07, height * 0.1)
  ctx.restore()
}

function drawDoodleHearts(ctx, width, height) {
  ctx.save()
  ctx.strokeStyle = 'rgba(122, 92, 75, 0.75)'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(width * 0.12, height * 0.75)
  ctx.quadraticCurveTo(width * 0.16, height * 0.69, width * 0.21, height * 0.74)
  ctx.moveTo(width * 0.76, height * 0.16)
  ctx.quadraticCurveTo(width * 0.81, height * 0.1, width * 0.86, height * 0.15)
  ctx.stroke()
  ctx.restore()
}

function drawOverlayById(ctx, overlayId, width, height) {
  switch (overlayId) {
    case 'film-grain':
      drawFilmGrain(ctx, width, height, 0.08)
      break
    case 'dust-scratch':
      drawDustAndScratch(ctx, width, height, 0.22)
      break
    case 'light-leak':
      drawLightLeak(ctx, width, height)
      break
    case 'vhs-noise':
      drawScanLines(ctx, width, height, 0.1)
      drawVhsTimestamp(ctx, width, height)
      break
    case 'soft-glow':
      drawSoftGlow(ctx, width, height)
      break
    case 'romantic-sparkle':
      drawSparkleField(ctx, width, height)
      break
    case 'floating-hearts':
      drawFloatingHearts(ctx, width, height)
      break
    case 'sparkles':
      drawSparkleField(ctx, width, height)
      break
    case 'washi-tape':
      drawWashiTape(ctx, width * 0.08, height * 0.08, width * 0.22, height * 0.04)
      drawWashiTape(ctx, width * 0.7, height * 0.78, width * 0.2, height * 0.04, 'rgba(252, 226, 196, 0.78)', 0.11)
      break
    case 'for-ines-sticker':
      drawForInesSticker(ctx, width, height)
      break
    case 'love-stamp':
      drawStampBox(ctx, width * 0.72, height * 0.08, width * 0.16)
      break
    case 'paper-note':
      drawPaperNote(ctx, width, height)
      break
    case 'doodle-hearts':
      drawDoodleHearts(ctx, width, height)
      break
    case 'old-paper-haze':
      drawOldPaperHaze(ctx, width, height)
      break
    default:
      break
  }
}

function drawFaceEffect(ctx, effect, faceTracking, width, height) {
  if (!effect.requiresFaceTracking || !faceTracking?.landmarks?.length) {
    return false
  }

  const anchors = getFaceAnchorPoints(faceTracking.landmarks, width, height)

  if (!anchors) {
    return false
  }

  const faceWidth = getFaceWidth(anchors.leftCheek, anchors.rightCheek)
  const rotation = getFaceRollAngle(anchors.leftEyeOuter, anchors.rightEyeOuter)
  const assets = faceTracking.assets ?? {}

  effect.faceOverlays.forEach((overlay) => {
    const image = assets[overlay.assetId]
    const anchor = anchors[overlay.anchor]

    if (!image || !anchor) {
      return
    }

    const overlayWidth = faceWidth * overlay.widthRatio
    const overlayHeight = overlayWidth * overlay.aspectRatio
    const targetAnchor = {
      x: anchor.x + (overlay.xOffsetRatio * faceWidth),
      y: anchor.y + (overlay.yOffsetRatio * faceWidth),
    }

    drawFaceOverlay(ctx, {
      image,
      anchor: targetAnchor,
      width: overlayWidth,
      height: overlayHeight,
      rotation: overlay.rotationMode === 'eye-line' ? rotation : 0,
      opacity: overlay.opacity ?? 1,
    })
  })

  return true
}

export function applyEffectToCanvas(ctx, {
  effect,
  width,
  height,
  faceTracking,
}) {
  if (!effect) {
    return { faceApplied: false }
  }

  effect.overlays?.forEach((overlayId) => drawOverlayById(ctx, overlayId, width, height))
  effect.stickers?.forEach((stickerId) => drawOverlayById(ctx, stickerId, width, height))

  const faceApplied = drawFaceEffect(ctx, effect, faceTracking, width, height)

  if (effect.id === 'vintage-date-night') {
    drawLightLeak(ctx, width, height, 'rgba(255, 185, 129, 0.24)')
    drawFilmGrain(ctx, width, height, 0.08)
  }

  if (effect.id === 'scrapbook-love') {
    drawWashiTape(ctx, width * 0.08, height * 0.07, width * 0.23, height * 0.042)
    drawWashiTape(ctx, width * 0.7, height * 0.08, width * 0.2, height * 0.038, 'rgba(252, 234, 210, 0.72)', 0.18)
    drawDoodleHearts(ctx, width, height)
  }

  return { faceApplied }
}
