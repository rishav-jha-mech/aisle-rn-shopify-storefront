/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      ...CartFields\n    }\n  }\n": typeof types.CartDocument,
    "\n  mutation CartCreate($input: CartInput!) {\n    cartCreate(input: $input) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": typeof types.CartCreateDocument,
    "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": typeof types.CartLinesAddDocument,
    "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": typeof types.CartLinesUpdateDocument,
    "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": typeof types.CartLinesRemoveDocument,
    "\n  mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": typeof types.CartBuyerIdentityUpdateDocument,
    "\n  query Home {\n    shop {\n      name\n    }\n    collections(first: 8) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n    }\n    products(first: 10, sortKey: BEST_SELLING) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n": typeof types.HomeDocument,
    "\n  query Collections($cursor: String) {\n    collections(first: 20, after: $cursor) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.CollectionsDocument,
    "\n  query Collection($handle: String!, $cursor: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: 12, after: $cursor) {\n        nodes {\n          ...ProductCard\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": typeof types.CollectionDocument,
    "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      id\n      handle\n      title\n      description\n      vendor\n      availableForSale\n      images(first: 8) {\n        nodes {\n          id\n          url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n          altText\n        }\n      }\n      options {\n        name\n        optionValues {\n          name\n        }\n      }\n      variants(first: 100) {\n        nodes {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n          image {\n            url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n            altText\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProductDocument,
    "\n  query Search($query: String!, $cursor: String) {\n    products(first: 20, after: $cursor, query: $query) {\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.SearchDocument,
    "\n  mutation CustomerCreate($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CustomerCreateDocument,
    "\n  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CustomerAccessTokenCreateDocument,
    "\n  mutation CustomerAccessTokenDelete($token: String!) {\n    customerAccessTokenDelete(customerAccessToken: $token) {\n      deletedAccessToken\n    }\n  }\n": typeof types.CustomerAccessTokenDeleteDocument,
    "\n  query Customer($token: String!) {\n    customer(customerAccessToken: $token) {\n      id\n      firstName\n      lastName\n      email\n      orders(first: 30, sortKey: PROCESSED_AT, reverse: true) {\n        nodes {\n          ...OrderFields\n        }\n      }\n    }\n  }\n": typeof types.CustomerDocument,
    "\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })\n      altText\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": typeof types.ProductCardFragmentDoc,
    "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            image {\n              url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n              altText\n            }\n            price {\n              amount\n              currencyCode\n            }\n            product {\n              handle\n              title\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CartFieldsFragmentDoc,
    "\n  fragment OrderFields on Order {\n    id\n    name\n    processedAt\n    financialStatus\n    fulfillmentStatus\n    statusUrl\n    subtotalPrice {\n      amount\n      currencyCode\n    }\n    totalShippingPrice {\n      amount\n      currencyCode\n    }\n    totalTax {\n      amount\n      currencyCode\n    }\n    totalPrice {\n      amount\n      currencyCode\n    }\n    shippingAddress {\n      name\n      formatted\n    }\n    lineItems(first: 50) {\n      nodes {\n        title\n        quantity\n        variant {\n          id\n          title\n          image {\n            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n            altText\n          }\n        }\n        originalTotalPrice {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n": typeof types.OrderFieldsFragmentDoc,
};
const documents: Documents = {
    "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      ...CartFields\n    }\n  }\n": types.CartDocument,
    "\n  mutation CartCreate($input: CartInput!) {\n    cartCreate(input: $input) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": types.CartCreateDocument,
    "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": types.CartLinesAddDocument,
    "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": types.CartLinesUpdateDocument,
    "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": types.CartLinesRemoveDocument,
    "\n  mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": types.CartBuyerIdentityUpdateDocument,
    "\n  query Home {\n    shop {\n      name\n    }\n    collections(first: 8) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n    }\n    products(first: 10, sortKey: BEST_SELLING) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n": types.HomeDocument,
    "\n  query Collections($cursor: String) {\n    collections(first: 20, after: $cursor) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.CollectionsDocument,
    "\n  query Collection($handle: String!, $cursor: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: 12, after: $cursor) {\n        nodes {\n          ...ProductCard\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": types.CollectionDocument,
    "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      id\n      handle\n      title\n      description\n      vendor\n      availableForSale\n      images(first: 8) {\n        nodes {\n          id\n          url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n          altText\n        }\n      }\n      options {\n        name\n        optionValues {\n          name\n        }\n      }\n      variants(first: 100) {\n        nodes {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n          image {\n            url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n            altText\n          }\n        }\n      }\n    }\n  }\n": types.ProductDocument,
    "\n  query Search($query: String!, $cursor: String) {\n    products(first: 20, after: $cursor, query: $query) {\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.SearchDocument,
    "\n  mutation CustomerCreate($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CustomerCreateDocument,
    "\n  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CustomerAccessTokenCreateDocument,
    "\n  mutation CustomerAccessTokenDelete($token: String!) {\n    customerAccessTokenDelete(customerAccessToken: $token) {\n      deletedAccessToken\n    }\n  }\n": types.CustomerAccessTokenDeleteDocument,
    "\n  query Customer($token: String!) {\n    customer(customerAccessToken: $token) {\n      id\n      firstName\n      lastName\n      email\n      orders(first: 30, sortKey: PROCESSED_AT, reverse: true) {\n        nodes {\n          ...OrderFields\n        }\n      }\n    }\n  }\n": types.CustomerDocument,
    "\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })\n      altText\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n": types.ProductCardFragmentDoc,
    "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            image {\n              url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n              altText\n            }\n            price {\n              amount\n              currencyCode\n            }\n            product {\n              handle\n              title\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CartFieldsFragmentDoc,
    "\n  fragment OrderFields on Order {\n    id\n    name\n    processedAt\n    financialStatus\n    fulfillmentStatus\n    statusUrl\n    subtotalPrice {\n      amount\n      currencyCode\n    }\n    totalShippingPrice {\n      amount\n      currencyCode\n    }\n    totalTax {\n      amount\n      currencyCode\n    }\n    totalPrice {\n      amount\n      currencyCode\n    }\n    shippingAddress {\n      name\n      formatted\n    }\n    lineItems(first: 50) {\n      nodes {\n        title\n        quantity\n        variant {\n          id\n          title\n          image {\n            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n            altText\n          }\n        }\n        originalTotalPrice {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n": types.OrderFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      ...CartFields\n    }\n  }\n"): typeof import('./graphql').CartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartCreate($input: CartInput!) {\n    cartCreate(input: $input) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CartLinesAddDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CartLinesUpdateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CartLinesRemoveDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CartBuyerIdentityUpdateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home {\n    shop {\n      name\n    }\n    collections(first: 8) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n    }\n    products(first: 10, sortKey: BEST_SELLING) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n"): typeof import('./graphql').HomeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collections($cursor: String) {\n    collections(first: 20, after: $cursor) {\n      nodes {\n        id\n        handle\n        title\n        image {\n          url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })\n          altText\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): typeof import('./graphql').CollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collection($handle: String!, $cursor: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: 12, after: $cursor) {\n        nodes {\n          ...ProductCard\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      id\n      handle\n      title\n      description\n      vendor\n      availableForSale\n      images(first: 8) {\n        nodes {\n          id\n          url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n          altText\n        }\n      }\n      options {\n        name\n        optionValues {\n          name\n        }\n      }\n      variants(first: 100) {\n        nodes {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n          image {\n            url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })\n            altText\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').ProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($query: String!, $cursor: String) {\n    products(first: 20, after: $cursor, query: $query) {\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CustomerCreate($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CustomerCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        field\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').CustomerAccessTokenCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CustomerAccessTokenDelete($token: String!) {\n    customerAccessTokenDelete(customerAccessToken: $token) {\n      deletedAccessToken\n    }\n  }\n"): typeof import('./graphql').CustomerAccessTokenDeleteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Customer($token: String!) {\n    customer(customerAccessToken: $token) {\n      id\n      firstName\n      lastName\n      email\n      orders(first: 30, sortKey: PROCESSED_AT, reverse: true) {\n        nodes {\n          ...OrderFields\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CustomerDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })\n      altText\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }\n"): typeof import('./graphql').ProductCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            image {\n              url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n              altText\n            }\n            price {\n              amount\n              currencyCode\n            }\n            product {\n              handle\n              title\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CartFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderFields on Order {\n    id\n    name\n    processedAt\n    financialStatus\n    fulfillmentStatus\n    statusUrl\n    subtotalPrice {\n      amount\n      currencyCode\n    }\n    totalShippingPrice {\n      amount\n      currencyCode\n    }\n    totalTax {\n      amount\n      currencyCode\n    }\n    totalPrice {\n      amount\n      currencyCode\n    }\n    shippingAddress {\n      name\n      formatted\n    }\n    lineItems(first: 50) {\n      nodes {\n        title\n        quantity\n        variant {\n          id\n          title\n          image {\n            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })\n            altText\n          }\n        }\n        originalTotalPrice {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').OrderFieldsFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
