export default function PhotoboxControls({
  onStartCamera,
  onStartPhotobox,
  onRetakeAll,
  onDownload,
  isCameraActive,
  isCapturing,
  canStartCapture,
  canDownload,
  hasPhotos,
  isGenerating,
}) {
  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gap: '0.85rem' }}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.7rem' }}>
          Little controls
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Camera stays off until you ask for it, and every capture will pause for a five-second countdown.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <button
          type="button"
          className="button-primary"
          onClick={onStartCamera}
          disabled={isCapturing}
          style={{ width: '100%' }}
        >
          {isCameraActive ? 'Refresh Camera' : 'Start Camera'}
        </button>

        <button
          type="button"
          className="button-accent"
          onClick={onStartPhotobox}
          disabled={!canStartCapture}
          style={{ width: '100%', opacity: canStartCapture ? 1 : 0.65 }}
        >
          {isCapturing ? 'Capturing tiny memories...' : 'Start Photobox'}
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={onRetakeAll}
          disabled={!hasPhotos || isCapturing}
          style={{ width: '100%', opacity: hasPhotos && !isCapturing ? 1 : 0.65 }}
        >
          Retake All
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={onDownload}
          disabled={!canDownload || isGenerating}
          style={{ width: '100%', opacity: canDownload && !isGenerating ? 1 : 0.65 }}
        >
          {isGenerating ? 'Preparing your PNG...' : 'Download Photobox'}
        </button>
      </div>
    </div>
  )
}
