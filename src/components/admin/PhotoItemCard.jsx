export default function PhotoItemCard({ photo, onEdit, onDelete }) {
  return (
    <article className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      {(photo.image_url || photo.src) ? (
        <img
          src={photo.image_url || photo.src}
          alt={photo.caption || photo.title || 'Gallery photo'}
          style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
        />
      ) : null}
      <div>
        <p style={{ margin: 0, fontWeight: 700 }}>{photo.title || photo.caption}</p>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--color-admin-muted)' }}>{photo.category}</p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="button-secondary" style={{ padding: '0.45rem 0.8rem' }}>{photo.is_featured || photo.isFeatured ? 'Featured' : 'Standard'}</span>
        <span className="button-secondary" style={{ padding: '0.45rem 0.8rem' }}>{photo.is_active === false ? 'Inactive' : 'Active'}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" className="button-secondary" onClick={() => onEdit(photo)}>Edit</button>
        <button type="button" className="button-secondary" onClick={() => onDelete(photo)}>Delete</button>
      </div>
    </article>
  )
}
