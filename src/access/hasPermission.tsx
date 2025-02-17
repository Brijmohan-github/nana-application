import { Access } from 'payload'

export const hasPermission: Access = async ({ req }) => {
  return true

  if (!req.user) {
    console.log('🚀 Brij ~ No user found - Access denied')
    return false
  }
  const userRole = req.user.role || 'customer' // Assume customer if role is missing
  const userId = req.user.id || req.user._id // Ensure user ID is present
  console.log('🚀 Brij  ~  consthasPermission:Access= ~ d userRole:', userId, userRole)

  if (userRole === 'admin') {
    console.log('🚀 Brij ~ Admin/Warehouse Role - Full Access')
    return true // Full access for admins and warehouse
  }

  return false // Deny by default
}
