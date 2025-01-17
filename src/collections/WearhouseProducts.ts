import type { CollectionConfig } from 'payload'
import { ObjectId } from 'mongodb' // Import ObjectId from MongoDB

export const WearhouseProducts: CollectionConfig = {
  slug: 'wearhouseproducts',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'price',
  },
  fields: [
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      options: ['SAR', 'INR', 'AED'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
      required: true,
    },
    {
      name: 'wearhouseId',
      type: 'relationship',
      relationTo: 'wearhouse',
      required: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
    },
  ],

  endpoints: [
    {
      path: '/filter-by-warehouse',
      method: 'get',
      handler: async (req: any) => {
        let message = ''
        let results = ''
        try {
          // Debug: Log the res object to confirm it's being passed correctly
        //  console.log('Response object (res):', res)

          const { payload } = req // Access payload instance
          const warehouseId = req.query.warehouse

          // Ensure warehouseId is provided
          if (!warehouseId) {
            //return res.status(400).json({ error: 'Warehouse ID is required.' })
            message =  'Warehouse ID is required.';
          }

          // Validate ObjectId format
          if (!ObjectId.isValid(warehouseId)) {
          //  return res.status(400).json({ error: 'Invalid Warehouse ID format.' })
            message =  'Invalid Warehouse ID format.';
          }

          // Cast warehouseId to ObjectId
          const objectId = new ObjectId(warehouseId)

          // Query the database for products matching the warehouse ID
          results = await payload.find({
            collection: 'wearhouseproducts',
            where: {
              wearhouseId: {
                equals: objectId, // Query for the warehouse by ObjectId
              },
            },
          })

          console.log('Results:', results)

          // Ensure that results and docs are properly checked
          if (results && results?.docs && Array.isArray(results?.docs)) {
            if (results.docs.length > 0) {
              //  return res.status(200).json(results) // Send results if found
              message = 'Product found successfully'
            } else {
              message = 'No products found for the specified warehouse'
            }
          } else {
            // If the structure of results is unexpected
            console.error('Results object structure is invalid or empty:', results)
            message = 'Results object structure is invalid or empty:'
            //return res.status(500).json({ error: 'Unexpected results structure.' })
          }
        } catch (error) {
          message = 'Error fetching data:'
          console.log('Error object:', error)
          results = error
        }

        return Response.json(
          { message, result: results },
          {
            headers: {
              'Access-Control-Allow-Origin': '*', // Adjust the origin as needed
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          },
        )
      },
    },
  ],
}
