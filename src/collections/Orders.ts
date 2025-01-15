import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    // useAsTitle: 'name',
  },
  fields: [
    {
      name: 'orderID',
      type: 'text',
    },
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
    },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'cancel', 'inprogress', 'delivered'],
    },
    {
      name: 'OrderBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        //  update: () => false,
      },
      admin: {
        // readOnly: true,
        position: 'sidebar',
        //condition: (data) => !!data?.user,
      },
    },
    // {
    //   name: 'Products',
    //   type: 'relationship',
    //   relationTo: 'products',
    //   hasMany: true,
    //   access: {
    //     //  update: () => false,
    //   },
    //   admin: {
    //     // readOnly: true,
    //     position: 'sidebar',
    //     //condition: (data) => !!data?.user,
    //   },
    // },
  ],
  // hooks: {
  //   beforeChange: [
  //     ({ req, operation, data }) => {
  //       if (req.user) {
  //         // if (operation === 'create') {
  //         //   data.updatedBy = req.user.id
  //         //   data.createdBy = req.user.id
  //         // } else if (operation === 'update') {
  //         data.createdBy = req.user.id
  //         //}
  //         return data
  //       }
  //     },
  //   ],
  // },
}
