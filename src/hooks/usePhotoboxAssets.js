import { useCallback, useMemo, useRef, useState } from 'react'

import { photoboxFaceStickerAssets } from '../data/photoboxEffects'
import { loadImageAsset } from '../utils/imageAssetUtils'

export function usePhotoboxAssets() {
  const cacheRef = useRef(new Map())
  const [isLoadingAssets, setIsLoadingAssets] = useState(false)
  const [assetError, setAssetError] = useState('')

  const getImageAsset = useCallback(async (src) => {
    if (!src) {
      return null
    }

    if (cacheRef.current.has(src)) {
      return cacheRef.current.get(src)
    }

    const image = await loadImageAsset(src)
    cacheRef.current.set(src, image)
    return image
  }, [])

  const preloadAssets = useCallback(async (sources) => {
    const validSources = sources.filter(Boolean)

    if (!validSources.length) {
      return
    }

    setIsLoadingAssets(true)
    setAssetError('')

    try {
      await Promise.all(validSources.map((src) => getImageAsset(src)))
    } catch {
      setAssetError('A little decoration did not load, but your photobox can still keep going.')
    } finally {
      setIsLoadingAssets(false)
    }
  }, [getImageAsset])

  const getFaceAssets = useMemo(() => async () => {
    await preloadAssets(Object.values(photoboxFaceStickerAssets))

    const entries = await Promise.all(
      Object.entries(photoboxFaceStickerAssets).map(async ([assetId, src]) => {
        const image = await getImageAsset(src)
        return [assetId, image]
      }),
    )

    return Object.fromEntries(entries)
  }, [getImageAsset, preloadAssets])

  return {
    getImageAsset,
    preloadAssets,
    getFaceAssets,
    isLoadingAssets,
    assetError,
  }
}
