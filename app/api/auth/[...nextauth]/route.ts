import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "../../../../lib/prisma"; // path to your Prisma client

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      // Attach id to session for convenience
      if (session?.user && user?.id) session.user.id = user.id;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Optional: restrict sign-in, log extra details, etc.
      return true;
    },
  },
});

export { handler as GET, handler as POST };
