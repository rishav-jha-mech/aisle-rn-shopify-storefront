import { merchant } from '../../merchants/index.ts';
import type { TypedDocumentString } from './gql/graphql';

export class StorefrontError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'StorefrontError';
  }
}

const endpoint =
  merchant.storeDomain === 'mock.shop'
    ? 'https://mock.shop/api'
    : `https://${merchant.storeDomain}/api/${merchant.apiVersion}/graphql.json`;

export async function storefront<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (merchant.storefrontToken) {
    headers['X-Shopify-Storefront-Access-Token'] = merchant.storefrontToken;
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: document.toString(), variables }),
    });
  } catch {
    throw new StorefrontError('Could not reach the store. Check your connection.');
  }

  if (!response.ok) {
    throw new StorefrontError(`The store responded with ${response.status}.`, response.status);
  }

  const json = (await response.json()) as { data?: TResult; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new StorefrontError(json.errors.map((e) => e.message).join('\n'));
  }
  if (!json.data) {
    throw new StorefrontError('The store returned an empty response.');
  }
  return json.data;
}

/** Throws the first user error from a Shopify mutation payload, if any. */
export function assertNoUserErrors(errors: readonly { message: string }[] | undefined | null) {
  if (errors?.length) {
    throw new StorefrontError(errors[0].message);
  }
}
