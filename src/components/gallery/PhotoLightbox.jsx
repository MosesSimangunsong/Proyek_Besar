import { X } from 'lucide-react'

export default function PhotoLightbox({ photo, onClose }) {
  if (!photo) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        background: 'rgba(47, 41, 38, 0.56)',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <article
        className="paper-panel"
        style={{ width: 'min(100%, 38rem)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="button-secondary"
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', minWidth: '3rem', minHeight: '3rem', padding: 0 }}
        >
          <X size={18} />
        </button>
        <div
          style={{
            aspectRatio: '4 / 5',
            borderRadius: 'var(--radius-lg)',
            backgroundImage: `linear-gradient(rgba(255, 248, 239, 0.1), rgba(74, 47, 37, 0.15)), url(${photo.image_url || photo.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="stack-sm" style={{ marginTop: '1rem' }}>
          <p className="handwritten" style={{ margin: 0, fontSize: '1.8rem' }}>
            {photo.caption}
          </p>
          <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>
            {photo.category} • {photo.date}
          </p>
        </div>
      </article>
    </div>
  )
}
