function getLayoutPreview(layout) {
  return layout.id === 'grid-2x3'
    ? 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(244, 227, 211, 0.9))'
    : 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(233, 213, 221, 0.86))'
}

export default function LayoutPicker({ layouts, selectedLayout, onSelectLayout, disabled }) {
  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.9rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Choose your photobox shape
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Pick the memory shape before capture starts.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
        {layouts.map((layout) => {
          const isActive = selectedLayout.id === layout.id

          return (
            <button
              key={layout.id}
              type="button"
              aria-pressed={isActive}
              className="card"
              onClick={() => onSelectLayout(layout)}
              disabled={disabled}
              style={{
                padding: '0.85rem',
                display: 'grid',
                gap: '0.7rem',
                textAlign: 'left',
                borderColor: isActive ? 'rgba(201, 143, 143, 0.55)' : 'rgba(74, 47, 37, 0.08)',
                boxShadow: isActive ? '0 14px 35px rgba(201, 143, 143, 0.16)' : 'var(--shadow-soft)',
                opacity: disabled ? 0.72 : 1,
              }}
            >
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: getLayoutPreview(layout),
                  padding: '0.8rem',
                  minHeight: '8rem',
                  display: 'grid',
                  gap: '0.45rem',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
                    gap: '0.35rem',
                    alignContent: 'stretch',
                    height: '100%',
                  }}
                >
                  {Array.from({ length: layout.photoCount }).map((_, index) => (
                    <span
                      key={`${layout.id}-${index}`}
                      style={{
                        borderRadius: '12px',
                        minHeight: layout.id === 'grid-2x3' ? '2.1rem' : '1.7rem',
                        background: isActive ? 'rgba(201, 143, 143, 0.3)' : 'rgba(122, 92, 75, 0.14)',
                        border: '1px solid rgba(74, 47, 37, 0.08)',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gap: '0.22rem' }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-deep-brown)' }}>
                  {layout.name}
                </p>
                <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
                  {layout.description}
                </p>
                <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-xs)' }}>
                  {layout.photoCount} photos
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
