export default function RetakeControls({ photosCount, totalPhotos, retakeIndex, isCapturing, selectedLayout }) {
  if (!photosCount) {
    return null
  }

  const helperText = retakeIndex !== null
    ? `Retaking photo ${retakeIndex + 1}. Hold still for a tiny countdown.`
    : isCapturing
      ? 'Saving a fresh little memory...'
      : `${photosCount} of ${totalPhotos} photos ready for ${selectedLayout.name}.`

  return (
    <div
      className="card"
      style={{
        padding: '0.95rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.75rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'grid', gap: '0.2rem' }}>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.45rem' }}>
          Retake if you want
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>{helperText}</p>
      </div>
    </div>
  )
}
