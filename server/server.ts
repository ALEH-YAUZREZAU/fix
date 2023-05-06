import { ApolloServer, gql } from "apollo-server";
import { mergeResolvers } from "@graphql-tools/merge";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import { authMiddleware } from "./authMiddleware";

import { userResolvers } from "./graphql/User";
import { resolvers as workoutResolvers } from "./graphql/Workout";
import typeDefs from "./graphql";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

const resolvers = mergeResolvers([userResolvers, workoutResolvers]);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) =>
    authMiddleware({
      prisma,
      req,
    }),
});

apolloServer.listen({ port: 4000 }).then(({ url }: any) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
