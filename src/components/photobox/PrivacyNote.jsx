export default function PrivacyNote({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="card" style={{ padding: '0.85rem 1rem' }}>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {message}
      </p>
    </div>
  )
}
