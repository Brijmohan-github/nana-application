// import { buildConfig } from 'payload/config'
import { CollectionConfig } from 'payload/types'

export const CustomEndpoint: CollectionConfig = {
  slug: 'custom-endpoint',
  endpoints: [
    {
      path: '/my-api', // The route will be `/api/custom-endpoint/my-api`
      method: 'post', // HTTP method
      handler: async (req: any, res: any) => {
        try {
          const { param1, param2 } = req.body

          console.log('🚀 Brij  ~  file: CustomEndpoint.ts:14 ~  handler: ~  body:', req.body)

          // Validate inputs
          if (!param1 || !param2) {
            return res.status(400).json({ error: 'param1 and param2 are required' })
          }

          // Custom logic here
          const result = {
            message: `Received param1: ${param1}, param2: ${param2}`,
            success: true,
          }

          return res.status(200).json(result)
        } catch (error) {
          console.error(error)
          return res.status(500).json({ error: 'An unexpected error occurred' })
        }
      },
    },
  ],
}

// export default buildConfig({
//   serverURL: 'http://localhost:3000', // Your Payload CMS server URL
//   collections: [
//     CustomEndpoint, // Add your custom endpoint collection
//   ],
// });
