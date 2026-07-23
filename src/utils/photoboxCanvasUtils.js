export function drawRoundedPath(ctx, x, y, width, height, radius) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2))

  ctx.beginPath()
  ctx.moveTo(x + safeRadius, y)
  ctx.lineTo(x + width - safeRadius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  ctx.lineTo(x + width, y + height - safeRadius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  ctx.lineTo(x + safeRadius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  ctx.lineTo(x, y + safeRadius)
  ctx.quadraticCurveTo(x, y, x + safeRadius, y)
  ctx.closePath()
}

export function drawImageCover(ctx, image, x, y, width, height) {
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

export function canvasToBlob(canvas, type = 'image/png', quality = 0.95) {
  return new Promise((resolve) => {
    if (!canvas.toBlob) {
      resolve(null)
      return
    }

    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

export function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function fillSoftGradient(ctx, width, height, from, to) {
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, from)
  gradient.addColorStop(1, to)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

export function applyMirroredVideoDraw(ctx, video, width, height, mirror = true) {
  ctx.save()

  if (mirror) {
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
  }

  ctx.drawImage(video, 0, 0, width, height)
  ctx.restore()
}

export function randomFromSeed(seed) {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}
