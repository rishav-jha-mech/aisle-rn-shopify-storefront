import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { assertNoUserErrors, storefront } from '../api/client';
import type { CartFieldsFragment } from '../api/gql/graphql';
import {
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartLinesAddMutation,
  CartLinesRemoveMutation,
  CartLinesUpdateMutation,
  CartQuery,
} from '../api/operations/cart';
import { useCartStore } from '../state/cart';
import { useSession } from '../state/session';

export type Cart = CartFieldsFragment;
export type CartLine = Cart['lines']['nodes'][number];

const cartKey = (id: string | null) => ['cart', id] as const;

export function useCart() {
  const cartId = useCartStore((s) => s.cartId);
  const reset = useCartStore((s) => s.reset);

  return useQuery({
    queryKey: cartKey(cartId),
    enabled: Boolean(cartId),
    queryFn: async () => {
      const { cart } = await storefront(CartQuery, { id: cartId! });
      // Carts expire after checkout or inactivity. Drop the stale id and start fresh.
      if (!cart) reset();
      return cart ?? null;
    },
  });
}

function useCartMutation<TVars>(run: (cartId: string | null, vars: TVars) => Promise<Cart>) {
  const queryClient = useQueryClient();
  const setCartId = useCartStore((s) => s.setCartId);

  return useMutation({
    mutationFn: (vars: TVars) => run(useCartStore.getState().cartId, vars),
    onSuccess: (cart) => {
      setCartId(cart.id);
      queryClient.setQueryData(cartKey(cart.id), cart);
    },
  });
}

async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  const token = useSession.getState().token;
  const { cartCreate } = await storefront(CartCreateMutation, {
    input: {
      lines,
      buyerIdentity: token ? { customerAccessToken: token.accessToken } : undefined,
    },
  });
  assertNoUserErrors(cartCreate?.userErrors);
  return cartCreate!.cart!;
}

export function useAddToCart() {
  return useCartMutation(async (cartId, line: { merchandiseId: string; quantity: number }) => {
    if (!cartId) return createCart([line]);
    const { cartLinesAdd } = await storefront(CartLinesAddMutation, { cartId, lines: [line] });
    assertNoUserErrors(cartLinesAdd?.userErrors);
    // The stored cart may have expired between reads; fall back to a new one.
    return cartLinesAdd?.cart ?? createCart([line]);
  });
}

export function useUpdateCartLine() {
  return useCartMutation(async (cartId, line: { id: string; quantity: number }) => {
    const { cartLinesUpdate } = await storefront(CartLinesUpdateMutation, {
      cartId: cartId!,
      lines: [line],
    });
    assertNoUserErrors(cartLinesUpdate?.userErrors);
    return cartLinesUpdate!.cart!;
  });
}

export function useRemoveCartLine() {
  return useCartMutation(async (cartId, lineId: string) => {
    const { cartLinesRemove } = await storefront(CartLinesRemoveMutation, {
      cartId: cartId!,
      lineIds: [lineId],
    });
    assertNoUserErrors(cartLinesRemove?.userErrors);
    return cartLinesRemove!.cart!;
  });
}

/** Links the signed-in customer to the cart so checkout opens prefilled. */
export async function attachBuyerToCart(accessToken: string) {
  const cartId = useCartStore.getState().cartId;
  if (!cartId) return null;
  const { cartBuyerIdentityUpdate } = await storefront(CartBuyerIdentityUpdateMutation, {
    cartId,
    buyerIdentity: { customerAccessToken: accessToken },
  });
  assertNoUserErrors(cartBuyerIdentityUpdate?.userErrors);
  return cartBuyerIdentityUpdate?.cart ?? null;
}
