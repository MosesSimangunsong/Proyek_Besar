export default function EmptyState({ title, body, action }) {
  return (
    <section
      className="card"
      style={{
        padding: '1.5rem',
        textAlign: 'center',
        display: 'grid',
        gap: '0.75rem',
      }}
    >
      <p className="handwritten" style={{ margin: 0, fontSize: '1.8rem' }}>
        {title}
      </p>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>{body}</p>
      {action}
    </section>
  )
}
