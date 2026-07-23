function getPreviewGrid(layoutId) {
  return layoutId === 'grid-2x3'
    ? 'repeat(2, minmax(0, 1fr))'
    : 'minmax(0, 1fr)'
}

export default function PhotoStripPreview({
  photos,
  layout,
  theme,
  effect,
  onRetake,
  isCapturing,
  retakeIndex,
}) {
  if (!photos.length) {
    return null
  }

  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.9rem' }}>
      <div style={{ display: 'grid', gap: '0.3rem' }}>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.7rem' }}>
          Your tiny strip
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Preview each memory here. It should feel true to your chosen layout and effect, while the final PNG can be a little richer.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {[layout.name, theme.name, effect.name].map((item) => (
          <span
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.35rem 0.7rem',
              borderRadius: '999px',
              background: 'rgba(201, 143, 143, 0.12)',
              color: 'var(--color-deep-brown)',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: getPreviewGrid(layout.id),
          gap: '0.85rem',
        }}
      >
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '0.7rem',
              background: theme.colors.background,
              border: `1px solid ${theme.colors.text}25`,
              boxShadow: 'var(--shadow-soft)',
              display: 'grid',
              gap: '0.65rem',
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${theme.colors.text}25`,
                aspectRatio: '3 / 4',
                background: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              <img
                src={photo.dataUrl}
                alt={`Photobox capture ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <p style={{ margin: 0, color: theme.colors.text, fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                Photo {index + 1}
              </p>
              <button
                type="button"
                className="button-secondary"
                onClick={() => onRetake(index)}
                disabled={isCapturing}
                style={{ width: '100%', opacity: isCapturing ? 0.7 : 1 }}
              >
                {retakeIndex === index ? 'Retaking...' : 'Retake'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
