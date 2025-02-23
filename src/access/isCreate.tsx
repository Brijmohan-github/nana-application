import { Access } from 'payload'


export const isCreate: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } if (role === 'editor' || role === 'brand' || role === 'agency') {

    return true
  } 
  else {
    return false
  }
}
