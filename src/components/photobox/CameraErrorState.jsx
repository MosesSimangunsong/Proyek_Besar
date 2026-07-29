export default function CameraErrorState({ message, onRetry }) {
  if (!message) {
    return null
  }

  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem', borderColor: 'rgba(184, 92, 92, 0.24)' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.5rem' }}>
          Kamera butuh sedikit bantuan
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)' }}>
          {message}
        </p>
      </div>
      <button type="button" className="button-secondary" onClick={onRetry} style={{ width: 'fit-content' }}>
        Coba Lagi
      </button>
    </div>
  )
}
