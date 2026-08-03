import { useEffect, useState } from 'react'

const BULB_COLORS = ['yellow', 'red', 'blue', 'green', 'pink', 'orange']

// Port dari #turn_on + #play di effect.js: glow-in 5 detik per bulb,
// lalu lanjut kelap-kelip infinite (kelas -after di source asli).
export default function BulbGarland() {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBlinking(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div aria-hidden="true" className="hb-bulb-row">
      {BULB_COLORS.map((color) => (
        <div key={color} className="hb-bulb-holder">
          <div
            className={`hb-bulb hb-bulb--${color} ${
              blinking ? `hb-bulb--${color}-blink` : `hb-bulb--${color}-glow`
            }`}
          />
        </div>
      ))}
    </div>
  )
}
