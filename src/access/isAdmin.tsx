import { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  } 
  return false
  
}
