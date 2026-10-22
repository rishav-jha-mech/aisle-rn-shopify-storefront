import { graphql } from '../gql';

export const CustomerCreateMutation = graphql(`
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`);

export const CustomerAccessTokenCreateMutation = graphql(`
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`);

export const CustomerAccessTokenDeleteMutation = graphql(`
  mutation CustomerAccessTokenDelete($token: String!) {
    customerAccessTokenDelete(customerAccessToken: $token) {
      deletedAccessToken
    }
  }
`);

export const CustomerQuery = graphql(`
  query Customer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      firstName
      lastName
      email
      orders(first: 30, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          ...OrderFields
        }
      }
    }
  }
`);
