import { useState } from 'react'

import AdminFormField from './AdminFormField'
import AdminUploadField from './AdminUploadField'

const initialForm = {
  id: '',
  title: '',
  caption: '',
  category: '',
  image_url: '',
  is_featured: false,
  is_active: true,
}

export default function PhotoForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => (initialValue ? { ...initialForm, ...initialValue } : initialForm))

  return (
    <form className="admin-card" style={{ padding: '1rem', display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}>
      <AdminFormField label="Title">
        <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Caption">
        <textarea className="textarea-field" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
      </AdminFormField>
      <AdminFormField label="Category">
        <input className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      </AdminFormField>
      <AdminUploadField
        label="Image file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) {
            setForm((current) => ({ ...current, image_url: URL.createObjectURL(file) }))
          }
        }}
      />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <input type="checkbox" checked={Boolean(form.is_featured || form.isFeatured)} onChange={(e) => setForm({ ...form, is_featured: e.target.checked, isFeatured: e.target.checked })} />
        <span>Featured on home</span>
      </label>
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <input type="checkbox" checked={form.is_active !== false} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
        <span>Active for Ines gallery</span>
      </label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="submit" className="button-primary">Save photo</button>
        {onCancel ? <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
