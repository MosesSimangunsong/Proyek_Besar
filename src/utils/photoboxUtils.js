function formatFooterStamp(date) {
  return new Intl.DateTimeFormat('en-CA').format(date)
}

export function formatPhotoboxDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Image could not be loaded.'))
    image.src = src
  })
}

function drawRoundedPath(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function drawImageCover(ctx, image, x, y, width, height) {
  const imageRatio = image.width / image.height
  const boxRatio = width / height

  let sx = 0
  let sy = 0
  let sw = image.width
  let sh = image.height

  if (imageRatio > boxRatio) {
    sw = image.height * boxRatio
    sx = (image.width - sw) / 2
  } else {
    sh = image.width / boxRatio
    sy = (image.height - sh) / 2
  }

  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height)
}

export function drawRoundedImage(ctx, image, x, y, width, height, radius) {
  ctx.save()
  drawRoundedPath(ctx, x, y, width, height, radius)
  ctx.clip()
  drawImageCover(ctx, image, x, y, width, height)
  ctx.restore()
}

export function applyCanvasFilter(ctx, filter) {
  ctx.filter = filter?.canvasFilter || 'none'
}

function drawBackground(ctx, frame, canvasWidth, canvasHeight) {
  ctx.fillStyle = frame.backgroundColor
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
  gradient.addColorStop(0, `${frame.accentColor}2A`)
  gradient.addColorStop(1, `${frame.borderColor}10`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

function drawHeader(ctx, frame, dateLabel, width) {
  ctx.fillStyle = frame.textColor
  ctx.font = '700 72px "Playfair Display", serif'
  ctx.fillText('Photobox', 86, 126)

  ctx.font = '600 42px "Caveat", cursive'
  ctx.fillText('For Ines', 90, 178)

  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = `${frame.textColor}CC`
  ctx.fillText(dateLabel, width - 270, 122)

  ctx.strokeStyle = `${frame.borderColor}55`
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(88, 208)
  ctx.lineTo(width - 88, 208)
  ctx.stroke()
}

function drawFooter(ctx, frame, height) {
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = `${frame.textColor}CC`
  ctx.fillText('our little place', 86, height - 84)

  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = frame.textColor
  ctx.fillText('230624', 86, height - 46)
}

function drawTapeDecoration(ctx, x, y, width, height, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(-0.2)
  ctx.fillStyle = `${color}88`
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.moveTo(0, size * 0.3)
  ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, size * 0.3)
  ctx.bezierCurveTo(-size * 0.5, size * 0.7, 0, size, 0, size * 1.25)
  ctx.bezierCurveTo(0, size, size * 0.5, size * 0.7, size * 0.5, size * 0.3)
  ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, size * 0.3)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

function drawSparkle(ctx, x, y, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(0, size)
  ctx.moveTo(-size, 0)
  ctx.lineTo(size, 0)
  ctx.moveTo(-size * 0.7, -size * 0.7)
  ctx.lineTo(size * 0.7, size * 0.7)
  ctx.moveTo(-size * 0.7, size * 0.7)
  ctx.lineTo(size * 0.7, -size * 0.7)
  ctx.stroke()
  ctx.restore()
}

function drawStamp(ctx, x, y, size, color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 5
  ctx.setLineDash([8, 8])
  ctx.strokeRect(x, y, size, size)
  ctx.setLineDash([])
  ctx.restore()
}

function drawDoodles(ctx, x, y, color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.quadraticCurveTo(x + 18, y - 28, x + 42, y - 12)
  ctx.moveTo(x + 58, y - 10)
  ctx.lineTo(x + 82, y + 14)
  ctx.moveTo(x + 82, y - 10)
  ctx.lineTo(x + 58, y + 14)
  ctx.stroke()
  ctx.restore()
}

export function drawFrameDecorations(ctx, frame, width, height) {
  switch (frame.decoration) {
    case 'tape':
      drawTapeDecoration(ctx, 92, 64, 120, 34, frame.accentColor)
      drawTapeDecoration(ctx, width - 220, 64, 120, 34, frame.accentColor)
      break
    case 'hearts':
      drawHeart(ctx, width - 126, 110, 20, frame.accentColor)
      drawHeart(ctx, width - 96, 144, 14, frame.borderColor)
      break
    case 'stamp':
      drawStamp(ctx, width - 180, 74, 86, frame.accentColor)
      break
    case 'sparkle':
      drawSparkle(ctx, width - 130, 118, 18, frame.accentColor)
      drawSparkle(ctx, 140, height - 120, 12, frame.borderColor)
      break
    case 'doodles':
      drawDoodles(ctx, width - 220, 132, frame.accentColor)
      drawHeart(ctx, 136, height - 132, 16, frame.borderColor)
      break
    default:
      break
  }
}

export async function generatePhotoboxImage({ photos, frame, filter }) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas context is not available.')
  }

  const width = 1200
  const height = 1800
  const padding = 86
  const gap = 28
  const columns = 2
  const cellWidth = (width - (padding * 2) - gap) / columns
  const cellHeight = 408
  const headerBottom = 262

  canvas.width = width
  canvas.height = height

  drawBackground(ctx, frame, width, height)
  drawHeader(ctx, frame, formatPhotoboxDate(new Date()), width)

  const images = await Promise.all(photos.map((photo) => loadImage(photo.dataUrl)))

  for (let index = 0; index < images.length; index += 1) {
    const column = index % columns
    const row = Math.floor(index / columns)
    const x = padding + (column * (cellWidth + gap))
    const y = headerBottom + (row * (cellHeight + gap))

    ctx.save()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.46)'
    drawRoundedPath(ctx, x - 10, y - 10, cellWidth + 20, cellHeight + 20, 36)
    ctx.fill()
    ctx.restore()

    applyCanvasFilter(ctx, filter)
    drawRoundedImage(ctx, images[index], x, y, cellWidth, cellHeight, 28)
    ctx.filter = 'none'

    ctx.save()
    ctx.strokeStyle = frame.borderColor
    ctx.lineWidth = 6
    drawRoundedPath(ctx, x, y, cellWidth, cellHeight, 28)
    ctx.stroke()
    ctx.restore()
  }

  drawFrameDecorations(ctx, frame, width, height)
  drawFooter(ctx, frame, height)

  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = `${frame.textColor}AA`
  ctx.fillText(`saved on ${formatFooterStamp(new Date())}`, width - 280, height - 50)

  return canvas.toDataURL('image/png')
}

export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
