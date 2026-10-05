import { create } from 'zustand';

import { secureStore } from '../storage';

type Token = { accessToken: string; expiresAt: string };

type SessionState = {
  token: Token | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setToken: (token: Token) => Promise<void>;
  clear: () => Promise<void>;
};

export const useSession = create<SessionState>((set) => ({
  token: null,
  hydrated: false,
  hydrate: async () => {
    const stored = await secureStore.get('customerToken').catch(() => null);
    const valid = stored && new Date(stored.expiresAt).getTime() > Date.now() ? stored : null;
    if (stored && !valid) {
      await secureStore.remove('customerToken').catch(() => undefined);
    }
    set({ token: valid, hydrated: true });
  },
  setToken: async (token) => {
    await secureStore.set('customerToken', token);
    set({ token });
  },
  clear: async () => {
    await secureStore.remove('customerToken').catch(() => undefined);
    set({ token: null });
  },
}));
