import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type Session, type User, type Account, type Profile } from "next-auth";

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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Respect provided callbackUrl; only allow same-origin redirects
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {
        // ignore invalid URLs
      }
      return baseUrl;
    },
      // Ensure JWT contains up-to-date user fields by reading from DB
  async jwt({ token, user, trigger, session }) {
        // On initial sign in `user` is available
        if (user) {
          token.sub = (user as any).id ?? token.sub;
          token.name = (user as any).name ?? token.name;
          token.email = (user as any).email ?? token.email;
          token.picture = (user as any).image ?? token.picture;
          return token;
        }

        // If the client called useSession().update(...), merge changes into the token immediately
        if (trigger === 'update' && session && (session as any).user) {
          const u = (session as any).user;
          if (u.name !== undefined) token.name = u.name;
          if (u.email !== undefined) token.email = u.email;
          if (u.image !== undefined) token.picture = u.image;
          return token;
        }

        // On subsequent calls, refresh token fields from the DB to pick up profile updates
        if (token?.sub) {
          try {
            const dbUser = await prisma.user.findUnique({ where: { id: token.sub as string } });
            if (dbUser) {
              token.name = dbUser.name ?? token.name;
              token.email = dbUser.email ?? token.email;
              token.picture = dbUser.image ?? token.picture;
              // If user invalidated sessions globally, mark token as invalid
              const invalidatedAt = (dbUser as any).sessionInvalidatedAt as Date | null;
              if (invalidatedAt && token.iat) {
                // token.iat is seconds since epoch; compare to invalidation ms
                const tokenIssuedMs = (token.iat as number) * 1000;
                if (tokenIssuedMs < new Date(invalidatedAt).getTime()) {
                  // Mark token to be rejected by session callback
                  (token as any).invalidated = true;
                }
              }
            } else {
              // User has been deleted; invalidate token
              (token as any).invalidated = true;
            }
          } catch {
            // ignore DB errors and keep token as-is
          }
        }

        return token;
      },

  async session({ session, token }) {
        // Populate session.user from token so it reflects latest DB values
        if (session?.user) {
          session.user.id = (token.sub as string) ?? (token as any).id;
          session.user.name = token.name as string | undefined;
          session.user.email = token.email as string | undefined;
          session.user.image = (token.picture as string | undefined) ?? (token as any).image;
        }
        // If token was invalidated, drop session on the server side
        if ((token as any).invalidated) {
          return null as any;
        }
        return session as Session;
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
