import { createThumbnailDataUri } from '../utils/imageAssetUtils'

export const photoboxThemes = [
  {
    id: 'vintage-photobooth',
    name: 'Photobooth Vintage',
    description: 'Seperti strip foto lawas yang lembut, tersimpan di dalam kotak kenangan.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'Vintage', top: '#fff8ef', bottom: '#e8d3b9', accent: '#c9a978' }),
    colors: {
      background: '#fff8ef',
      secondary: '#efe1ca',
      text: '#4a2f25',
    },
    photo: {
      radius: 20,
      borderColor: '#fef8f1',
      borderWidth: 10,
    },
  },
  {
    id: 'old-paper-album',
    name: 'Album Kertas Lawas',
    description: 'Kertas hangat, sudut selotip kecil, dan nostalgia album lawas.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'Album', top: '#f5ebdd', bottom: '#dcc4a0', accent: '#a77a4f' }),
    colors: {
      background: '#f4eadb',
      secondary: '#e2cfb0',
      text: '#493628',
    },
    photo: {
      radius: 18,
      borderColor: '#fffdf8',
      borderWidth: 8,
    },
  },
  {
    id: 'polaroid-collage',
    name: 'Kolase Polaroid',
    description: 'Polaroid-polaroid kecil disusun seperti catatan buatan tangan.',
    supportedLayouts: ['grid-2x3', 'grid-2x2'],
    thumbnail: createThumbnailDataUri({ label: 'Polaroid', top: '#fffdf8', bottom: '#ebddd3', accent: '#d9b79a' }),
    colors: {
      background: '#f8f0e8',
      secondary: '#ebddd3',
      text: '#563a2f',
    },
    photo: {
      radius: 18,
      borderColor: '#fffdf8',
      borderWidth: 6,
    },
  },
  {
    id: 'vhs-camcorder',
    name: 'Kamera VHS',
    description: 'Kenangan kamera video yang lembut dengan stempel waktu kecil.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'VHS', top: '#2a2a30', bottom: '#5a5256', accent: '#8bb0c6', text: '#fffdf8' }),
    colors: {
      background: '#28292d',
      secondary: '#4a444b',
      text: '#fffdf8',
    },
    photo: {
      radius: 12,
      borderColor: 'rgba(255,255,255,0.35)',
      borderWidth: 2,
    },
  },
  {
    id: 'cassette-tape',
    name: 'Kaset Pita',
    description: 'Kenangan bergaya label hangat yang terinspirasi dari sampul kaset.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'Cassette', top: '#f7ead8', bottom: '#d7c1a6', accent: '#8e7442' }),
    colors: {
      background: '#f8eedf',
      secondary: '#d8c3ac',
      text: '#594625',
    },
    photo: {
      radius: 18,
      borderColor: '#fff8ef',
      borderWidth: 8,
    },
  },
  {
    id: 'scrapbook-page',
    name: 'Halaman Buku Kenangan',
    description: 'Catatan kertas, selotip kecil, dan kehangatan tulisan tangan yang lembut.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'Buku Kenangan', top: '#fff9f2', bottom: '#f0d8c0', accent: '#d99aa3' }),
    colors: {
      background: '#fff8f0',
      secondary: '#efd3be',
      text: '#5c4535',
    },
    photo: {
      radius: 22,
      borderColor: '#fffdf8',
      borderWidth: 7,
    },
  },
  {
    id: 'analog-film-contact-sheet',
    name: 'Lembar Kontak Film Analog',
    description: 'Bingkai lembar kontak gelap dengan tekstur analog.',
    supportedLayouts: ['grid-2x3', 'grid-2x2'],
    thumbnail: createThumbnailDataUri({ label: 'Kontak', top: '#161616', bottom: '#403a32', accent: '#d3c09c', text: '#fff7de' }),
    colors: {
      background: '#171717',
      secondary: '#403a32',
      text: '#fff7de',
    },
    photo: {
      radius: 10,
      borderColor: '#151515',
      borderWidth: 4,
    },
  },
  {
    id: 'romantic-dusty-rose',
    name: 'Dusty Rose Romantis',
    description: 'Dusty rose, cahaya lembut, dan hati kecil yang manis.',
    supportedLayouts: ['grid-2x3', 'strip-1x3', 'grid-2x2', 'polaroid-single'],
    thumbnail: createThumbnailDataUri({ label: 'Dusty Rose', top: '#fff6f6', bottom: '#e9ced3', accent: '#d68792', text: '#5e3940' }),
    colors: {
      background: '#fff6f6',
      secondary: '#e9ced3',
      text: '#5e3940',
    },
    photo: {
      radius: 22,
      borderColor: '#fffdf8',
      borderWidth: 8,
    },
  },
]
