export default function GalleryPhotoCard({ photo, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      className="polaroid-card"
      style={{
        transform: `rotate(${photo.isFeatured ? -1.8 : 1.2}deg)`,
        textAlign: 'left',
        width: '100%',
      }}
    >
      <div
        className="polaroid-image"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 248, 239, 0.12), rgba(74, 47, 37, 0.18)), url(${photo.image_url || photo.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <p className="polaroid-caption" style={{ textAlign: 'left' }}>
        {photo.caption}
      </p>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {photo.category}
      </p>
    </button>
  )
}
