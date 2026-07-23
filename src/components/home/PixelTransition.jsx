import { useEffect, useMemo, useRef, useState } from 'react'

import './PixelTransition.css'

function createCells(gridSize) {
  const total = gridSize * gridSize
  return Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    const size = 100 / gridSize

    return {
      index,
      width: `${size}%`,
      height: `${size}%`,
      left: `${col * size}%`,
      top: `${row * size}%`,
    }
  })
}

function shuffleIndexes(length) {
  const values = Array.from({ length }, (_, index) => index)

  for (let index = values.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = values[index]
    values[index] = values[randomIndex]
    values[randomIndex] = current
  }

  const delayByCellIndex = Array.from({ length }, () => 0)
  values.forEach((cellIndex, order) => {
    delayByCellIndex[cellIndex] = order
  })

  return delayByCellIndex
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = '#fffdf8',
  animationStepDuration = 0.32,
  once = false,
  aspectRatio = '4 / 5',
  className = '',
  style = {},
}) {
  const timeoutRefs = useRef([])
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState('idle')
  const cells = useMemo(() => createCells(gridSize), [gridSize])
  const [delayOrder, setDelayOrder] = useState(() => shuffleIndexes(gridSize * gridSize))

  const phaseDurationMs = Math.round(animationStepDuration * 1000)
  const pixelDurationMs = Math.max(120, Math.round(phaseDurationMs * 0.42))
  const staggerMs = cells.length > 1 ? Math.max(10, (phaseDurationMs - pixelDurationMs) / (cells.length - 1)) : 0

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updatePointerMode = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches)
    }

    updatePointerMode()
    window.addEventListener('resize', updatePointerMode)

    return () => window.removeEventListener('resize', updatePointerMode)
  }, [])

  useEffect(
    () => () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      timeoutRefs.current = []
    },
    [],
  )

  const runTransition = (nextActiveState) => {
    if (once && isActive && nextActiveState) {
      return
    }

    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutRefs.current = []
    setDelayOrder(shuffleIndexes(cells.length))
    setPhase('covering')

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setIsActive(nextActiveState)
        setPhase('uncovering')
      }, phaseDurationMs),
    )

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setPhase('idle')
      }, phaseDurationMs * 2),
    )
  }

  const handleEnter = () => {
    if (isActive || phase === 'covering') {
      return
    }
    runTransition(true)
  }

  const handleLeave = () => {
    if (once || (!isActive && phase === 'idle')) {
      return
    }
    runTransition(false)
  }

  const handleClick = () => {
    if (!isTouchDevice) {
      return
    }
    runTransition(!isActive)
  }

  return (
    <div
      className={`pixel-transition ${className}`.trim()}
      style={{
        ...style,
        aspectRatio,
        '--pixel-color': pixelColor,
        '--pixel-duration': `${pixelDurationMs}ms`,
      }}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      <div className="pixel-transition__layer pixel-transition__layer--default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div className="pixel-transition__layer pixel-transition__layer--active" aria-hidden={!isActive} data-visible={isActive}>
        {secondContent}
      </div>
      <div className="pixel-transition__pixels" data-phase={phase} aria-hidden="true">
        {cells.map((cell, index) => (
          <span
            key={cell.index}
            className="pixel-transition__pixel"
            style={{
              width: cell.width,
              height: cell.height,
              left: cell.left,
              top: cell.top,
              transitionDelay: `${delayOrder[index] * staggerMs}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
