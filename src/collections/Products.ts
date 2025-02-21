import { hasPermission } from '@/access/hasPermission'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: ({ req }) => {
      const { userid, createdAt } = req.query
      return true
      // console.log('🚀 Brij  ~  req:', req?.user?.role)

      if (req?.user?.role == 'warehouse') {
        return true
        const wid = req?.user?.warehouseid
        return {
          ...(wid ? { warehouseid: { equals: wid } } : {}),
        }
      }

      return {
        ...(userid ? { OrderBy: { equals: userid } } : {}),
        ...(createdAt ? { createdAt: { greater_than_equal: createdAt } } : {}),
      }
    },
    create: hasPermission,
    update: hasPermission,
    // read: hasPermission,
    delete: hasPermission,
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
      type: 'textarea',
      localized: true,
    },
    {
      name: 'weight',
      type: 'text',
      required: false,
    },
    // {  //handling in Wearhouseproducts
    //   name: 'price',
    //   type: 'number',
    //   required: true,
    // },
    // { //handling in Wearhouseproducts
    //   name: 'status',
    //   type: 'select',
    //   options: ['active', 'inactive'],
    //   defaultValue: 'active',
    // },
    {
      name: 'category',
      type: 'relationship',
      required: true,
      relationTo: 'categories',
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
