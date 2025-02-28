import { Access } from 'payload'
import { ObjectId } from 'mongodb' // Import ObjectId from MongoDB

export const isRead: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  }

  if (role === 'warehouse') {
    const warehouseIdString = user?.warehouseid ? String(user.warehouseid) : null
    let objectId: ObjectId | null = null

    try {
      if (warehouseIdString) {
        objectId = new ObjectId(warehouseIdString) // Convert to ObjectId safely
      }
    } catch (error) {
      console.error('Invalid warehouse ID:', error)
      objectId = null
    }

    return {
      warehouseId: objectId ? { equals: objectId.toHexString() } : {}, // Ensure plain object
    }

    // if (user && user?.warehouseid) {
    //   const objectId = new ObjectId(user?.warehouseid).toHexString() // Convert to string

    //   //    const objectId = new ObjectId(user?.warehouseid) || null

    //   return {
    //     id: {
    //       equals: objectId, // Only allow access to their own data
    //     },
    //   }
    // } else {
    //   return false
    // }
  } else if (role === 'customer') {
    return true
  }

  return false
}
