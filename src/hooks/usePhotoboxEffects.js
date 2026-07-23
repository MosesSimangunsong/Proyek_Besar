import { useMemo } from 'react'

export function usePhotoboxEffects(selectedEffect) {
  return useMemo(() => {
    const activeEffect = selectedEffect ?? null
    const requiresFaceTracking = Boolean(activeEffect?.requiresFaceTracking)
    const canRenderEffect = Boolean(activeEffect)

    return {
      activeEffect,
      requiresFaceTracking,
      canRenderEffect,
      effectRenderConfig: activeEffect,
    }
  }, [selectedEffect])
}
