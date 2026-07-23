import { Home, Image as ImageIcon, NotebookText, Sparkles, Camera } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import MusicControl from './MusicControl'
import Toast from './Toast'

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/daily', label: 'Daily', icon: Sparkles },
  { to: '/saved', label: 'Saved', icon: NotebookText },
  { to: '/photobox', label: 'Photobox', icon: Camera },
]

export default function AppLayout({ music, toast, onCloseToast, outletContext }) {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>
      <main>
        <Outlet context={outletContext} />
      </main>

      <MusicControl
        track={music.track}
        isPlaying={music.isPlaying}
        error={music.error}
        onToggle={music.togglePlayback}
      />

      <nav
        className="page-shell"
        aria-label="Primary navigation"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '1rem',
          zIndex: 20,
          transform: 'translateX(-50%)',
        }}
      >
        <div
          className="card"
          style={{
            padding: '0.6rem',
            display: 'grid',
            gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
            gap: '0.35rem',
          }}
        >
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'grid',
                justifyItems: 'center',
                gap: '0.25rem',
                padding: '0.6rem 0.2rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(201, 143, 143, 0.18)' : 'transparent',
                color: isActive ? 'var(--color-deep-brown)' : 'var(--color-muted-brown)',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
              })}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <Toast toast={toast} onClose={onCloseToast} />
    </div>
  )
}
