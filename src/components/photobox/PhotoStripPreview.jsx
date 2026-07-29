const PREVIEW_COLUMN_WIDTH = '132px'

function getPreviewGrid(layout) {
  return `repeat(${layout.columns}, ${PREVIEW_COLUMN_WIDTH})`
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
          Strip kecilmu
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Lihat pratinjau tiap kenangan di sini. Tampilannya akan sesuai dengan tata letak dan efek pilihanmu, sementara PNG akhirnya bisa terlihat sedikit lebih kaya.
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
          gridTemplateColumns: getPreviewGrid(layout),
          justifyContent: 'center',
          gap: '0.6rem',
        }}
      >
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '0.4rem',
              background: theme.colors.background,
              border: `1px solid ${theme.colors.text}25`,
              boxShadow: 'var(--shadow-soft)',
              display: 'grid',
              gap: '0.4rem',
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-sm)',
                border: `2px solid ${theme.colors.text}25`,
                aspectRatio: '3 / 4',
                background: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              <img
                src={photo.dataUrl}
                alt={`Hasil jepretan Photobox ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'grid', gap: '0.3rem' }}>
              <p style={{ margin: 0, color: theme.colors.text, fontWeight: 600, fontSize: '0.7rem' }}>
                Foto {index + 1}
              </p>
              <button
                type="button"
                className="button-secondary"
                onClick={() => onRetake(index)}
                disabled={isCapturing}
                style={{ width: '100%', opacity: isCapturing ? 0.7 : 1, padding: '0.35rem', fontSize: '0.7rem' }}
              >
                {retakeIndex === index ? 'Mengambil ulang...' : 'Ambil Ulang'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
