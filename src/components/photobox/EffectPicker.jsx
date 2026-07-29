export default function EffectPicker({ effects, selectedEffect, onSelectEffect, disabled }) {
  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.5rem' }}>
          Pilih efek kecilmu
        </p>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Filter wajah mengikuti gerakanmu secara langsung.
        </p>
      </div>

      <div
        role="listbox"
        aria-label="Efek kecil"
        style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.25rem' }}
      >
        {effects.map((effect) => {
          const isActive = selectedEffect.id === effect.id

          return (
            <button
              key={effect.id}
              type="button"
              role="option"
              aria-selected={isActive}
              title={effect.name}
              onClick={() => onSelectEffect(effect)}
              disabled={disabled}
              style={{
                flex: '0 0 auto',
                display: 'grid',
                justifyItems: 'center',
                gap: '0.35rem',
                width: '3.75rem',
                background: 'none',
                border: 'none',
                padding: 0,
                opacity: disabled ? 0.55 : 1,
                cursor: disabled ? 'default' : 'pointer',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundImage: `url("${effect.thumbnail}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: isActive ? '2px solid var(--color-dusty-rose)' : '2px solid rgba(74, 47, 37, 0.1)',
                  boxShadow: isActive ? '0 0 0 2px rgba(201, 143, 143, 0.35)' : 'none',
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  transition: 'border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
                }}
              />
              <span
                style={{
                  maxWidth: '3.75rem',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  color: 'var(--color-deep-brown)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                }}
              >
                {effect.name}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
