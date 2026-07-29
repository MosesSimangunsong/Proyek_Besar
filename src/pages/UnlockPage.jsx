import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { appCopy } from '../data/appCopy'
import FloatingDecorations from '../components/scrapbook/FloatingDecorations'
import { validateAdminCode, validateSecretCode } from '../utils/validationUtils'

export default function UnlockPage({ onUnlock, onUnlockAdmin }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validateSecretCode(code)) {
      onUnlock()
      navigate('/home', { replace: true })
      return
    }

    if (validateAdminCode(code)) {
      onUnlockAdmin()
      navigate('/admin', { replace: true })
      return
    }

    setError(appCopy.unlock.error)
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
      }}
    >
      <FloatingDecorations />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-panel stack-md"
        style={{ width: 'min(100%, 34rem)' }}
      >
        <div>
          <span className="eyebrow">Tempat kecil yang privat</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            {appCopy.unlock.title}
          </h1>
          <p className="page-subtitle">{appCopy.unlock.subtitle}</p>
        </div>
        <label className="stack-sm">
          <span className="sr-only">Kode rahasia</span>
          <input
            className="input-field"
            placeholder={appCopy.unlock.placeholder}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </label>
        {error ? <p style={{ margin: 0, color: 'var(--color-dusty-rose)' }}>{error}</p> : null}
        <button type="submit" className="button-primary">
          {appCopy.unlock.button}
        </button>
        <p style={{ margin: 0, color: 'var(--color-muted-brown)', fontSize: 'var(--text-sm)' }}>
          Ines bisa memasukkan tanggal spesial, dan Moses juga bisa memasukkan kode admin di sini.
        </p>
      </motion.form>
    </section>
  )
}
