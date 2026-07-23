export const roles = {
  guest: 'guest',
  ines: 'ines',
  admin: 'admin',
}

export function isInesRole(role) {
  return role === roles.ines
}

export function isAdminRole(role) {
  return role === roles.admin
}
