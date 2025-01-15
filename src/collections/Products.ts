import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['Food', 'Grocery', 'Vagitable', 'Dry Fruits', 'Cereal'],
    },

    {
      name: 'imageone',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imagetwo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imagethree',
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
