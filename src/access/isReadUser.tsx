import { Access } from 'payload'

export const isReadUser: Access = ({ req: { user } }) => {
  const role = user?.role

  if (role === 'admin') {
    return true
  }
  if (role === 'warehouse') {
    return true
    // return {
    //   warehouseid: {
    //     equals: Object(user?.warehouseid), // Only allow access to their own data
    //   },
    // }
  } else if (role === 'customer') {
    return {
      id: {
        equals: user?.id, // Only allow access to their own data
      },
    }
  }

  return false
}
