import GalleryPhotoCard from './GalleryPhotoCard'

export default function GalleryGrid({ photos, onOpen }) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {photos.map((photo, index) => (
        <GalleryPhotoCard key={photo.id} photo={photo} onOpen={onOpen} index={index} />
      ))}
    </section>
  )
}
