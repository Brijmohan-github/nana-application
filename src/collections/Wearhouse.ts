import { hasPermission } from '@/access/hasPermission'
import type { CollectionConfig } from 'payload'

export const Wearhouse: CollectionConfig = {
  slug: 'wearhouse',
  access: {
    read: hasPermission,
    create: hasPermission,
    update: hasPermission,
    delete: hasPermission,
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
      name: 'mobile',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'shipingcharge',
      type: 'text',
      admin: { position: 'sidebar' },
    },

    {
      name: 'lat',
      label: 'Latitude',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'long',
      label: 'longitude',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'country',
      type: 'select',
      options: ['SA', 'IN'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pincode',
      label: 'Pin code',
      type: 'text',
    },

    {
      name: 'currency',
      type: 'select',
      options: ['SAR', 'INR', 'AED'],
      admin: { position: 'sidebar' },
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
      admin: { position: 'sidebar' },
    },

    {
      name: 'category',
      type: 'relationship',
      required: true,
      relationTo: 'categories',
      hasMany: true,
    },

    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
