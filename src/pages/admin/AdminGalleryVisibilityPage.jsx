import { Eye, EyeOff } from 'lucide-react'

import AdminSectionHeader from '../../components/admin/AdminSectionHeader'
import { galleryPhotos } from '../../data/galleryPhotos'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { storageKeys } from '../../utils/storageUtils'

const defaultVisibleIds = galleryPhotos.filter((photo) => photo.showInGallery).map((photo) => photo.id)

export default function AdminGalleryVisibilityPage() {
  const [visibleIds, setVisibleIds] = useLocalStorage(storageKeys.galleryVisibility, defaultVisibleIds)

  const toggle = (id) => {
    setVisibleIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="admin-grid">
      <AdminSectionHeader
        title="Gallery Visibility"
        subtitle={`${visibleIds.length} dari ${galleryPhotos.length} foto sedang tampil di galeri Ines.`}
        action={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="button-secondary"
              onClick={() => setVisibleIds(galleryPhotos.map((photo) => photo.id))}
            >
              Show all
            </button>
            <button type="button" className="button-secondary" onClick={() => setVisibleIds([])}>
              Hide all
            </button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {galleryPhotos.map((photo) => {
          const isVisible = visibleIds.includes(photo.id)

          return (
            <article key={photo.id} className="admin-card" style={{ padding: '0.75rem', display: 'grid', gap: '0.6rem' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={photo.image_url || photo.src}
                  alt={photo.caption || 'Gallery photo'}
                  loading="lazy"
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    opacity: isVisible ? 1 : 0.4,
                  }}
                />
                <span
                  className="button-secondary"
                  style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', padding: '0.3rem 0.6rem', fontSize: 'var(--text-xs)' }}
                >
                  {isVisible ? 'Shown' : 'Hidden'}
                </span>
              </div>

              <p style={{ margin: 0, color: 'var(--color-admin-muted)', fontSize: 'var(--text-sm)' }}>
                {photo.category || 'Tanpa kategori'}
              </p>

              <button
                type="button"
                className={isVisible ? 'button-secondary' : 'button-primary'}
                onClick={() => toggle(photo.id)}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                {isVisible ? 'Hide' : 'Show'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
