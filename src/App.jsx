import { Navigate, Route, Routes } from 'react-router-dom'

import AdminLayout from './components/common/AdminLayout'
import InesLayout from './components/common/InesLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import RoleRedirect from './components/common/RoleRedirect'
import { useAuthGate } from './hooks/useAuthGate'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { useRoleGuard } from './hooks/useRoleGuard'
import { useToast } from './hooks/useToast'
import DailyPage from './pages/DailyPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import PhotoboxPage from './pages/PhotoboxPage'
import SavedPage from './pages/SavedPage'
import UnlockPage from './pages/UnlockPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminDailyMessagesPage from './pages/admin/AdminDailyMessagesPage'
import AdminMusicPage from './pages/admin/AdminMusicPage'
import AdminPhotosPage from './pages/admin/AdminPhotosPage'
import AdminRepliesPage from './pages/admin/AdminRepliesPage'

function App() {
  const auth = useAuthGate()
  const guard = useRoleGuard(auth.role)
  const music = useMusicPlayer()
  const { toast, showToast, clearToast } = useToast()

  return (
    <Routes>
      <Route path="/" element={<RoleRedirect role={auth.role} />} />
      <Route path="/unlock" element={<UnlockPage onUnlock={auth.enterInes} onUnlockAdmin={auth.enterAdmin} />} />
      <Route element={<ProtectedRoute isAllowed={guard.isInes} redirectTo={guard.isAdmin ? '/admin' : '/unlock'} />}>
        <Route
          element={
            <InesLayout
              music={music}
              toast={toast}
              onCloseToast={clearToast}
              outletContext={{ showToast }}
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/daily" element={<DailyPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/photobox" element={<PhotoboxPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute isAllowed={guard.isAdmin} />}>
        <Route
          path="/admin"
          element={
            <AdminLayout
              onLogout={auth.logout}
              toast={toast}
              onCloseToast={clearToast}
              outletContext={{ showToast }}
            />
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="replies" element={<AdminRepliesPage />} />
          <Route path="photos" element={<AdminPhotosPage />} />
          <Route path="music" element={<AdminMusicPage />} />
          <Route path="daily-messages" element={<AdminDailyMessagesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
