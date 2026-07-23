export function pickBySeed(list, seedNumber) {
  if (!list.length) {
    return null
  }

  return list[seedNumber % list.length]
}

export function pickAnother(list, currentId) {
  if (list.length <= 1) {
    return list[0] ?? null
  }

  const remaining = list.filter((item) => item.id !== currentId)
  return remaining[Math.floor(Math.random() * remaining.length)]
}
