import type { CollectionConfig, PayloadRequest } from 'payload'
import { ObjectId } from 'mongodb' // Import ObjectId from MongoDB
import { hasPermission } from '@/access/hasPermission'
import { isAdmin } from '@/access/isAdmin'
import { isReadWarehouseProducts } from '@/access/isReadWarehouseProducts'

export const WearhouseProducts: CollectionConfig = {
  slug: 'wearhouseproducts',
  access: {
    read: isReadWarehouseProducts,
    create: isReadWarehouseProducts,
    update: isReadWarehouseProducts,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'price',
  },
  fields: [
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      index: true,
    },
    {
      name: 'categoryid',
      type: 'relationship',
      relationTo: 'categories',
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'originalprice',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'wearhouseId',
      type: 'relationship',
      relationTo: 'wearhouse',
      index: true,
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      options: ['SAR', 'INR', 'AED'],
      required: true,
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
      required: true,
    },
  ],

  endpoints: [
    {
      path: '/filter-by-warehouse',
      method: 'get',
      handler: async (req: any) => {
        let message = ''
        let results = { docs: '' }
        try {
          // Debug: Log the res object to confirm it's being passed correctly
          //  console.log('Response object (res):', res)

          const { payload } = req // Access payload instance
          const warehouseId = req.query.warehouse
          const categoryId = req.query.category
          const limit = parseInt(req.query?.limit as string) || 200
          const page = parseInt(req.query?.page as string) || 1

          console.log('🚀 Brij  ~ req query param: ', warehouseId, categoryId, page, limit)

          // Ensure warehouseId is provided
          if (!warehouseId) {
            //return res.status(400).json({ error: 'Warehouse ID is required.' })
            message = 'Warehouse ID is required.'
          }

          // Validate ObjectId format
          if (!ObjectId.isValid(warehouseId)) {
            //  return res.status(400).json({ error: 'Invalid Warehouse ID format.' })
            message = 'Invalid Warehouse ID format.'
          }

          // Cast warehouseId to ObjectId
          const objectId = new ObjectId(warehouseId)
          const objectCatId = new ObjectId(categoryId)

          if (categoryId) {
            // Use product IDs to filter wearhouseproducts
            results = await payload.find({
              collection: 'wearhouseproducts',
              where: {
                wearhouseId: { equals: objectId },
                categoryid: { equals: objectCatId },
                // products: { in: productIds }, // Match any product in the list
              },
              limit: limit,
              page: page,
              sort: ['-rank', '_id'],
              depth: 2,
              debug: true,
              fields: ['products', 'id'],
            })
          } else {
            // Original query without category filtering
            results = await payload.find({
              collection: 'wearhouseproducts',
              where: {
                wearhouseId: { equals: objectId },
              },
              limit: limit,
              page: page,
              sort: ['-rank', '_id'],
              depth: 2,
              debug: true,
              fields: ['products', 'id'],
            })
          }

          //   console.log('WearhouseProducts - Product Results:', results)

          // Ensure that results and docs are properly checked
          //  if (results && results?.docs && Array.isArray(results?.docs)) {
          if (results && Array.isArray(results?.docs)) {
            if (results?.docs?.length > 0) {
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
          message = 'Error fetching data, Error : ' + error
          console.log('Error object:', error)
          // results = error
        }

        return Response.json(
          { message, result: results },
          {
            headers: {
              'Access-Control-Allow-Origin': '*', // Adjust the origin as needed
              // 'Access-Control-Allow-Origin': 'http://192.168.1.8:3000', // Adjust the origin as needed
              //'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          },
        )
      },
    },
    {
      path: '/update-warehouse-category',
      method: 'get',
      handler: async (req) => {
        const { payload } = req
        // await addLocalesToRequestFromData(req, payload)
        return Response.json({ message: 'wrong action' })
      },
    },
  ],

  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        const { payload } = req // Access payload instance

        console.log('🚀 Brij  ~  file: WearhouseProducts.ts:206 ~  data:', data)

        if (operation === 'create' || operation === 'update') {
          const objectProId = new ObjectId(data?.products)
          // Fetch products that belong to the given category
          const product_detail = await payload.find({
            collection: 'products',
            where: {
              id: { equals: objectProId },
            },
            limit: 1, // Adjust limit as needed
            depth: 0,
          })

          console.log(
            '🚀 Brij  ~  file: WearhouseProducts.ts:219 ~  product_detail:',
            product_detail.docs[0].category,
          )

          data.categoryid = product_detail?.docs[0]?.category
        }

        return data
      },
    ],
  },
}
async function addLocalesToRequestFromData(req: PayloadRequest, payload: any) {
  try {
    // Fetch all products with their category IDs
    const productDetails = await payload.find({
      collection: 'products',
      //where: { id: { equals: '679601da370a005539b72f45' } },
      where: { categoryId: { exist: false } },
      limit: 1000,
      depth: 0,
    })
    // console.log('🚀 Brij  ~  file: WearhouseProducts.ts:270 ~:productDetails', productDetails)

    // Check if products are available
    if (!productDetails.docs || productDetails.docs.length === 0) {
      throw new Error('No products found.')
    }

    // Iterate over each product to update categoryId in warehouseproducts
    for (const product of productDetails.docs) {
      const { id: productId, category, title } = product

      //  if (!categoryid) continue // Skip if categoryid does not exist

      // Update the warehouseproducts where productId matches
      await payload.update({
        collection: 'wearhouseproducts',
        where: { products: { equals: productId } },
        data: { categoryid: category },
      })

      console.log('🚀 Brij  ~  file: WearhouseProducts.ts:270 ~:', productId, category, title)
    }

    console.log('Category IDs updated successfully in warehouseproducts.')
  } catch (error) {
    console.error('Error updating category IDs:', error)
    throw new Error('Failed to update category IDs.')
  }
}
