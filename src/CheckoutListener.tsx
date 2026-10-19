import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCartStore } from './state/cart';

/** Clears the local cart once Shopify reports the order went through. */
export function CheckoutListener() {
  const checkout = useShopifyCheckoutSheet();
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = checkout.addEventListener('completed', () => {
      useCartStore.getState().reset();
      queryClient.removeQueries({ queryKey: ['cart'] });
      // New order shows up in the account screen.
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    });
    return () => subscription?.remove();
  }, [checkout, queryClient]);

  return null;
}
