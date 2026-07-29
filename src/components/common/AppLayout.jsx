import { Home, Image as ImageIcon, Camera, Gamepad2 } from 'lucide-react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Dock from './Dock'
import MusicControl from './MusicControl'
import Toast from './Toast'

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/photobox', label: 'Photobox', icon: Camera },
  { to: '/games', label: 'Games', icon: Gamepad2 },
]

export default function AppLayout({ music, toast, onCloseToast, outletContext }) {
  const navigate = useNavigate()
  const location = useLocation()

  const dockItems = navItems.map(({ to, label, icon: Icon }) => ({
    icon: <Icon size={18} />,
    label,
    onClick: () => navigate(to),
    className: location.pathname.startsWith(to) ? 'dock-item-active' : '',
  }))

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
        aria-label="Primary navigation"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '1rem',
          zIndex: 20,
          transform: 'translateX(-50%)',
        }}
      >
        <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={70} />
      </nav>

      <Toast toast={toast} onClose={onCloseToast} />
    </div>
  )
}
