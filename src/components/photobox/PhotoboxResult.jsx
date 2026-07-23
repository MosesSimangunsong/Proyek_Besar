export default function PhotoboxResult({ finalImageUrl, theme, isGenerating, uiError }) {
  if (!finalImageUrl && !isGenerating && !uiError) {
    return null
  }

  if (!finalImageUrl && (isGenerating || uiError)) {
    return (
      <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Final little memory
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>
          {isGenerating ? 'Preparing your PNG with the chosen memory style...' : uiError}
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
          Your little photobox is ready.
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          The PNG has been prepared with your chosen memory style and little effect.
        </p>
      </div>

      <div
        style={{
          padding: '0.8rem',
          borderRadius: 'var(--radius-lg)',
          background: theme.colors.background,
          border: `1px solid ${theme.colors.text}22`,
        }}
      >
        <img
          src={finalImageUrl}
          alt="Generated final photobox strip"
          style={{
            width: '100%',
            borderRadius: 'calc(var(--radius-lg) - 10px)',
            border: `2px solid ${theme.colors.text}22`,
            boxShadow: 'var(--shadow-paper)',
          }}
        />
      </div>
    </section>
  )
}
