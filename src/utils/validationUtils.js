const defaultSecretCode = '230624'
const defaultAdminCode = 'for-moses'

export function validateSecretCode(value) {
  const target = import.meta.env.VITE_INES_CODE || import.meta.env.VITE_SECRET_CODE || defaultSecretCode
  return value.trim() === String(target).trim()
}

export function validateAdminCode(value) {
  const target = import.meta.env.VITE_ADMIN_CODE || defaultAdminCode
  return value.trim() === String(target).trim()
}
