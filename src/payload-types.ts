/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    categories: Category;
    products: Product;
    wearhouse: Wearhouse;
    wearhouseproducts: Wearhouseproduct;
    orders: Order;
    users: User;
    media: Media;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    products: ProductsSelect<false> | ProductsSelect<true>;
    wearhouse: WearhouseSelect<false> | WearhouseSelect<true>;
    wearhouseproducts: WearhouseproductsSelect<false> | WearhouseproductsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  title?: string | null;
  image?: (string | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  title?: string | null;
  content?: string | null;
  weight?: string | null;
  category: string | Category;
  imageone?: (string | null) | Media;
  imagetwo?: (string | null) | Media;
  imagethree?: (string | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wearhouse".
 */
export interface Wearhouse {
  id: string;
  name?: string | null;
  houseflatno?: string | null;
  adresslineone?: string | null;
  landmark?: string | null;
  location?: string | null;
  lat?: string | null;
  long?: string | null;
  mobile?: string | null;
  currency?: ('SAR' | 'INR' | 'AED') | null;
  min_amount?: number | null;
  status?: ('active' | 'inactive') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wearhouseproducts".
 */
export interface Wearhouseproduct {
  id: string;
  price: number;
  currency: 'SAR' | 'INR' | 'AED';
  status: 'active' | 'inactive';
  wearhouseId: string | Wearhouse;
  products?: (string | null) | Product;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  orderID?: string | null;
  orderDate?: string | null;
  orderAmount?: number | null;
  addressInfo?: string | null;
  userInfo?: string | null;
  mobile?: string | null;
  currency?: ('SAR' | 'INR' | 'AED') | null;
  status?: ('new' | 'cancel' | 'inprogress' | 'delivered') | null;
  OrderBy?: (string | null) | User;
  Products?: (string | Product)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  fullName?: string | null;
  MobileNo?: number | null;
  Photo?: (string | null) | Media;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'categories';
        value: string | Category;
      } | null)
    | ({
        relationTo: 'products';
        value: string | Product;
      } | null)
    | ({
        relationTo: 'wearhouse';
        value: string | Wearhouse;
      } | null)
    | ({
        relationTo: 'wearhouseproducts';
        value: string | Wearhouseproduct;
      } | null)
    | ({
        relationTo: 'orders';
        value: string | Order;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  title?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products_select".
 */
export interface ProductsSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  weight?: T;
  category?: T;
  imageone?: T;
  imagetwo?: T;
  imagethree?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wearhouse_select".
 */
export interface WearhouseSelect<T extends boolean = true> {
  name?: T;
  houseflatno?: T;
  adresslineone?: T;
  landmark?: T;
  location?: T;
  lat?: T;
  long?: T;
  mobile?: T;
  currency?: T;
  min_amount?: T;
  status?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wearhouseproducts_select".
 */
export interface WearhouseproductsSelect<T extends boolean = true> {
  price?: T;
  currency?: T;
  status?: T;
  wearhouseId?: T;
  products?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  orderID?: T;
  orderDate?: T;
  orderAmount?: T;
  addressInfo?: T;
  userInfo?: T;
  mobile?: T;
  currency?: T;
  status?: T;
  OrderBy?: T;
  Products?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  fullName?: T;
  MobileNo?: T;
  Photo?: T;
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}