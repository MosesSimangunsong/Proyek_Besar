import CountdownOverlay from './CountdownOverlay'

export default function CameraPreview({
  videoRef,
  isCameraActive,
  selectedFilter,
  cameraError,
  frame,
  countdown,
  currentCaptureIndex,
  totalPhotos,
  isRetake,
}) {
  return (
    <div
      className="card"
      style={{
        padding: '1rem',
        background: frame.backgroundColor,
        border: `1px solid ${frame.borderColor}22`,
        display: 'grid',
        gap: '0.85rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '3 / 4',
          borderRadius: 'calc(var(--radius-lg) - 6px)',
          border: `2px solid ${frame.borderColor}`,
          background:
            'linear-gradient(180deg, rgba(255, 253, 248, 0.88), rgba(232, 211, 185, 0.62))',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: selectedFilter.cssFilter,
            display: isCameraActive ? 'block' : 'none',
          }}
        />

        {!isCameraActive ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--color-muted-brown)',
              background:
                'radial-gradient(circle at top, rgba(255, 255, 255, 0.78), rgba(255, 248, 239, 0.96))',
            }}
          >
            <div style={{ display: 'grid', gap: '0.55rem', maxWidth: '18rem' }}>
              <p className="handwritten" style={{ margin: 0, fontSize: '2rem', color: frame.textColor }}>
                Photobox
              </p>
              <p style={{ margin: 0 }}>
                Start Camera when you&apos;re ready, then keep six tiny memories here.
              </p>
            </div>
          </div>
        ) : null}

        <CountdownOverlay
          countdown={countdown}
          currentCaptureIndex={currentCaptureIndex}
          totalPhotos={totalPhotos}
          isRetake={isRetake}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.45rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <p className="handwritten" style={{ margin: 0, fontSize: '1.55rem', color: frame.textColor }}>
            {frame.name}
          </p>
          <p style={{ margin: 0, color: frame.textColor, fontSize: 'var(--text-sm)' }}>
            Filter: {selectedFilter.name}
          </p>
        </div>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          {cameraError || 'Take 6 tiny memories, sayang. Let your smile stay here for a while.'}
        </p>
      </div>
    </div>
  )
}
