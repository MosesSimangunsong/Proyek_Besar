export default function MoodCard({ mood, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mood.id)}
      className="scrapbook-card"
      style={{
        width: '100%',
        textAlign: 'left',
        minHeight: '12rem',
        background:
          mood.accent === 'soft'
            ? 'linear-gradient(180deg, rgba(220, 228, 234, 0.6), rgba(255, 253, 248, 0.95))'
            : mood.accent === 'sunny'
              ? 'linear-gradient(180deg, rgba(214, 181, 109, 0.2), rgba(255, 253, 248, 0.95))'
              : mood.accent === 'deep'
                ? 'linear-gradient(180deg, rgba(201, 143, 143, 0.32), rgba(255, 253, 248, 0.95))'
                : mood.accent === 'glow'
                  ? 'linear-gradient(180deg, rgba(214, 181, 109, 0.2), rgba(255, 248, 239, 0.95))'
                  : 'linear-gradient(180deg, rgba(232, 211, 185, 0.6), rgba(255, 253, 248, 0.95))',
      }}
    >
      <span className="washi-tape" />
      <div className="stack-sm">
        <p className="handwritten" style={{ margin: 0, fontSize: '1.8rem' }}>
          {mood.label}
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>{mood.prompt}</p>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>{mood.description}</p>
      </div>
    </button>
  )
}
