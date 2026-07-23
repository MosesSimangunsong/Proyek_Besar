export default function FrameSelector({ frames, selectedFrame, onSelectFrame, disabled }) {
  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.85rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Pick a frame
        </p>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Choose the scrapbook mood you want before the strip starts.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'minmax(12rem, 1fr)',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
        }}
      >
        {frames.map((frame) => {
          const isActive = frame.id === selectedFrame.id

          return (
            <button
              key={frame.id}
              type="button"
              className="button-secondary"
              onClick={() => onSelectFrame(frame)}
              disabled={disabled}
              aria-pressed={isActive}
              style={{
                padding: '0.85rem',
                textAlign: 'left',
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${isActive ? frame.borderColor : `${frame.borderColor}22`}`,
                background: frame.backgroundColor,
                color: frame.textColor,
                opacity: disabled ? 0.7 : 1,
              }}
            >
              <span className="handwritten" style={{ display: 'block', fontSize: '1.4rem' }}>
                {frame.name}
              </span>
              <span style={{ display: 'block', fontSize: 'var(--text-sm)', marginTop: '0.25rem' }}>
                {frame.description}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
