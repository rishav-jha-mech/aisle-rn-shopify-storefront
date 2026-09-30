import devStore from './dev-store.ts';
import mockShop from './mock-shop.ts';
import type { MerchantConfig } from './types.ts';

export const merchants: Record<string, MerchantConfig> = {
  [mockShop.id]: mockShop,
  [devStore.id]: devStore,
};

export function getMerchant(id = process.env.EXPO_PUBLIC_MERCHANT): MerchantConfig {
  const merchant = merchants[id ?? mockShop.id];
  if (!merchant) {
    throw new Error(`Unknown merchant "${id}". Expected one of: ${Object.keys(merchants).join(', ')}`);
  }
  return merchant;
}

export const merchant = getMerchant();
export type { MerchantConfig, MerchantTheme } from './types.ts';
