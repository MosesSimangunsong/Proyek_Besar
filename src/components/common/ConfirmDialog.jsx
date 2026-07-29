export default function ConfirmDialog({ title, body, confirmLabel = 'Konfirmasi', onConfirm, onCancel }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        background: 'rgba(47, 41, 38, 0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
      }}
    >
      <section className="card" style={{ width: 'min(100%, 28rem)', padding: '1.25rem', display: 'grid', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: '"Playfair Display", serif' }}>{title}</h2>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--color-muted-brown)' }}>{body}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" className="button-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="button-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
