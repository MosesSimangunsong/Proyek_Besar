import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import PhotoForm from '../../components/admin/PhotoForm'
import PhotoList from '../../components/admin/PhotoList'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { deletePhoto, getPhotos, savePhoto } from '../../services/photosService'

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState([])
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const outletContext = useOutletContext()

  useEffect(() => {
    getPhotos().then(setPhotos)
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Photo Management" subtitle="Manage gallery items, featured picks, and active visibility." />
      <PhotoForm
        key={editingPhoto?.id ?? 'new-photo'}
        initialValue={editingPhoto}
        onSubmit={async (payload) => {
          await savePhoto(payload)
          setEditingPhoto(null)
          setPhotos(await getPhotos())
          outletContext.showToast('Photo saved.', 'success')
        }}
        onCancel={() => setEditingPhoto(null)}
      />
      <PhotoList photos={photos} onEdit={setEditingPhoto} onDelete={setPendingDelete} />
      {pendingDelete ? (
        <ConfirmDialog
          title="Delete photo?"
          body={`Remove "${pendingDelete.title || pendingDelete.caption}" from gallery data?`}
          confirmLabel="Delete"
          onCancel={() => setPendingDelete(null)}
          onConfirm={async () => {
            await deletePhoto(pendingDelete.id)
            setPendingDelete(null)
            setPhotos(await getPhotos())
          }}
        />
      ) : null}
    </section>
  )
}
