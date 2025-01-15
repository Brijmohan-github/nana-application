import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      required: false,
    },
    {
      label: 'Mobile no',
      name: 'MobileNo',
      type: 'number',
      required: false,
    },
    {
      name: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
