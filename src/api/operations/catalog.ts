import { graphql } from '../gql';

export const HomeQuery = graphql(`
  query Home {
    shop {
      name
    }
    collections(first: 8) {
      nodes {
        id
        handle
        title
        image {
          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })
          altText
        }
      }
    }
    products(first: 10, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`);

export const CollectionsQuery = graphql(`
  query Collections($cursor: String) {
    collections(first: 20, after: $cursor) {
      nodes {
        id
        handle
        title
        image {
          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })
          altText
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const CollectionQuery = graphql(`
  query Collection($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: 12, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`);

export const ProductQuery = graphql(`
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      vendor
      availableForSale
      images(first: 8) {
        nodes {
          id
          url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })
          altText
        }
      }
      options {
        name
        optionValues {
          name
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })
            altText
          }
        }
      }
    }
  }
`);

export const SearchQuery = graphql(`
  query Search($query: String!, $cursor: String) {
    products(first: 20, after: $cursor, query: $query) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
