import type { CollectionConfig } from 'payload'

export const Wearhouse: CollectionConfig = {
  slug: 'wearhouse',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'houseflatno',
      label: 'house flat no',
      type: 'text',
    },
    {
      name: 'adresslineone',
      label: 'addressline one',
      type: 'text',
    },
    {
      name: 'landmark',
      label: 'Land marker',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'lat',
      label: 'Latitude',
      type: 'text',
    },
    {
      name: 'long',
      label: 'longitude',
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
      name: 'min_amount',
      label: 'Minimum cart value',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
    },
    // {
    //   name: 'createdBy',
    //   type: 'relationship',
    //   relationTo: 'users',
    //   access: {
    //     update: () => false,
    //   },
    //   admin: {
    //     readOnly: true,
    //     position: 'sidebar',
    //     condition: (data) => !!data?.createdBy,
    //   },
    //},
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
