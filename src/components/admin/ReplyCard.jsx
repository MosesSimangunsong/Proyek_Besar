import { formatDateTime } from '../../utils/dateUtils'

export default function ReplyCard({ reply }) {
  return (
    <article className="card stack-sm" style={{ padding: '1rem' }}>
      <p style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>{reply.reply_text}</p>
      <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
        {reply.source_type} • {reply.source_id} • {reply.mood || 'no mood'} • {formatDateTime(reply.created_at)}
      </p>
    </article>
  )
}
