import { Access } from 'payload'

export const isEdit: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  }
  if (role === 'warehouse') {
    return {
      createdBy: {
        equals: user?.id, // Only allow access to their own data
      },
    }
  } else {
    return false
  }
}
