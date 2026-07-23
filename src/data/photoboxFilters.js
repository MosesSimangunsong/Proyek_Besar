export const photoboxFilters = [
  {
    id: 'normal',
    name: 'Normal',
    cssFilter: 'none',
    canvasFilter: 'none',
  },
  {
    id: 'warm',
    name: 'Warm',
    cssFilter: 'sepia(0.18) saturate(1.15) brightness(1.05)',
    canvasFilter: 'sepia(18%) saturate(115%) brightness(105%)',
  },
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    cssFilter: 'sepia(0.08) saturate(1.1) hue-rotate(-8deg) brightness(1.05)',
    canvasFilter: 'sepia(8%) saturate(110%) hue-rotate(-8deg) brightness(105%)',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    cssFilter: 'sepia(0.35) contrast(0.95) brightness(1.03)',
    canvasFilter: 'sepia(35%) contrast(95%) brightness(103%)',
  },
  {
    id: 'black-white',
    name: 'Black & White',
    cssFilter: 'grayscale(1) contrast(1.05)',
    canvasFilter: 'grayscale(100%) contrast(105%)',
  },
]
