import { useState } from 'react'

import { readStorage, storageKeys, writeStorage } from '../utils/storageUtils'
import { roles } from '../utils/roleUtils'

export function useAuthGate() {
  const [role, setRole] = useState(() => readStorage(storageKeys.role, roles.guest))

  const enterInes = () => {
    writeStorage(storageKeys.unlock, true)
    writeStorage(storageKeys.role, roles.ines)
    setRole(roles.ines)
  }

  const enterAdmin = () => {
    writeStorage(storageKeys.admin, true)
    writeStorage(storageKeys.role, roles.admin)
    setRole(roles.admin)
  }

  const logout = () => {
    writeStorage(storageKeys.unlock, false)
    writeStorage(storageKeys.admin, false)
    writeStorage(storageKeys.role, roles.guest)
    setRole(roles.guest)
  }

  return {
    role,
    isUnlocked: role === roles.ines,
    isAdminUnlocked: role === roles.admin,
    unlock: enterInes,
    unlockAdmin: enterAdmin,
    enterInes,
    enterAdmin,
    logout,
  }
}
