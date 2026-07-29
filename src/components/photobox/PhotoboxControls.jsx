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
          Kontrol kecil
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Kamera akan tetap mati sampai kamu menyalakannya, dan tiap pengambilan foto akan berhenti sejenak untuk hitung mundur lima detik.
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
          {isCameraActive ? 'Segarkan Kamera' : 'Mulai Kamera'}
        </button>

        <button
          type="button"
          className="button-accent"
          onClick={onStartPhotobox}
          disabled={!canStartCapture}
          style={{ width: '100%', opacity: canStartCapture ? 1 : 0.65 }}
        >
          {isCapturing ? 'Menangkap kenangan kecil...' : 'Mulai Photobox'}
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={onRetakeAll}
          disabled={!hasPhotos || isCapturing}
          style={{ width: '100%', opacity: hasPhotos && !isCapturing ? 1 : 0.65 }}
        >
          Ambil Ulang Semua
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={onDownload}
          disabled={!canDownload || isGenerating}
          style={{ width: '100%', opacity: canDownload && !isGenerating ? 1 : 0.65 }}
        >
          {isGenerating ? 'Menyiapkan PNG kamu...' : 'Unduh Photobox'}
        </button>
      </div>
    </div>
  )
}
