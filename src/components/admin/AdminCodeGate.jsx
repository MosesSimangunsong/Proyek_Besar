import { useState } from 'react'

import { validateAdminCode } from '../../utils/validationUtils'

export default function AdminCodeGate({ onUnlock }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validateAdminCode(code)) {
      onUnlock()
      return
    }

    setError('That code does not open this page.')
  }

  return (
    <form className="paper-panel stack-md" onSubmit={handleSubmit}>
      <div>
        <span className="eyebrow">Private route</span>
        <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
          For Moses only
        </h1>
        <p className="page-subtitle">Enter the private code to read her replies.</p>
      </div>
      <input
        className="input-field"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Enter admin code"
      />
      {error ? <p style={{ margin: 0, color: 'var(--color-dusty-rose)' }}>{error}</p> : null}
      <button type="submit" className="button-primary">
        Open replies
      </button>
    </form>
  )
}
