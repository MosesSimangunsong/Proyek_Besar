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

  let label = 'Face effect ready.'

  if (isModelLoading) {
    label = 'Preparing this effect...'
  } else if (faceTrackingError) {
    label = faceTrackingError
  } else if (isPerformanceFallback) {
    label = 'This effect is a little heavy for this device. Let’s use a softer one, sayang.'
  } else if (!isModelReady) {
    label = 'Move a little closer, sayang.'
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
        Face effect status
      </p>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {label}
      </p>
    </div>
  )
}
