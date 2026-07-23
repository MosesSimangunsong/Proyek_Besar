import { useEffect, useState } from 'react'

import AdminCodeGate from '../components/admin/AdminCodeGate'
import RepliesList from '../components/admin/RepliesList'
import { getReplies } from '../services/repliesService'

export default function AdminRepliesPage({ isAdminUnlocked, onUnlockAdmin }) {
  const [replies, setReplies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAdminUnlocked) {
      return
    }

    const loadReplies = async () => {
      setIsLoading(true)
      setError('')

      try {
        const nextReplies = await getReplies()
        setReplies(nextReplies)
      } catch {
        setError('Replies could not be loaded right now.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReplies()
  }, [isAdminUnlocked])

  return (
    <section className="page-section">
      <div className="page-shell stack-lg" style={{ maxWidth: '50rem' }}>
        {!isAdminUnlocked ? (
          <AdminCodeGate onUnlock={onUnlockAdmin} />
        ) : (
          <>
            <div>
              <span className="eyebrow">Hidden page</span>
              <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
                Replies from Ines
              </h1>
              <p className="page-subtitle">Newest replies first, kept in a cleaner private layout.</p>
            </div>
            {isLoading ? <p style={{ margin: 0 }}>Loading replies...</p> : null}
            {error ? <p style={{ margin: 0, color: 'var(--color-dusty-rose)' }}>{error}</p> : null}
            {!isLoading && !error ? <RepliesList replies={replies} /> : null}
          </>
        )}
      </div>
    </section>
  )
}
