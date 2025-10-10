import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type Session, type User, type Account, type Profile } from "next-auth";
import { type JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
import { prisma } from "../../../../lib/prisma"; // path to your Prisma client

export const authOptions: NextAuthOptions = {
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
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url: _url, baseUrl: _baseUrl }: { url: string; baseUrl: string }) {
      // Always redirect to dashboard after login
      return "/dashboard";
    },
    async session({ session, user }: { session: Session; user: User; token: JWT }) {
      // Attach id to session for convenience
      if (session?.user && user?.id) session.user.id = user.id;
      return session;
    },
    async signIn({ user: _user, account: _account, profile: _profile, email: _email, credentials: _credentials }: { 
      user: User; 
      account: Account | null; 
      profile?: Profile; 
      email?: { verificationRequest?: boolean }; 
      credentials?: Record<string, unknown>; 
    }) {
      // Optional: restrict sign-in, log extra details, etc.
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
