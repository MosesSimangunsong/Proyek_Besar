export default function AdminFormField({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: '0.45rem' }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  )
}
