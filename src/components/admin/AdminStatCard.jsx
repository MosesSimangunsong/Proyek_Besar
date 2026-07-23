export default function AdminStatCard({ label, value, hint }) {
  return (
    <article className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '0.35rem' }}>
      <p style={{ margin: 0, color: 'var(--color-admin-muted)', fontSize: 'var(--text-sm)' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{value}</p>
      <p style={{ margin: 0, color: 'var(--color-admin-muted)', fontSize: 'var(--text-sm)' }}>{hint}</p>
    </article>
  )
}
