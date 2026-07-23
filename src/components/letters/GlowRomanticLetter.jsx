export default function GlowRomanticLetter({ letter }) {
  return (
    <article
      className="paper-panel animate-gentle-glow"
      style={{ background: 'linear-gradient(160deg, rgba(214, 181, 109, 0.18), rgba(255, 253, 248, 0.96))' }}
    >
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
