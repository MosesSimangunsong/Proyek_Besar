import { useState } from 'react'

import AdminFormField from './AdminFormField'
import AdminUploadField from './AdminUploadField'

const initialForm = {
  id: '',
  title: '',
  artist: '',
  audio_url: '',
  is_active: false,
}

export default function MusicForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => (initialValue ? { ...initialForm, ...initialValue } : initialForm))

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setForm((current) => ({
      ...current,
      audio_url: URL.createObjectURL(file),
    }))
  }

  return (
    <form
      className="admin-card"
      style={{ padding: '1rem', display: 'grid', gap: '1rem' }}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(form)
      }}
    >
      <AdminFormField label="Title">
        <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Artist">
        <input className="input-field" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} />
      </AdminFormField>
      <AdminUploadField label="Audio file" accept="audio/*" onChange={handleFileChange} />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <input type="checkbox" checked={Boolean(form.is_active)} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
        <span>Set as active track</span>
      </label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="submit" className="button-primary">Save track</button>
        {onCancel ? <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
