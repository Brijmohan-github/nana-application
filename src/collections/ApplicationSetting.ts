import { hasPermission } from '@/access/hasPermission'
import type { CollectionConfig } from 'payload'

export const ApplicationSetting: CollectionConfig = {
  slug: 'ApplicationSetting',

  access: {
    create: hasPermission,
    update: hasPermission,
    read: hasPermission,
    delete: hasPermission,
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
