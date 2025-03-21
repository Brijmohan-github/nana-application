import type { CollectionConfig } from 'payload'
import { addDataAndFileToRequest } from '@payloadcms/next/utilities'
import { hasPermission } from '@/access/hasPermission'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  access: {
    create: hasPermission,
    update: hasPermission,
    read: hasPermission,
    delete: hasPermission,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Customer', value: 'customer' },
      ],
      required: true,
      defaultValue: 'customer',
    },
    {
      name: 'warehouseid',
      type: 'relationship',
      relationTo: 'wearhouse',
      admin: {
        position: 'sidebar',
      },
    },
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
      name: 'useremail',
      label: 'User Email (to keep original email)',
      type: 'email',
      required: false,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      name: 'country',
      type: 'select',
      options: [
        { label: 'Saudi Arabia', value: '+966' },
        { label: 'India', value: '+91' },
        { label: 'United Arab Emirates', value: '+971' },
        { label: 'Indonesia', value: '+62' }
      ], 
      admin: { position: 'sidebar' },
    },
    {
      label: 'Pin code',
      name: 'pincode',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Cash back',
      name: 'cashback',
      type: 'number',
      admin: {
        position: 'sidebar',

      },
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
