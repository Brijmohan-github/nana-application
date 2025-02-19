//export const BASE_URL = 'https://nana-application.vercel.app/';
export const BASE_URL = 'http://192.168.1.4:3000/'

export const IMG_URL = 'https://nana-application.vercel.app'

export const END_POINTS = {
  LOGIN: 'api/users/login',
  SIGNUP: 'api/users/:add-request',
  PRODUCTS: 'api/products/',
  CREATE_ORDER: 'api/orders?depth=0&fallback-locale=null&limit=200',
  CANCELORDER: 'api/orders/',
  ORDERS: 'api/orders?limit=200&userid=',
  UPDATE_USER: 'api/users/',
  ORDERDETAIL: 'api/orders',
  CATEGORY: 'api/categories?',
  WAREHOUSE: 'api/wearhouse?limit=200&where[status][equals]=active',
  WAREHOUSE_PRODUCTS: 'api/wearhouseproducts/filter-by-warehouse?warehouse=',
  WAREHOUSE_PRODUCT_UPDATE: 'api/wearhouseproducts/',
} as const
