import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  localization: {
    locales: ['en', 'es', 'de'], // required
    defaultLocale: 'en', // required
  },
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
