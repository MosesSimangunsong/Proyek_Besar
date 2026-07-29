import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FloatingDecorations from '../components/scrapbook/FloatingDecorations'
import { appCopy } from '../data/appCopy'
import { validateSecretCode } from '../utils/validationUtils'

export default function SurprisePage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!code.trim()) {
      setError(appCopy.surprise.incompleteError)
      return
    }

    if (validateSecretCode(code)) {
      setError('')
      setIsUnlocked(true)
      return
    }

    const { errors } = appCopy.surprise
    setError(errors[Math.floor(Math.random() * errors.length)])
  }

  return (
    <section className="page-section" style={{ minHeight: '100vh', position: 'relative' }}>
      <FloatingDecorations />
      <div className="page-shell" style={{ display: 'grid', placeItems: 'center' }}>
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.form
              key="lock"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="paper-panel stack-md"
              style={{ width: 'min(100%, 34rem)' }}
            >
              <div>
                <span className="eyebrow">{appCopy.surprise.eyebrow}</span>
                <h1 className="page-title" style={{ marginTop: '0.5rem', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
                  {appCopy.surprise.title}
                </h1>
                <p className="page-subtitle">{appCopy.surprise.subtitle}</p>
              </div>

              <label className="stack-sm">
                <span className="sr-only">Kode rahasia</span>
                <input
                  type="password"
                  inputMode="numeric"
                  className="input-field"
                  placeholder={appCopy.surprise.placeholder}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </label>

              {error ? (
                <motion.p
                  key={error}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ margin: 0, color: 'var(--color-dusty-rose)' }}
                >
                  {error}
                </motion.p>
              ) : null}

              <button type="submit" className="button-primary">
                {appCopy.surprise.button}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="stack-md"
              style={{ width: 'min(100%, 40rem)' }}
            >
              <div>
                <span className="eyebrow">{appCopy.surprise.unlockedEyebrow}</span>
                <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
                  {appCopy.surprise.unlockedTitle}
                </h1>
              </div>

              <div className="card animate-gentle-glow" style={{ padding: '0.75rem', overflow: 'hidden' }}>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block', background: '#000' }}
                >
                  <source src="/img/surprise-video.mp4" type="video/mp4" />
                  Browser kamu belum mendukung pemutaran video ini.
                </video>
              </div>

              <div className="paper-panel" style={{ maxHeight: '16rem', overflowY: 'auto' }}>
                <p className="handwritten" style={{ fontSize: '1.5rem', margin: '0 0 0.75rem' }}>
                  {appCopy.surprise.letterHeading}
                </p>
                <p style={{ margin: 0, color: 'var(--color-deep-brown)', fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
                  {appCopy.surprise.letterBody}
                </p>
              </div>

              <button
                type="button"
                className="button-accent"
                style={{ justifySelf: 'center' }}
                onClick={() => navigate('/unlock')}
              >
                {appCopy.surprise.continueButton}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
