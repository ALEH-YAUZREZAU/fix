import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query {
    me {
      id
      email
      name
      image
      accounts {
        id
        userId
        type
        provider
        providerAccountId
      }
    }
  }
`;
