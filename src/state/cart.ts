import { create } from 'zustand';

import { localStore } from '../storage';

type CartState = {
  cartId: string | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setCartId: (id: string) => void;
  reset: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartId: null,
  hydrated: false,
  hydrate: async () => {
    const cartId = await localStore.get('cartId').catch(() => null);
    set({ cartId, hydrated: true });
  },
  setCartId: (cartId) => {
    void localStore.set('cartId', cartId);
    set({ cartId });
  },
  reset: () => {
    void localStore.remove('cartId');
    set({ cartId: null });
  },
}));
