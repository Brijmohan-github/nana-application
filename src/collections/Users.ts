import type { CollectionConfig } from 'payload'
import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  access: {
    update: () => true,
  },
  fields: [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      required: false,
    },
    {
      label: 'Mobile no',
      name: 'mobile',
      type: 'number',
      required: false,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      name: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  endpoints: [
    {
      path: '/:add-request',
      method: 'post',
      handler: async (req: any) => {
        const data = await req?.json()
        await addDataAndFileToRequest(req)
        console.log('🚀 Brij 90 ~  file: ApprovalRequest.ts:30 ~  handler: ~  data:', data)
        const result = await req.payload.create({ collection: 'users', data })
        //data.userid = result.id
        //data.infuencer = result.id
        //const resultval = await req.payload.create({ collection: 'influencers', data })
        return Response.json(
          { message: `Data successfully added!`, result: result },
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
