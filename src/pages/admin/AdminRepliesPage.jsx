import { useEffect, useState } from 'react'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import RepliesList from '../../components/admin/RepliesList'
import { getReplies } from '../../services/repliesService'

export default function AdminRepliesPage() {
  const [replies, setReplies] = useState([])

  useEffect(() => {
    getReplies().then(setReplies)
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Replies" subtitle="Newest first, from love letters and daily notes." />
      <RepliesList replies={replies} />
    </section>
  )
}
