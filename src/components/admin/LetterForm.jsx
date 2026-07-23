import { useState } from 'react'

import { moodConfig } from '../../data/moodConfig'
import AdminFormField from './AdminFormField'

const initialForm = {
  id: '',
  title: '',
  subtitle: '',
  mood: 'kangen',
  style: 'typewriter',
  content: '',
  photo_url: '',
  is_active: true,
}

const styles = ['typewriter', 'soft-fade', 'sticky-note', 'envelope', 'glow-card']

export default function LetterForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    initialValue
      ? {
          ...initialForm,
          ...initialValue,
          content: Array.isArray(initialValue.content) ? initialValue.content.join('\n\n') : initialValue.content,
        }
      : initialForm,
  )

  return (
    <form className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, content: form.content.split('\n').filter(Boolean) }) }}>
      <AdminFormField label="Title">
        <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Subtitle">
        <input className="input-field" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Mood">
        <select className="select-field" value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })}>
          {moodConfig.map((mood) => <option key={mood.id} value={mood.id}>{mood.label}</option>)}
        </select>
      </AdminFormField>
      <AdminFormField label="Style">
        <select className="select-field" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })}>
          {styles.map((style) => <option key={style} value={style}>{style}</option>)}
        </select>
      </AdminFormField>
      <AdminFormField label="Photo URL">
        <input className="input-field" value={form.photo_url || form.photo || ''} onChange={(e) => setForm({ ...form, photo_url: e.target.value, photo: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Content">
        <textarea className="textarea-field" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      </AdminFormField>
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <input type="checkbox" checked={form.is_active !== false} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
        <span>Active for Ines</span>
      </label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="submit" className="button-primary">Save letter</button>
        {onCancel ? <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
