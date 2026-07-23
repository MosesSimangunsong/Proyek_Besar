import { useMemo } from 'react'

import { isAdminRole, isInesRole } from '../utils/roleUtils'

export function useRoleGuard(role) {
  return useMemo(
    () => ({
      isInes: isInesRole(role),
      isAdmin: isAdminRole(role),
      isGuest: !role || role === 'guest',
    }),
    [role],
  )
}
