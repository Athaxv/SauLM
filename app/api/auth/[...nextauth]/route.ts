import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma"; // path to your Prisma client

// Try to initialize NextAuth. If anything throws (missing env, prisma not
// available, etc.) we export simple JSON handlers instead of letting Next
// return an HTML 500 page. This prevents the client-side NextAuth calls from
// receiving HTML (or other unexpected content) which causes JSON parse errors
// like "Unexpected token '<'".
// Build providers list: prefer configured OAuth providers, otherwise add a
// local Credentials provider for dev so NextAuth can initialize.
const providers: any[] = []
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  )
}

// If no OAuth providers are configured, register a Credentials provider for
// development/testing only. It accepts any username/password and signs in a
// dummy user. Do NOT enable this in production.
if (providers.length === 0) {
  providers.push(
    CredentialsProvider({
      name: "Dev Credentials",
      credentials: { username: { label: "Username", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(credentials: any) {
        // Very small dev stub — accept any credentials and return a fake user.
        if (!credentials) return null
        return { id: credentials.username || "dev-user", name: credentials.username || "Dev User", email: `${credentials.username || "dev"}@example.com` }
      },
    }),
  )
}

// Use PrismaAdapter only if DATABASE_URL looks like a postgres URL. This
// avoids adapter initialization errors for developer setups that haven't
// provisioned Postgres. When adapter is omitted NextAuth will use an in-memory
// store suitable for dev/testing.
let adapter: any = undefined
if (process.env.DATABASE_URL && (process.env.DATABASE_URL.startsWith("postgres://") || process.env.DATABASE_URL.startsWith("postgresql://"))) {
  try {
    adapter = PrismaAdapter(prisma)
  } catch (e) {
    console.error("Prisma adapter initialization failed, falling back to no adapter:", e)
    adapter = undefined
  }
}

const authOptions: any = {
  adapter: adapter,
  providers,
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret",
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return "/dashboard";
    },
    async session({ session, user, token }: any) {
      if (session?.user && user?.id) session.user.id = user.id;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
  },
}

let handler: any = null
try {
  handler = NextAuth(authOptions)
} catch (e) {
  console.error("NextAuth initialization failed, falling back to dev handlers:", e)
}

// Dev fallback that returns stable JSON for common NextAuth endpoints so the
// client doesn't receive HTML error pages or empty responses that break
// JSON parsing. This is intentionally simple and only for local/dev use.
const devFallback = async (req: Request) => {
  try {
    const url = new URL(req.url)
    // path after /api/auth/
    const path = url.pathname.replace(/^\/api\/auth\//, "")
    const segments = path.split("/").filter(Boolean)

    // GET /api/auth/session
    if (segments[0] === "session") {
      // return null session
      return new Response(JSON.stringify(null), { headers: { "Content-Type": "application/json" } })
    }

    // GET /api/auth/providers
    if (segments[0] === "providers") {
      return new Response(JSON.stringify({}), { headers: { "Content-Type": "application/json" } })
    }

    // GET /api/auth/error
    if (segments[0] === "error") {
      return new Response(JSON.stringify({ error: "auth_error", message: "Auth unavailable in dev" }), { headers: { "Content-Type": "application/json" }, status: 200 })
    }

    // fallback
    return new Response(JSON.stringify({}), { headers: { "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: "dev_fallback_failed" }), { headers: { "Content-Type": "application/json" }, status: 500 })
  }
}

// Export the real handler when available, otherwise the dev fallback. We
// export the function object directly so Next invokes it with the correct
// internal request/response shapes (calling handler ourselves passes the
// wrong object and caused destructuring errors).
const exportedGET: any = handler ?? devFallback
const exportedPOST: any = handler ?? devFallback

export { exportedGET as GET, exportedPOST as POST }
