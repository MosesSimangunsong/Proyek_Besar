export default function MusicItemCard({ track, onEdit, onSetActive, onDelete }) {
  return (
    <article className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>{track.title}</p>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--color-admin-muted)' }}>{track.artist || 'Unknown artist'}</p>
        </div>
        <span
          style={{
            alignSelf: 'start',
            padding: '0.3rem 0.65rem',
            borderRadius: '999px',
            background: track.is_active || track.isDefault ? 'rgba(95, 138, 107, 0.15)' : 'rgba(74, 47, 37, 0.08)',
            color: track.is_active || track.isDefault ? 'var(--color-success)' : 'var(--color-admin-muted)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {track.is_active || track.isDefault ? 'Active' : 'Inactive'}
        </span>
      </div>
      {track.audio_url || track.src ? <audio controls src={track.audio_url || track.src} style={{ width: '100%' }} /> : null}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="button" className="button-secondary" onClick={() => onEdit(track)}>
          Edit
        </button>
        <button type="button" className="button-primary" onClick={() => onSetActive(track.id)}>
          Set Active
        </button>
        <button type="button" className="button-secondary" onClick={() => onDelete(track)}>
          Delete
        </button>
      </div>
    </article>
  )
}
