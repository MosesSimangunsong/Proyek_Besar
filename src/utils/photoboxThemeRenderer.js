import { createPhotoboxFilename } from './photoboxDownloadUtils'
import { loadImageAsset } from './imageAssetUtils'
import { canvasToBlob, createCanvas, drawRoundedImage, drawRoundedPath } from './photoboxCanvasUtils'
import { drawFilmGrain, drawHeart, drawLightLeak, drawPaperTexture, drawScanLines, drawSparkle, drawStampBox, drawThemeBase, drawWashiTape } from './vintageEffectsUtils'

function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function getPhotoSlots(layout, canvasWidth, canvasHeight) {
  if (layout.id === 'grid-2x3') {
    const paddingX = 80
    const paddingTop = 170
    const paddingBottom = 140
    const gapX = 32
    const gapY = 34
    const photoWidth = (canvasWidth - (paddingX * 2) - gapX) / 2
    const photoHeight = (canvasHeight - paddingTop - paddingBottom - (gapY * 2)) / 3

    return Array.from({ length: 6 }, (_, index) => {
      const column = index % 2
      const row = Math.floor(index / 2)

      return {
        x: paddingX + (column * (photoWidth + gapX)),
        y: paddingTop + (row * (photoHeight + gapY)),
        width: photoWidth,
        height: photoHeight,
      }
    })
  }

  const paddingX = 72
  const paddingTop = 170
  const paddingBottom = 140
  const gapY = 28
  const photoWidth = canvasWidth - (paddingX * 2)
  const photoHeight = (canvasHeight - paddingTop - paddingBottom - (gapY * 2)) / 3

  return Array.from({ length: 3 }, (_, index) => ({
    x: paddingX,
    y: paddingTop + (index * (photoHeight + gapY)),
    width: photoWidth,
    height: photoHeight,
  }))
}

function drawHeader(ctx, width, theme) {
  ctx.fillStyle = theme.colors.text
  ctx.font = '700 62px Georgia, serif'
  ctx.fillText('Photobox', 76, 92)
  ctx.font = '500 30px Georgia, serif'
  ctx.fillText('For Ines', 78, 130)

  ctx.font = '500 24px "Trebuchet MS", sans-serif'
  ctx.fillStyle = `${theme.colors.text}CC`
  ctx.fillText(formatLongDate(new Date()), width - 250, 92)
}

function drawFooter(ctx, width, height, theme) {
  ctx.font = '500 24px "Trebuchet MS", sans-serif'
  ctx.fillStyle = `${theme.colors.text}CC`
  ctx.fillText('our little place', 76, height - 82)
  ctx.fillText('230624', width - 148, height - 82)
}

function drawPhotoShell(ctx, slot, theme) {
  ctx.save()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.56)'
  drawRoundedPath(ctx, slot.x - 8, slot.y - 8, slot.width + 16, slot.height + 16, theme.photo.radius + 8)
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.strokeStyle = theme.photo.borderColor
  ctx.lineWidth = theme.photo.borderWidth
  drawRoundedPath(ctx, slot.x, slot.y, slot.width, slot.height, theme.photo.radius)
  ctx.stroke()
  ctx.restore()
}

function drawThemeDecorations(ctx, canvasWidth, canvasHeight, theme, layout) {
  switch (theme.id) {
    case 'vintage-photobooth':
      drawPaperTexture(ctx, canvasWidth, canvasHeight)
      drawFilmGrain(ctx, canvasWidth, canvasHeight, 0.07)
      break
    case 'old-paper-album':
      drawPaperTexture(ctx, canvasWidth, canvasHeight, 'rgba(94, 77, 51, 0.08)')
      drawWashiTape(ctx, 112, 112, 160, 36)
      drawWashiTape(ctx, canvasWidth - 260, 122, 140, 36, 'rgba(242, 220, 177, 0.74)', 0.16)
      drawStampBox(ctx, canvasWidth - 170, canvasHeight - 178, 88)
      break
    case 'polaroid-collage':
      drawSparkle(ctx, canvasWidth - 120, 126, 18)
      drawHeart(ctx, 126, canvasHeight - 160, 18)
      break
    case 'vhs-camcorder':
      drawScanLines(ctx, canvasWidth, canvasHeight, 0.12)
      drawLightLeak(ctx, canvasWidth, canvasHeight, 'rgba(83, 141, 191, 0.18)')
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.font = '500 22px monospace'
      ctx.fillText('PLAY 08 JUL 2026', 76, canvasHeight - 118)
      break
    case 'cassette-tape':
      ctx.fillStyle = 'rgba(255, 248, 239, 0.44)'
      ctx.fillRect(72, 118, canvasWidth - 144, canvasHeight - 244)
      drawFilmGrain(ctx, canvasWidth, canvasHeight, 0.04)
      break
    case 'scrapbook-page':
      drawWashiTape(ctx, 76, 112, 160, 38)
      drawWashiTape(ctx, canvasWidth - 224, 116, 148, 34, 'rgba(246, 226, 198, 0.72)', 0.12)
      drawHeart(ctx, canvasWidth - 112, canvasHeight - 164, 20)
      drawSparkle(ctx, 118, canvasHeight - 162, 14)
      break
    case 'analog-film-contact-sheet':
      ctx.fillStyle = 'rgba(47, 41, 38, 0.22)'
      ctx.fillRect(52, 146, canvasWidth - 104, canvasHeight - 256)
      drawFilmGrain(ctx, canvasWidth, canvasHeight, 0.12)
      break
    case 'romantic-dusty-rose':
      drawLightLeak(ctx, canvasWidth, canvasHeight, 'rgba(255, 214, 214, 0.2)')
      drawSparkle(ctx, canvasWidth - 126, 128, 20, '#e6c39e')
      drawHeart(ctx, 116, canvasHeight - 160, 18, '#d68792')
      break
    default:
      break
  }

  if (layout.id === 'strip-1x3' && theme.id !== 'analog-film-contact-sheet') {
    ctx.save()
    ctx.strokeStyle = `${theme.colors.text}22`
    ctx.lineWidth = 2
    ctx.strokeRect(52, 120, canvasWidth - 104, canvasHeight - 236)
    ctx.restore()
  }
}

function drawPolaroidFrame(ctx, image, slot, theme) {
  const cardHeight = slot.height + 92

  ctx.save()
  ctx.translate(slot.x + (slot.width / 2), slot.y + (cardHeight / 2))
  ctx.rotate(slot.rotation ?? 0)
  ctx.fillStyle = '#fffdf8'
  ctx.strokeStyle = 'rgba(122, 92, 75, 0.22)'
  ctx.lineWidth = 3
  drawRoundedPath(ctx, (-slot.width / 2) - 8, (-cardHeight / 2) - 8, slot.width + 16, cardHeight + 16, 24)
  ctx.fill()
  ctx.stroke()
  drawRoundedImage(ctx, image, -slot.width / 2, -cardHeight / 2, slot.width, slot.height, 20)
  ctx.fillStyle = theme.colors.text
  ctx.font = '500 22px Georgia, serif'
  ctx.fillText('for ines', (-slot.width / 2) + 18, (cardHeight / 2) - 24)
  ctx.restore()
}

export async function generatePhotoboxFinalImage({
  photos,
  layout,
  theme,
  output = 'blob',
}) {
  const canvas = createCanvas(layout.recommendedCanvas.width, layout.recommendedCanvas.height)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas context is not available.')
  }

  const { width, height } = canvas
  drawThemeBase(ctx, width, height, theme)
  drawHeader(ctx, width, theme)
  drawThemeDecorations(ctx, width, height, theme, layout)

  const images = await Promise.all(photos.map((photo) => loadImageAsset(photo.previewUrl || photo.dataUrl)))
  const slots = getPhotoSlots(layout, width, height)

  images.forEach((image, index) => {
    const slot = slots[index]

    if (!slot) {
      return
    }

    if (theme.id === 'polaroid-collage') {
      drawPolaroidFrame(ctx, image, {
        ...slot,
        rotation: index % 2 === 0 ? -0.045 : 0.042,
      }, theme)
      return
    }

    if (theme.id === 'analog-film-contact-sheet') {
      ctx.fillStyle = '#151515'
      ctx.fillRect(slot.x - 14, slot.y - 14, slot.width + 28, slot.height + 28)
      drawRoundedImage(ctx, image, slot.x, slot.y, slot.width, slot.height, 10)
      ctx.fillStyle = '#d3c09c'
      ctx.font = '500 18px monospace'
      ctx.fillText(`${index + 1}`.padStart(2, '0'), slot.x + 6, slot.y - 18)
      return
    }

    if (theme.id === 'vhs-camcorder') {
      drawRoundedImage(ctx, image, slot.x, slot.y, slot.width, slot.height, 12)
      ctx.strokeStyle = 'rgba(255,255,255,0.28)'
      ctx.lineWidth = 3
      ctx.strokeRect(slot.x, slot.y, slot.width, slot.height)
      return
    }

    drawPhotoShell(ctx, slot, theme)
    drawRoundedImage(ctx, image, slot.x, slot.y, slot.width, slot.height, theme.photo.radius)
  })

  drawFooter(ctx, width, height, theme)

  const filename = createPhotoboxFilename(new Date())
  const dataUrl = canvas.toDataURL('image/png')

  if (output === 'dataUrl') {
    return {
      blob: null,
      dataUrl,
      width,
      height,
      filename,
    }
  }

  const blob = await canvasToBlob(canvas)

  return {
    blob,
    dataUrl,
    width,
    height,
    filename,
  }
}
