import { Access } from 'payload'


export const isEditUser: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } 
  else {
    return false
  }
}
