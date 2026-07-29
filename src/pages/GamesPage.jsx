import FrivPortal from '../components/games/FrivPortal'

export default function GamesPage() {
  return (
    <section className="page-section">
      <div className="page-shell stack-lg">
        <div>
          <span className="eyebrow">Mini Games</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            Jeda kecil di arcade
          </h1>
          <p className="page-subtitle">Pilih satu game, main santai, terus balik lagi ke sini kapan aja.</p>
        </div>

        <FrivPortal />
      </div>
    </section>
  )
}
