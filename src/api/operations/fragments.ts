import { graphql } from '../gql';

export const ProductCardFragment = graphql(`
  fragment ProductCard on Product {
    id
    handle
    title
    availableForSale
    featuredImage {
      url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`);

export const CartFragment = graphql(`
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
              altText
            }
            price {
              amount
              currencyCode
            }
            product {
              handle
              title
            }
          }
        }
      }
    }
  }
`);

export const OrderFragment = graphql(`
  fragment OrderFields on Order {
    id
    name
    processedAt
    financialStatus
    fulfillmentStatus
    statusUrl
    subtotalPrice {
      amount
      currencyCode
    }
    totalShippingPrice {
      amount
      currencyCode
    }
    totalTax {
      amount
      currencyCode
    }
    totalPrice {
      amount
      currencyCode
    }
    shippingAddress {
      name
      formatted
    }
    lineItems(first: 50) {
      nodes {
        title
        quantity
        variant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
        }
        originalTotalPrice {
          amount
          currencyCode
        }
      }
    }
  }
`);
