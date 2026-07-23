export function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function createThumbnailDataUri({
  label,
  top = '#fff8ef',
  bottom = '#e8d3b9',
  accent = '#c98f8f',
  text = '#4a2f25',
}) {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${top}" />
          <stop offset="100%" stop-color="${bottom}" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" rx="28" fill="url(#bg)" />
      <rect x="18" y="18" width="204" height="144" rx="22" fill="rgba(255,255,255,0.56)" stroke="${accent}" stroke-width="4" />
      <circle cx="52" cy="48" r="12" fill="${accent}" opacity="0.62" />
      <circle cx="190" cy="126" r="18" fill="${accent}" opacity="0.32" />
      <text x="28" y="128" fill="${text}" font-size="26" font-family="Georgia, serif" font-weight="700">${label}</text>
    </svg>
  `)
}

export function createStickerDataUri({
  emoji,
  size = 240,
  background = 'transparent',
  fontSize = 160,
}) {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${background}" />
      <text
        x="50%"
        y="56%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="${fontSize}"
      >${emoji}</text>
    </svg>
  `)
}

export function loadImageAsset(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load image asset: ${src}`))
    image.src = src
  })
}
