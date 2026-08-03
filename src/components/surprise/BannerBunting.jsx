import { AnimatePresence, motion } from 'framer-motion'

import bannerImg from '../../assets/surprise/banner.png'

// Dua tone dari design system project (bukan palet mencolok source asli)
// supaya banner teks tetap playful tapi selaras tema scrapbook.
const LETTER_PALETTE = ['var(--color-dusty-rose)', 'var(--color-champagne-gold)']

// Port dari .bannar + .bannar-come (banner jatuh dari atas dengan goyangan 6s).
// banner.png ("HAPPY BIRTHDAY") dipakai khusus momen ulang tahun; momen lain
// dapat banner teks dengan huruf berselang-seling rose/gold.
export default function BannerBunting({ variant = 'text', label = '' }) {
  return (
    <div className="hb-bannar-wrap hb-bannar-wrap--come">
      <AnimatePresence mode="wait">
        <motion.div
          key={variant === 'image' ? 'image' : label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {variant === 'image' ? (
            <img src={bannerImg} alt="Happy Birthday" className="hb-bannar-img" />
          ) : (
            <span className="hb-text-banner" aria-label={label}>
              {label.split('').map((char, index) =>
                char === ' ' ? (
                  <span key={index}>&nbsp;</span>
                ) : (
                  <span key={index} style={{ color: LETTER_PALETTE[index % LETTER_PALETTE.length] }}>
                    {char}
                  </span>
                ),
              )}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
