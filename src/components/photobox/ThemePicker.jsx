export default function ThemePicker({ themes, selectedTheme, selectedLayoutId, onSelectTheme, disabled }) {
  const availableThemes = themes.filter((theme) => theme.supportedLayouts.includes(selectedLayoutId))

  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.9rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Pilih gaya kenangan
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          PNG akhirnya bisa terlihat lebih kaya, tapi pilihan ini menentukan suasana keseluruhannya.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0.9rem', gridAutoFlow: 'column', gridAutoColumns: 'minmax(13rem, 1fr)', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {availableThemes.map((theme) => {
          const isActive = selectedTheme.id === theme.id

          return (
            <button
              key={theme.id}
              type="button"
              aria-pressed={isActive}
              className="card"
              onClick={() => onSelectTheme(theme)}
              disabled={disabled}
              style={{
                padding: '0.75rem',
                minWidth: '13rem',
                display: 'grid',
                gap: '0.65rem',
                textAlign: 'left',
                borderColor: isActive ? 'rgba(201, 143, 143, 0.55)' : 'rgba(74, 47, 37, 0.08)',
                opacity: disabled ? 0.72 : 1,
              }}
            >
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  backgroundImage: `url("${theme.thumbnail}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(74, 47, 37, 0.08)',
                }}
              />
              <div style={{ display: 'grid', gap: '0.22rem' }}>
                <p style={{ margin: 0, fontWeight: 700 }}>{theme.name}</p>
                <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
                  {theme.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
