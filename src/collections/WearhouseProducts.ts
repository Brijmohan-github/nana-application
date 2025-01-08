import type { CollectionConfig } from 'payload'

export const WearhouseProducts: CollectionConfig = {
  slug: 'wearhouseproducts',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    //useAsTitle: 'name',
  },
  fields: [
    {
      name: 'Price',
      type: 'number',
    },
    {
      name: 'currency',
      type: 'select',
      options: ['SAR', 'INR', 'AED'],
    },

    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
    },

    {
      name: 'Warehouse',
      type: 'relationship',
      relationTo: 'wearhouse',
      access: {
        //  update: () => false,
      },
      admin: {
        // readOnly: true,
        //  position: 'sidebar',
        // condition: (data) => !!data?.wearhouse,
      },
    },

    // {
    //   name: 'Products',
    //   type: 'relationship',
    //   relationTo: 'products',
    //   access: {
    //     //  update: () => false,
    //   },
    //   admin: {
    //     // readOnly: true,
    //     // position: 'sidebar',
    //     // condition: (data) => !!data?.product,
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
