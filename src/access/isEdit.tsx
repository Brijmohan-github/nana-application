import { Access } from 'payload'


export const isEdit: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } 
  else {
    return false
  }
}
