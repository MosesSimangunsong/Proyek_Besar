export default function GalleryFilter({ categories, activeCategory, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={category === activeCategory ? 'button-primary' : 'button-secondary'}
          onClick={() => onChange(category)}
          style={{ whiteSpace: 'nowrap' }}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
