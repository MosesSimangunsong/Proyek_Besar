import { photoboxEffectTypes } from '../../data/photoboxEffects'

function getBadgeLabel(effect) {
  if (effect.type === photoboxEffectTypes.FACE_OVERLAY && !effect.usableInInitialRelease) {
    return 'Face'
  }

  if (effect.type === photoboxEffectTypes.COMBO) {
    return 'Combo'
  }

  return effect.category
}

export default function EffectPicker({ effects, selectedEffect, onSelectEffect, disabled }) {
  return (
    <section className="card" style={{ padding: '1rem', display: 'grid', gap: '0.9rem' }}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.65rem' }}>
          Pick your little effect
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          The first 20+ usable effects are ready for capture. Face effects can stay gentle if tracking is unavailable.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0.85rem', gridAutoFlow: 'column', gridAutoColumns: 'minmax(9rem, 1fr)', overflowX: 'auto', paddingBottom: '0.3rem' }}>
        {effects.map((effect) => {
          const isActive = selectedEffect.id === effect.id

          return (
            <button
              key={effect.id}
              type="button"
              aria-pressed={isActive}
              className="card"
              onClick={() => onSelectEffect(effect)}
              disabled={disabled}
              style={{
                padding: '0.75rem',
                minWidth: '9rem',
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
                  aspectRatio: '4 / 3',
                  backgroundImage: `url("${effect.thumbnail}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(74, 47, 37, 0.08)',
                }}
              />

              <div style={{ display: 'grid', gap: '0.22rem' }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-deep-brown)', fontSize: '0.94rem' }}>
                  {effect.name}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    width: 'fit-content',
                    padding: '0.2rem 0.45rem',
                    borderRadius: '999px',
                    background: effect.requiresFaceTracking ? 'rgba(122, 92, 75, 0.12)' : 'rgba(201, 143, 143, 0.15)',
                    color: 'var(--color-deep-brown)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                >
                  {getBadgeLabel(effect)}
                </span>
                {!effect.usableInInitialRelease ? (
                  <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: '0.72rem' }}>
                    Advanced preview
                  </p>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
