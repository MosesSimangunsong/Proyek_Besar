export default function AdminUploadField({ label, accept, onChange }) {
  return (
    <label style={{ display: 'grid', gap: '0.45rem' }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <input className="input-field" type="file" accept={accept} onChange={onChange} />
    </label>
  )
}
