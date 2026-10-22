import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { merchant } from '../../merchants/index.ts';
import { StorefrontError, assertNoUserErrors, storefront } from '../api/client';
import {
  CustomerAccessTokenCreateMutation,
  CustomerAccessTokenDeleteMutation,
  CustomerCreateMutation,
  CustomerQuery,
} from '../api/operations/customer';
import { useSession } from '../state/session';
import { attachBuyerToCart } from './cart';

function assertAccountsSupported() {
  if (!merchant.supportsCustomerAccounts) {
    throw new StorefrontError(
      `${merchant.appName} doesn't support customer accounts. Switch to a merchant backed by a Shopify dev store to sign in.`,
    );
  }
}

async function logIn(email: string, password: string) {
  assertAccountsSupported();
  const { customerAccessTokenCreate } = await storefront(CustomerAccessTokenCreateMutation, {
    input: { email, password },
  });
  assertNoUserErrors(customerAccessTokenCreate?.customerUserErrors);
  const token = customerAccessTokenCreate?.customerAccessToken;
  if (!token) throw new StorefrontError('Email or password is incorrect.');

  await useSession.getState().setToken(token);
  await attachBuyerToCart(token.accessToken).catch(() => undefined);
  return token;
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => logIn(email, password),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      assertAccountsSupported();
      const { customerCreate } = await storefront(CustomerCreateMutation, { input });
      assertNoUserErrors(customerCreate?.customerUserErrors);
      return logIn(input.email, input.password);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = useSession.getState().token;
      if (token) {
        // Best effort: revoke on the server, but always forget the token locally.
        await storefront(CustomerAccessTokenDeleteMutation, { token: token.accessToken }).catch(
          () => undefined,
        );
      }
      await useSession.getState().clear();
    },
    onSuccess: () => queryClient.removeQueries({ queryKey: ['customer'] }),
  });
}

export function useCustomer() {
  const token = useSession((s) => s.token);
  const clear = useSession((s) => s.clear);
  return useQuery({
    queryKey: ['customer', token?.accessToken],
    enabled: Boolean(token),
    queryFn: async () => {
      const { customer } = await storefront(CustomerQuery, { token: token!.accessToken });
      // A null customer means the token was revoked or expired on the server.
      if (!customer) await clear();
      return customer ?? null;
    },
  });
}
