export default function EnvelopeLetter({ letter }) {
  return (
    <article className="paper-panel" style={{ background: 'linear-gradient(180deg, rgba(201, 143, 143, 0.25), rgba(255, 253, 248, 0.95))' }}>
      <div className="stack-md">
        <div className="scrapbook-card" style={{ padding: '1rem' }}>
          <p className="handwritten" style={{ margin: 0, fontSize: '1.6rem' }}>
            An opened little envelope for you
          </p>
        </div>
        <div>
          <span className="eyebrow">Mood • {letter.mood}</span>
          <h2 className="page-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginTop: '0.5rem' }}>
            {letter.title}
          </h2>
          <p className="page-subtitle">{letter.subtitle}</p>
        </div>
        <div className="stack-sm">
          {letter.content.map((paragraph) => (
            <p key={paragraph} style={{ margin: 0, lineHeight: 1.9 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
