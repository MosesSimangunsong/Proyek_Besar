import { useNavigate } from 'react-router-dom'

import { appCopy } from '../../data/appCopy'

export default function FinalRevealScene() {
  const navigate = useNavigate()

  return (
    <div className="stack-md" style={{ width: 'min(100%, 40rem)' }}>
      <div>
        <span className="eyebrow">{appCopy.surprise.unlockedEyebrow}</span>
        <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
          {appCopy.surprise.unlockedTitle}
        </h1>
      </div>

      <div className="card animate-gentle-glow" style={{ padding: '0.75rem', overflow: 'hidden' }}>
        <iframe
          src="https://drive.google.com/file/d/18r0s9CsUXYVEoLyk8Hsf9_709KxHSRXi/preview"
          style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            display: 'block',
            background: '#000',
          }}
          allow="autoplay"
          allowFullScreen
        />
      </div>

      <button
        type="button"
        className="button-accent"
        style={{ justifySelf: 'center' }}
        onClick={() => navigate('/unlock')}
      >
        {appCopy.surprise.continueButton}
      </button>
    </div>
  )
}
