"use client";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

import apolloClient from "./apolloClient";

export const Providers = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </SessionProvider>
  );
};

export default Providers;
