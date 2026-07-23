import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import MusicForm from '../../components/admin/MusicForm'
import MusicList from '../../components/admin/MusicList'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { deleteMusicTrack, getMusicTracks, saveMusicTrack, setActiveMusic } from '../../services/musicService'

export default function AdminMusicPage() {
  const [tracks, setTracks] = useState([])
  const [editingTrack, setEditingTrack] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const outletContext = useOutletContext()

  useEffect(() => {
    getMusicTracks().then(setTracks)
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Music Management" subtitle="Upload, edit, activate, and remove tracks." />
      <MusicForm
        key={editingTrack?.id ?? 'new-track'}
        initialValue={editingTrack}
        onSubmit={async (payload) => {
          await saveMusicTrack(payload)
          if (payload.is_active) {
            await setActiveMusic(payload.id || (await getMusicTracks())[0]?.id)
          }
          setEditingTrack(null)
          setTracks(await getMusicTracks())
          outletContext.showToast('Music track saved.', 'success')
        }}
        onCancel={() => setEditingTrack(null)}
      />
      <MusicList
        tracks={tracks}
        onEdit={setEditingTrack}
        onSetActive={async (trackId) => {
          await setActiveMusic(trackId)
          setTracks(await getMusicTracks())
          outletContext.showToast('Active track updated.', 'success')
        }}
        onDelete={setPendingDelete}
      />
      {pendingDelete ? (
        <ConfirmDialog
          title="Delete music track?"
          body={`Remove "${pendingDelete.title}" from the list?`}
          confirmLabel="Delete"
          onCancel={() => setPendingDelete(null)}
          onConfirm={async () => {
            await deleteMusicTrack(pendingDelete.id)
            setPendingDelete(null)
            setTracks(await getMusicTracks())
          }}
        />
      ) : null}
    </section>
  )
}
