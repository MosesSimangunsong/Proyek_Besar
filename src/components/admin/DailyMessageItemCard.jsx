export default function DailyMessageItemCard({ item, onEdit, onDelete }) {
  return (
    <article className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      <div>
        <p style={{ margin: 0, fontWeight: 700 }}>{item.tone}</p>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--color-admin-muted)' }}>{item.is_active === false ? 'Inactive' : 'Active'}</p>
      </div>
      <p style={{ margin: 0 }}>{item.message}</p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" className="button-secondary" onClick={() => onEdit(item)}>Edit</button>
        <button type="button" className="button-secondary" onClick={() => onDelete(item)}>Delete</button>
      </div>
    </article>
  )
}
