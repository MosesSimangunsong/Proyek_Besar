import { drawRoundedPath, fillSoftGradient, randomFromSeed } from './photoboxCanvasUtils'

export function drawPaperTexture(ctx, width, height, baseColor = 'rgba(90, 66, 44, 0.08)') {
  for (let index = 0; index < 160; index += 1) {
    const x = randomFromSeed(index * 12.11) * width
    const y = randomFromSeed(index * 3.87) * height
    const alpha = 0.02 + (randomFromSeed(index * 8.41) * 0.035)

    ctx.fillStyle = baseColor.replace('0.08', alpha.toFixed(3))
    ctx.fillRect(x, y, 2, 2)
  }
}

export function drawFilmGrain(ctx, width, height, intensity = 0.06) {
  const grainCount = Math.floor((width * height) / 6000)

  for (let index = 0; index < grainCount; index += 1) {
    const x = randomFromSeed(index * 1.13) * width
    const y = randomFromSeed(index * 4.27) * height
    const alpha = randomFromSeed(index * 7.91) * intensity

    ctx.fillStyle = `rgba(74, 47, 37, ${alpha.toFixed(3)})`
    ctx.fillRect(x, y, 2, 2)
  }
}

export function drawDustAndScratch(ctx, width, height, opacity = 0.18) {
  ctx.save()
  ctx.strokeStyle = `rgba(108, 88, 75, ${opacity})`
  ctx.lineWidth = 1.2

  for (let index = 0; index < 22; index += 1) {
    const x = randomFromSeed(index * 2.04) * width
    const y = randomFromSeed(index * 3.44) * height
    const length = 30 + (randomFromSeed(index * 8.14) * 120)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (randomFromSeed(index * 5.75) * 14), y + length)
    ctx.stroke()
  }

  ctx.restore()
}

export function drawLightLeak(ctx, width, height, color = 'rgba(255, 197, 130, 0.3)') {
  const gradient = ctx.createRadialGradient(width * 0.08, height * 0.3, 0, width * 0.08, height * 0.3, width * 0.8)
  gradient.addColorStop(0, color)
  gradient.addColorStop(0.32, 'rgba(255, 153, 110, 0.22)')
  gradient.addColorStop(1, 'rgba(255, 153, 110, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

export function drawScanLines(ctx, width, height, opacity = 0.09) {
  ctx.save()
  ctx.fillStyle = `rgba(37, 35, 41, ${opacity})`

  for (let y = 0; y < height; y += 6) {
    ctx.fillRect(0, y, width, 2)
  }

  ctx.restore()
}

export function drawWashiTape(ctx, x, y, width, height, color = 'rgba(247, 231, 195, 0.76)', rotation = -0.12) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.fillStyle = color
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.lineWidth = 2
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height)
  ctx.restore()
}

export function drawHeart(ctx, x, y, size, color = '#d68792') {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.moveTo(0, size * 0.32)
  ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, size * 0.32)
  ctx.bezierCurveTo(-size * 0.5, size * 0.74, 0, size, 0, size * 1.25)
  ctx.bezierCurveTo(0, size, size * 0.5, size * 0.74, size * 0.5, size * 0.32)
  ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, size * 0.32)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

export function drawSparkle(ctx, x, y, size, color = '#d6b56d') {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
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

export function drawStampBox(ctx, x, y, size, color = 'rgba(122, 92, 75, 0.72)') {
  ctx.save()
  ctx.strokeStyle = color
  ctx.setLineDash([10, 8])
  ctx.lineWidth = 4
  ctx.strokeRect(x, y, size, size)
  ctx.restore()
}

export function drawNotebookCard(ctx, x, y, width, height, fill, stroke) {
  ctx.save()
  ctx.fillStyle = fill
  drawRoundedPath(ctx, x, y, width, height, 30)
  ctx.fill()
  ctx.strokeStyle = stroke
  ctx.lineWidth = 3
  drawRoundedPath(ctx, x, y, width, height, 30)
  ctx.stroke()
  ctx.restore()
}

export function drawThemeBase(ctx, width, height, theme) {
  if (theme.id === 'romantic-dusty-rose') {
    fillSoftGradient(ctx, width, height, '#fff7f6', '#edd2d7')
    return
  }

  if (theme.id === 'vhs-camcorder') {
    fillSoftGradient(ctx, width, height, '#1f2026', '#433a3f')
    return
  }

  fillSoftGradient(ctx, width, height, theme.colors.background, theme.colors.secondary)
}
