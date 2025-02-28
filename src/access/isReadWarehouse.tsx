import { Access } from 'payload'
import { ObjectId } from 'mongodb' // Import ObjectId from MongoDB

export const isReadWarehouse: Access = ({ req: { user } }) => {
  const role = user?.role

  console.log('🚀 Brij  ~  user:', role, user?.warehouseid?.id)

  if (role === 'admin') {
    return true
  }

  if (role === 'warehouse') {
    const user_warehouseid = user?.warehouseid?.id
    if (user_warehouseid == null) return false
    else {
      //  return true
      return {
        id: {
          equals: user_warehouseid.toString(), // Only allow access to their own data
        },
      }
    }

    // const objectId = new ObjectId(user?.warehouseid) || null
    // return {
    //   id: {
    //     equals: objectId.toString(), // Only allow access to their own data
    //   },
    // }
    // const warehouseIdString = user?.warehouseid ? String(user.warehouseid) : null
    // let objectId: ObjectId | null = null
    // if (objectId == null) return false
    // try {
    //   if (warehouseIdString) {
    //     objectId = new ObjectId(warehouseIdString) // Convert to ObjectId safely
    //   }
    // } catch (error) {
    //   console.error('Invalid warehouse ID:', error)
    //   objectId = null
    // }
    // if (objectId !== null) {
    //   console.log('🚀 Brij  ~  objectId:', objectId.toHexString())
    //   return {
    //     id: {
    //       equals: objectId.toHexString(), // Only allow access to their own data
    //     },
    //   }
    // }
    // return {
    //   id: objectId ? { equals: objectId.toHexString() } : {}, // Ensure plain object
    // }
  } else if (role === 'customer') {
    return true
  }

  return false
}
