import { Grid2x2, Image, LayoutGrid, Rows3 } from 'lucide-react'

const LAYOUT_ICONS = {
  'strip-1x3': Rows3,
  'grid-2x2': Grid2x2,
  'grid-2x3': LayoutGrid,
  'polaroid-single': Image,
}

export default function LayoutPicker({ layouts, selectedLayout, onSelectLayout, disabled }) {
  return (
    <div
      role="listbox"
      aria-label="Bentuk Photobox"
      style={{
        position: 'absolute',
        top: '50%',
        right: '0.65rem',
        transform: 'translateY(-50%)',
        display: 'grid',
        gap: '0.45rem',
      }}
    >
      {layouts.map((layout) => {
        const isActive = selectedLayout.id === layout.id
        const Icon = LAYOUT_ICONS[layout.id] ?? LayoutGrid

        return (
          <button
            key={layout.id}
            type="button"
            role="option"
            aria-selected={isActive}
            title={`${layout.name} — ${layout.photoCount} foto`}
            onClick={() => onSelectLayout(layout)}
            disabled={disabled}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--radius-md)',
              background: isActive ? 'rgba(255, 253, 248, 0.94)' : 'rgba(30, 20, 15, 0.4)',
              border: isActive ? '1.5px solid var(--color-dusty-rose)' : '1.5px solid rgba(255, 253, 248, 0.35)',
              color: isActive ? 'var(--color-deep-brown)' : '#fffdf8',
              boxShadow: isActive ? 'var(--shadow-soft)' : 'none',
              opacity: disabled ? 0.55 : 1,
              cursor: disabled ? 'default' : 'pointer',
              transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease',
            }}
          >
            <Icon size={17} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
