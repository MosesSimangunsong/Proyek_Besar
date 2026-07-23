export default function AdminSectionHeader({ title, subtitle, action }) {
  return (
    <div className="admin-toolbar">
      <div>
        <h1 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
          {title}
        </h1>
        {subtitle ? <p style={{ margin: '0.35rem 0 0', color: 'var(--color-admin-muted)' }}>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}
