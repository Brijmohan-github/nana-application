import { hasPermission } from '@/access/hasPermission'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: hasPermission,
    update: hasPermission,
    read: () => true,
    delete: hasPermission,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
