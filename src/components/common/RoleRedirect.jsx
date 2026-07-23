import { Navigate } from 'react-router-dom'

import { roles } from '../../utils/roleUtils'

export default function RoleRedirect({ role }) {
  if (role === roles.admin) {
    return <Navigate to="/admin" replace />
  }

  if (role === roles.ines) {
    return <Navigate to="/home" replace />
  }

  return <Navigate to="/unlock" replace />
}
