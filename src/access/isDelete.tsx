import { Access } from 'payload'


export const isDelete: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } if (role === 'editor' || role === 'brand' || role === 'agency') {

    return {
      createdBy: {
        equals: user?.id, // Only allow access to their own data
      },
    }
  } 
  else {
    return false
  }
}
