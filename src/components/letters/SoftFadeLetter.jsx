export default function SoftFadeLetter({ letter }) {
  return (
    <article
      className="paper-panel"
      style={{ background: 'linear-gradient(180deg, rgba(220, 228, 234, 0.48), rgba(255, 253, 248, 0.95))' }}
    >
      <div className="stack-md">
        <div>
          <span className="eyebrow">Suasana Hati • {letter.mood}</span>
          <h2 className="page-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginTop: '0.5rem' }}>
            {letter.title}
          </h2>
          <p className="page-subtitle">{letter.subtitle}</p>
        </div>
        <div className="stack-sm">
          {letter.content.map((paragraph, index) => (
            <p key={paragraph} style={{ margin: 0, lineHeight: 1.9, animationDelay: `${index * 120}ms` }} className="animate-fade-up">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
