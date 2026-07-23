import { Heart } from 'lucide-react'
import { useState } from 'react'

import { isFavoriteItem, toggleFavorite } from '../../services/favoritesService'

export default function FavoriteButton({ itemType, itemId, mood, onToggle }) {
  const [favorite, setFavorite] = useState(() => isFavoriteItem(itemId))

  const handleClick = () => {
    const result = toggleFavorite({
      itemType,
      itemId,
      mood,
    })

    setFavorite(result.isFavorite)
    onToggle?.(result.isFavorite)
  }

  return (
    <button type="button" className={favorite ? 'button-accent' : 'button-secondary'} onClick={handleClick}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
        {favorite ? 'Saved for you' : 'Save this feeling'}
      </span>
    </button>
  )
}
