import { useState } from 'react'
import { useEffect } from 'react'

import GalleryGrid from '../components/gallery/GalleryGrid'
import PhotoLightbox from '../components/gallery/PhotoLightbox'
import { getPhotos } from '../services/photosService'

export default function GalleryPage() {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    getPhotos().then((items) => setPhotos(items.filter((photo) => photo.is_active !== false)))
  }, [])

  return (
    <section className="page-section">
      <div className="page-shell stack-lg">
        <div>
          <span className="eyebrow">Gallery</span>
        </div>
        <GalleryGrid photos={photos} onOpen={setSelectedPhoto} />
      </div>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  )
}
