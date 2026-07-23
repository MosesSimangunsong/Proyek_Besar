import { useOutletContext } from 'react-router-dom'

import DailyMessageCard from '../components/daily/DailyMessageCard'
import DailyReplyForm from '../components/daily/DailyReplyForm'
import FavoriteButton from '../components/letters/FavoriteButton'
import { useDailyMessage } from '../hooks/useDailyMessage'

export default function DailyPage() {
  const { message } = useDailyMessage()
  const outletContext = useOutletContext()

  return (
    <section className="page-section">
      <div className="page-shell stack-lg" style={{ maxWidth: '48rem' }}>
        <div className="stack-sm">
          <span className="eyebrow">Daily message</span>
          <h1 className="page-title" style={{ marginTop: '0.4rem' }}>
            Today&apos;s little note
          </h1>
          <p className="page-subtitle">A small reminder picked just for today, sayang.</p>
        </div>

        {message ? <DailyMessageCard message={message} /> : <p style={{ margin: 0 }}>Loading today&apos;s little note...</p>}

        {message ? <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <FavoriteButton
            itemType="daily_message"
            itemId={message.id}
            mood={null}
            onToggle={(isFavorite) =>
              outletContext.showToast(
                isFavorite ? 'Saved for you, sayang.' : 'Removed from saved notes.',
                'success',
              )
            }
          />
        </div> : null}

        {message ? <DailyReplyForm
          sourceType="daily_message"
          sourceId={message.id}
          mood={null}
          onSuccess={(text) => outletContext.showToast(text, 'success')}
          onError={(text) => outletContext.showToast(text, 'error')}
        /> : null}
      </div>
    </section>
  )
}
