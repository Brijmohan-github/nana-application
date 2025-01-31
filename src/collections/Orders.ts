import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: ({ req }) => {
      const { userid, createdAt } = req.query

      return {
        ...(userid ? { OrderBy: { equals: userid } } : {}),
        ...(createdAt ? { createdAt: { greater_than_equal: createdAt } } : {}),
      }
    },
    create: () => true,
    delete: () => true,
  },
  admin: {
    // useAsTitle: 'name',
  },
  fields: [
    // {
    //   name: 'orderID',
    //   type: 'text',
    // },
    {
      name: 'orderDate',
      label: 'Order Date',
      type: 'date',
    },
    {
      name: 'orderAmount',
      label: 'Order Amount',
      type: 'number',
    },
    {
      name: 'shipingcharge',
      type: 'text',
    },
    {
      name: 'addressInfo',
      label: 'Address Info',
      type: 'text',
    },
    {
      name: 'userInfo',
      label: 'User Info',
      type: 'text',
    },
    {
      name: 'mobile',
      type: 'text',
    },
    {
      name: 'currency',
      type: 'select',
      options: ['SAR', 'INR', 'AED'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'cancel', 'inprogress', 'delivered'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'OrderBy',
      type: 'relationship',
      relationTo: 'users',
      access: {},
      admin: { position: 'sidebar' },
    },
    {
      name: 'Products',
      type: 'json',
    },
    // {
    //   name: 'Products',
    //   type: 'relationship',
    //   relationTo: 'products',
    //   hasMany: true,
    //   access: {},
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
  ],
}
