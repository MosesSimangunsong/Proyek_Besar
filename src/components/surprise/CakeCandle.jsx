import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Port cake CSS dari cake.less: cake fade in dulu (#cake_fadein),
// lilin menyala ~1 detik kemudian (#light_candle) — di sini otomatis.
export default function CakeCandle() {
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLit(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      className="hb-cake-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hb-cake">
        <div className="hb-velas">
          {lit ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="hb-fuego" />
              <div className="hb-fuego" />
              <div className="hb-fuego" />
              <div className="hb-fuego" />
              <div className="hb-fuego" />
            </motion.div>
          ) : null}
        </div>
        <div className="hb-cobertura" />
        <div className="hb-bizcocho" />
      </div>
    </motion.div>
  )
}
