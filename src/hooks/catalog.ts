import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { storefront } from '../api/client';
import {
  CollectionQuery,
  CollectionsQuery,
  HomeQuery,
  ProductQuery,
  SearchQuery,
} from '../api/operations/catalog';

export function useHome() {
  return useQuery({ queryKey: ['home'], queryFn: () => storefront(HomeQuery) });
}

export function useCollections() {
  return useInfiniteQuery({
    queryKey: ['collections'],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => storefront(CollectionsQuery, { cursor: pageParam }),
    getNextPageParam: (last) =>
      last.collections.pageInfo.hasNextPage ? last.collections.pageInfo.endCursor : undefined,
  });
}

export function useCollection(handle: string) {
  return useInfiniteQuery({
    queryKey: ['collection', handle],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => storefront(CollectionQuery, { handle, cursor: pageParam }),
    getNextPageParam: (last) => {
      const pageInfo = last.collection?.products.pageInfo;
      return pageInfo?.hasNextPage ? pageInfo.endCursor : undefined;
    },
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => storefront(ProductQuery, { handle }),
  });
}

export function useSearch(term: string) {
  const query = term.trim();
  const needle = query.toLowerCase();
  return useInfiniteQuery({
    queryKey: ['search', query],
    enabled: query.length > 1,
    initialPageParam: null as string | null,
    // Search by title only, as the PRD scopes it. Shopify supports word-prefix wildcards.
    queryFn: ({ pageParam }) =>
      storefront(SearchQuery, { query: `title:${query.replace(/[":()]/g, '')}*`, cursor: pageParam }),
    getNextPageParam: (last) =>
      last.products.pageInfo.hasNextPage ? last.products.pageInfo.endCursor : undefined,
    // mock.shop ignores the query filter, so match titles here too. On real stores it's a no-op.
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        products: {
          ...page.products,
          nodes: page.products.nodes.filter((p) => p.title.toLowerCase().includes(needle)),
        },
      })),
    }),
  });
}
