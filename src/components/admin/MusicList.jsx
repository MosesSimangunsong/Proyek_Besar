import MusicItemCard from './MusicItemCard'

export default function MusicList(props) {
  const { tracks } = props
  return (
    <div className="admin-grid">
      {tracks.map((track) => (
        <MusicItemCard key={track.id} track={track} {...props} />
      ))}
    </div>
  )
}
