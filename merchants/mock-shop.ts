import type { MerchantConfig } from './types.ts';

// Shopify's public demo store. No token needed, so the app runs out of the box.
const mockShop: MerchantConfig = {
  id: 'mock-shop',
  appName: 'Mock Shop',
  tagline: 'Everyday essentials',
  storeDomain: 'mock.shop',
  storefrontToken: '',
  apiVersion: '2025-01',
  bundleSuffix: 'mockshop',
  supportsCustomerAccounts: false,
  theme: {
    primary: '#111111',
    onPrimary: '#FFFFFF',
    background: '#FAFAF7',
    surface: '#FFFFFF',
    text: '#111111',
    muted: '#6B6B6B',
    border: '#E7E5E0',
    danger: '#C62828',
  },
};

export default mockShop;
