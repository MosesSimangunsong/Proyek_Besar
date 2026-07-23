import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import DailyMessageForm from '../../components/admin/DailyMessageForm'
import DailyMessageList from '../../components/admin/DailyMessageList'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { deleteDailyMessage, getDailyMessages, saveDailyMessage } from '../../services/dailyMessagesService'

export default function AdminDailyMessagesPage() {
  const [items, setItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const outletContext = useOutletContext()

  useEffect(() => {
    getDailyMessages().then(setItems)
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Daily Messages" subtitle="Keep the daily note pool fresh and easy to edit." />
      <DailyMessageForm
        key={editingItem?.id ?? 'new-daily'}
        initialValue={editingItem}
        onSubmit={async (payload) => {
          await saveDailyMessage(payload)
          setEditingItem(null)
          setItems(await getDailyMessages())
          outletContext.showToast('Daily message saved.', 'success')
        }}
        onCancel={() => setEditingItem(null)}
      />
      <DailyMessageList items={items} onEdit={setEditingItem} onDelete={setPendingDelete} />
      {pendingDelete ? (
        <ConfirmDialog
          title="Delete daily message?"
          body="Remove this note from the pool?"
          confirmLabel="Delete"
          onCancel={() => setPendingDelete(null)}
          onConfirm={async () => {
            await deleteDailyMessage(pendingDelete.id)
            setPendingDelete(null)
            setItems(await getDailyMessages())
          }}
        />
      ) : null}
    </section>
  )
}
