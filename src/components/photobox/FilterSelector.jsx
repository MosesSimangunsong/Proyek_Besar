export default function FilterSelector({ filters, selectedFilter, onSelectFilter, disabled }) {
  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.85rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Pick a filter
        </p>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Your preview updates right away so you can settle on the feeling first.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'minmax(9.5rem, 1fr)',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
        }}
      >
        {filters.map((filter) => {
          const isActive = filter.id === selectedFilter.id

          return (
            <button
              key={filter.id}
              type="button"
              className={isActive ? 'button-primary' : 'button-secondary'}
              onClick={() => onSelectFilter(filter)}
              disabled={disabled}
              aria-pressed={isActive}
              style={{
                minHeight: '4rem',
                opacity: disabled ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {filter.name}
            </button>
          )
        })}
      </div>
    </section>
  )
}
