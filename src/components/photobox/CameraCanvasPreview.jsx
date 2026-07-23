import { useEffect, useRef } from 'react'

import CountdownOverlay from './CountdownOverlay'

export default function CameraCanvasPreview({
  videoRef,
  isCameraActive,
  isVideoReady,
  setIsVideoReady,
  previewCanvasRef,
  selectedEffect,
  selectedTheme,
  cameraError,
  countdown,
  currentCaptureIndex,
  totalPhotos,
  isRetake,
  renderPreviewFrame,
}) {
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return undefined
    }

    const handleVideoReady = () => {
      setIsVideoReady(true)
    }

    video.addEventListener('loadedmetadata', handleVideoReady)
    video.addEventListener('canplay', handleVideoReady)

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady)
      video.removeEventListener('canplay', handleVideoReady)
    }
  }, [setIsVideoReady, videoRef])

  useEffect(() => {
    if (!isCameraActive || !isVideoReady) {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return undefined
    }

    const loop = () => {
      renderPreviewFrame()
      animationFrameRef.current = window.requestAnimationFrame(loop)
    }

    animationFrameRef.current = window.requestAnimationFrame(loop)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isCameraActive, isVideoReady, renderPreviewFrame])

  return (
    <div
      className="card"
      style={{
        padding: '1rem',
        display: 'grid',
        gap: '0.9rem',
        background: `linear-gradient(180deg, ${selectedTheme.colors.background}, ${selectedTheme.colors.secondary})`,
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          borderRadius: 'calc(var(--radius-lg) - 6px)',
          border: '2px solid rgba(74, 47, 37, 0.12)',
          background: 'radial-gradient(circle at top, rgba(255,255,255,0.86), rgba(232, 211, 185, 0.72))',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isCameraActive ? 'block' : 'none',
            opacity: isVideoReady ? 0 : 1,
            transition: 'opacity 180ms ease',
            transform: 'scaleX(-1)',
            background: '#f4ebdf',
          }}
        />
        <canvas
          ref={previewCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: isCameraActive && isVideoReady ? 'block' : 'none',
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
            }}
          >
            <div style={{ display: 'grid', gap: '0.6rem', maxWidth: '19rem' }}>
              <p className="handwritten" style={{ margin: 0, fontSize: '2rem', color: selectedTheme.colors.text }}>
                Photobox
              </p>
              <p style={{ margin: 0 }}>
                Start Camera when you&apos;re ready, then choose a memory style and your little effect.
              </p>
            </div>
          </div>
        ) : null}

        {isCameraActive && !isVideoReady ? (
          <div
            style={{
              position: 'absolute',
              insetInline: '1rem',
              bottom: '1rem',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(74, 47, 37, 0.68)',
              color: '#fffdf8',
              fontSize: '0.8rem',
              textAlign: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            Waking up the camera preview...
          </div>
        ) : null}

        <CountdownOverlay
          countdown={countdown}
          currentCaptureIndex={currentCaptureIndex}
          totalPhotos={totalPhotos}
          isRetake={isRetake}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.35rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <p className="handwritten" style={{ margin: 0, fontSize: '1.45rem', color: selectedTheme.colors.text }}>
            {selectedTheme.name}
          </p>
          <p style={{ margin: 0, color: selectedTheme.colors.text, fontSize: 'var(--text-sm)' }}>
            Effect: {selectedEffect.name}
          </p>
        </div>
      </div>
    </div>
  )
}
