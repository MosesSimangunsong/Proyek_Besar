import { useEffect, useState } from 'react'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { getDailyMessages } from '../../services/dailyMessagesService'
import { getMusicTracks } from '../../services/musicService'
import { getPhotos } from '../../services/photosService'
import { getReplies } from '../../services/repliesService'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    replies: 0,
    photos: 0,
    music: 0,
    daily: 0,
  })

  useEffect(() => {
    const load = async () => {
      const [replies, photos, music, daily] = await Promise.all([
        getReplies(),
        getPhotos(),
        getMusicTracks(),
        getDailyMessages(),
      ])

      setStats({
        replies: replies.length,
        photos: photos.length,
        music: music.length,
        daily: daily.length,
      })
    }

    load()
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Admin Dashboard" subtitle="A clean overview of the private scrapbook system." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <AdminStatCard label="Replies" value={stats.replies} hint="Messages from Ines" />
        <AdminStatCard label="Photos" value={stats.photos} hint="Gallery items" />
        <AdminStatCard label="Music" value={stats.music} hint="Available tracks" />
        <AdminStatCard label="Daily notes" value={stats.daily} hint="Daily message pool" />
      </div>
    </section>
  )
}
