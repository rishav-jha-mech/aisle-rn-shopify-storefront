import type { MerchantConfig } from './types.ts';

// A Shopify dev store from a Partner account. Fill these in through .env.
const devStore: MerchantConfig = {
  id: 'dev-store',
  appName: process.env.EXPO_PUBLIC_DEV_STORE_NAME ?? 'My Store',
  tagline: process.env.EXPO_PUBLIC_DEV_STORE_TAGLINE ?? 'Powered by Aisle',
  storeDomain: process.env.EXPO_PUBLIC_DEV_STORE_DOMAIN ?? 'your-store.myshopify.com',
  storefrontToken: process.env.EXPO_PUBLIC_DEV_STORE_TOKEN ?? '',
  apiVersion: '2025-01',
  bundleSuffix: 'devstore',
  supportsCustomerAccounts: true,
  theme: {
    primary: '#1F5C4A',
    onPrimary: '#FFFFFF',
    background: '#F5F1EA',
    surface: '#FFFFFF',
    text: '#1C1B19',
    muted: '#6E6A62',
    border: '#E3DDD2',
    danger: '#B3261E',
  },
};

export default devStore;
