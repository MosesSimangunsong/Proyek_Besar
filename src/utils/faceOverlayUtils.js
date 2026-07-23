export const FACE_LANDMARK_INDEX = {
  leftEyeOuter: 33,
  rightEyeOuter: 263,
  noseTip: 4,
  headTop: 10,
  leftCheek: 234,
  rightCheek: 454,
}

export function normalizeLandmark(point, width, height) {
  return {
    x: point.x * width,
    y: point.y * height,
    z: point.z ?? 0,
  }
}

export function getFaceAnchorPoints(landmarks, width, height) {
  if (!landmarks?.length) {
    return null
  }

  const anchors = Object.entries(FACE_LANDMARK_INDEX).reduce((result, [key, index]) => {
    const point = landmarks[index]

    if (point) {
      result[key] = normalizeLandmark(point, width, height)
    }

    return result
  }, {})

  if (!anchors.leftEyeOuter || !anchors.rightEyeOuter || !anchors.leftCheek || !anchors.rightCheek) {
    return null
  }

  return anchors
}

export function getFaceRollAngle(leftEye, rightEye) {
  return Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x)
}

export function getFaceWidth(leftCheek, rightCheek) {
  const dx = rightCheek.x - leftCheek.x
  const dy = rightCheek.y - leftCheek.y
  return Math.sqrt((dx * dx) + (dy * dy))
}

export function drawFaceOverlay(ctx, {
  image,
  anchor,
  width,
  height,
  rotation,
  opacity = 1,
}) {
  if (!image || !anchor) {
    return
  }

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(anchor.x, anchor.y)
  ctx.rotate(rotation)
  ctx.drawImage(image, -width / 2, -height / 2, width, height)
  ctx.restore()
}
