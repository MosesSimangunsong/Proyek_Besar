import { useEffect, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timer = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const showToast = (message, tone = 'info') => {
    setToast({
      id: Date.now(),
      message,
      tone,
    })
  }

  return {
    toast,
    showToast,
    clearToast: () => setToast(null),
  }
}
