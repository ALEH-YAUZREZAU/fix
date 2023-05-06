import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }

      if (account) {
        const customToken = jwt.sign(user, process.env.NEXTAUTH_SECRET as string);
        token.customToken = customToken;
      }

      return token;
    },
    async signIn() {
      return true;
    },
    async session({ session, token, user }) {
      const sess = {
        ...session,
        customToken: token?.customToken,
        user: {
          ...session.user,
          id: user?.id as string,
        },
      };

      return sess;
    },
  },
});

export { handler as GET, handler as POST };
