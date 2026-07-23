import { useState } from 'react'

import AdminFormField from './AdminFormField'

const initialForm = {
  id: '',
  tone: 'sweet',
  message: '',
  is_active: true,
}

const tones = ['sweet', 'caring', 'funny', 'romantic', 'supportive']

export default function DailyMessageForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => (initialValue ? { ...initialForm, ...initialValue } : initialForm))

  return (
    <form className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}>
      <AdminFormField label="Tone">
        <select className="select-field" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })}>
          {tones.map((tone) => <option key={tone} value={tone}>{tone}</option>)}
        </select>
      </AdminFormField>
      <AdminFormField label="Message">
        <textarea className="textarea-field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </AdminFormField>
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <input type="checkbox" checked={form.is_active !== false} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
        <span>Active for Ines</span>
      </label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="submit" className="button-primary">Save message</button>
        {onCancel ? <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
