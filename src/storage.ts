import { MMKVStorageAdapter, SecureStorageAdapter } from '@88khp/rn-storage-kit';

type LocalSchema = {
  cartId: string;
};

type SecureSchema = {
  customerToken: { accessToken: string; expiresAt: string };
};

// Each merchant build has its own bundle id, so the app sandbox already keeps
// carts and sessions apart between merchants.
export const localStore = new MMKVStorageAdapter<LocalSchema>('storefront.local');

// Keychain on iOS, Keystore-backed encryption on Android. Tokens never touch MMKV.
export const secureStore = new SecureStorageAdapter<SecureSchema>();
