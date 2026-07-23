export default function CountdownOverlay({ countdown, currentCaptureIndex, totalPhotos, isRetake }) {
  if (countdown === null) {
    return null
  }

  return (
    <div
      aria-live="assertive"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(74, 47, 37, 0.18), rgba(74, 47, 37, 0.6))',
        color: '#fffdf8',
        borderRadius: 'inherit',
      }}
    >
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {isRetake ? `Retaking photo ${currentCaptureIndex + 1}` : `Photo ${currentCaptureIndex + 1} of ${totalPhotos}`}
        </p>
        <p
          className="handwritten"
          style={{
            margin: 0,
            fontSize: typeof countdown === 'number' ? 'clamp(3rem, 14vw, 5rem)' : 'clamp(2rem, 10vw, 3.4rem)',
            lineHeight: 1,
          }}
        >
          {countdown}
        </p>
      </div>
    </div>
  )
}
