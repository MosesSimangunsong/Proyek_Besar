import EmptyState from '../../common/EmptyState'
import DomeGallery from './DomeGallery'
import './DomeGallery.css'

export default function MemoryDomeSection({ photos = [] }) {
  const domeImages = photos
    .filter((photo) => photo.is_active !== false)
    .map((photo) => ({
      id: photo.id,
      src: photo.image_url || photo.src,
      alt: photo.caption || photo.title || 'Memory photo',
    }))
    .filter((photo) => photo.src)

  if (domeImages.length === 0) {
    return (
      <div className="memory-dome-section">
        <div className="memory-dome-header">
          <span className="eyebrow">Memory Dome</span>
          <p>Another way to wander through our little archive of moments.</p>
        </div>
        <EmptyState
          title="No memories here just yet"
          body="When photos are ready, this dome will turn into a soft little room full of keepsakes."
        />
      </div>
    )
  }

  return (
    <div className="memory-dome-section">
      <div className="memory-dome-gallery">
        <DomeGallery
          images={domeImages}
          fit={0.75}
          minRadius={420}
          maxVerticalRotationDeg={0}
          segments={28}
          dragDampening={0.8}
          autoRotateSpeedDegPerSecond={3}
          autoRotateResumeDelayMs={1800}
          grayscale={false}
          overlayBlurColor="#FFF8EF"
          imageBorderRadius="22px"
          openedImageBorderRadius="28px"
          openedImageWidth="260px"
          openedImageHeight="360px"
        />
      </div>
    </div>
  )
}
