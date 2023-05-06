import { gql } from "apollo-server";

export const userTypeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  type Query {
    me: User!
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }

  input UpdateUserInput {
    id: String!
    email: String
    name: String
    image: String
    role: Role
  }

  type User {
    id: String!
    email: String!
    name: String
    image: String
    role: Role!
    accounts: [Account!]!
    workouts: [Workout!]!
  }

  type Account {
    id: String!
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
  }

  input CreateUserInput {
    email: String!
    name: String
    image: String
    accounts: [CreateAccountInput!]!
    role: Role!
  }

  input CreateAccountInput {
    type: String!
    provider: String!
    providerAccountId: String!
  }
`;
