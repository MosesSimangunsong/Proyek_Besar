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

export function createGlassesAssetDataUri() {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
      <line x1="30" y1="90" x2="4" y2="70" stroke="#d6b56d" stroke-width="10" stroke-linecap="round" />
      <line x1="370" y1="90" x2="396" y2="70" stroke="#d6b56d" stroke-width="10" stroke-linecap="round" />
      <line x1="196" y1="88" x2="204" y2="88" stroke="#d6b56d" stroke-width="10" stroke-linecap="round" />
      <circle cx="115" cy="100" r="82" fill="rgba(231,184,184,0.22)" stroke="#d6b56d" stroke-width="10" />
      <circle cx="285" cy="100" r="82" fill="rgba(231,184,184,0.22)" stroke="#d6b56d" stroke-width="10" />
      <path
        d="M200 84 c0 -10 8 -16 16 -16 c7 0 12 5 12 11 c0 9 -12 17 -28 29 c-16 -12 -28 -20 -28 -29 c0 -6 5 -11 12 -11 c8 0 16 6 16 16 z"
        fill="#c98f8f"
      />
    </svg>
  `)
}

export function createAnimalEarsAssetDataUri({ variant = 'cat' }) {
  if (variant === 'dog') {
    return svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
        <path
          d="M172 60 C120 40 60 60 44 130 C34 176 66 214 108 208 C140 204 158 168 160 128 C162 96 168 74 172 60 Z"
          fill="#e8d3b9" stroke="#7a5c4b" stroke-width="4"
        />
        <path
          d="M228 60 C280 40 340 60 356 130 C366 176 334 214 292 208 C260 204 242 168 240 128 C238 96 232 74 228 60 Z"
          fill="#e8d3b9" stroke="#7a5c4b" stroke-width="4"
        />
        <path d="M164 92 C144 88 116 104 108 148 C104 172 116 190 134 190" fill="#f7ead8" opacity="0.8" />
        <path d="M236 92 C256 88 284 104 292 148 C296 172 284 190 266 190" fill="#f7ead8" opacity="0.8" />
      </svg>
    `)
  }

  if (variant === 'bunny') {
    return svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
        <rect x="92" y="8" width="72" height="196" rx="36" fill="#f7ead8" stroke="#7a5c4b" stroke-width="4" transform="rotate(-6 128 106)" />
        <rect x="236" y="8" width="72" height="196" rx="36" fill="#f7ead8" stroke="#7a5c4b" stroke-width="4" transform="rotate(6 272 106)" />
        <rect x="112" y="34" width="32" height="150" rx="16" fill="#e7b8b8" opacity="0.85" transform="rotate(-6 128 106)" />
        <rect x="256" y="34" width="32" height="150" rx="16" fill="#e7b8b8" opacity="0.85" transform="rotate(6 272 106)" />
      </svg>
    `)
  }

  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
      <path d="M150 8 L60 150 L172 128 Z" fill="#e8d3b9" stroke="#7a5c4b" stroke-width="4" stroke-linejoin="round" />
      <path d="M250 8 L340 150 L228 128 Z" fill="#e8d3b9" stroke="#7a5c4b" stroke-width="4" stroke-linejoin="round" />
      <path d="M148 42 L100 132 L164 118 Z" fill="#e7b8b8" opacity="0.85" />
      <path d="M252 42 L300 132 L236 118 Z" fill="#e7b8b8" opacity="0.85" />
    </svg>
  `)
}

export function createFlowerCrownAssetDataUri() {
  const flowerColors = ['#c98f8f', '#d6b56d', '#c98f8f', '#d6b56d', '#c98f8f']
  const centers = [
    [58, 96], [146, 54], [230, 36], [314, 54], [402, 96],
  ]

  const flowers = centers.map(([cx, cy], index) => {
    const color = flowerColors[index]
    const petals = [
      [cx - 16, cy], [cx + 16, cy], [cx, cy - 16], [cx, cy + 16], [cx, cy],
    ]
    const petalCircles = petals
      .map(([px, py]) => `<circle cx="${px}" cy="${py}" r="13" fill="${color}" opacity="0.88" />`)
      .join('')

    return `${petalCircles}<circle cx="${cx}" cy="${cy}" r="6" fill="#fffdf8" />`
  }).join('')

  const leaves = [
    'M100 110 C90 96 96 78 114 74 C110 92 108 102 100 110 Z',
    'M188 68 C182 52 190 36 208 34 C202 52 198 62 188 68 Z',
    'M272 68 C278 52 270 36 252 34 C258 52 262 62 272 68 Z',
    'M360 110 C370 96 364 78 346 74 C350 92 352 102 360 110 Z',
  ].map((d) => `<path d="${d}" fill="#a8b89a" opacity="0.85" />`).join('')

  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="160" viewBox="0 0 460 160">
      ${leaves}
      ${flowers}
    </svg>
  `)
}

export function createBlushAssetDataUri() {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d68792" stop-opacity="0.55" />
          <stop offset="70%" stop-color="#e7b8b8" stop-opacity="0.24" />
          <stop offset="100%" stop-color="#e7b8b8" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#blush)" />
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
