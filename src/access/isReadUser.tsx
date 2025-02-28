import { Access } from 'payload'


export const isReadUser: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } 
  else {
    return false
  }
}
