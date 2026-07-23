import { useState } from 'react'

import { saveReply } from '../../services/repliesService'
import { validateReplyText } from '../../utils/validationUtils'

export default function ReplyForm({ sourceType, sourceId, mood, onSuccess, onError }) {
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateReplyText(replyText)) {
      const message = 'Tulis sedikit dulu ya, Nes.'
      setError(message)
      onError?.(message)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await saveReply({
        source_type: sourceType,
        source_id: sourceId,
        mood,
        reply_text: replyText.trim(),
      })

      setReplyText('')
      onSuccess?.("I'll keep this reply close to my heart.")
    } catch {
      const message = 'Maaf sayang, balasannya belum berhasil disimpan. Coba lagi ya.'
      setError(message)
      onError?.(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="card stack-sm" style={{ padding: '1rem' }} onSubmit={handleSubmit}>
      <div>
        <p className="handwritten" style={{ margin: 0, fontSize: '1.6rem' }}>
          Want to write something back?
        </p>
        <p style={{ margin: '0.35rem 0 0', color: 'var(--color-muted-brown)' }}>I&apos;ll keep it close.</p>
      </div>
      <textarea
        className="textarea-field"
        placeholder="Write a little reply for me..."
        value={replyText}
        onChange={(event) => setReplyText(event.target.value)}
      />
      {error ? (
        <p style={{ margin: 0, color: 'var(--color-dusty-rose)', fontSize: 'var(--text-sm)' }}>{error}</p>
      ) : null}
      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving your little reply...' : 'Send your little reply'}
      </button>
    </form>
  )
}
