// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Wearhouse } from './collections/Wearhouse'
import { WearhouseProducts } from './collections/WearhouseProducts'
import { Orders } from './collections/Orders'
import { Categories } from './collections/Categories'
import { ApplicationSetting } from './collections/ApplicationSetting'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: ['en', 'hi', 'ar'], // required
    defaultLocale: 'en', // required
  },
  // cors: ['http://192.168.1.8:3000'],
  // csrf: ['http://192.168.1.8:3000'],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Categories,
    Products,
    Wearhouse,
    WearhouseProducts,
    ApplicationSetting,
    Orders,
    Users,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  // plugins: [
  //   payloadCloudPlugin(),
  //   // storage-adapter-placeholder
  // ],
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
        // 'media-with-prefix': { prefix: 'my-prefix', },
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
  ],
})
