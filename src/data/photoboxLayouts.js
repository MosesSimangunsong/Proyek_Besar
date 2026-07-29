export const photoboxLayouts = [
  {
    id: 'strip-1x3',
    name: 'Strip Klasik',
    description: 'Strip photobooth kecil yang klasik.',
    columns: 1,
    rows: 3,
    photoCount: 3,
    previewRatio: 'strip',
    recommendedCanvas: {
      width: 900,
      height: 1800,
    },
  },
  {
    id: 'grid-2x2',
    name: '2 x 2',
    description: 'Empat momen favorit berdampingan.',
    columns: 2,
    rows: 2,
    photoCount: 4,
    previewRatio: 'square',
    recommendedCanvas: {
      width: 1400,
      height: 1400,
    },
  },
  {
    id: 'grid-2x3',
    name: '2 x 3',
    description: 'Enam kenangan kecil dalam satu halaman buku kenangan.',
    columns: 2,
    rows: 3,
    photoCount: 6,
    previewRatio: 'portrait',
    recommendedCanvas: {
      width: 1200,
      height: 1800,
    },
  },
  {
    id: 'polaroid-single',
    name: 'Polaroid Tunggal',
    description: 'Satu kenangan besar, dibingkai seperti polaroid.',
    columns: 1,
    rows: 1,
    photoCount: 1,
    previewRatio: 'polaroid',
    recommendedCanvas: {
      width: 1100,
      height: 1400,
    },
  },
]
