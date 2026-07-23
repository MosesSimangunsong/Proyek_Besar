export default function LetterItemCard({ letter, onEdit, onDelete }) {
  return (
    <article className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      <div>
        <p style={{ margin: 0, fontWeight: 700 }}>{letter.title}</p>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--color-admin-muted)' }}>
          {letter.mood} • {letter.style}
        </p>
      </div>
      <p style={{ margin: 0, color: 'var(--color-admin-muted)' }}>{letter.subtitle}</p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" className="button-secondary" onClick={() => onEdit(letter)}>Edit</button>
        <button type="button" className="button-secondary" onClick={() => onDelete(letter)}>Delete</button>
      </div>
    </article>
  )
}
