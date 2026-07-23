import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import EmptyState from '../components/common/EmptyState'
import { appCopy } from '../data/appCopy'
import { getDailyMessages } from '../services/dailyMessagesService'
import { getFavorites } from '../services/favoritesService'
import { formatDateTime } from '../utils/dateUtils'

export default function SavedPage() {
  const [messages, setMessages] = useState([])
  const favorites = useMemo(() => getFavorites(), [])

  useEffect(() => {
    getDailyMessages().then(setMessages)
  }, [])

  const favoriteContent = favorites.map((item) => {
    const relatedDaily = messages.find((daily) => daily.id === item.itemId)

    return {
      id: item.id,
      title: "Today's little note",
      description: relatedDaily?.message || 'A note you wanted to keep close.',
      href: '/daily',
      meta: `${item.itemType.replaceAll('_', ' ')} • ${formatDateTime(item.createdAt)}`,
    }
  })

  return (
    <section className="page-section">
      <div className="page-shell stack-lg" style={{ maxWidth: '48rem' }}>
        <div>
          <span className="eyebrow">Saved</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            Saved little feelings
          </h1>
          <p className="page-subtitle">Come back to the daily notes you wanted to keep close.</p>
        </div>

        {!favoriteContent.length ? (
          <EmptyState
            title={appCopy.saved.favoritesEmptyTitle}
            body={appCopy.saved.favoritesEmptyBody}
            action={
              <Link to="/daily" className="button-primary" style={{ width: 'fit-content', justifySelf: 'center' }}>
                Open daily note
              </Link>
            }
          />
        ) : (
          <div className="stack-md">
            {favoriteContent.map((item) => (
              <Link key={item.id} to={item.href} className="card" style={{ padding: '1rem', display: 'grid', gap: '0.5rem' }}>
                <p className="handwritten" style={{ margin: 0, fontSize: '1.5rem' }}>
                  {item.title}
                </p>
                <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>{item.description}</p>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-muted-brown)' }}>{item.meta}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
