import { useEffect, useMemo, useRef, useState } from 'react'

import GalleryGrid from '../components/gallery/GalleryGrid'
import PhotoLightbox from '../components/gallery/PhotoLightbox'
import { galleryPhotos } from '../data/galleryPhotos'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { storageKeys } from '../utils/storageUtils'

const defaultVisibleIds = galleryPhotos.filter((photo) => photo.showInGallery).map((photo) => photo.id)
const BATCH_SIZE = 24

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [visibleIds] = useLocalStorage(storageKeys.galleryVisibility, defaultVisibleIds)
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE)
  const sentinelRef = useRef(null)

  const basePhotos = useMemo(() => galleryPhotos.filter((photo) => visibleIds.includes(photo.id)), [visibleIds])

  const photos = useMemo(() => {
    if (basePhotos.length === 0) {
      return []
    }
    return Array.from({ length: loadedCount }, (_, index) => basePhotos[index % basePhotos.length])
  }, [basePhotos, loadedCount])

  useEffect(() => {
    const node = sentinelRef.current

    if (!node || basePhotos.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadedCount((count) => count + BATCH_SIZE)
        }
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [basePhotos.length])

  return (
    <section className="page-section">
      <div className="page-shell stack-lg">
        <div>
          <span className="eyebrow">Gallery</span>
        </div>
        <GalleryGrid photos={photos} onOpen={setSelectedPhoto} />
        <div ref={sentinelRef} aria-hidden="true" style={{ height: '1px' }} />
      </div>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  )
}
