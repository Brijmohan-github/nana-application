import type { CollectionConfig } from 'payload'

export const ApplicationSetting: CollectionConfig = {
  slug: 'ApplicationSetting',

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
      label: 'Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'offermessage',
      label: 'Offer Message',
      type: 'text',
      localized: true,
    },
    {
      name: 'Description',
      label: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
