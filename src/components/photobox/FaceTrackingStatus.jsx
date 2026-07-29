export default function FaceTrackingStatus({
  requiresFaceTracking,
  isModelLoading,
  isModelReady,
  faceTrackingError,
  isPerformanceFallback,
}) {
  if (!requiresFaceTracking && !faceTrackingError && !isPerformanceFallback) {
    return null
  }

  let label = 'Efek wajah siap.'

  if (isModelLoading) {
    label = 'Menyiapkan efek ini...'
  } else if (faceTrackingError) {
    label = faceTrackingError
  } else if (isPerformanceFallback) {
    label = 'Efek ini agak berat untuk perangkat ini. Yuk, pakai yang lebih ringan saja, sayang.'
  } else if (!isModelReady) {
    label = 'Coba mendekat sedikit lagi, sayang.'
  }

  return (
    <div
      className="card"
      style={{
        padding: '0.9rem 1rem',
        display: 'grid',
        gap: '0.25rem',
        borderColor: 'rgba(74, 47, 37, 0.08)',
      }}
    >
      <p className="handwritten" style={{ margin: 0, fontSize: '1.35rem' }}>
        Status efek wajah
      </p>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {label}
      </p>
    </div>
  )
}
