export default function DailyMessageCard({ message }) {
  return (
    <article className="paper-panel animate-fade-up">
      <div className="stack-sm">
        <span className="eyebrow">Today&apos;s little note</span>
        <p className="handwritten" style={{ margin: 0, fontSize: '2rem' }}>
          For today, sayang
        </p>
        <p style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>{message.message}</p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Tone: {message.tone}
        </p>
      </div>
    </article>
  )
}
