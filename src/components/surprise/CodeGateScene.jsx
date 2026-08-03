import { motion } from 'framer-motion'
import { useState } from 'react'

import { appCopy } from '../../data/appCopy'
import { validateSecretCode } from '../../utils/validationUtils'

export default function CodeGateScene({ onUnlocked }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!code.trim()) {
      setError(appCopy.surprise.incompleteError)
      return
    }

    if (validateSecretCode(code)) {
      setError('')
      onUnlocked()
      return
    }

    const { errors } = appCopy.surprise
    setError(errors[Math.floor(Math.random() * errors.length)])
  }

  return (
    <form onSubmit={handleSubmit} className="paper-panel stack-md" style={{ width: 'min(100%, 34rem)' }}>
      <div>
        <span className="eyebrow">{appCopy.surprise.eyebrow}</span>
        <h1
          className="page-title"
          style={{ marginTop: '0.5rem', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}
        >
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
    </form>
  )
}
