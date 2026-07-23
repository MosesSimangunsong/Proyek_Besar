export default function FloatingDecorations() {
  return (
    <>
      <span
        className="floating-decoration floating-decoration--rose animate-soft-float"
        style={{ width: '5rem', height: '5rem', top: '8%', left: '8%' }}
      />
      <span
        className="floating-decoration floating-decoration--gold animate-soft-float"
        style={{ width: '3.5rem', height: '3.5rem', top: '18%', right: '10%', animationDelay: '1.4s' }}
      />
      <span
        className="floating-decoration floating-decoration--rose animate-soft-float"
        style={{ width: '4rem', height: '4rem', bottom: '18%', right: '16%', animationDelay: '2.2s' }}
      />
    </>
  )
}
