import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import MemoryDomeSection from '../components/gallery/dome/MemoryDomeSection'
import PixelTransition from '../components/home/PixelTransition'
import PolaroidCard from '../components/scrapbook/PolaroidCard'
import ScrapbookCard from '../components/scrapbook/ScrapbookCard'
import FloatingDecorations from '../components/scrapbook/FloatingDecorations'
import img1 from '../assets/img/1.jpg'
import img2 from '../assets/img/2.jpg'
import img3 from '../assets/img/3.jpg'
import img4 from '../assets/img/4.jpg'
import img5 from '../assets/img/5.jpg'
import img6 from '../assets/img/6.jpg'
import { appCopy } from '../data/appCopy'
import { getPhotos } from '../services/photosService'

const featureCards = [
  { to: '/gallery', title: 'Little pieces of us', body: 'A scrapbook gallery of photos I want us to keep close.' },
  { to: '/daily', title: "Today's little note", body: 'A small reminder picked just for today.' },
  { to: '/photobox', title: 'A tiny photobox moment', body: 'Step in, smile a little, and keep another sweet memory with us.' },
  { to: '/saved', title: 'Saved feelings', body: 'Come back to the ones you want to read again.' },
]

const pixelTransitionPairs = [
  { id: 'memory-1', before: img1, after: img4, title: 'Little glance' },
  { id: 'memory-2', before: img2, after: img5, title: 'Warm pause' },
  { id: 'memory-3', before: img3, after: img6, title: 'Soft chaos' },
]

export default function HomePage() {
  const [photos, setPhotos] = useState([])
  const [featuredPhotos, setFeaturedPhotos] = useState([])

  useEffect(() => {
    getPhotos().then((photos) => {
      const activePhotos = photos.filter((photo) => photo.is_active !== false)
      setPhotos(activePhotos)
      setFeaturedPhotos(
        activePhotos.filter((photo) => photo.is_featured !== false && (photo.is_featured || photo.isFeatured)).slice(0, 3),
      )
    })
  }, [])

  return (
    <section className="page-section" style={{ position: 'relative' }}>
      <FloatingDecorations />
      <div className="page-shell stack-lg">
        <MemoryDomeSection photos={photos} />

        <section className="paper-panel stack-lg">
          <div className="stack-md">
            <div>
              <p className="handwritten" style={{ margin: 0, fontSize: '2rem' }}>
                {appCopy.home.greeting}
              </p>
              <h1 className="page-title" style={{ marginTop: '0.4rem' }}>
                {appCopy.home.introTitle}
              </h1>
              <p className="page-subtitle">{appCopy.home.introBody}</p>
            </div>
          </div>

          <section className="stack-md">

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {pixelTransitionPairs.map((pair, index) => (
                <div
                  key={pair.id}
                  className="scrapbook-card"
                  style={{
                    padding: '0.8rem',
                    transform: `rotate(${index === 1 ? '0.6deg' : index === 2 ? '-1deg' : '-0.5deg'})`,
                  }}
                >
                  <PixelTransition
                    firstContent={<img src={pair.before} alt={`${pair.title} first memory`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    secondContent={<img src={pair.after} alt={`${pair.title} second memory`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    gridSize={8}
                    pixelColor="#fff8ef"
                    animationStepDuration={0.38}
                    aspectRatio="4 / 5"
                  />
                  <p className="polaroid-caption" style={{ marginTop: '0.85rem' }}>
                    {pair.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            {featuredPhotos.map((photo, index) => (
              <PolaroidCard key={photo.id} photo={photo} rotation={index === 1 ? 2 : -2} />
            ))}
          </div>

        </section>

        <section className="stack-md">
          <div>
            <h2 className="page-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
              Start anywhere your heart wants.
            </h2>
            <p className="page-subtitle">Each page keeps the same warm feeling, but with its own little story.</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {featureCards.map((card, index) => (
              <ScrapbookCard
                key={card.to}
                title={card.title}
                body={card.body}
                tilt={index % 2 === 0 ? 'left' : 'right'}
                action={
                  <Link to={card.to} className="button-primary" style={{ display: 'inline-flex', width: 'fit-content' }}>
                    Open
                  </Link>
                }
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
