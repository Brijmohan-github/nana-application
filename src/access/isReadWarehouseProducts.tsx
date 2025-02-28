import { Access } from 'payload'
import { ObjectId } from 'mongodb' // Import ObjectId from MongoDB

export const isReadWarehouseProducts: Access = ({ req: { user } }) => {
  const role = user?.role
  if (role === 'admin') {
    return true
  }

  if (role === 'warehouse') {
    const user_warehouseid = user?.warehouseid?.id
    if (user_warehouseid == null) return false
    else {
      //  return true
      return {
        warehouseid: {
          equals: user_warehouseid.toString(), // Only allow access to their own data
        },
      }
    }

    // const objectId = new ObjectId(user?.warehouseid) || null

    // return {
    //   warehouseid: {
    //     equals: objectId.toString(), // Only allow access to their own data
    //   },
    // }

    // const warehouseIdString =
    //   user?.warehouseid && typeof user.warehouseid === 'string' ? user.warehouseid : null

    // let objectId: ObjectId | null = null

    // try {
    //   if (warehouseIdString) {
    //     objectId = new ObjectId(warehouseIdString) // Convert to ObjectId safely
    //   }
    // } catch (error) {
    //   console.error('Invalid warehouse ID:', error)
    //   objectId = null
    // }

    // return {
    //   id: objectId ? { equals: objectId.toHexString() } : {}, // Ensure plain object
    // }
  } else if (role === 'customer') {
    return true
  }

  return false
}
