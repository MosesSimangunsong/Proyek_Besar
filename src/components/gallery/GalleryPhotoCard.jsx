import { useEffect, useRef, useState } from 'react'

export default function GalleryPhotoCard({ photo, onOpen, index = 0 }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = cardRef.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={isVisible ? 'animate-fade-up' : undefined}
      style={{ opacity: isVisible ? undefined : 0, animationDelay: `${(index % 4) * 90}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(photo)}
        className="polaroid-card gallery-photo-card"
        style={{
          '--tilt': `${photo.isFeatured ? -1.8 : 1.2}deg`,
          width: '100%',
        }}
      >
        <div className="gallery-photo-card__frame">
          <div
            className="polaroid-image gallery-photo-card__image"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 248, 239, 0.12), rgba(74, 47, 37, 0.18)), url(${photo.image_url || photo.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </button>
    </div>
  )
}
