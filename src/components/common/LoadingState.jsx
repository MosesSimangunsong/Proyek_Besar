export default function LoadingState({ label = 'Memuat...' }) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>{label}</p>
    </div>
  )
}
