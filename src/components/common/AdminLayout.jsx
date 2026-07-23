import { LayoutDashboard, Image as ImageIcon, ListMusic, LogOut, Mail, Sparkles } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/replies', label: 'Replies', icon: Mail },
  { to: '/admin/photos', label: 'Photos', icon: ImageIcon },
  { to: '/admin/music', label: 'Music', icon: ListMusic },
  { to: '/admin/daily-messages', label: 'Daily', icon: Sparkles },
]

export default function AdminLayout({ onLogout, toast, onCloseToast, outletContext }) {
  return (
    <div className="admin-shell">
      <div className="admin-page admin-grid">
        <header className="admin-card" style={{ padding: '1rem' }}>
          <div className="admin-toolbar">
            <div>
              <p className="handwritten" style={{ margin: 0, fontSize: '1.5rem' }}>
                Moses Admin
              </p>
              <p style={{ margin: 0, color: 'var(--color-admin-muted)' }}>Clean private admin with local fallback.</p>
            </div>
            <button type="button" className="button-secondary" onClick={onLogout}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <LogOut size={16} />
                Logout
              </span>
            </button>
          </div>
          <nav className="admin-nav" aria-label="Admin navigation" style={{ marginTop: '1rem' }}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                style={({ isActive }) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(201, 143, 143, 0.15)' : 'transparent',
                  color: isActive ? 'var(--color-deep-brown)' : 'var(--color-admin-muted)',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                })}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </header>
        <Outlet context={outletContext} />
      </div>
      {toast ? (
        <div style={{ position: 'fixed', right: '1rem', bottom: '1rem', zIndex: 60 }}>
          <div className="admin-card" style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>{toast.message}</p>
            <button type="button" className="button-ghost" onClick={onCloseToast}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
