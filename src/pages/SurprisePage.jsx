import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import FloatingDecorations from '../components/scrapbook/FloatingDecorations'
import CodeGateScene from '../components/surprise/CodeGateScene'
import FinalRevealScene from '../components/surprise/FinalRevealScene'
import LoadingIntro from '../components/surprise/LoadingIntro'
import MomentReveal from '../components/surprise/MomentReveal'
import MusicToggle from '../components/surprise/MusicToggle'
import PartyScene from '../components/surprise/PartyScene'
import ReadyToWatchScene from '../components/surprise/ReadyToWatchScene'
import { appCopy } from '../data/appCopy'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { storageKeys } from '../utils/storageUtils'
import '../styles/surprise-theme.css'
import '../styles/surprise-cake.less'

const MOMENTS = appCopy.surprise.moments
const MOMENT_COUNT = MOMENTS.length
const BIRTHDAY_INDEX = 1

// Pesan sekarang paragraf panjang: durasi baca dihitung dari jumlah kata
// (~300ms per kata) dengan lantai 11 detik supaya nyaman dibaca.
const MOMENT_MS_PER_WORD = 300
const MOMENT_MIN_DURATION_MS = 11000

function momentDurationMs(body) {
  const wordCount = body.trim().split(/\s+/).length
  return Math.max(MOMENT_MIN_DURATION_MS, wordCount * MOMENT_MS_PER_WORD)
}

// step 0 = gate, steps 1..MOMENT_COUNT = pesan berurutan (STATE A),
// step MOMENT_COUNT + 1 = tombol manual (STATE B), step terakhir = video (STATE C)
const READY_STEP = MOMENT_COUNT + 1
const VIDEO_STEP = MOMENT_COUNT + 2
const TOTAL_STEPS = VIDEO_STEP + 1

function getDevStepOverride() {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  if (!params.has('step')) {
    return null
  }

  const parsed = Number.parseInt(params.get('step'), 10)
  return Number.isInteger(parsed) && parsed >= 0 && parsed < TOTAL_STEPS ? parsed : null
}

function renderScene(step, { advance, goToVideo }) {
  if (step === 0) {
    return <CodeGateScene key="gate" onUnlocked={advance} />
  }

  if (step >= 1 && step <= MOMENT_COUNT) {
    const momentIndex = step - 1
    const moment = MOMENTS[momentIndex]
    return (
      <MomentReveal
        key={`moment-${momentIndex}`}
        heading={moment.heading}
        body={moment.body}
        festive={momentIndex === BIRTHDAY_INDEX}
      />
    )
  }

  if (step === READY_STEP) {
    return <ReadyToWatchScene key="ready" onContinue={goToVideo} />
  }

  return <FinalRevealScene key="final" />
}

export default function SurprisePage() {
  const [step, setStep] = useSessionStorage(storageKeys.surpriseStep, 0)
  const appliedDevOverride = useRef(false)

  useEffect(() => {
    if (appliedDevOverride.current) {
      return
    }
    appliedDevOverride.current = true

    const override = getDevStepOverride()
    if (override !== null) {
      setStep(override)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const advance = () => setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1))
  const goToVideo = () => setStep(VIDEO_STEP)

  // STATE A: auto-advance tiap pesan setelah durasi baca (berbasis panjang teks).
  // Berhenti otomatis begitu sampai READY_STEP — dari situ murni menunggu klik
  // tombol (STATE B), tidak ada timer.
  useEffect(() => {
    if (step < 1 || step > MOMENT_COUNT) {
      return undefined
    }

    const timer = setTimeout(advance, momentDurationMs(MOMENTS[step - 1].body))
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const showPartyScene = step >= 1 && step <= READY_STEP

  let bannerVariant = 'text'
  let bannerLabel = ''
  if (step >= 1 && step <= MOMENT_COUNT) {
    if (step - 1 === BIRTHDAY_INDEX) {
      bannerVariant = 'image'
    } else {
      bannerLabel = MOMENTS[step - 1].bannerLabel
    }
  } else if (step === READY_STEP) {
    bannerLabel = appCopy.surprise.readyBannerLabel
  }

  return (
    <section className="page-section" style={{ minHeight: '100vh', position: 'relative' }}>
      <FloatingDecorations />

      <AnimatePresence>
        {showPartyScene ? (
          <motion.div
            key="hb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          >
            <PartyScene
              bannerVariant={bannerVariant}
              bannerLabel={bannerLabel}
              lineUp={step - 1 === BIRTHDAY_INDEX}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className="page-shell"
        style={{
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          zIndex: 1,
          // Saat momen ulang tahun, konten turun lebih jauh supaya bebas dari
          // barisan balon "HBD INES" yang berbaris di top 240 (port #wish_message).
          paddingTop: showPartyScene ? (step - 1 === BIRTHDAY_INDEX ? '24rem' : '14.5rem') : 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', display: 'grid', placeItems: 'center' }}
          >
            {renderScene(step, { advance, goToVideo })}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPartyScene ? (
          <motion.div
            key="hb-chrome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }}
          >
            <LoadingIntro />
            <div className="hb-bottom-bar" style={{ pointerEvents: 'auto' }}>
              <MusicToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
