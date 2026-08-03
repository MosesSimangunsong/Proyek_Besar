import { useEffect, useState } from 'react'

import balloonBorder from '../../assets/surprise/Balloon-Border.png'

// "HBD INES" — 7 balon, warna huruf & pembagian wobble (rot1/rot2) mengikuti source.
const BALLOONS = [
  { letter: 'H', color: '#F2B300', image: 1, rotate: 1 },
  { letter: 'B', color: '#0719D4', image: 2, rotate: 2 },
  { letter: 'D', color: '#D14D39', image: 3, rotate: 2 },
  { letter: 'I', color: '#8FAD00', image: 4, rotate: 1 },
  { letter: 'N', color: '#8377E4', image: 5, rotate: 1 },
  { letter: 'E', color: '#99C96A', image: 6, rotate: 2 },
  { letter: 'S', color: '#20CFB4', image: 7, rotate: 1 },
]

const BALLOON_WIDTH = 100
const BALLOON_HEIGHT = 183
// Ukuran balon versi berbaris (lebih kecil — lihat .hb-balloon--lined).
const LINED_WIDTH = 76
const FLY_INTERVAL_MS = 10000

function randomFlyTargets() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  // Port loop jQuery: left acak, "bottom" acak 0-500 dikonversi ke top.
  return BALLOONS.map(() => ({
    left: Math.random() * Math.max(vw - BALLOON_WIDTH, 0),
    top: Math.max(vh - BALLOON_HEIGHT - Math.random() * 500, 40),
  }))
}

function lineUpTargets() {
  const vw = window.innerWidth
  // Port #wish_message: berbaris di top 240 sekitar tengah
  // (dirapatkan di layar sempit supaya tetap muat).
  const step = Math.min(84, vw / 8)
  return BALLOONS.map((_, index) => ({
    left: vw / 2 + (index - 3) * step - LINED_WIDTH / 2,
    top: 240,
  }))
}

export default function BalloonLetters({ lineUp = false }) {
  const [targets, setTargets] = useState(() =>
    BALLOONS.map(() => ({
      left: typeof window === 'undefined' ? 0 : Math.random() * (window.innerWidth - BALLOON_WIDTH),
      top: typeof window === 'undefined' ? 0 : window.innerHeight + 20,
    })),
  )
  const [borderFlying, setBorderFlying] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBorderFlying(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (lineUp) {
      setTargets(lineUpTargets())
      return undefined
    }

    setTargets(randomFlyTargets())
    const interval = setInterval(() => setTargets(randomFlyTargets()), FLY_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [lineUp])

  const transition = lineUp
    ? 'left 0.5s ease, top 0.5s ease, width 0.5s ease, height 0.5s ease, background-size 0.5s ease, opacity 0.5s'
    : `left ${FLY_INTERVAL_MS}ms linear, top ${FLY_INTERVAL_MS}ms linear, width 0.5s ease, height 0.5s ease, background-size 0.5s ease, opacity 0.5s`

  return (
    <>
      {BALLOONS.map((balloon, index) => (
        <div
          key={balloon.letter + index}
          aria-hidden="true"
          className={`hb-balloon hb-balloon--${balloon.image} hb-balloon--rot${balloon.rotate} ${
            lineUp ? 'hb-balloon--lined' : ''
          }`}
          style={{ left: targets[index].left, top: targets[index].top, transition }}
        >
          <h2 style={{ color: balloon.color }}>{balloon.letter}</h2>
        </div>
      ))}
      <img
        src={balloonBorder}
        alt=""
        aria-hidden="true"
        className={`hb-balloon-border ${borderFlying ? 'hb-balloon-border--fly' : ''}`}
      />
    </>
  )
}
