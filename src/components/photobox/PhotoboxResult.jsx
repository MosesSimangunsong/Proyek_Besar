export default function PhotoboxResult({ finalImageUrl, theme, isGenerating, uiError }) {
  if (!finalImageUrl && !isGenerating && !uiError) {
    return null
  }

  if (!finalImageUrl && (isGenerating || uiError)) {
    return (
      <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Kenangan kecil terakhir
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>
          {isGenerating ? 'Menyiapkan PNG kamu dengan gaya kenangan pilihanmu...' : uiError}
        </p>
      </section>
    )
  }

  if (!finalImageUrl) {
    return null
  }

  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.9rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.7rem', color: theme.colors.text }}>
          Photobox kecilmu sudah siap.
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          PNG sudah disiapkan dengan gaya kenangan dan efek kecil pilihanmu.
        </p>
      </div>

      <div
        style={{
          padding: '0.8rem',
          borderRadius: 'var(--radius-lg)',
          background: theme.colors.background,
          border: `1px solid ${theme.colors.text}22`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={finalImageUrl}
          alt="Strip photobox akhir yang dihasilkan"
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            maxWidth: '18rem',
            maxHeight: '18rem',
            borderRadius: 'calc(var(--radius-lg) - 10px)',
            border: `2px solid ${theme.colors.text}22`,
            boxShadow: 'var(--shadow-paper)',
          }}
        />
      </div>
    </section>
  )
}
