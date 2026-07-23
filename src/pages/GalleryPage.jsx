import { useMemo, useState } from 'react'
import { useEffect } from 'react'

import GalleryFilter from '../components/gallery/GalleryFilter'
import GalleryGrid from '../components/gallery/GalleryGrid'
import PhotoLightbox from '../components/gallery/PhotoLightbox'
import { getPhotos } from '../services/photosService'

export default function GalleryPage() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    getPhotos().then((items) => setPhotos(items.filter((photo) => photo.is_active !== false)))
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(photos.map((photo) => photo.category))],
    [photos],
  )

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') {
      return photos
    }

    return photos.filter((photo) => photo.category === activeCategory)
  }, [activeCategory, photos])

  return (
    <section className="page-section">
      <div className="page-shell stack-lg">
        <div>
          <span className="eyebrow">Gallery</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            Little pieces of us
          </h1>
          <p className="page-subtitle">Some memories are too sweet to stay only in my phone.</p>
        </div>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>
          The scrapbook wall stays here, while the Memory Dome now welcomes Ines first on the home page.
        </p>
        <GalleryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <GalleryGrid photos={filteredPhotos} onOpen={setSelectedPhoto} />
      </div>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  )
}
