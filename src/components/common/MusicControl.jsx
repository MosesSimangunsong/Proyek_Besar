import { Music2, Pause, Play } from 'lucide-react'

export default function MusicControl({ track, isPlaying, error, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Turn music off' : 'Turn music on'}
      title={track ? `${isPlaying ? 'Pause' : 'Play'} ${track.title}` : error || 'Our little song'}
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '6.5rem',
        zIndex: 25,
        width: '3.4rem',
        height: '3.4rem',
        border: '1px solid rgba(74, 47, 37, 0.14)',
        borderRadius: '999px',
        background: 'linear-gradient(180deg, rgba(255, 251, 246, 0.96), rgba(247, 234, 216, 0.96))',
        color: 'var(--color-deep-brown)',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 14px 28px rgba(74, 47, 37, 0.16)',
        backdropFilter: 'blur(14px)',
        cursor: 'pointer',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          boxShadow: isPlaying ? 'inset 0 0 0 1px rgba(201, 143, 143, 0.28)' : 'none',
        }}
      />
      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      <Music2
        size={12}
        style={{
          position: 'absolute',
          right: '0.38rem',
          bottom: '0.38rem',
          color: isPlaying ? 'var(--color-rose)' : 'var(--color-muted-brown)',
        }}
      />
    </button>
  )
}
