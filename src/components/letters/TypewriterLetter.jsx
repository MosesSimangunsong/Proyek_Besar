export default function TypewriterLetter({ letter }) {
  return (
    <article className="paper-panel animate-gentle-glow">
      <div className="stack-md">
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
