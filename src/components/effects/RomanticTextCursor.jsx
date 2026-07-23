import { useEffect, useState } from 'react'

import TextCursor from './TextCursor'

const INTERACTIVE_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

function shouldEnableCursor() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches
}

export default function RomanticTextCursor() {
  const [isEnabled, setIsEnabled] = useState(() => shouldEnableCursor())
  const [isTypingTargetFocused, setIsTypingTargetFocused] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)')
    const handleChange = () => setIsEnabled(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isEnabled || typeof document === 'undefined') {
      return undefined
    }

    const handleFocusIn = (event) => {
      if (event.target instanceof Element) {
        setIsTypingTargetFocused(event.target.matches(INTERACTIVE_SELECTOR))
      }
    }

    const handleFocusOut = () => {
      window.setTimeout(() => {
        const activeElement = document.activeElement
        setIsTypingTargetFocused(activeElement instanceof Element && activeElement.matches(INTERACTIVE_SELECTOR))
      }, 0)
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [isEnabled])

  if (!isEnabled || isTypingTargetFocused) {
    return null
  }

  return (
    <TextCursor
      text="🩷"
      spacing={80}
      followMouseDirection
      randomFloat
      exitDuration={0.3}
      removalInterval={20}
      maxPoints={10}
    />
  )
}
