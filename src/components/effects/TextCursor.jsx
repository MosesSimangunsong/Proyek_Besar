import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import './TextCursor.css'

const TextCursor = ({
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  removalInterval = 30,
  maxPoints = 5,
}) => {
  const [trail, setTrail] = useState([])
  const lastMoveTimeRef = useRef(0)
  const idCounter = useRef(0)

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = event.clientX
      const mouseY = event.clientY

      const createRandomData = () =>
        randomFloat
          ? {
              randomX: Math.random() * 10 - 5,
              randomY: Math.random() * 10 - 5,
              randomRotate: Math.random() * 10 - 5,
            }
          : {}

      setTrail((prev) => {
        const newTrail = [...prev]

        if (newTrail.length === 0) {
          newTrail.push({
            id: idCounter.current++,
            x: mouseX,
            y: mouseY,
            angle: 0,
            ...createRandomData(),
          })
        } else {
          const last = newTrail[newTrail.length - 1]
          const dx = mouseX - last.x
          const dy = mouseY - last.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance >= spacing) {
            const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI
            const computedAngle = followMouseDirection ? rawAngle : 0
            const steps = Math.floor(distance / spacing)

            for (let i = 1; i <= steps; i += 1) {
              const t = (spacing * i) / distance
              const newX = last.x + dx * t
              const newY = last.y + dy * t

              newTrail.push({
                id: idCounter.current++,
                x: newX,
                y: newY,
                angle: computedAngle,
                ...createRandomData(),
              })
            }
          }
        }

        return newTrail.length > maxPoints ? newTrail.slice(newTrail.length - maxPoints) : newTrail
      })

      lastMoveTimeRef.current = Date.now()
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [followMouseDirection, maxPoints, randomFloat, spacing])

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev))
      }
    }, removalInterval)

    return () => window.clearInterval(interval)
  }, [removalInterval])

  return (
    <div className="text-cursor-container" aria-hidden="true">
      <div className="text-cursor-inner">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 1, rotate: item.angle }}
              animate={{
                opacity: 1,
                scale: 1,
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: exitDuration, ease: 'easeOut' },
                ...(randomFloat
                  ? {
                      x: { duration: 2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY, repeatType: 'mirror' },
                      y: { duration: 2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY, repeatType: 'mirror' },
                      rotate: {
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'mirror',
                      },
                    }
                  : {}),
              }}
              className="text-cursor-item"
              style={{ left: item.x, top: item.y }}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TextCursor
