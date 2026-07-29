export default function Toast({ toast, onClose }) {
  if (!toast) {
    return null
  }

  const toneStyles = {
    success: {
      background: 'rgba(255, 253, 248, 0.96)',
      borderColor: 'rgba(214, 181, 109, 0.4)',
    },
    error: {
      background: 'rgba(255, 248, 239, 0.98)',
      borderColor: 'rgba(201, 143, 143, 0.45)',
    },
    info: {
      background: 'rgba(255, 253, 248, 0.96)',
      borderColor: 'rgba(74, 47, 37, 0.12)',
    },
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '1rem',
        zIndex: 50,
        transform: 'translateX(-50%)',
        width: 'min(calc(100% - 2rem), 28rem)',
        padding: '0.9rem 1rem',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${toneStyles[toast.tone]?.borderColor ?? toneStyles.info.borderColor}`,
        background: toneStyles[toast.tone]?.background ?? toneStyles.info.background,
        boxShadow: 'var(--shadow-floating)',
      }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, color: 'var(--color-deep-brown)', fontSize: 'var(--text-sm)' }}>{toast.message}</p>
        <button type="button" className="button-ghost" onClick={onClose} aria-label="Tutup pesan">
          Tutup
        </button>
      </div>
    </div>
  )
}
