import { useEffect, useState } from 'react'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { getMusicTracks } from '../../services/musicService'
import { getPhotos } from '../../services/photosService'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    photos: 0,
    music: 0,
  })

  useEffect(() => {
    const load = async () => {
      const [photos, music] = await Promise.all([getPhotos(), getMusicTracks()])

      setStats({
        photos: photos.length,
        music: music.length,
      })
    }

    load()
  }, [])

  return (
    <section className="admin-grid">
      <AdminSectionHeader title="Admin Dashboard" subtitle="A clean overview of the private scrapbook system." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <AdminStatCard label="Photos" value={stats.photos} hint="Gallery items" />
        <AdminStatCard label="Music" value={stats.music} hint="Available tracks" />
      </div>
    </section>
  )
}
