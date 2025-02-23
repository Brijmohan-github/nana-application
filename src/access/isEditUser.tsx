import { Access } from 'payload'


export const isEditUser: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } if (role === 'editor' || role === 'brand' || role === 'agency') {

    return {
      id: {
        equals: user?.id, // Only allow access to their own data
      },
    }
  } 
  else {
    return false
  }
}
