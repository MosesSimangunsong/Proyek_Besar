export default function PolaroidCard({ photo, rotation = -2, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="polaroid-card"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: '100%',
        textAlign: 'left',
        border: '1px solid rgba(74, 47, 37, 0.08)',
      }}
    >
      <div
        className="polaroid-image"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 248, 239, 0.18), rgba(74, 47, 37, 0.16)), url(${photo.image_url || photo.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <p className="polaroid-caption">{photo.caption}</p>
      <p style={{ margin: 0, textAlign: 'center', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {photo.date}
      </p>
    </button>
  )
}
