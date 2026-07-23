export default function ScrapbookCard({ title, body, action, tilt = 'left' }) {
  return (
    <article className={`scrapbook-card scrapbook-card--tilted-${tilt}`}>
      <span className="washi-tape" />
      <div className="stack-sm">
        <p className="handwritten" style={{ margin: 0, fontSize: '1.6rem' }}>
          {title}
        </p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)' }}>{body}</p>
        {action}
      </div>
    </article>
  )
}
