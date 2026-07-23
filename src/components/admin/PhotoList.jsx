import PhotoItemCard from './PhotoItemCard'

export default function PhotoList(props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {props.photos.map((photo) => (
        <PhotoItemCard key={photo.id} photo={photo} {...props} />
      ))}
    </div>
  )
}
